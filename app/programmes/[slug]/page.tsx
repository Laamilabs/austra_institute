import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Course } from "@/lib/api/course";
import { INSTITUTE_CONTACT, SITE_URL } from "@/lib/site";

const PROGRAMMES = {
  caregiving: {
    title: "Caregiving Courses in Eldoret",
    metaTitle: "Caregiving Courses in Eldoret | Austra Training Institute",
    description: "Explore caregiving and individual support courses at Austra Training Institute in Eldoret. Review current course options and details, then apply online.",
    intro: "Explore current caregiving and individual support programmes at Austra Training Institute in Eldoret. Course pages provide the available level and details; contact admissions to confirm current entry requirements, fees and intake dates.",
    matches: /caregiv|individual support|ageing|aged care|disability support/i,
  },
  "health-support": {
    title: "Nurse Aide & Health Support Courses in Eldoret",
    metaTitle: "Nurse Aide & Health Support Courses | Austra Eldoret",
    description: "Browse nurse aide, nurse assistant and Health Services Support courses at Austra Training Institute in Eldoret, Kenya.",
    intro: "Find nurse aide, nurse assistant and Health Services Support programmes in one place. Compare the course names and levels currently listed, and contact admissions for the latest requirements, fees and intake information.",
    matches: /nurse aide|nurse assistant|nursing aide|health services support|health support/i,
  },
  "ict-short-courses": {
    title: "ICT & Digital Skills Short Courses in Eldoret",
    metaTitle: "ICT Short Courses in Eldoret | Austra Training Institute",
    description: "Explore computer packages, ICT, web development and cybersecurity courses at Austra Training Institute in Eldoret. Browse current course details and apply online.",
    intro: "Browse current computer packages, ICT, web development and cybersecurity options at Austra Training Institute in Eldoret. Use each course page to review its level and available details; contact admissions to confirm current delivery, requirements and intake dates.",
    matches: /computer package|computer application|\bICT\b|information communication technology|cybersecurity|web technolog|web development|mobile development/i,
  },
  "ai-workplace-automation": {
    title: "AI for Workplace Automation in Eldoret",
    metaTitle: "AI Workplace Automation Course | Austra Training Institute",
    description: "Learn about Austra Training Institute’s AI for Workplace Automation short course in Eldoret. Check current availability and course details before applying.",
    intro: "Austra Training Institute has published a guide to its AI for Workplace Automation short course. Check the course catalogue for a current application listing, and confirm availability, duration, entry requirements and fees with admissions.",
    matches: /\bAI\b|artificial intelligence|workplace automation/i,
    article: { href: "/news/ai-skills-future-of-work-8-reasons-to-learn-ai", label: "Read the AI for Workplace Automation course guide" },
  },
} as const;

type ProgrammeSlug = keyof typeof PROGRAMMES;
type PageProps = { params: Promise<{ slug: string }> };

async function getCourses(): Promise<Course[]> {
  const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3300").replace(/\/$/, "");
  try {
    const response = await fetch(`${apiUrl}/course/catalog`, { next: { revalidate: 300 } });
    if (!response.ok) return [];
    return (await response.json()) as Course[];
  } catch (error) {
    console.error("Unable to load courses for programme page:", error);
    return [];
  }
}

function isProgrammeSlug(slug: string): slug is ProgrammeSlug {
  return Object.prototype.hasOwnProperty.call(PROGRAMMES, slug);
}

export function generateStaticParams() {
  return Object.keys(PROGRAMMES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isProgrammeSlug(slug)) return {};
  const programme = PROGRAMMES[slug];
  const canonical = `${SITE_URL}/programmes/${slug}`;

  return {
    title: programme.metaTitle,
    description: programme.description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: INSTITUTE_CONTACT.name,
      title: programme.metaTitle,
      description: programme.description,
    },
  };
}

export default async function ProgrammePage({ params }: PageProps) {
  const { slug } = await params;
  if (!isProgrammeSlug(slug)) notFound();

  const programme = PROGRAMMES[slug];
  const allCourses = await getCourses();
  const courses = allCourses.filter((course) =>
    programme.matches.test(`${course.name} ${course.courseCode} ${course.department?.name ?? ""}`),
  );
  const pageUrl = `${SITE_URL}/programmes/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: programme.title,
    description: programme.description,
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
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <header className="bg-[#0B1F3A] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">
            Austra Training Institute · Eldoret, Kenya
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl">{programme.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg">{programme.intro}</p>
          {"article" in programme && programme.article && (
            <Link href={programme.article.href} className="mt-5 inline-flex min-h-11 items-center font-semibold text-orange-300 underline underline-offset-4 hover:text-orange-200">
              {programme.article.label}
            </Link>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/courses" className="inline-flex min-h-11 items-center rounded-sm bg-orange-400 px-5 py-3 font-bold text-[#0B1F3A] hover:bg-orange-300">Explore all courses</Link>
            <Link href="/apply" className="inline-flex min-h-11 items-center rounded-sm border border-white/50 px-5 py-3 font-bold text-white hover:bg-white/10">Apply online</Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16" aria-labelledby="programme-courses">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-orange-600">Current catalogue</p>
            <h2 id="programme-courses" className="mt-2 text-2xl font-bold text-[#0B1F3A] sm:text-3xl">
              {courses.length ? `Courses in ${programme.title.replace(/ in Eldoret$/i, "")}` : "Check current course availability"}
            </h2>
          </div>
          <p className="text-sm text-slate-600">{courses.length} {courses.length === 1 ? "course listed" : "courses listed"}</p>
        </div>

        {courses.length ? (
          <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <li key={course._id} className="flex flex-col rounded-sm border border-slate-200 bg-white p-5 shadow-sm">
                <p className="font-mono text-xs font-bold tracking-wide text-orange-700">{course.courseCode}</p>
                <h3 className="mt-2 text-lg font-bold text-[#0B1F3A]"><Link className="hover:text-orange-600" href={`/courses/${course._id}`}>{course.name}</Link></h3>
                <p className="mt-2 text-sm text-slate-600">{[course.department?.name, course.level, course.duration].filter(Boolean).join(" · ")}</p>
                <Link className="mt-auto pt-5 text-sm font-bold text-[#0B1F3A] underline decoration-orange-400 underline-offset-4" href={`/apply?course=${encodeURIComponent(course._id)}`}>Apply for this course</Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-7 rounded-sm border border-slate-200 bg-white p-6 text-slate-700">
            <p>We couldn’t find a course record in this category right now. Contact admissions to confirm the current offering.</p>
            <a className="mt-3 inline-flex font-semibold text-[#0B1F3A] underline decoration-orange-400 underline-offset-4" href={INSTITUTE_CONTACT.emailHref}>Email admissions</a>
          </div>
        )}

        <p className="mt-8 max-w-3xl text-sm leading-6 text-slate-600">
          Visit the main campus at {INSTITUTE_CONTACT.campus}. Contact admissions to confirm course availability, fees, entry requirements and the next intake before applying.
        </p>
      </section>
    </main>
  );
}
