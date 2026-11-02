import type { MetadataRoute } from "next";
import type { Course } from "@/lib/api/course";
import type { Department } from "@/lib/api/department";
import { getArticles } from "@/lib/sanity";
import { SITE_URL } from "@/lib/site";

const staticRoutes = [
  "",
  "/about",
  "/courses",
  "/programmes/caregiving",
  "/programmes/health-support",
  "/programmes/ict-short-courses",
  "/programmes/ai-workplace-automation",
  "/news",
  "/contact",
  "/faqs",
  "/apply",
  "/library",
  "/prospectus.pdf",
];

async function getCourses(): Promise<Course[]> {
  const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3300").replace(/\/$/, "");

  try {
    const response = await fetch(`${apiUrl}/course/catalog`, { next: { revalidate: 300 } });
    if (!response.ok) return [];
    return (await response.json()) as Course[];
  } catch (error) {
    console.error("Unable to load courses for sitemap:", error);
    return [];
  }
}

async function getDepartments(): Promise<Department[]> {
  const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3300").replace(/\/$/, "");

  try {
    const response = await fetch(`${apiUrl}/departments`, { next: { revalidate: 300 } });
    if (!response.ok) return [];
    return (await response.json()) as Department[];
  } catch (error) {
    console.error("Unable to load schools for sitemap:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, departments, articles] = await Promise.all([
    getCourses(),
    getDepartments(),
    getArticles(),
  ]);

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route.startsWith("/news/") ? "monthly" : "weekly",
    priority: route === "" ? 1 : route === "/courses" ? 0.9 : 0.7,
  }));

  return [
    ...pages,
    ...courses.map((course) => ({
      url: `${SITE_URL}/courses/${encodeURIComponent(course._id)}`,
      lastModified: course.updatedAt ? new Date(course.updatedAt) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...departments
      .filter((department) => department.isActive !== false)
      .map((department) => ({
        url: `${SITE_URL}/schools/${encodeURIComponent(department._id)}`,
        lastModified: department.updatedAt ? new Date(department.updatedAt) : undefined,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ...articles.map((article) => ({
      url: `${SITE_URL}/news/${encodeURIComponent(article.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
