import type { MetadataRoute } from "next";
import type { Course } from "@/lib/api/course";

const SITE_URL = "https://austratraininginstitute.co.ke";

const staticRoutes = [
  "",
  "/about",
  "/courses",
  "/news",
  "/contact",
  "/faqs",
  "/apply",
  "/news/three-month-web-development-course-eldoret",
  "/news/healthcare-and-social-sciences-department-career-focused-training",
  "/news/learn-german-a1-b2-and-build-your-future-through-ausbildung-in-germany",
  "/news/austra-training-institute-launches-new-website",
  "/news/discover-your-musical-talent-music-courses",
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const courses = await getCourses();

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
  ];
}
