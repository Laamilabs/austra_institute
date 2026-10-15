// lib/api/email.ts
import emailjs from "@emailjs/browser";
import type { Application } from "./application";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const TEMPLATE_APPLICANT = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_APPLICANT!;
const TEMPLATE_ADMISSIONS = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ADMISSIONS!;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ApplicationEmailContext {
  /** Human-readable course name, resolved from the courses list on the page. */
  courseName: string;
}

// ---------------------------------------------------------------------------
// Formatters
// ---------------------------------------------------------------------------

function formatStudyMode(mode: Application["studyMode"]): string {
  return mode.replace(/_/g, " ");
}

function formatLongDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

/**
 * Sends acknowledgement emails to both the applicant and the admissions
 * office. Uses `Promise.allSettled` so one failure does not block the other.
 *
 * Fire-and-forget: never throws. Errors are logged here.
 */
export async function sendApplicationEmails(
  application: Application,
  context: ApplicationEmailContext,
): Promise<void> {
  if (!SERVICE_ID || !TEMPLATE_APPLICANT || !TEMPLATE_ADMISSIONS || !PUBLIC_KEY) {
    console.warn(
      "[email] EmailJS env vars are missing. Skipping notification emails.",
    );
    return;
  }

  const applicantName = `${application.applicant.firstName} ${application.applicant.lastName}`;
  const courseName = context.courseName || "the selected course";
  const submittedAt =
    application.createdAt ?? new Date().toISOString();

  // ─── 1. Applicant acknowledgement ───────────────────────────────────────
  const applicantParams = {
    // Dynamic — must match the {{…}} placeholders in the Applicant template
    applicant_name: applicantName,
    applicant_email: application.applicant.email,
    applicant_phone: application.applicant.phone,
    application_number: application.applicationNumber,
    course_name: courseName,
    study_mode: formatStudyMode(application.studyMode),
    preferred_start_date: formatLongDate(application.preferredStartDate),
    submitted_at: formatDateTime(submittedAt),

    // Static — EmailJS fills these in for every send
    current_year: String(new Date().getFullYear()),
  };

  // ─── 2. Admissions alert ────────────────────────────────────────────────
  // `to_email` for this template is set on the EmailJS side (info@…), so
  // the address never travels through the browser.
  const admissionsParams = {
    application_number: application.applicationNumber,
    applicant_name: applicantName,
    applicant_email: application.applicant.email,
    applicant_phone: application.applicant.phone,
    course_name: courseName,
    study_mode: formatStudyMode(application.studyMode),
    preferred_start_date: formatLongDate(application.preferredStartDate),
    submitted_at: formatDateTime(submittedAt),
  };

  // ─── Dispatch both in parallel ──────────────────────────────────────────
  const results = await Promise.allSettled([
    emailjs.send(SERVICE_ID, TEMPLATE_APPLICANT, applicantParams, {
      publicKey: PUBLIC_KEY,
    }),
    emailjs.send(SERVICE_ID, TEMPLATE_ADMISSIONS, admissionsParams, {
      publicKey: PUBLIC_KEY,
    }),
  ]);

  results.forEach((result, index) => {
    const target = index === 0 ? "applicant" : "admissions";

    if (result.status === "rejected") {
      console.error(
        `[email] Failed to send ${target} acknowledgement:`,
        result.reason,
      );
    } else {
      console.info(
        `[email] ${target} acknowledgement sent (${result.value.status}).`,
      );
    }
  });
}