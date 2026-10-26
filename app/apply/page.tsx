// app/apply/page.tsx
"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import {
    applicationApi,
    type Application,
    type CreateApplicationDto,
    type Gender,
    type StudyMode,
} from "@/lib/api/application";
import { courseApi, type Course } from "@/lib/api/course";
import CoursePicker from "@/app/components/course-picker";
import SelectCounty from "../components/select-county";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STUDY_MODE_OPTIONS: { value: StudyMode; label: string }[] = [
    { value: "on_campus", label: "On campus" },
    { value: "online", label: "Online" },
    { value: "hybrid", label: "Hybrid" },
];

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer_not_to_say", label: "Prefer not to say" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---------------------------------------------------------------------------
// Local types
// ---------------------------------------------------------------------------

interface FormState {
    course: string;
    studyMode: StudyMode | "";
    preferredStartDate: string;

    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: Gender | "";
    nationality: string;
    locality: string;
    county: string;

    emergencyName: string;
    emergencyRelationship: string;
    emergencyPhone: string;
    emergencyEmail: string;

    highestQualification: string;
    institution: string;
    yearCompleted: string;
    gradeOrGpa: string;

    personalStatement: string;
    previousExperience: string;
    referralSource: string;
    isInternational: boolean;
    declarationAccepted: boolean;
}

type Errors = Partial<Record<keyof FormState, string>>;

