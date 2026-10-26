"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { courseApi, type Course } from "@/lib/api/course";

export default function CourseDetailClient({
    courseId,
    initialCourse,
}: {
    courseId: string;
    initialCourse: Course | null;
}) {
    const [course, setCourse] = useState<Course | null>(initialCourse);
    const [loading, setLoading] = useState(!initialCourse);
    const [error, setError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        if (!courseId) return;
        if (initialCourse) {
            setCourse(initialCourse);
            setLoading(false);
            return;
        }

        const loadCourse = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await courseApi.getById(courseId);
                setCourse(data);
            } catch (err) {
                console.error("Failed to load course:", err);
                setError("Failed to load course. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadCourse();
    }, [courseId, initialCourse, retryCount]);

    // Construct WhatsApp message dynamically
    const whatsappNumber = "254703710401"; // Formatted with country code
    const whatsappMessage = course
        ? encodeURIComponent(
            `Hello! I would like to learn more about the course: ${course.name} (${course.courseCode}).`
        )
        : "";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <main aria-busy={loading} className="min-h-screen bg-slate-50">
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .cd-fade-in { animation: fadeIn 0.5s ease-out both; }
                .cd-fade-up { animation: fadeInUp 0.45s ease-out both; }
                @media (prefers-reduced-motion: reduce) {
                    .cd-fade-in, .cd-fade-up { animation: none; }
                }

                /* Custom HTML content styling for course description */
                .course-description-content h1, 
                .course-description-content h2, 
                .course-description-content h3 {
                    color: #0B1E3D;
                    font-weight: 700;
                    margin-top: 1.25rem;
                    margin-bottom: 0.5rem;
                }
                .course-description-content p {
                    margin-bottom: 0.75rem;
                    line-height: 1.6;
                }
                .course-description-content ul {
                    list-style-type: disc;
                    padding-left: 1.25rem;
                    margin-bottom: 0.75rem;
                }
                .course-description-content ol {
                    list-style-type: decimal;
                    padding-left: 1.25rem;
                    margin-bottom: 0.75rem;
                }
                .course-description-content li {
                    margin-bottom: 0.25rem;
                }
                .course-description-content a {
                    color: #f97316;
                    text-decoration: underline;
                }
            `}</style>

            {/* Loading */}
            {loading && (
                <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:px-8 md:py-14">
                    <div role="status" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
                        <span className="text-sm font-semibold text-[#0B1E3D]">Loading course details…</span>
                        <div aria-hidden="true" className="mt-6 grid gap-5 lg:grid-cols-3">
                            <div className="space-y-4 lg:col-span-2">
                                <div className="h-40 rounded-2xl bg-slate-100" />
                                <div className="h-56 rounded-2xl bg-slate-100" />
                            </div>
                            <div className="h-72 rounded-2xl bg-slate-100" />
                        </div>
                    </div>
                </div>
            )}
            {/* Error */}
            {!loading && error && (
                <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:px-8 md:py-16">
                    <div className="rounded-2xl border border-red-200 border-t-4 border-t-red-600 bg-red-50 p-6 shadow-sm">
                        <h2 className="font-semibold text-[#0B1E3D]">
                            Unable to load course
                        </h2>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">{error}</p>
                        <div className="mt-4 flex gap-3">
                            <button
                                type="button"
                                onClick={() => setRetryCount((count) => count + 1)}
                                className="rounded-sm bg-[#0B1E3D] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#18365f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
                            >
                                Try Again
                            </button>
                            <Link
                                href="/courses"
                                className="rounded-sm border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
                            >
                                Back to Courses
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Course Detail */}
            {!loading && !error && course && (
                <>
                    {/* Course hero */}
                    <header className="cd-fade-in relative isolate overflow-hidden border-b-4 border-orange-400 bg-[#0B1E3D] text-white">
                        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_25%,rgba(249,115,22,0.18),transparent_35%),linear-gradient(120deg,#0B1E3D_0%,#10294D_60%,#0B1E3D_100%)]" />
                        <div aria-hidden="true" className="absolute -right-28 top-16 hidden h-[34rem] w-[34rem] rounded-full border border-white/10 md:block">
                            <div className="absolute inset-8 rounded-full border border-white/10" />
                            <div className="absolute inset-20 rounded-full border border-white/10" />
                        </div>
                        <div className="relative mx-auto max-w-7xl px-5 py-9 sm:px-8 md:py-14 lg:px-10">
                            <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-2 text-sm text-slate-300">
                                <Link href="/courses" className="transition-colors hover:text-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400">
                                    Courses
                                </Link>
                                <span aria-hidden="true" className="text-slate-500">/</span>
                                {course.department?.name && (
                                    <>
                                        <span>{course.department.name}</span>
                                        <span aria-hidden="true" className="text-slate-500">/</span>
                                    </>
                                )}
                                <span className="font-medium text-orange-300">{course.courseCode}</span>
                            </nav>

                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
                                Austra Training Institute <span className="px-1 text-white/50">·</span> Eldoret, Kenya
                            </p>
                            <div className="mt-5 flex flex-wrap items-center gap-2">
                                <span className="rounded-sm border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white">
                                    {course.courseCode}
                                </span>
                                <span className="rounded-sm bg-orange-400 px-3.5 py-1.5 text-xs font-bold text-[#0B1E3D]">
                                    {course.level}
                                </span>
                                {course.featured && (
                                    <span className="rounded-sm border border-orange-300/40 bg-orange-300/10 px-3.5 py-1.5 text-xs font-semibold text-orange-200">
                                        Featured course
                                    </span>
                                )}
                            </div>
                            <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-[1.04] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl">
                                {course.name}
                            </h1>
                            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 md:text-lg">
                                {course.department?.name
                                    ? `Offered by the School of ${course.department.name}. Explore the course details and entry requirements below.`
                                    : "Explore the course details and entry requirements below."}
                            </p>
                        </div>
                    </header>
                    {/* Course snapshot and details */}
                    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 md:px-8 md:pb-16">
                        <section aria-label="Course at a glance" className="relative z-10 -mt-5 grid grid-cols-2 overflow-hidden rounded-sm border border-slate-200 bg-white shadow-[0_18px_50px_-32px_rgba(15,23,42,0.45)] sm:grid-cols-4">
                            <div className="border-b border-r border-slate-100 p-4 sm:border-b-0 sm:p-5">
                                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">Course code</p>
                                <p className="mt-2 text-base font-bold text-[#0B1E3D]">{course.courseCode}</p>
                            </div>
                            <div className="border-b border-slate-100 p-4 sm:border-b-0 sm:border-r sm:p-5">
                                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">Level</p>
                                <p className="mt-2 text-base font-bold text-[#0B1E3D]">{course.level}</p>
                            </div>
                            <div className="border-r border-slate-100 p-4 sm:p-5">
                                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">School</p>
                                <p className="mt-2 text-base font-bold text-[#0B1E3D]">{course.department?.name || "Austra Institute"}</p>
                            </div>
                            <div className="p-4 sm:p-5">
                                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">Duration</p>
                                <p className="mt-2 text-base font-bold text-[#0B1E3D]">{course.duration || "Contact admissions"}</p>
                            </div>
                        </section>
                        <div className="mt-8 grid gap-6 lg:grid-cols-3 lg:gap-8">
                            {/* Main Content */}
                            <div className="order-2 space-y-6 lg:order-1 lg:col-span-2">
                                {/* Prerequisites Section */}
                                {course.prerequisites && (
                                    <section className="cd-fade-up rounded-sm border border-[#E2E5EA] border-t-4 border-t-[#0B1E3D] bg-white p-6 shadow-sm md:p-8">
                                        <h2 className="flex items-center gap-2 text-lg font-bold text-[#0B1E3D]">
                                            <span className="h-2 w-2 bg-orange-400"></span>
                                            Requirements & Prerequisites
                                        </h2>

                                        <p className="mt-4 text-sm leading-relaxed text-[#5B6472]">
                                            {course.prerequisites}
                                        </p>
                                    </section>
                                )}

                                {/* About Section */}
                                <section className="cd-fade-up rounded-sm border border-[#E2E5EA] border-t-4 border-t-[#0B1E3D] bg-white p-6 shadow-sm md:p-8">
                                    <h2 className="flex items-center gap-2 text-lg font-bold text-[#0B1E3D]">
                                        <span className="h-2 w-2 bg-orange-400"></span>
                                        About This Course
                                    </h2>

                                    {course.description ? (
                                        <div
                                            className="course-description-content mt-5 text-base leading-relaxed text-[#4B5563]"
                                            dangerouslySetInnerHTML={{ __html: course.description }}
                                        />
                                    ) : (
                                        <p className="mt-4 text-sm leading-relaxed text-[#5B6472]">
                                            No description available for this course yet.
                                        </p>
                                    )}
                                </section>
                            </div>

                            {/* Sidebar / CTA */}
                            <aside className="order-1 lg:order-2 lg:col-span-1">
                                <div className="cd-fade-up flex flex-col space-y-4 pr-1 lg:sticky lg:top-28">
                                    {/* Action Card */}
                                    <div className="rounded-sm border border-[#18365f] bg-gradient-to-br from-[#10294D] to-[#0B1E3D] p-6 text-white shadow-[0_20px_60px_-28px_rgba(11,30,61,0.65)]">
                                        <h3 className="text-xl font-bold tracking-tight text-white">
                                            Ready to apply?
                                        </h3>

                                        <p className="mt-2 text-sm leading-relaxed text-slate-200">
                                            Start your online application for this course. We’ll preselect it on the form. Contact admissions on WhatsApp with questions about schedules or entry requirements.
                                        </p>

                                        <Link
                                            href={`/apply?course=${encodeURIComponent(course._id)}`}
                                            className="mt-6 flex w-full items-center justify-center rounded-sm bg-orange-400 px-4 py-3.5 text-sm font-bold text-[#0B1E3D] shadow-lg shadow-black/15 transition-colors hover:bg-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1E3D] active:scale-[0.99]"
                                        >
                                            Enroll now
                                        </Link>

                                        <a
                                            href={whatsappUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-3 flex w-full items-center justify-center gap-2 rounded-sm border border-white/30 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1E3D]"
                                        >
                                            Ask admissions on WhatsApp
                                        </a>
                                    </div>

                                    <Link
                                        href="/courses"
                                        className="block shrink-0 rounded-sm border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-[#0B1E3D] shadow-sm transition-colors hover:border-orange-400 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
                                    >
                                        &larr; Back to all courses
                                    </Link>
                                </div>
                            </aside>
                        </div>
                    </div>
                </>
            )}
        </main>
    );
}
