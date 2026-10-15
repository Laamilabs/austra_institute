"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Building2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Sparkles,
} from "lucide-react";
import { courseApi, type Course } from "@/lib/api/course";

export default function FeaturedCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let isCurrent = true;

    courseApi
      .getFeatured()
      .then((result) => {
        if (isCurrent) setCourses(Array.isArray(result) ? result : []);
      })
      .catch(() => {
        if (isCurrent) setCourses([]);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const visibleCourses = useMemo(() => {
    if (!courses.length) return [];
    const visibleCount = Math.min(courses.length, 3);
    return Array.from({ length: visibleCount }, (_, offset) =>
      courses[(activeIndex + offset) % courses.length],
    );
  }, [courses, activeIndex]);

  const move = (direction: -1 | 1) => {
    setActiveIndex((index) =>
      courses.length ? (index + direction + courses.length) % courses.length : 0,
    );
  };

  const transition = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 280, damping: 28 };

  return (
    <section
      aria-labelledby="featured-courses-title"
      className="w-full px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-6 2xl:px-24"
    >
      <div className="mx-auto max-w-[1760px]">
        <div className="mb-8 flex flex-col gap-5 border-b border-slate-200 pb-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.19em] text-slate-500">
              <span aria-hidden="true" className="h-0.5 w-6 bg-[#ef7d22]" />
              Learn with Austra
            </p>
           
          </div>
          <Link
            href="/courses"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-xl bg-[#0b1f3a] px-4 py-3 text-xs font-bold text-white transition-colors hover:bg-[#173456] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 sm:self-auto"
          >
            Browse all courses <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6" aria-label="Loading featured courses">
            {[0, 1, 2].map((item) => (
              <div key={item} className={`${item === 1 ? "hidden sm:block" : ""} ${item === 2 ? "hidden lg:block" : ""} animate-pulse rounded-2xl border border-slate-200 bg-white p-6`}>
                <div className="h-10 w-10 rounded-xl bg-slate-100" />
                <div className="mt-6 h-3 w-24 rounded bg-slate-100" />
                <div className="mt-3 h-6 w-3/4 rounded bg-slate-100" />
                <div className="mt-5 h-4 w-1/2 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        ) : courses.length ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            <AnimatePresence initial={false} mode="popLayout">
              {visibleCourses.map((course, index) => (
                <motion.article
                  layout
                  key={course._id}
                  initial={{ opacity: 0, x: reduceMotion ? 0 : 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: reduceMotion ? 0 : -24 }}
                  transition={transition}
                  className={`${index === 1 ? "hidden sm:block" : ""} ${index === 2 ? "hidden lg:block" : ""} group relative flex min-h-[280px] min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_40px_-30px_rgba(11,31,58,0.45)] transition-colors hover:border-orange-200 sm:p-6`}
                >
                  <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full border border-orange-100 transition-transform duration-500 group-hover:scale-110" />
                  <div className="relative flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 font-mono text-[10px] font-bold tracking-wide text-[#0b1f3a]">
                      <BookOpen size={13} className="text-[#ef7d22]" aria-hidden="true" />
                      {course.courseCode}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#c3661f]">
                      <Sparkles size={13} aria-hidden="true" /> Featured
                    </span>
                  </div>

                  <div className="relative mt-7 flex-1">
                    <h3 className="text-xl font-semibold leading-snug tracking-[-0.04em] text-[#0b1f3a] sm:text-2xl">
                      <Link
                        href={`/courses/${course._id}`}
                        className="rounded-sm outline-none transition-colors hover:text-[#c3661f] focus-visible:ring-2 focus-visible:ring-orange-400"
                      >
                        {course.name}
                      </Link>
                    </h3>
                    {course.description && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                        {course.description}
                      </p>
                    )}
                  </div>

                  <div className="relative mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-xs font-medium text-slate-600">
                    {course.department?.name && (
                      <span className="inline-flex items-center gap-1.5">
                        <Building2 size={14} className="text-[#ef7d22]" aria-hidden="true" />
                        {course.department.name}
                      </span>
                    )}
                    {course.level && (
                      <span className="rounded-full bg-[#0b1f3a] px-3 py-1 text-[10px] font-bold text-white">
                        {course.level}
                      </span>
                    )}
                    {course.duration && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 size={14} className="text-[#ef7d22]" aria-hidden="true" />
                        {course.duration}
                      </span>
                    )}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 text-center sm:py-14">
            <BookOpen className="mx-auto text-[#ef7d22]" size={28} aria-hidden="true" />
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-[#0b1f3a]">
              Explore courses at Austra
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">
              Browse the full catalogue to find a programme that fits your goals.
            </p>
            <Link href="/courses" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-[#0b1f3a] hover:text-[#c3661f]">
              View all courses <ArrowRight size={15} className="text-[#ef7d22]" aria-hidden="true" />
            </Link>
          </div>
        )}

        {!isLoading && courses.length > 1 && (
          <div className="mt-6 flex items-center justify-between gap-4">
            <p className="text-xs font-medium text-slate-500" aria-live="polite">
              {String(activeIndex + 1).padStart(2, "0")} <span className="px-1 text-orange-500">/</span> {String(courses.length).padStart(2, "0")} featured courses
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label="Show previous featured courses"
                className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-[#0b1f3a] transition-colors hover:border-orange-300 hover:text-[#c3661f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label="Show next featured courses"
                className="grid h-10 w-10 place-items-center rounded-full bg-[#0b1f3a] text-white transition-colors hover:bg-[#173456] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
