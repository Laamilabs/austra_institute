import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Course } from "@/lib/api/course";
import type { Department } from "@/lib/api/department";
import { SITE_URL } from "@/lib/site";
import SchoolDetailClient from "./school-detail-client";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3300").replace(/\/$/, "");
type PageProps = { params: Promise<{ id: string }> };
type DepartmentResult = { department: Department | null; notFound: boolean };

const getDepartment = cache(async (id: string): Promise<DepartmentResult> => {
  try {
    const response = await fetch(`${API_URL}/departments/${encodeURIComponent(id)}`, {
      next: { revalidate: 300 },
    });
    if (response.status === 404) return { department: null, notFound: true };
    if (!response.ok) return { department: null, notFound: false };
    return { department: (await response.json()) as Department, notFound: false };
  } catch (error) {
    console.error("Unable to load school details:", error);
    return { department: null, notFound: false };
  }
});

async function getCourses(id: string): Promise<Course[]> {
  try {
    const response = await fetch(`${API_URL}/course/department/${encodeURIComponent(id)}`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) return [];
    return (await response.json()) as Course[];
  } catch (error) {
    console.error("Unable to load school courses:", error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { department } = await getDepartment(id);
  const canonical = `${SITE_URL}/schools/${encodeURIComponent(id)}`;
  const title = department
    ? `${department.name} Courses | Austra Training Institute, Eldoret`
    : "School Courses | Austra Training Institute, Eldoret";
  const description = department?.description
    ? `${department.description} Explore courses at Austra Training Institute in Eldoret, Kenya.`
    : `Explore ${department?.name ?? "school"} courses at Austra Training Institute in Eldoret, Kenya.`;

  return {
    title,
    description: description.slice(0, 160),
    alternates: { canonical },
    openGraph: { type: "website", url: canonical, title, description },
  };
}

export default async function SchoolDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getDepartment(id);
  if (result.notFound) notFound();

  const courses = result.department ? await getCourses(id) : [];
  const pageUrl = `${SITE_URL}/schools/${encodeURIComponent(id)}`;
  const jsonLd = result.department
    ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${result.department.name} Courses | Austra Training Institute`,
        description: result.department.description,
        about: { "@id": `${SITE_URL}/#organization` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: courses.length,
          itemListElement: courses.map((course, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Course",
              name: course.name,
              courseCode: course.courseCode,
              educationalLevel: course.level,
              url: `${SITE_URL}/courses/${encodeURIComponent(course._id)}`,
              provider: { "@id": `${SITE_URL}/#organization` },
            },
          })),
        },
        inLanguage: "en-KE",
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      )}
      <SchoolDetailClient
        id={id}
        initialDepartment={result.department}
        initialCourses={courses}
        initialError={result.department ? null : "School details are temporarily unavailable."}
      />
    </>
  );
}
