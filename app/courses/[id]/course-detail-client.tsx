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
                                className="rounded-xl bg-[#0B1E3D] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#18365f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
                            >
                                Try Again
                            </button>
                            <Link
                                href="/courses"
                                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
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
                    {/* Hero */}
                    <div className="cd-fade-in border-b-2 border-orange-400 bg-[#0B1E3D]">
                        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:px-8 md:py-14">
                            {/* Breadcrumb */}
                            <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#D5DCE8]">
                                <Link
                                    href="/courses"
                                    className="transition-colors hover:text-orange-400"
                                >
                                    Courses
                                </Link>

                                <span>/</span>

                                {course.department?.name && (
                                    <>
                                        <span>{course.department.name}</span>
                                        <span>/</span>
                                    </>
                                )}

                                <span className="font-medium text-orange-400">
                                    {course.courseCode}
                                </span>
                            </nav>

                            {/* Badges */}
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold tracking-wide text-white">
                                    {course.courseCode}
                                </span>

                                <span className="rounded-full bg-orange-400 px-3 py-1.5 text-xs font-semibold text-[#0B1E3D]">
                                    {course.level}
                                </span>

                                {course.featured && (
                                    <span className="rounded-full border border-orange-400/40 bg-orange-400/10 px-3 py-1.5 text-xs font-medium text-orange-300">
                                        Featured Course
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-[1.08] tracking-[-0.025em] text-white md:text-5xl">
                                {course.name}
                            </h1>

                            {/* Department */}
                            {course.department?.name && (
                                <p className="mt-3 flex flex-col gap-1 text-sm text-[#AEB9CC] md:flex-row">
                                    Offered by{" "}
                                    <span className="font-medium text-white underline decoration-orange-400 underline-offset-4">
                                        The School of {course.department.name}
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Body */}
                    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:px-8 md:py-12">
                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* Main Content */}
                            <div className="order-2 space-y-6 lg:order-1 lg:col-span-2">
                                {/* Prerequisites Section */}
                                {course.prerequisites && (
                                    <section className="cd-fade-up rounded-2xl border border-[#E2E5EA] border-t-4 border-t-[#0B1E3D] bg-white p-6 shadow-sm md:p-8">
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
                                <section className="cd-fade-up rounded-2xl border border-[#E2E5EA] border-t-4 border-t-[#0B1E3D] bg-white p-6 shadow-sm md:p-8">
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
                                    {/* Course Overview Card */}
                                    <section className="rounded-2xl border border-[#E2E5EA] border-t-4 border-t-orange-400 bg-white p-6 shadow-sm">
                                        <h2 className="flex items-center gap-2 text-base font-bold text-[#0B1E3D]">
                                            
                                            Course details
                                        </h2>

                                        <dl className="mt-4 grid grid-cols-2 gap-3">
                                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                                                <dt className="text-[10px] font-medium uppercase tracking-wide text-[#7C8AA3]">
                                                    Course Code
                                                </dt>
                                                <dd className="mt-0.5 text-sm font-bold text-[#0B1E3D]">
                                                    {course.courseCode}
                                                </dd>
                                            </div>

                                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                                                <dt className="text-[10px] font-medium uppercase tracking-wide text-[#7C8AA3]">
                                                    Level
                                                </dt>
                                                <dd className="mt-0.5 text-sm font-bold text-[#0B1E3D]">
                                                    {course.level}
                                                </dd>
                                            </div>

                                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                                                <dt className="text-[10px] font-medium uppercase tracking-wide text-[#7C8AA3]">
                                                    Department
                                                </dt>
                                                <dd className="mt-0.5 text-sm font-bold text-[#0B1E3D]">
                                                    {course.department?.name || "Unassigned"}
                                                </dd>
                                            </div>

                                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                                                <dt className="text-[10px] font-medium uppercase tracking-wide text-[#7C8AA3]">
                                                    Duration
                                                </dt>
                                                <dd className="mt-0.5 text-sm font-bold text-[#0B1E3D]">
                                                    {course.duration || "N/A"}
                                                </dd>
                                            </div>
                                        </dl>
                                    </section>

                                    {/* Action Card */}
                                    <div className="rounded-2xl border border-[#E2E5EA] border-t-4 border-t-orange-400 bg-white p-6 shadow-sm">
                                        <h3 className="text-base font-bold text-[#0B1E3D]">
                                            Ready to apply?
                                        </h3>

                                        <p className="mt-2 text-sm leading-relaxed text-[#5B6472]">
                                            Start your online application for this course. We’ll preselect it on the form. Contact admissions on WhatsApp with questions about schedules or entry requirements.
                                        </p>

                                        <Link
                                            href={`/apply?course=${encodeURIComponent(course._id)}`}
                                            className="mt-5 flex w-full items-center justify-center rounded-xl bg-orange-400 px-4 py-3 text-sm font-bold text-[#0B1E3D] transition-colors hover:bg-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1E3D] focus-visible:ring-offset-2 active:scale-[0.99]"
                                        >
                                            Enroll now
                                        </Link>

                                        <a
                                            href={whatsappUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-[3px] border border-[#0B1E3D] bg-white px-4 py-2.5 text-sm font-semibold text-[#0B1E3D] transition-all hover:bg-[#0B1E3D] hover:text-white"
                                        >
                                            Ask admissions on WhatsApp
                                        </a>
                                    </div>

                                    <Link
                                        href="/courses"
                                        className="block shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-[#0B1E3D] shadow-sm transition-colors hover:border-orange-400 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
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
