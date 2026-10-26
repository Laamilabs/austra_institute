import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseDetailClient from "./course-detail-client";
import type { Course } from "@/lib/api/course";

const SITE_URL = "https://austratraininginstitute.co.ke";
const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3300").replace(/\/$/, "");

type PageProps = { params: Promise<{ id: string }> };
type CourseResult = { course: Course | null; notFound: boolean };

const getCourse = cache(async (id: string): Promise<CourseResult> => {
  try {
    const response = await fetch(`${API_URL}/course/${encodeURIComponent(id)}`, {
      cache: "no-store",
    });
    if (response.status === 404) return { course: null, notFound: true };
    if (!response.ok) return { course: null, notFound: false };
    return { course: (await response.json()) as Course, notFound: false };
  } catch {
    return { course: null, notFound: false };
  }
});

function plainText(value: string | undefined) {
  return (value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { course } = await getCourse(id);
  if (!course) return { title: "Course details" };

  const description =
    plainText(course.description) ||
    `${course.name} at Austra Training Institute in Eldoret, Kenya. View course details and apply online.`;
  const canonical = `/courses/${encodeURIComponent(id)}`;
  const title = `${course.name} (${course.courseCode})`;

  return {
    title,
    description: description.slice(0, 160),
    keywords: [
      course.name,
      course.courseCode,
      course.level,
      course.department?.name,
      "courses in Eldoret",
      "Austra Training Institute",
    ].filter((keyword): keyword is string => Boolean(keyword)),
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_KE",
      url: `${SITE_URL}${canonical}`,
      siteName: "Austra Training Institute",
      title: `${title} | Austra Training Institute`,
      description: description.slice(0, 200),
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: course.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Austra Training Institute`,
      description: description.slice(0, 200),
      images: ["/og-image.jpg"],
    },
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getCourse(id);
  if (result.notFound) notFound();
  if (!result.course) {
    return <CourseDetailClient courseId={id} initialCourse={null} />;
  }
  const course = result.course;

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${SITE_URL}/courses/${encodeURIComponent(id)}#course`,
    name: course.name,
    courseCode: course.courseCode,
    description:
      plainText(course.description) ||
      `${course.name} at Austra Training Institute in Eldoret, Kenya.`,
    educationalLevel: course.level,
    provider: {
      "@type": "EducationalOrganization",
      name: "Austra Training Institute",
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Eldoret",
        addressRegion: "Uasin Gishu County",
        addressCountry: "KE",
      },
    },
    url: `${SITE_URL}/courses/${encodeURIComponent(id)}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/courses/${encodeURIComponent(id)}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Courses", item: `${SITE_URL}/courses` },
      { "@type": "ListItem", position: 2, name: course.name, item: `${SITE_URL}/courses/${encodeURIComponent(id)}` },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/courses/${encodeURIComponent(id)}#webpage`,
    url: `${SITE_URL}/courses/${encodeURIComponent(id)}`,
    name: `${course.name} (${course.courseCode}) | Austra Training Institute`,
    description: plainText(course.description) || `${course.name} at Austra Training Institute in Eldoret, Kenya.`,
    inLanguage: "en-KE",
    mainEntity: { "@id": `${SITE_URL}/courses/${encodeURIComponent(id)}#course` },
    breadcrumb: { "@id": `${SITE_URL}/courses/${encodeURIComponent(id)}#breadcrumb` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd).replace(/</g, "\\u003c") }}
      />
      <CourseDetailClient courseId={id} initialCourse={course} />
    </>
  );
}
