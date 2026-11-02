"use client";

import Link from "next/link";
import { ArrowRight, Building2, Clock3, GraduationCap } from "lucide-react";
import type { Course } from "@/lib/api/course";

export default function FeaturedCourses({ initialCourses }: { initialCourses: Course[] }) {
  const courses = initialCourses;

  return (
    <section
      aria-labelledby="featured-courses-title"
      className="relative w-full overflow-hidden bg-linear-to-b from-slate-50 via-white to-slate-50 px-5 py-14 sm:px-8 sm:py-16 lg:px-12"
    >
      {/* Mica-style soft glows */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#082B66]/6 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-orange-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-8xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-start gap-3.5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-600">Find your next step</p>
              <h2 id="featured-courses-title" className="mt-1 text-2xl font-semibold tracking-tight text-[#082B66] sm:text-3xl">
                Featured courses
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Practical training in caregiving, health support, business technology and ICT at our Eldoret campus.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 sm:justify-end">
            <Link
              href="/programmes"
              className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-[#082B66] shadow-sm transition-all hover:border-orange-400 hover:bg-orange-50 hover:text-orange-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
            >
              Explore our programmes <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-[#082B66] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#0B3A85] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
            >
              View all courses <ArrowRight size={15} className="text-orange-400" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {courses.length ? (
          <div className="group/carousel relative overflow-hidden py-2" aria-label="Featured courses">
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-slate-50 to-transparent sm:w-16" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-slate-50 to-transparent sm:w-16" />

            <div className="flex w-max animate-course-scroll group-hover/carousel:[animation-play-state:paused] group-focus-within/carousel:[animation-play-state:paused] motion-reduce:animate-none">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
                  {courses.map((course, index) => (
                    <article
                      key={`${copy}-${course._id}`}
                      className="group/card relative mr-4 flex h-64 w-[min(82vw,330px)] shrink-0 flex-col justify-between overflow-hidden rounded-sm border border-slate-200/90 bg-white/90 p-5 shadow-[0_1px_2px_rgba(8,43,102,0.06)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-[0_8px_24px_-8px_rgba(8,43,102,0.25)] sm:mr-5 sm:h-72 sm:w-87.5 sm:p-6"
                    >
                      {/* Accent bar */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-[0.18] bg-linear-to-r from-orange-400 to-orange-500 transition-transform duration-300 group-hover/card:scale-x-100"
                      />

                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2 text-[11px] font-medium text-slate-500">
                          <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-sm bg-[#082B66]/[0.07] font-mono text-[10px] font-bold text-[#082B66]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          Course
                        </span>
                        {course.courseCode && (
                          <span className="rounded-sm bg-orange-50 px-2.5 py-1 font-mono text-[10px] font-bold text-orange-700 ring-1 ring-inset ring-orange-200">
                            {course.courseCode}
                          </span>
                        )}
                      </div>

                      <div className="py-3">
                        <h3 className="text-xl font-semibold leading-snug tracking-tight text-[#082B66] sm:text-[22px]">
                          <Link
                            href={`/courses/${course._id}`}
                            tabIndex={copy === 1 ? -1 : undefined}
                            className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-orange-400"
                          >
                            {course.name}
                          </Link>
                        </h3>
                        {course.description && (
                          <p className="mt-2.5 line-clamp-2 text-sm leading-6 text-slate-600">{course.description}</p>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-3.5 text-xs font-medium text-slate-700">
                        {course.department?.name && (
                          <span className="inline-flex items-center gap-1.5 rounded-sm bg-slate-100/80 px-2 py-1">
                            <Building2 size={13} className="text-orange-500" aria-hidden="true" />
                            {course.department.name}
                          </span>
                        )}
                        {course.level && (
                          <span className="inline-flex items-center gap-1.5 rounded-sm bg-slate-100/80 px-2 py-1">
                            <GraduationCap size={14} className="text-orange-500" aria-hidden="true" />
                            {course.level}
                          </span>
                        )}
                        {course.duration && (
                          <span className="inline-flex items-center gap-1.5 rounded-sm bg-slate-100/80 px-2 py-1">
                            <Clock3 size={13} className="text-orange-500" aria-hidden="true" />
                            {course.duration}
                          </span>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-xl rounded-sm border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
            <h3 className="mt-4 text-xl font-semibold text-[#082B66]">Explore courses at Austra</h3>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">
              Browse programmes and the full catalogue to find a path that fits your goals.
            </p>
            <Link
              href="/programmes"
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-sm bg-[#082B66] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#0B3A85] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
            >
              Explore our programmes <ArrowRight size={15} className="text-orange-400" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes course-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-course-scroll { animation: course-scroll 58s linear infinite; will-change: transform; }
        @media (prefers-reduced-motion: reduce) { .animate-course-scroll { animation: none; } }
      `}</style>
    </section>
  );
}