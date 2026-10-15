"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { api } from "@/lib/api/client";
import { BookOpen, CalendarDays, CheckCircle2, GraduationCap, Mail, UserRound } from "lucide-react";

type StudentProfile = {
    fullName?: {
        firstName?: string;
        middleName?: string;
        lastName?: string;
    };
    email?: string;
    profileImage?: string | null;
    courses?: Array<{
        name?: string;
        courseCode?: string | null;
        dateOfAdmission?: string | null;
        dateOfCompletion?: string | null;
    }>;
};

function formatDate(value?: string | null) {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return new Intl.DateTimeFormat("en-KE", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
}

function Shell({ children }: { children: ReactNode }) {
    return (
        <main className="flex-1 bg-slate-100 text-[#082B66]">
            {/* Hero: photo + solid navy overlay */}
            <section className="relative overflow-hidden border-b-4 border-orange-400 bg-[#082B66]">
                <Image
                    src="/schools/edu.jpg"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-[#0B1F3A]/70" aria-hidden="true" />
                <div className="relative mx-auto flex w-full max-w-6xl items-center gap-4 px-4 pb-24 pt-36 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8 2xl:max-w-[1400px] 2xl:pb-32 2xl:pt-28">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-sm bg-orange-400 text-[#082B66] sm:h-14 sm:w-14">
                        <GraduationCap size={28} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300 sm:text-sm">
                            Student verification
                        </p>
                        <p className="mt-1 text-xl font-bold text-white sm:text-2xl 2xl:text-3xl">
                            Austra Training Institute
                        </p>
                    </div>
                </div>
            </section>

            <div className="relative mx-auto -mt-24 w-full max-w-6xl px-4 pb-12 sm:-mt-20 sm:px-6 sm:pb-16 lg:px-8 2xl:max-w-[1400px]">
                {children}
                <p className="mt-6 text-center text-xs leading-5 text-slate-500 sm:text-sm">
                    This profile displays information shared publicly by Austra Training Institute.
                </p>
            </div>
        </main>
    );
}

export default function StudentQrPage() {
    const pathname = usePathname();
    const email = useMemo(() => {
        const segment = pathname.split("/").filter(Boolean).at(-1) ?? "";
        try {
            return decodeURIComponent(segment);
        } catch {
            return segment;
        }
    }, [pathname]);

    const [student, setStudent] = useState<StudentProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [imageFailed, setImageFailed] = useState(false);

    useEffect(() => {
        if (!email || email.toLowerCase() === "studentqr") {
            setLoading(false);
            setNotFound(true);
            return;
        }

        let active = true;
        setLoading(true);
        setNotFound(false);
        setStudent(null);
        setImageFailed(false);

        api
            .get<StudentProfile>(`/students/by-email/${encodeURIComponent(email)}`)
            .then((data) => {
                if (active) setStudent(data);
            })
            .catch(() => {
                if (active) setNotFound(true);
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, [email]);

    const name = [
        student?.fullName?.firstName,
        student?.fullName?.middleName,
        student?.fullName?.lastName,
    ]
        .filter(Boolean)
        .join(" ");
    const initials = name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");
    const courses = student?.courses ?? [];
    const completedCount = courses.filter((c) => formatDate(c.dateOfCompletion)).length;
    const displayEmail = student?.email ?? email;

    if (loading) {
        return (
            <Shell>
                <div
                    aria-label="Loading student profile"
                    className="grid animate-pulse gap-6 lg:grid-cols-[320px_minmax(0,1fr)] 2xl:grid-cols-[380px_minmax(0,1fr)]"
                >
                    <div className="rounded-sm border border-slate-200 border-t-4 border-t-orange-400 bg-white p-6">
                        <div className="mx-auto h-32 w-32 rounded-sm bg-slate-200" />
                        <div className="mx-auto mt-5 h-6 w-48 rounded-sm bg-slate-200" />
                        <div className="mx-auto mt-3 h-4 w-40 rounded-sm bg-slate-100" />
                    </div>
                    <div className="space-y-4 rounded-sm border border-slate-200 bg-white p-6">
                        <div className="h-6 w-40 rounded-sm bg-slate-200" />
                        <div className="h-24 rounded-sm bg-slate-100" />
                        <div className="h-24 rounded-sm bg-slate-100" />
                    </div>
                </div>
            </Shell>
        );
    }

    if (notFound || !student) {
        return (
            <Shell>
                <section className="mx-auto max-w-2xl rounded-sm border border-slate-200 border-t-4 border-t-orange-400 bg-white px-6 py-14 text-center sm:px-12 sm:py-16">
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-sm bg-orange-100 text-orange-600">
                        <UserRound size={32} aria-hidden="true" />
                    </div>
                    <h1 className="mt-5 text-2xl font-bold sm:text-3xl">Student profile unavailable</h1>
                    <p className="mx-auto mt-3 max-w-md text-base leading-7 text-slate-600">
                        We couldn’t find a public profile for this email address. Check the QR link or contact
                        Austra Training Institute for help.
                    </p>
                </section>
            </Shell>
        );
    }


    return (
        <Shell>
            <div className="space-y-6 sm:space-y-8">
                {/* Student identity — full-width profile banner */}
                <section className="overflow-hidden rounded-sm border border-slate-200 border-t-4 border-t-orange-400 bg-white shadow-sm">
                    <div className="flex flex-col gap-6 p-5 sm:p-7 md:flex-row md:items-center md:gap-8 lg:gap-10 lg:p-9">
                        {/* Portrait */}
                        <div className="mx-auto w-44 shrink-0 sm:w-52 md:mx-0 lg:w-56">
                            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-slate-100 ring-4 ring-orange-100">
                                {student.profileImage && !imageFailed ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={student.profileImage}
                                        alt={`${name || "Student"} profile`}
                                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 hover:scale-[1.03]"
                                        onError={() => setImageFailed(true)}
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-200 text-5xl font-bold text-[#082B66] sm:text-6xl">
                                        {initials || (
                                            <UserRound
                                                size={64}
                                                strokeWidth={1.5}
                                                aria-hidden="true"
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Identity details */}
                        <div className="min-w-0 flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center gap-2 md:justify-start">
                                <span className="h-px w-7 bg-orange-400" />
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                                    Student profile
                                </p>
                            </div>

                            <h1 className="mt-4 break-words text-3xl font-bold leading-tight tracking-tight text-[#082B66] sm:text-4xl lg:text-5xl">
                                {name || "Student"}
                            </h1>

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                                Official student identity and academic record
                                at Austra Training Institute.
                            </p>

                            <div className="mt-6 flex flex-col items-center gap-3 md:items-start">
                                <a
                                    href={`mailto:${displayEmail}`}
                                    className="inline-flex max-w-full items-start gap-2 break-all text-sm leading-relaxed text-slate-600 transition-colors hover:text-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-400 sm:text-base"
                                >
                                    <Mail
                                        size={18}
                                        className="mt-0.5 shrink-0 text-orange-500"
                                        aria-hidden="true"
                                    />
                                    <span>{displayEmail}</span>
                                </a>

                                <div className="mt-2 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                                    <span className="inline-flex items-center gap-2 rounded-sm bg-[#082B66] px-4 py-2 text-sm font-semibold text-white">
                                        <GraduationCap
                                            size={17}
                                            className="text-orange-300"
                                            aria-hidden="true"
                                        />
                                        Student
                                    </span>

                                    <span className="inline-flex items-center gap-2 border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
                                        <BookOpen
                                            size={16}
                                            className="text-orange-500"
                                            aria-hidden="true"
                                        />
                                        {courses.length}{" "}
                                        {courses.length === 1 ? "Course" : "Courses"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Academic record — full width below identity */}
                <section className="rounded-sm border border-slate-200 bg-white shadow-sm">
                    {/* Section heading */}
                    <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
                                Academic record
                            </p>
                            <h2 className="mt-1 text-xl font-bold text-[#082B66] sm:text-2xl">
                                Course details
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Enrollment history and course completion status.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 text-xs font-semibold">
                            <span className="rounded-sm bg-slate-100 px-3 py-2 text-slate-600">
                                {courses.length} enrolled
                            </span>
                            <span className="rounded-sm bg-orange-50 px-3 py-2 text-orange-700">
                                {completedCount} completed
                            </span>
                        </div>
                    </div>

                    <div className="pb-1 sm:p-7">
                        {courses.length ? (
                            <ul className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:gap-5">
                                {courses.map((course, index) => {
                                    const started = formatDate(course.dateOfAdmission);
                                    const completed = formatDate(course.dateOfCompletion);

                                    return (
                                        <li
                                            key={`${course.courseCode ?? course.name ?? "course"}-${index}`}
                                            className="flex h-full flex-col rounded-sm border border-slate-200 border-l-4 border-l-[#082B66] bg-white p-4 transition-colors hover:border-l-orange-400 hover:bg-slate-50/50 sm:p-5"
                                        >
                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                <div className="flex min-w-0 items-start gap-3">

                                                    <div className="min-w-0">
                                                        <h3 className="wrap-break-word text-base font-bold leading-snug text-[#082B66] sm:text-lg">
                                                            {course.name || "Course details unavailable"}
                                                        </h3>

                                                        {course.courseCode && (
                                                            <p className="mt-1 text-sm text-slate-500">
                                                                Course code:{" "}
                                                                <span className="font-semibold text-[#082B66]">
                                                                    {course.courseCode}
                                                                </span>
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {completed ? (
                                                    <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-sm bg-[#082B66] px-2.5 py-1.5 text-xs font-semibold text-white">
                                                        <CheckCircle2
                                                            size={14}
                                                            className="text-orange-300"
                                                            aria-hidden="true"
                                                        />
                                                        Completed
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex shrink-0 self-start rounded-sm bg-orange-100 px-2.5 py-1.5 text-xs font-semibold text-orange-800">
                                                        In progress
                                                    </span>
                                                )}
                                            </div>

                                            {(started || completed) && (
                                                <dl className="mt-5 grid gap-3 border-t border-slate-100 pt-4 text-sm sm:grid-cols-2">
                                                    {started && (
                                                        <div className="flex items-start gap-2">
                                                            <CalendarDays
                                                                size={16}
                                                                className="mt-0.5 shrink-0 text-orange-500"
                                                                aria-hidden="true"
                                                            />
                                                            <div>
                                                                <dt className="text-xs text-slate-500">
                                                                    Date started
                                                                </dt>
                                                                <dd className="mt-1 font-semibold text-[#082B66]">
                                                                    {started}
                                                                </dd>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {completed && (
                                                        <div className="flex items-start gap-2">
                                                            <CalendarDays
                                                                size={16}
                                                                className="mt-0.5 shrink-0 text-[#082B66]"
                                                                aria-hidden="true"
                                                            />
                                                            <div>
                                                                <dt className="text-xs text-slate-500">
                                                                    Date completed
                                                                </dt>
                                                                <dd className="mt-1 font-semibold text-[#082B66]">
                                                                    {completed}
                                                                </dd>
                                                            </div>
                                                        </div>
                                                    )}
                                                </dl>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <div className="rounded-sm border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
                                <BookOpen
                                    size={32}
                                    className="mx-auto text-slate-400"
                                    aria-hidden="true"
                                />
                                <h3 className="mt-3 font-semibold text-[#082B66]">
                                    No courses listed
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    No course enrollments are currently available for this profile.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </Shell>
    );
}