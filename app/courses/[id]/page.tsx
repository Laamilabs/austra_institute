"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { courseApi, Course } from "@/lib/api/course";

export default function CourseDetailPage() {
    const params = useParams();
    const courseId = params?.id as string;

    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!courseId) return;

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
    }, [courseId]);

    // Construct WhatsApp message dynamically
    const whatsappNumber = "254703710401"; // Formatted with country code
    const whatsappMessage = course
        ? encodeURIComponent(
            `Hello! I would like to learn more about the course: ${course.name} (${course.courseCode}).`
        )
        : "";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <main className="min-h-screen bg-[#F5F6F8]">
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
                <div className="mx-auto max-w-400 px-6 py-20 md:px-8">
                    <div className="rounded-[3px] border border-[#E2E5EA] border-t-4 border-t-orange-400 bg-white p-12 text-center shadow-sm">
                        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-[#E2E5EA] border-t-orange-400" />
                        <p className="text-sm font-medium text-[#0B1E3D]">
                            Loading course details...
                        </p>
                    </div>
                </div>
            )}

            {/* Error */}
            {!loading && error && (
                <div className="mx-auto max-w-400 px-6 py-20 md:px-8">
                    <div className="rounded-[3px] border border-red-200 border-t-4 border-t-red-600 bg-red-50 p-6 shadow-sm">
                        <h2 className="font-semibold text-red-800">
                            Unable to load course
                        </h2>
                        <p className="mt-1 text-sm text-red-600">{error}</p>
                        <div className="mt-4 flex gap-3">
                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="rounded-[3px] bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                            >
                                Try Again
                            </button>
                            <Link
                                href="/courses"
                                className="rounded-[3px] border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
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
                        <div className="mx-auto max-w-400 px-6 py-14 md:px-8 md:py-16">
                            {/* Breadcrumb */}
                            <nav className="mb-6 pt-16 flex items-center gap-2 text-xs text-[#AEB9CC]">
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
                                <span className="rounded-[3px] border border-white/10 bg-[#102544] px-2.5 py-1 text-xs font-bold tracking-wide text-white">
                                    {course.courseCode}
                                </span>

                                <span className="rounded-[3px] bg-orange-400 px-2.5 py-1 text-xs font-semibold text-[#0B1E3D]">
                                    {course.level}
                                </span>

                                {course.featured && (
                                    <span className="rounded-[3px] border border-orange-400/40 bg-orange-400/10 px-2.5 py-1 text-xs font-medium text-orange-400">
                                        Featured Course
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="mt-4 max-w-7xl text-3xl font-bold leading-tight text-white md:text-4xl">
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
                    <div className="mx-auto max-w-400 px-6 py-10 md:px-8">
                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* Main Content */}
                            <div className="space-y-6 lg:col-span-2">
                                {/* Prerequisites Section */}
                                {course.prerequisites && (
                                    <section className="cd-fade-up rounded-[3px] border border-[#E2E5EA] border-t-4 border-t-[#0B1E3D] bg-white p-6 shadow-sm md:p-8">
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
                                <section className="cd-fade-up rounded-[3px] border border-[#E2E5EA] border-t-4 border-t-[#0B1E3D] bg-white p-6 shadow-sm md:p-8">
                                    <h2 className="flex items-center gap-2 text-lg font-bold text-[#0B1E3D]">
                                        <span className="h-2 w-2 bg-orange-400"></span>
                                        About This Course
                                    </h2>

                                    {course.description ? (
                                        <div
                                            className="course-description-content mt-4 text-sm text-[#5B6472]"
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
                            <aside className="lg:col-span-1">
                                <div className="cd-fade-up flex flex-col space-y-4 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] overflow-y-auto pr-1">
                                    {/* Course Overview Card */}
                                    <section className="rounded-[3px] border border-[#E2E5EA] border-t-4 border-t-orange-400 bg-white p-6 shadow-sm">
                                        <h2 className="flex items-center gap-2 text-base font-bold text-[#0B1E3D]">
                                            
                                            Course Overview
                                        </h2>

                                        <dl className="mt-4 grid grid-cols-2 gap-3">
                                            <div className="rounded-[3px] border border-[#E2E5EA] bg-[#F8FAFC] p-3">
                                                <dt className="text-[10px] font-medium uppercase tracking-wide text-[#7C8AA3]">
                                                    Course Code
                                                </dt>
                                                <dd className="mt-0.5 text-sm font-bold text-[#0B1E3D]">
                                                    {course.courseCode}
                                                </dd>
                                            </div>

                                            <div className="rounded-[3px] border border-[#E2E5EA] bg-[#F8FAFC] p-3">
                                                <dt className="text-[10px] font-medium uppercase tracking-wide text-[#7C8AA3]">
                                                    Level
                                                </dt>
                                                <dd className="mt-0.5 text-sm font-bold text-[#0B1E3D]">
                                                    {course.level}
                                                </dd>
                                            </div>

                                            <div className="rounded-[3px] border border-[#E2E5EA] bg-[#F8FAFC] p-3">
                                                <dt className="text-[10px] font-medium uppercase tracking-wide text-[#7C8AA3]">
                                                    Department
                                                </dt>
                                                <dd className="mt-0.5 text-sm font-bold text-[#0B1E3D]">
                                                    {course.department?.name || "Unassigned"}
                                                </dd>
                                            </div>

                                            <div className="rounded-[3px] border border-[#E2E5EA] bg-[#F8FAFC] p-3">
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
                                    <div className="rounded-[3px] border border-[#E2E5EA] border-t-4 border-t-orange-400 bg-white p-6 shadow-sm">
                                        <h3 className="text-base font-bold text-[#0B1E3D]">
                                            Interested in this course?
                                        </h3>

                                        <p className="mt-2 text-xs leading-relaxed text-[#5B6472]">
                                            Get in touch with our department to learn more about enrollment, class schedules, and entry criteria.
                                        </p>

                                        <button
                                            type="button"
                                            className="mt-5 w-full rounded-[3px] bg-orange-400 px-4 py-2.5 text-sm font-bold text-[#0B1E3D] transition-all hover:bg-orange-500 active:translate-y-px"
                                        >
                                            Enroll Now
                                        </button>

                                        <a
                                            href={whatsappUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-[3px] border border-[#0B1E3D] bg-white px-4 py-2.5 text-sm font-semibold text-[#0B1E3D] transition-all hover:bg-[#0B1E3D] hover:text-white"
                                        >
                                            Learn More
                                        </a>
                                    </div>

                                    <Link
                                        href="/courses"
                                        className="block shrink-0 rounded-[3px] border border-[#E2E5EA] bg-white px-4 py-3 text-center text-sm font-semibold text-[#0B1E3D] shadow-sm transition-all hover:border-orange-400 hover:text-orange-500"
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