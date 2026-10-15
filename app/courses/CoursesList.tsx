"use client";

import { useState, useEffect } from "react";
import { Course } from "@/lib/api/course";
import CourseCard from "./CourseCard";

interface CoursesListProps {
  loading: boolean;
  error: string | null;
  groupedCourses: [string, Course[]][];
  filteredCount: number;
  hasFilters: boolean;
  onClearFilters: () => void;
  onRetry: () => void;
}

const LOADING_MESSAGES = [
  "Fetching the latest course offerings...",
  "Organizing modules and schedules...",
  "Preparing program catalogs...",
  "Almost there, wrapping up final details..."
];

export default function CoursesList({
  loading,
  error,
  groupedCourses,
  filteredCount,
  hasFilters,
  onClearFilters,
  onRetry,
}: CoursesListProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  // Cycle through patient loading messages
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [loading]);

  /* Loading */
  if (loading) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-12 text-center shadow-sm">
        <div className="relative flex h-12 w-12 items-center justify-center">
          <div className="absolute h-full w-full animate-ping rounded-full bg-orange-400/20" />
          <div className="h-10 w-10 animate-spin rounded-full border-3 border-slate-100 border-t-orange-400" />
        </div>

        <div className="mt-5 space-y-1.5">
          <p className="text-base font-semibold text-slate-800 transition-all duration-300">
            {LOADING_MESSAGES[messageIndex]}
          </p>
          <p className="text-xs text-slate-500">
            Thank you for your patience while we gather your information.
          </p>
        </div>
      </div>
    );
  }

  /* Friendly Error State */
  if (error) {
    return (
      <div className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-8 text-left shadow-sm backdrop-blur-sm md:p-10">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 ring-8 ring-amber-100/40">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <div className="flex-1 space-y-1">
            <h2 className="text-lg font-bold text-slate-900">
              We hit a minor snag loading the courses
            </h2>
            <p className="text-sm text-slate-600">
              Don't worry, this is usually temporary. You can try refreshing the connection below or check back in a moment.
            </p>
            {error && (
              <p className="mt-2 text-xs font-mono bg-amber-100/60 text-amber-900 px-3 py-1.5 rounded-md inline-block">
                Details: {error}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 sm:pl-18">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-xs transition-all hover:bg-orange-300 active:scale-[0.98]"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </button>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50 active:scale-[0.98]"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  /* Empty State */
  if (filteredCount === 0) {
    return (
      <div className="flex min-h-87.5 flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-400 ring-8 ring-orange-50/50">
          <svg
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-4.35-4.35m1.35-5.15a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
            />
          </svg>
        </div>

        <h2 className="mt-5 text-lg font-bold text-[#0F172A]">
          No matching courses found
        </h2>

        <p className="mt-1 max-w-sm text-sm text-slate-500">
          We couldn't find any courses matching your current filters or search criteria.
        </p>

        {hasFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-xs transition-all hover:bg-orange-300 hover:shadow-xs active:scale-[0.98]"
          >
            Clear Active Filters
          </button>
        )}
      </div>
    );
  }

  /* Grouped Courses List */
  let cardIndex = 0;

  return (
    <div className="space-y-12">
      {groupedCourses.map(([departmentName, departmentCourses]) => (
        <section key={departmentName} className="space-y-5">
          {/* Department Header */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="h-6 w-1 rounded-full bg-orange-400" />
              <div>
                <h2 className="text-lg font-bold text-[#0F172A]">
                  {departmentName}
                </h2>
                <p className="text-xs font-medium text-slate-500">
                  {departmentCourses.length}{" "}
                  {departmentCourses.length === 1 ? "course available" : "courses available"}
                </p>
              </div>
            </div>

            <div className="hidden h-px flex-1 bg-linear-to-r from-slate-200 to-transparent md:block" />
          </div>

          {/* Course Grid */}
          <div className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-3">
            {departmentCourses.map((course) => {
              const delay = Math.min(cardIndex++ * 0.05, 0.35);

              return (
                <div
                  key={course._id}
                  className="animate-in fade-in slide-in-from-bottom-3 duration-500 fill-mode-backwards"
                  style={{ animationDelay: `${delay}s` }}
                >
                  <CourseCard course={course} />
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}