const INITIAL_FORM: FormState = {
    course: "",
    studyMode: "",
    preferredStartDate: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    locality: "",
    county: "",
    emergencyName: "",
    emergencyRelationship: "",
    emergencyPhone: "",
    emergencyEmail: "",
    highestQualification: "",
    institution: "",
    yearCompleted: "",
    gradeOrGpa: "",
    personalStatement: "",
    previousExperience: "",
    referralSource: "",
    isInternational: false,
    declarationAccepted: false,
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ApplyPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [coursesLoading, setCoursesLoading] = useState(true);
    const [coursesError, setCoursesError] = useState<string | null>(null);
    const [selectedCourseFromLinkId, setSelectedCourseFromLinkId] = useState<string | null>(null);
    const [isChoosingAnotherCourse, setIsChoosingAnotherCourse] = useState(false);

    const [form, setForm] = useState<FormState>(INITIAL_FORM);
    const [errors, setErrors] = useState<Errors>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState<Application | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadCourses() {
            setCoursesLoading(true);
            setCoursesError(null);

            try {
                const requestedCourseId = new URLSearchParams(window.location.search).get("course");
                if (requestedCourseId) setSelectedCourseFromLinkId(requestedCourseId);
                const list = await courseApi.getAll();
                if (cancelled) return;
                const availableCourses = Array.isArray(list) ? list : [];
                setCourses(availableCourses);
                if (requestedCourseId && availableCourses.some((course) => course._id === requestedCourseId)) {
                    setForm((previous) => ({ ...previous, course: requestedCourseId }));
                } else if (requestedCourseId) {
                    setSelectedCourseFromLinkId(null);
                }
            } catch (err) {
                if (cancelled) return;
                console.error("[apply] course fetch failed", err);
                setCoursesError(
                    "We couldn't load the list of courses. Please refresh the page.",
                );
            } finally {
                if (!cancelled) setCoursesLoading(false);
            }
        }

        loadCourses();
        return () => {
            cancelled = true;
        };
    }, []);

    function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => {
            if (!prev[key]) return prev;
            const next = { ...prev };
            delete next[key];
            return next;
        });
    }

    function validate(): Errors {
        const e: Errors = {};
        const currentYear = new Date().getFullYear();

        if (!form.course) e.course = "Please select a course.";
        if (!form.studyMode) e.studyMode = "Please choose a study mode.";
        if (!form.preferredStartDate)
            e.preferredStartDate = "Preferred start date is required.";

        if (!form.firstName.trim()) e.firstName = "First name is required.";
        if (!form.lastName.trim()) e.lastName = "Last name is required.";

        if (!form.email.trim()) e.email = "Email is required.";
        else if (!EMAIL_RE.test(form.email.trim()))
            e.email = "Enter a valid email address.";

        if (!form.phone.trim()) e.phone = "Phone number is required.";
        if (!form.dateOfBirth) e.dateOfBirth = "Date of birth is required.";
        if (!form.nationality.trim()) e.nationality = "Nationality is required.";
        if (!form.locality.trim()) e.locality = "Locality is required.";
        if (!form.county.trim()) e.county = "County is required.";

        if (!form.emergencyName.trim())
            e.emergencyName = "Emergency contact name is required.";
        if (!form.emergencyRelationship.trim())
            e.emergencyRelationship = "Relationship is required.";
        if (!form.emergencyPhone.trim())
            e.emergencyPhone = "Emergency contact phone is required.";
        if (form.emergencyEmail.trim() && !EMAIL_RE.test(form.emergencyEmail.trim()))
            e.emergencyEmail = "Enter a valid email address.";

        if (!form.highestQualification.trim())
            e.highestQualification = "Highest qualification is required.";
        if (!form.institution.trim()) e.institution = "Institution is required.";

        if (!form.yearCompleted.trim()) {
            e.yearCompleted = "Year completed is required.";
        } else {
            const year = Number(form.yearCompleted);
            if (!Number.isFinite(year) || !Number.isInteger(year)) {
                e.yearCompleted = "Year must be a whole number.";
            } else if (year < 1950 || year > currentYear) {
                e.yearCompleted = `Year must be between 1950 and ${currentYear}.`;
            }
        }

        if (!form.declarationAccepted)
            e.declarationAccepted = "You must accept the declaration to submit.";

        return e;
    }

    async function handleSubmit(evt: React.FormEvent) {
        evt.preventDefault();
        setSubmitError(null);

        const validation = validate();
        setErrors(validation);

        if (Object.keys(validation).length > 0) {
            const firstKey = Object.keys(validation)[0];
            const el = document.querySelector<HTMLElement>(
                `[data-field="${firstKey}"]`,
            );
            el?.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        const payload: CreateApplicationDto = {
            course: form.course,
            applicant: {
                firstName: form.firstName.trim(),
                lastName: form.lastName.trim(),
                email: form.email.trim().toLowerCase(),
                phone: form.phone.trim(),
                dateOfBirth: form.dateOfBirth,
                nationality: form.nationality.trim(),
                locality: form.locality.trim(),
                county: form.county.trim(),
                ...(form.gender ? { gender: form.gender } : {}),
            },
            emergencyContact: {
                name: form.emergencyName.trim(),
                relationship: form.emergencyRelationship.trim(),
                phone: form.emergencyPhone.trim(),
                ...(form.emergencyEmail.trim()
                    ? { email: form.emergencyEmail.trim().toLowerCase() }
                    : {}),
            },
            education: {
                highestQualification: form.highestQualification.trim(),
                institution: form.institution.trim(),
                yearCompleted: Number(form.yearCompleted),
                ...(form.gradeOrGpa.trim() ? { gradeOrGpa: form.gradeOrGpa.trim() } : {}),
            },
            studyMode: form.studyMode as StudyMode,
            preferredStartDate: form.preferredStartDate,
            declarationAccepted: form.declarationAccepted,
            ...(form.personalStatement.trim()
                ? { personalStatement: form.personalStatement.trim() }
                : {}),
            ...(form.previousExperience.trim()
                ? { previousExperience: form.previousExperience.trim() }
                : {}),
            ...(form.referralSource.trim()
                ? { referralSource: form.referralSource.trim() }
                : {}),
            ...(form.isInternational ? { isInternational: true } : {}),
        };

        try {
            setSubmitting(true);
            const selectedCourse = courses.find((c) => c._id === form.course);
            const courseName = selectedCourse?.name ?? "the selected course";

            const created = await applicationApi.create(payload, courseName);
            setSubmitted(created);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (err) {
            console.error("[apply] submit failed", err);

            let message = "Failed to submit application. Please try again.";

            if (axios.isAxiosError(err)) {
                const data = err.response?.data as
                    | { message?: string | string[] }
                    | undefined;

                if (err.response?.status === 409) {
                    message =
                        (Array.isArray(data?.message)
                            ? data?.message.join(", ")
                            : data?.message) ||
                        "You already have an active application for this course.";
                } else if (data?.message) {
                    message = Array.isArray(data.message)
                        ? data.message.join(", ")
                        : String(data.message);
                } else if (err.message) {
                    message = err.message;
                }
            } else if (err instanceof Error && err.message) {
                message = err.message;
            }

            setSubmitError(message);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } finally {
            setSubmitting(false);
        }
    }

    if (submitted) {
        return (
            <SuccessView
                application={submitted}
                onApplyAgain={() => {
                    setSubmitted(null);
                    setForm(INITIAL_FORM);
                    setErrors({});
                    setSubmitError(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }}
            />
        );
    }

    const today = new Date().toISOString().split("T")[0];

    const selectedCourse = courses.find((course) => course._id === form.course) ?? null;
    const showCourseSummary = Boolean(
        selectedCourseFromLinkId && selectedCourse && !isChoosingAnotherCourse,
    );
    const isLoadingLinkedCourse = Boolean(
        selectedCourseFromLinkId && coursesLoading && !selectedCourse,
    );

    return (
        <main className="min-h-screen bg-slate-50">
            {/* ============================================================== */}
            {/* HERO                                                            */}
            {/* ============================================================== */}
            <section className="relative overflow-hidden bg-[#0B1E3D]">
                <Image
                    src="/cta/class.jpg"
                    alt=""
                    fill
                    priority
                    className="object-cover object-center"
                />

                <div className="absolute inset-0 bg-linear-to-r from-[#0B1E3D]/95 via-[#0B1E3D]/85 to-[#0B1E3D]/70" />

                <div className="relative border-b border-white/10">
                    <div className="mx-auto flex max-w-400 items-center justify-between gap-4 px-6 py-4 md:px-8">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-sm font-semibold tracking-wide text-white"
                        >
                            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-orange-400 text-xs font-bold text-[#0B1E3D]">
                                ATI
                            </span>
                            <span className="hidden sm:inline">Admissions</span>
                        </Link>
                        <span className="text-xs uppercase tracking-[0.18em] text-orange-400">
                            Online application
                        </span>
                    </div>
                </div>

                <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-10 md:px-8 md:pt-16 md:pb-14">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-400">
                        Austra Training Institute · Eldoret, Kenya
                    </p>

                    <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
                        Apply to Austra Training Institute
                    </h1>

                    <p className="mt-3 text-sm text-[#D5DCE8]">
                        Fields marked with <span className="font-semibold text-orange-400">*</span> are required.
                        Your application details are used to review your admission.
                    </p>

                    <div className="mt-8 hidden max-w-4xl grid-cols-1 gap-3 sm:grid sm:grid-cols-3 sm:gap-4">
                        <Step
                            n="1"
                            title="Choose a course"
                            body="Select your programme, preferred study mode and start date."
                        />
                        <Step
                            n="2"
                            title="Add your details"
                            body="Complete your contact, emergency contact and education details."
                        />
                        <Step
                            n="3"
                            title="Submit and track"
                            body="Keep the application number shown after successful submission."
                        />
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* FORM                                                            */}
            {/* ============================================================== */}
            <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                {coursesError && (
                    <div
                        role="alert"
                        className="mb-6 flex items-start gap-3 rounded-sm border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mt-0.5 h-5 w-5 flex-shrink-0"
                            aria-hidden="true"
                        >
                            <path d="M12 9v4" />
                            <path d="M12 17h.01" />
                            <circle cx="12" cy="12" r="10" />
                        </svg>
                        <p>{coursesError}</p>
                    </div>
                )}

                {submitError && (
                    <div
                        role="alert"
                        className="mb-6 flex items-start gap-3 rounded-sm border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mt-0.5 h-5 w-5 flex-shrink-0"
                            aria-hidden="true"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 8v4" />
                            <path d="M12 16h.01" />
                        </svg>
                        <div>
                            <p className="font-medium">Could not submit application</p>
                            <p className="mt-0.5">{submitError}</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-5 md:space-y-6">
                    {/* ---------- Course & study ---------------------------------- */}
                    <Section
                        title="Course & study"
                        description={
                            showCourseSummary
                                ? "Your course from the course details page is selected. Change it here if needed."
                                : "Choose the course you are applying for and how you would like to study."
                        }
                    >
                        <Field
                            label="Course"
                            required
                            error={errors.course}
                            dataField="course"
                            htmlFor={showCourseSummary || isLoadingLinkedCourse ? undefined : "course"}
                        >
                            {showCourseSummary && selectedCourse ? (
                                <div role="group" aria-label="Selected course details" aria-live="polite" className="flex flex-col gap-4 rounded-sm border border-[#d9e2ef] bg-gradient-to-br from-white to-slate-50 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
                                    <div className="flex min-w-0 items-start gap-3.5">
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-[#0B1E3D] text-orange-300">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
                                                <path d="m9 10 2 2 4-4" />
                                            </svg>
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                                                Selected course
                                            </p>
                                            <p className="mt-1 text-base font-bold leading-snug text-[#0B1E3D] sm:text-lg">
                                                {selectedCourse.name}
                                            </p>
                                            <p className="mt-1 text-sm text-slate-600">
                                                {selectedCourse.courseCode} <span aria-hidden="true">·</span> {selectedCourse.level}
                                                {selectedCourse.department?.name && (
                                                    <> <span aria-hidden="true">·</span> {selectedCourse.department.name}</>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsChoosingAnotherCourse(true)}
                                        className="inline-flex shrink-0 items-center justify-center rounded-sm border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#0B1E3D] transition-colors hover:border-orange-300 hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1E3D] focus-visible:ring-offset-2"
                                    >
                                        Change course
                                    </button>
                                </div>
                            ) : isLoadingLinkedCourse ? (
                                <div role="status" className="rounded-sm border border-slate-200 bg-slate-50 px-4 py-5 text-sm font-medium text-slate-600">
                                    Loading your selected course…
                                </div>
                            ) : (
                                <>
                                    <CoursePicker
                                        courses={courses}
                                        value={form.course}
                                        onChange={(id) => {
                                            setField("course", id);
                                            setSelectedCourseFromLinkId(id || null);
                                            setIsChoosingAnotherCourse(false);
                                        }}
                                        loading={coursesLoading}
                                        error={coursesError}
                                        placeholder="Search by code, name or department…"
                                    />
                                    {isChoosingAnotherCourse && selectedCourse && (
                                        <button
                                            type="button"
                                            onClick={() => setIsChoosingAnotherCourse(false)}
                                            className="mt-2 text-sm font-medium text-[#0B1E3D] underline decoration-orange-400 underline-offset-4 hover:text-orange-700"
                                        >
                                            Keep {selectedCourse.courseCode}
                                        </button>
                                    )}
                                </>
                            )}
                        </Field>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Field
                                label="Study mode"
                                required
                                error={errors.studyMode}
                                htmlFor="studyMode"
                                dataField="studyMode"
                            >
                                <select
                                    id="studyMode"
                                    value={form.studyMode}
                                    onChange={(e) =>
                                        setField("studyMode", e.target.value as StudyMode | "")
                                    }
                                    className={inputClass(errors.studyMode)}
                                >
                                    <option value="">Select study mode</option>
                                    {STUDY_MODE_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </Field>

                            <Field
                                label="Preferred start date"
                                required
                                error={errors.preferredStartDate}
                                htmlFor="preferredStartDate"
                                dataField="preferredStartDate"
                            >
                                <input
                                    id="preferredStartDate"
                                    type="date"
                                    min={today}
                                    value={form.preferredStartDate}
                                    onChange={(e) =>
                                        setField("preferredStartDate", e.target.value)
                                    }
                                    className={inputClass(errors.preferredStartDate)}
                                />
                            </Field>
                        </div>

                        <label className="flex items-start gap-3 rounded-sm border border-slate-200 bg-white p-3">
                            <input
                                type="checkbox"
                                checked={form.isInternational}
                                onChange={(e) =>
                                    setField("isInternational", e.target.checked)
                                }
                                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#082B66] focus:ring-[#082B66]"
                            />
                            <span className="text-sm text-slate-700">
                                <span className="font-medium">International applicant</span>
                                <span className="block text-xs text-slate-500">
                                    Tick this if you are applying from outside the country.
                                </span>
                            </span>
                        </label>
                    </Section>

                    {/* ---------- Applicant details ------------------------------- */}
                    <Section title="Applicant details" description="Tell us who is applying.">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Field label="First name" required error={errors.firstName} htmlFor="firstName" dataField="firstName">
                                <input
                                    id="firstName"
                                    type="text"
                                    autoComplete="given-name"
                                    value={form.firstName}
                                    onChange={(e) => setField("firstName", e.target.value)}
                                    className={inputClass(errors.firstName)}
                                />
                            </Field>

                            <Field label="Last name" required error={errors.lastName} htmlFor="lastName" dataField="lastName">
                                <input
                                    id="lastName"
                                    type="text"
                                    autoComplete="family-name"
                                    value={form.lastName}
                                    onChange={(e) => setField("lastName", e.target.value)}
                                    className={inputClass(errors.lastName)}
                                />
                            </Field>

                            <Field label="Email" required error={errors.email} htmlFor="email" dataField="email">
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    value={form.email}
                                    onChange={(e) => setField("email", e.target.value)}
                                    className={inputClass(errors.email)}
                                />
                            </Field>

                            <Field label="Phone" required error={errors.phone} htmlFor="phone" dataField="phone">
                                <input
                                    id="phone"
                                    type="tel"
                                    autoComplete="tel"
                                    value={form.phone}
                                    onChange={(e) => setField("phone", e.target.value)}
                                    className={inputClass(errors.phone)}
                                />
                            </Field>

                            <Field label="Date of birth" required error={errors.dateOfBirth} htmlFor="dateOfBirth" dataField="dateOfBirth">
                                <input
                                    id="dateOfBirth"
                                    type="date"
                                    max={today}
                                    value={form.dateOfBirth}
                                    onChange={(e) => setField("dateOfBirth", e.target.value)}
                                    className={inputClass(errors.dateOfBirth)}
                                />
                            </Field>

                            <Field label="Gender" error={errors.gender} htmlFor="gender" dataField="gender" hint="Optional">
                                <select
                                    id="gender"
                                    value={form.gender}
                                    onChange={(e) =>
                                        setField("gender", e.target.value as Gender | "")
                                    }
                                    className={inputClass(errors.gender)}
                                >
                                    <option value="">Prefer not to say</option>
                                    {GENDER_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </Field>

                            <Field label="Nationality" required error={errors.nationality} htmlFor="nationality" dataField="nationality">
                                <input
                                    id="nationality"
                                    type="text"
                                    autoComplete="country-name"
                                    value={form.nationality}
                                    onChange={(e) => setField("nationality", e.target.value)}
                                    className={inputClass(errors.nationality)}
                                />
                            </Field>

                            <Field label="Locality" required error={errors.locality} htmlFor="locality" dataField="locality">
                                <input
                                    id="locality"
                                    type="text"
                                    value={form.locality}
                                    onChange={(e) => setField("locality", e.target.value)}
                                    className={inputClass(errors.locality)}
                                />
                            </Field>

                            <Field
                                label="County"
                                required
                                error={errors.county}
                                htmlFor="county"
                                dataField="county"
                                className="sm:col-span-2"
                            >
                                <SelectCounty
                                    id="county"
                                    value={form.county}
                                    onChange={(county) => setField("county", county)}
                                    invalid={!!errors.county}
                                    placeholder="Search or select a county…"
                                />
                            </Field>
                        </div>
                    </Section>

                    {/* ---------- Emergency contact ------------------------------- */}
                    <Section
                        title="Emergency contact"
                        description="Someone we can reach in case of an emergency."
                    >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Field label="Full name" required error={errors.emergencyName} htmlFor="emergencyName" dataField="emergencyName">
                                <input
                                    id="emergencyName"
                                    type="text"
                                    value={form.emergencyName}
                                    onChange={(e) => setField("emergencyName", e.target.value)}
                                    className={inputClass(errors.emergencyName)}
                                />
                            </Field>

                            <Field label="Relationship" required error={errors.emergencyRelationship} htmlFor="emergencyRelationship" dataField="emergencyRelationship">
                                <input
                                    id="emergencyRelationship"
                                    type="text"
                                    placeholder="e.g. Parent, Sibling, Spouse"
                                    value={form.emergencyRelationship}
                                    onChange={(e) =>
                                        setField("emergencyRelationship", e.target.value)
                                    }
                                    className={inputClass(errors.emergencyRelationship)}
                                />
                            </Field>

                            <Field label="Phone" required error={errors.emergencyPhone} htmlFor="emergencyPhone" dataField="emergencyPhone">
                                <input
                                    id="emergencyPhone"
                                    type="tel"
                                    value={form.emergencyPhone}
                                    onChange={(e) => setField("emergencyPhone", e.target.value)}
                                    className={inputClass(errors.emergencyPhone)}
                                />
                            </Field>

                            <Field label="Email" error={errors.emergencyEmail} htmlFor="emergencyEmail" dataField="emergencyEmail" hint="Optional">
                                <input
                                    id="emergencyEmail"
                                    type="email"
                                    value={form.emergencyEmail}
                                    onChange={(e) => setField("emergencyEmail", e.target.value)}
                                    className={inputClass(errors.emergencyEmail)}
                                />
                            </Field>
                        </div>
                    </Section>

                    {/* ---------- Education --------------------------------------- */}
                    <Section
                        title="Education background"
                        description="Your most recent academic qualification."
                    >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Field
                                label="Highest qualification"
                                required
                                error={errors.highestQualification}
                                htmlFor="highestQualification"
                                dataField="highestQualification"
                                className="sm:col-span-2"
                            >
                                <input
                                    id="highestQualification"
                                    type="text"
                                    placeholder="e.g. KCSE, Diploma, Bachelor's Degree"
                                    value={form.highestQualification}
                                    onChange={(e) =>
                                        setField("highestQualification", e.target.value)
                                    }
                                    className={inputClass(errors.highestQualification)}
                                />
                            </Field>

                            <Field label="Institution" required error={errors.institution} htmlFor="institution" dataField="institution">
                                <input
                                    id="institution"
                                    type="text"
                                    value={form.institution}
                                    onChange={(e) => setField("institution", e.target.value)}
                                    className={inputClass(errors.institution)}
                                />
                            </Field>

                            <Field label="Year completed" required error={errors.yearCompleted} htmlFor="yearCompleted" dataField="yearCompleted">
                                <input
                                    id="yearCompleted"
                                    type="number"
                                    inputMode="numeric"
                                    min={1950}
                                    max={new Date().getFullYear()}
                                    value={form.yearCompleted}
                                    onChange={(e) => setField("yearCompleted", e.target.value)}
                                    className={inputClass(errors.yearCompleted)}
                                />
                            </Field>

                            <Field label="Grade / GPA" error={errors.gradeOrGpa} htmlFor="gradeOrGpa" dataField="gradeOrGpa" hint="Optional" className="sm:col-span-2">
                                <input
                                    id="gradeOrGpa"
                                    type="text"
                                    placeholder="e.g. B+, 3.6"
                                    value={form.gradeOrGpa}
                                    onChange={(e) => setField("gradeOrGpa", e.target.value)}
                                    className={inputClass(errors.gradeOrGpa)}
                                />
                            </Field>
                        </div>
                    </Section>

                    {/* ---------- Additional info -------------------------------- */}
                    <Section
                        title="Additional information"
                        description="Optional details that strengthen your application."
                    >
                        <Field label="Personal statement" htmlFor="personalStatement" hint="Optional">
                            <textarea
                                id="personalStatement"
                                rows={4}
                                value={form.personalStatement}
                                onChange={(e) => setField("personalStatement", e.target.value)}
                                className={inputClass()}
                                placeholder="Tell us why you want to join this course."
                            />
                        </Field>

                        <Field label="Previous experience" htmlFor="previousExperience" hint="Optional">
                            <textarea
                                id="previousExperience"
                                rows={3}
                                value={form.previousExperience}
                                onChange={(e) => setField("previousExperience", e.target.value)}
                                className={inputClass()}
                            />
                        </Field>

                        <Field label="How did you hear about us?" htmlFor="referralSource" hint="Optional">
                            <input
                                id="referralSource"
                                type="text"
                                placeholder="e.g. Friend, Social media, Website"
                                value={form.referralSource}
                                onChange={(e) => setField("referralSource", e.target.value)}
                                className={inputClass()}
                            />
                        </Field>
                    </Section>

                    {/* ---------- Declaration ------------------------------------ */}
                    <Section title="Declaration">
                        <div
                            data-field="declarationAccepted"
                            className={[
                                "rounded-sm border p-3",
                                errors.declarationAccepted
                                    ? "border-rose-300 bg-rose-50"
                                    : "border-slate-200 bg-white",
                            ].join(" ")}
                        >
                            <label className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    checked={form.declarationAccepted}
                                    onChange={(e) =>
                                        setField("declarationAccepted", e.target.checked)
                                    }
                                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#082B66] focus:ring-[#082B66]"
                                />
                                <span className="text-sm text-slate-700">
                                    I confirm that the information provided is accurate and
                                    complete. I understand that any false statements may lead to
                                    the rejection of my application.
                                </span>
                            </label>
                            {errors.declarationAccepted && (
                                <p className="mt-2 text-xs font-medium text-rose-600">
                                    {errors.declarationAccepted}
                                </p>
                            )}
                        </div>
                    </Section>

                    {/* ---------- Actions ---------------------------------------- */}
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-sm border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={submitting || coursesLoading || courses.length === 0}
                            className="inline-flex items-center justify-center gap-2 rounded-sm bg-orange-400 px-4 py-2 text-sm font-semibold text-[#082B66] shadow-sm transition hover:bg-orange-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#082B66] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {submitting && (
                                <svg
                                    className="h-4 w-4 animate-spin"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z"
                                    />
                                </svg>
                            )}
                            {submitting ? "Submitting…" : "Submit application"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Step({
    n,
    title,
    body,
}: {
    n: string;
    title: string;
    body: string;
}) {
    return (
        <div className="rounded-sm border border-white/15 bg-white/[0.06] p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-orange-400 text-[11px] font-bold text-[#0B1E3D]">
                    {n}
                </span>
                <p className="text-sm font-semibold text-white">{title}</p>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-[#AEB9CC]">{body}</p>
        </div>
    );
}

function Section({
    title,
    description,
    children,
}: {
    title: string;
    description?: string;
    children: ReactNode;
}) {
    return (
        <section className="rounded-sm border border-slate-200/90 bg-white p-5 shadow-[0_8px_28px_-24px_rgba(15,23,42,0.35)] sm:p-7">
            <header className="mb-5 border-b border-slate-100 pb-4">
                <h2 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h2>
                {description && (
                    <p className="mt-0.5 text-sm text-slate-500">{description}</p>
                )}
            </header>
            <div className="space-y-4">{children}</div>
        </section>
    );
}

function Field({
    label,
    required,
    error,
    hint,
    htmlFor,
    dataField,
    className,
    children,
}: {
    label: string;
    required?: boolean;
    error?: string;
    hint?: string;
    htmlFor?: string;
    dataField?: string;
    className?: string;
    children: ReactNode;
}) {
    return (
        <div className={className} data-field={dataField}>
            <div className="mb-1 flex items-baseline justify-between">
                {htmlFor ? (
                    <label htmlFor={htmlFor} className="text-sm font-medium text-slate-700">
                        {label}
                        {required && <span className="ml-0.5 text-rose-500">*</span>}
                    </label>
                ) : (
                    <span className="text-sm font-medium text-slate-700">
                        {label}
                        {required && <span className="ml-0.5 text-rose-500">*</span>}
                    </span>
                )}
                {hint && !error && (
                    <span className="text-xs text-slate-400">{hint}</span>
                )}
            </div>
            {children}
            {error && (
                <p className="mt-1 text-xs font-medium text-rose-600">{error}</p>
            )}
        </div>
    );
}

function inputClass(error?: string) {
    return [
        "w-full rounded-sm border bg-white px-3.5 py-2.5 text-base text-slate-900 shadow-sm transition-colors",
        "placeholder-slate-400 focus:outline-none focus:ring-2",
        error
            ? "border-rose-300 focus:border-rose-400 focus:ring-rose-500/20"
            : "border-slate-200 focus:border-slate-400 focus:ring-slate-900/10",
        "disabled:cursor-not-allowed disabled:bg-slate-50",
    ].join(" ");
}

// ---------------------------------------------------------------------------
// Success view
// ---------------------------------------------------------------------------

function SuccessView({
    application,
    onApplyAgain,
}: {
    application: Application;
    onApplyAgain: () => void;
}) {
    const [copied, setCopied] = useState(false);

    async function copyNumber() {
        try {
            await navigator.clipboard.writeText(application.applicationNumber);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            /* ignore — clipboard permission denied */
        }
    }

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero band -------------------------------------------------- */}
            <section className="relative overflow-hidden bg-[#0B1E3D]">
                <Image
                    src="/cta/class.jpg"
                    alt=""
                    fill
                    priority
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-linear-to-r from-[#0B1E3D]/95 via-[#0B1E3D]/85 to-[#0B1E3D]/70" />

                <div className="relative border-b border-white/10">
                    <div className="mx-auto flex max-w-400 items-center justify-between gap-4 px-6 py-4 md:px-8">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-sm font-semibold tracking-wide text-white"
                        >
                            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-orange-400 text-xs font-bold text-[#0B1E3D]">
                                ATI
                            </span>
                            <span className="hidden sm:inline">Admissions</span>
                        </Link>
                    </div>
                </div>

                <div className="relative mx-auto max-w-400 px-6 pt-12 pb-12 md:px-8 md:pt-16 md:pb-16">
                    <div className="flex items-center gap-2 text-orange-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                            aria-hidden="true"
                        >
                            <path d="M20 6 9 17l-5-5" />
                        </svg>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                            Application received
                        </p>
                    </div>
                    <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-white md:text-4xl">
                        Thank you, {application.applicant.firstName}.
                    </h1>
                    <p className="mt-3 max-w-lg text-sm text-[#AEB9CC] md:text-base">
                        Your application has been submitted successfully. We&apos;ll be in
                        touch with the next steps.
                    </p>
                </div>
            </section>

            {/* Content ---------------------------------------------------- */}
            <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    {/* Application number */}
                    <div className="rounded-sm border border-slate-200 bg-slate-50 p-5 text-center">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Your application number
                        </p>
                        <div className="mt-2 flex items-center justify-center gap-3">
                            <p className="font-mono text-2xl font-semibold tracking-tight text-[#082B66]">
                                {application.applicationNumber}
                            </p>
                            <button
                                type="button"
                                onClick={copyNumber}
                                className="rounded-sm border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
                            >
                                {copied ? "Copied" : "Copy"}
                            </button>
                        </div>
                        <p className="mt-3 text-xs text-slate-500">
                            Please save this number. You will need it to track your
                            application.
                        </p>
                    </div>

                    {/* Summary */}
                    <dl className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 text-sm sm:grid-cols-2">
                        <div>
                            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Applicant
                            </dt>
                            <dd className="mt-1 text-slate-900">
                                {application.applicant.firstName}{" "}
                                {application.applicant.lastName}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Email
                            </dt>
                            <dd className="mt-1 break-all text-slate-900">
                                {application.applicant.email}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Status
                            </dt>
                            <dd className="mt-1 inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold capitalize text-amber-700">
                                {application.status.replace("_", " ")}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Submitted
                            </dt>
                            <dd className="mt-1 text-slate-900">
                                {application.createdAt
                                    ? new Date(application.createdAt).toLocaleString()
                                    : "Just now"}
                            </dd>
                        </div>
                    </dl>

                    {/* What happens next */}
                    <div className="mt-8 rounded-sm border-l-4 border-orange-400 bg-orange-50 p-4">
                        <p className="text-sm font-semibold text-slate-900">
                            What happens next?
                        </p>
                        <ol className="mt-2 space-y-1.5 text-sm text-slate-700">
                            <li>1. Our admissions team will review your application.</li>
                            <li>
                                2. We may reach out to you at{" "}
                                <span className="font-medium">
                                    {application.applicant.email}
                                </span>{" "}
                                for additional information.
                            </li>
                            <li>
                                3. You will be notified once a decision has been made — keep
                                your application number safe.
                            </li>
                        </ol>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
                        <button
                            type="button"
                            onClick={onApplyAgain}
                            className="inline-flex items-center justify-center rounded-sm border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                        >
                            Submit another application
                        </button>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-sm bg-orange-400 px-4 py-2 text-sm font-semibold text-[#082B66] shadow-sm transition hover:bg-orange-300"
                        >
                            Return to home
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
