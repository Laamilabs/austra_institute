import type { Metadata } from "next";
import type { Course } from "@/lib/api/course";
import CoursesPageClient from "./CoursesPageClient";

const SITE_URL = "https://austratraininginstitute.co.ke";
const PAGE_URL = `${SITE_URL}/courses`;

export const metadata: Metadata = {
  title: "Courses in Eldoret, Kenya | Austra Training Institute",
  description:
    "Browse courses at Austra Training Institute in Eldoret, Kenya. Explore German language, caregiving, nursing aide, ICT, computer packages, IELTS preparation and other professional training. Find course details, filter by department or level, and contact admissions.",
  alternates: { canonical: "/courses" },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: PAGE_URL,
    siteName: "Austra Training Institute",
    title: "Courses in Eldoret, Kenya | Austra Training Institute",
    description:
      "Find German, caregiving, nursing aide, ICT, computer packages, IELTS and professional courses at Austra Training Institute in Eldoret, Kenya.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Courses at Austra Training Institute in Eldoret, Kenya" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Courses in Eldoret, Kenya | Austra Training Institute",
    description:
      "Browse course options and find Austra Training Institute in Eldoret, Kenya.",
    images: ["/og-image.jpg"],
  },
};

async function getCatalog(): Promise<{ courses: Course[]; failed: boolean }> {
  const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3300").replace(/\/$/, "");

  try {
    const response = await fetch(`${apiUrl}/course/catalog`, { next: { revalidate: 300 } });
    if (!response.ok) return { courses: [], failed: true };
    return { courses: (await response.json()) as Course[], failed: false };
  } catch (error) {
    console.error("Unable to load the public course catalog:", error);
    return { courses: [], failed: true };
  }
}

export default async function CoursesPage() {
  const { courses, failed } = await getCatalog();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: "Courses at Austra Training Institute",
    description: metadata.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: courses.length,
      itemListElement: courses.map((course, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Course",
          name: course.name,
          courseCode: course.courseCode,
          educationalLevel: course.level,
          url: `${PAGE_URL}/${encodeURIComponent(course._id)}`,
          provider: { "@id": `${SITE_URL}/#organization` },
        },
      })),
    },
    inLanguage: "en-KE",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <CoursesPageClient initialCourses={courses} initialLoadFailed={failed} />
    </>
  );
}
