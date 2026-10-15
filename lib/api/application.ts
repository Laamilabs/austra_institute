// lib/api/application.ts
import { api } from "./client";
import { sendApplicationEmails } from "./email";

// ---------------------------------------------------------------------------
// Enums / string unions
// ---------------------------------------------------------------------------

export type ApplicationStatus =
    | "pending"
    | "under_review"
    | "approved"
    | "rejected"
    | "waitlisted"
    | "withdrawn";

export type StudyMode = "on_campus" | "online" | "hybrid";

export type Gender = "male" | "female" | "other" | "prefer_not_to_say";

// ---------------------------------------------------------------------------
// Nested DTOs (request payload)
// ---------------------------------------------------------------------------

export interface ApplicantDetailsDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    /** ISO date string, e.g. "2004-05-21" */
    dateOfBirth: string;
    gender?: Gender;
    nationality: string;
    locality: string;
    county: string;
}

export interface EmergencyContactDto {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
}

export interface EducationBackgroundDto {
    highestQualification: string;
    institution: string;
    yearCompleted: number;
    gradeOrGpa?: string;
}

// ---------------------------------------------------------------------------
// Create DTO
// ---------------------------------------------------------------------------

export interface CreateApplicationDto {
    /** MongoDB Course ObjectId. */
    course: string;

    applicant: ApplicantDetailsDto;
    emergencyContact: EmergencyContactDto;
    education: EducationBackgroundDto;

    studyMode: StudyMode;

    /** ISO date string, e.g. "2026-09-01" */
    preferredStartDate: string;

    personalStatement?: string;
    previousExperience?: string;
    referralSource?: string;
    isInternational?: boolean;

    declarationAccepted: boolean;
}

// ---------------------------------------------------------------------------
// Application (response)
// ---------------------------------------------------------------------------

/**
 * Sub-document shape as returned by the API.
 * `course` is returned as a raw ObjectId string because POST /applications
 * does not call `.populate()` — it is only populated on GET reads.
 */
export interface ApplicantDetails {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender?: Gender;
    nationality: string;
    locality: string;
    county: string;
    fullName?: string;
}

export interface EmergencyContact {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
}

export interface EducationBackground {
    highestQualification: string;
    institution: string;
    yearCompleted: number;
    gradeOrGpa?: string;
}

export interface Application {
    _id: string;
    applicationNumber: string;

    /** Raw ObjectId string on create. */
    course: string;

    applicant: ApplicantDetails;
    emergencyContact: EmergencyContact;
    education: EducationBackground;

    studyMode: StudyMode;
    preferredStartDate: string;

    personalStatement?: string;
    previousExperience?: string;

    status: ApplicationStatus;
    reviewNotes?: string;
    reviewedBy?: string | null;
    reviewedAt?: string;

    declarationAccepted: boolean;
    declarationAcceptedAt?: string;

    referralSource?: string;
    isInternational: boolean;

    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

// ---------------------------------------------------------------------------
// API client
// ---------------------------------------------------------------------------

// lib/api/application.ts
export const applicationApi = {
    /**
     * Submit a new course application.
     *
     * POST /applications
     *
     * On success the response contains the generated `applicationNumber`
     * (e.g. "ATI-2026-00001"). Acknowledgement emails are then dispatched
     * to the applicant and the admissions office.
     *
     * @param data        Payload sent to the backend.
     * @param courseName  Human-readable course name, used only for the
     *                    acknowledgement emails. The POST response returns
     *                    a raw ObjectId, so the caller — who has the courses
     *                    list — must resolve this and pass it in.
     */
    async create(data: CreateApplicationDto, courseName: string) {
        const application = await api.post<Application>("/applications", data);

        // Fire-and-forget. Never block the success screen on email delivery.
        sendApplicationEmails(application, { courseName }).catch(() => {
            /* errors are logged inside sendApplicationEmails */
        });

        return application;
    },
};