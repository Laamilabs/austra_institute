"use client";

import Link from "next/link";
import { Course } from "@/lib/api/course";

interface CourseCardProps {
    course: Course;
    animationDelay?: number;
}

export default function CourseCard({
    course,
    animationDelay = 0,
}: CourseCardProps) {
    return (
        <article
            className="group relative flex flex-col justify-between rounded-md border border-slate-200 bg-white/40 p-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-400 hover:shadow-md"
            style={{ animationDelay: `${animationDelay}s` }}
        >
            <div>
                {/* Top Header: Code & Featured Badge */}
                <div className="flex items-center justify-between gap-2">
                    <span className="rounded-sm bg-slate-100 px-2 py-0.5 font-mono text-xs font-bold tracking-wider text-[#0F172A]">
                        {course.courseCode}
                    </span>

                    {course.featured && (
                        <span className="inline-flex items-center gap-1 rounded-sm bg-orange-50 px-2 py-0.5 text-[11px] font-semibold text-orange-600 ring-1 ring-inset ring-orange-500/20">
                            <svg className="h-3 w-3 fill-orange-500" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            Featured
                        </span>
                    )}
                </div>

                {/* Course Title */}
                <h3 className="mt-2.5 text-sm font-bold leading-snug text-[#0F172A] transition-colors group-hover:text-orange-600">
                    <Link
                        href={`/courses/${course._id}`}
                        className="focus:outline-none"
                    >
                        <span className="absolute inset-0" aria-hidden="true" />
                        {course.name}
                    </Link>
                </h3>
            </div>

            {/* Footer Meta: Level Badge */}
            <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-2.5">
                <span className="rounded-sm bg-[#0F172A] px-2 py-0.5 text-[11px] font-semibold text-white">
                    {course.level}
                </span>

                <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 transition-colors group-hover:text-orange-500">
                    View Details
                    <svg
                        className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </span>
            </div>
        </article>
    );
}