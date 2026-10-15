"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  Clock3,
  RefreshCw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { departmentApi, type Department } from "@/lib/api/department";
import { courseApi, type Course } from "@/lib/api/course";

interface PageProps {
  params: Promise<{ id: string }>;
}

const SCHOOL_IMAGES: Record<string, string> = {
  "6a9a88a9470df0ddc0bb2130": "/schools/music.png",
  "6a2811becb8d971a933edc67": "/schools/health.jpg",
  "6a281bc2cb8d971a933edcca": "/schools/code.jpg",
  "6a9a8872470df0ddc0bb2122": "/schools/edu.jpg",
  "6a29581acb8d971a933ee4cb": "/schools/hospitality.jpg",
  "6a281afdcb8d971a933edcac": "/schools/business.jpg",
};

export default function SchoolDetailsPage({ params }: PageProps) {
  const { id } = use(params);
  const [department, setDepartment] = useState<Department | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");

  useEffect(() => {
    let isCurrent = true;

    async function fetchSchoolData() {
      setLoading(true);
      setError(null);
      try {
        const [deptResponse, coursesResponse] = await Promise.all([
          departmentApi.getById(id),
          courseApi.getByDepartment(id),
        ]);
        if (isCurrent) {
          setDepartment(deptResponse);
          setCourses(coursesResponse);
        }
      } catch (err: unknown) {
        if (!isCurrent) return;
        const response =
          typeof err === "object" && err !== null && "response" in err
            ? (err as { response?: { data?: { message?: string } } }).response
            : undefined;
        setError(response?.data?.message || "Failed to load school details.");
      } finally {
        if (isCurrent) setLoading(false);
      }
    }

    fetchSchoolData();
    return () => {
      isCurrent = false;
    };
  }, [id]);

  const levels = useMemo(
    () => Array.from(new Set(courses.map((course) => course.level).filter(Boolean))).sort(),
    [courses],
  );

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
      const searchable = [
        course.name,
        course.courseCode,
        course.level,
        course.description,
        course.prerequisites,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return matchesLevel && (!query || searchable.includes(query));
    });
  }, [courses, search, selectedLevel]);

  if (loading) {
    return (
      <main className="flex min-h-[65vh] w-full items-center justify-center bg-slate-50 px-5">
        <div className="flex flex-col items-center gap-4 rounded-sm border border-slate-200 bg-white px-10 py-8 text-center">
          <div className="h-9 w-9 animate-spin rounded-sm border-4 border-orange-500 border-t-transparent" />
          <p className="text-sm font-semibold text-slate-600">Loading school details...</p>
        </div>
      </main>
    );
  }

  if (error || !department) {
    return (
      <main className="flex min-h-[65vh] w-full flex-col items-center justify-center bg-slate-50 px-5 text-center">
        <div className="w-full max-w-xl rounded-sm border border-slate-200 bg-white p-8 sm:p-12">
          <Building2
            className="mx-auto text-orange-500"
            size={32}
            aria-hidden="true"
          />

          <h1 className="mt-4 text-2xl font-bold text-[#0B1F3A]">
            Something went wrong
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            We couldn&apos;t load the school details right now. This may be a
            temporary issue. Please try refreshing the page.
          </p>

          {error && (
            <p className="mt-3 text-xs leading-5 text-slate-400">
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#0B1F3A] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-500 sm:w-auto"
            >
              <RefreshCw size={16} aria-hidden="true" />
              Try again
            </button>

            <Link
              href="/schools"
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-slate-200 px-5 py-3 text-sm font-bold text-[#0B1F3A] transition-colors hover:border-orange-500 hover:text-orange-500 sm:w-auto"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to all schools
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const schoolImage = SCHOOL_IMAGES[id];
  const courseCount = courses.length;

  return (
    <main className="min-h-screen w-full bg-slate-50 pb-16 sm:pb-20">
      <section className="px-4 pt-5 sm:px-6 sm:pt-8 lg:px-10 2xl:px-14">
        <div className="relative isolate mx-auto flex min-h-97.5 max-w-[1760px] items-end overflow-hidden rounded-sm bg-[#0B1F3A] sm:min-h-[460px] lg:min-h-[510px]">
          {schoolImage && (
            <Image
              src={schoolImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="-z-20 object-cover object-center"
            />
          )}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-[#071626]/95 via-[#0B1F3A]/80 to-[#0B1F3A]/35" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-[#071626]/75 via-transparent to-[#071626]/15" />

          <div className="relative z-10 w-full p-6 sm:p-9 lg:p-14 2xl:p-16">
            <Link
              href="/schools"
              className="mb-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white/80 transition-colors hover:text-orange-300 sm:mb-14"
            >
              <ArrowLeft size={15} aria-hidden="true" /> All schools
            </Link>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-4xl">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-orange-300 sm:text-xs">
                  Austra Training Institute · Academic school
                </p>
                <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl 2xl:text-7xl">
                  {department.name}
                </h1>
                {department.description && (
                  <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-100/90 sm:text-base sm:leading-8">
                    {department.description}
                  </p>
                )}
                <Link
                  href="/courses"
                  className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-sm bg-orange-500 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F3A]"
                >
                  Explore all courses <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>

              <div className="flex shrink-0 items-center gap-4 self-start border border-white/25 bg-[#0B1F3A]/40 p-4 text-white backdrop-blur-sm lg:self-end lg:p-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-sm border border-white/25 bg-white/10">
                  <BookOpen size={22} className="text-orange-300" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-2xl font-extrabold text-orange-300">{courseCount}</span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-white/85">
                    {courseCount === 1 ? "Programme" : "Programmes"}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1760px] px-4 pt-12 sm:px-6 sm:pt-16 lg:px-10 lg:pt-20 2xl:px-14">
        <div className="mb-7 flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-orange-600">Explore the school</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.04em] text-[#0B1F3A] sm:text-3xl lg:text-4xl">
              Available courses
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Search and filter programmes offered by {department.name}.
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-sm border border-[#0B1F3A] px-4 py-3 text-xs font-bold text-[#0B1F3A] transition-colors hover:border-orange-500 hover:bg-orange-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 sm:self-auto"
          >
            View all courses <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="mb-7 grid gap-3 rounded-sm border border-slate-200 bg-white p-3 sm:grid-cols-[minmax(0,1fr)_minmax(190px,260px)] sm:p-4">
          <label className="flex min-h-12 min-w-0 items-center gap-3 border border-slate-200 bg-slate-50 px-4 text-slate-500 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100">
            <Search size={17} className="shrink-0 text-orange-500" aria-hidden="true" />
            <span className="sr-only">Search courses</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by course name, code or keyword"
              className="w-full min-w-0 bg-transparent text-sm text-[#0B1F3A] outline-none placeholder:text-slate-400"
            />
          </label>
          <label className="flex min-h-12 items-center gap-3 border border-slate-200 bg-slate-50 px-4 text-slate-500 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100">
            <SlidersHorizontal size={16} className="shrink-0 text-orange-500" aria-hidden="true" />
            <span className="sr-only">Filter courses by level</span>
            <select
              value={selectedLevel}
              onChange={(event) => setSelectedLevel(event.target.value)}
              className="w-full min-w-0 cursor-pointer bg-transparent text-sm text-[#0B1F3A] outline-none"
            >
              <option value="all">All levels</option>
              {levels.map((level) => <option key={level} value={level}>{level}</option>)}
            </select>
          </label>
        </div>

        <div className="mb-5 flex items-center justify-between gap-4 text-xs text-slate-500" aria-live="polite">
          <span>{filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"} found</span>
          {(search || selectedLevel !== "all") && (
            <button
              type="button"
              onClick={() => { setSearch(""); setSelectedLevel("all"); }}
              className="font-bold text-[#0B1F3A] underline decoration-orange-400 underline-offset-4 hover:text-orange-600"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredCourses.length === 0 ? (
          <div className="border border-slate-200 bg-white px-6 py-14 text-center sm:py-20">
            <Search className="mx-auto text-orange-500" size={28} aria-hidden="true" />
            <h3 className="mt-4 text-lg font-bold text-[#0B1F3A]">
              {courses.length ? "No matching courses" : "No courses listed yet"}
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              {courses.length ? "Try another search term or choose a different level." : "Check back soon or browse the complete course catalogue."}
            </p>
            <Link href="/courses" className="mt-5 inline-flex items-center gap-2 rounded-sm bg-[#0B1F3A] px-4 py-3 text-xs font-bold text-white transition-colors hover:bg-orange-500">
              Browse all courses <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-5">
            {filteredCourses.map((course) => (
              <article
                key={course._id}
                className="group flex min-w-0 flex-col border border-slate-200 bg-white p-5 shadow-[0_10px_35px_-30px_rgba(11,31,58,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md sm:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  {course.courseCode && (
                    <span className="border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wide text-[#0B1F3A]">
                      {course.courseCode}
                    </span>
                  )}
                  {course.level && (
                    <span className="bg-orange-50 px-2.5 py-1 text-[10px] font-bold text-orange-700">
                      {course.level}
                    </span>
                  )}
                </div>

                <h3 className="mt-5 text-lg font-bold leading-snug text-[#0B1F3A] transition-colors group-hover:text-orange-600 sm:text-xl">
                  {course.name}
                </h3>
                {course.description && (
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {course.description}
                  </p>
                )}
                {course.prerequisites && (
                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    <span className="font-bold text-slate-700">Prerequisites: </span>
                    {course.prerequisites}
                  </p>
                )}

                <div className="mt-auto flex min-h-12 items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  {course.duration ? (
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
                      <Clock3 size={14} className="text-orange-500" aria-hidden="true" />
                      {course.duration}
                    </span>
                  ) : <span />}
                  <Link
                    href={`/courses/${course._id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1F3A] transition-colors hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                  >
                    Course details <ArrowRight size={14} className="text-orange-500" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}