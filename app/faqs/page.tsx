
import type { Metadata } from "next";
import Link from "next/link";
import {
    ArrowDownRight,
    ArrowRight,
    ChevronDown,
    Mail,
    MapPin,
    Phone,
    MessageSquare,
} from "lucide-react";

const SITE_URL = "https://austratraininginstitute.co.ke";
const PAGE_URL = `${SITE_URL}/faqs`;
const SOCIAL_IMAGE = `${SITE_URL}/cta/class.png`;
const WHATSAPP_URL = "https://wa.me/254703710401";
const PHONE_NUMBER = "+254 703 710 401";
const EMAIL_ADDRESS = "info@austratraininginstitute.co.ke";

export const metadata: Metadata = {
    title: "FAQs | Austra Training Institute, Eldoret",
    description:
        "Find answers about courses, admission requirements, fees, intakes, online classes and applications at Austra Training Institute in Eldoret, Kenya.",
    alternates: {
        canonical: "/faqs",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    openGraph: {
        type: "website",
        url: PAGE_URL,
        siteName: "Austra Training Institute",
        title: "Frequently Asked Questions | Austra Training Institute",
        description:
            "Explore answers about courses, admissions, fees, study options and campus visits at Austra Training Institute, Eldoret, Kenya.",
        images: [
            {
                url: SOCIAL_IMAGE,
                width: 1200,
                height: 630,
                alt: "Students learning at Austra Training Institute in Eldoret, Kenya",
            },
        ],
        locale: "en_KE",
    },
    twitter: {
        card: "summary_large_image",
        title: "FAQs | Austra Training Institute, Eldoret",
        description:
            "Answers about courses, applications, fees and study options at Austra Training Institute in Kenya.",
        images: [SOCIAL_IMAGE],
    },
};

type FaqItem = {
    question: string;
    answer: React.ReactNode;
    schemaAnswer: string;
};

type FaqGroup = {
    number: string;
    title: string;
    description: string;
    questions: FaqItem[];
};

const faqGroups: FaqGroup[] = [
    {
        number: "01",
        title: "Courses & applications",
        description: "Choosing a course and taking your first step.",
        questions: [
            {
                question: "What courses does Austra Training Institute offer?",
                schemaAnswer:
                    "Austra Training Institute offers career-focused training in areas including health, ICT, hospitality, languages and other professional programmes. Browse the courses page for currently available courses, levels and descriptions.",
                answer: (
                    <>
                        Austra Training Institute offers career-focused training
                        across areas including health, ICT, hospitality,
                        languages and other professional programmes. Course
                        availability may change, so{" "}
                        <Link
                            href="/courses"
                            className="font-medium text-[#ef7d22] underline hover:text-orange-600"
                        >
                            browse our courses
                        </Link>{" "}
                        for current options, levels and descriptions.
                    </>
                ),
            },
            {
                question: "How do I apply for a course at Austra Training Institute?",
                schemaAnswer:
                    "Browse the available courses, choose a programme and complete the online application form on the Apply page. The admissions team will follow up with course-specific information and next steps.",
                answer: (
                    <>
                        <Link
                            href="/courses"
                            className="font-medium text-[#ef7d22] underline hover:text-orange-600"
                        >
                            Browse our current courses
                        </Link>
                        , choose your preferred programme and complete the
                        online application form on our{" "}
                        <Link
                            href="/apply"
                            className="font-medium text-[#ef7d22] underline hover:text-orange-600"
                        >
                            application page
                        </Link>
                        . Our admissions team will follow up with
                        course-specific information and the next steps.
                    </>
                ),
            },
            {
                question: "What are the entry requirements?",
                schemaAnswer:
                    "Entry requirements depend on the course and level of study. Check the relevant course information or contact the admissions team to confirm the requirements for your preferred programme.",
                answer: (
                    <>
                        Entry requirements depend on the course and level of
                        study. Check the relevant course information or{" "}
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-[#ef7d22] underline hover:text-orange-600"
                        >
                            contact admissions via WhatsApp
                        </a>{" "}
                        before applying to confirm the requirements for your
                        preferred programme.
                    </>
                ),
            },
            {
                question: "When will I hear back after applying?",
                schemaAnswer:
                    "You will receive an email confirming receipt of your application, followed by updates on its status. Applications are processed within one business day. Contact admissions if you have not received an update after that period.",
                answer: (
                    <>
                        You will receive an email confirming receipt of your
                        application, followed by updates on its status. We aim
                        to process applications within one business day. If you
                        have not received an update after that period,{" "}
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-[#ef7d22] underline hover:text-orange-600"
                        >
                            contact admissions on WhatsApp ({PHONE_NUMBER})
                        </a>
                        .
                    </>
                ),
            },
        ],
    },
    {
        number: "02",
        title: "Fees & study options",
        description: "Planning your studies and finding the right schedule.",
        questions: [
            {
                question: "How much are the course fees?",
                schemaAnswer:
                    "Course fees and study durations vary by programme and level. Download the Austra Training Institute prospectus for fee structures and course durations, or contact admissions for current fees and payment options.",
                answer: (
                    <>
                        Course fees and study durations vary depending on the
                        programme and level of study.{" "}
                        <a
                            href="/prospectus.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-[#ef7d22] underline hover:text-orange-600"
                        >
                            Download our prospectus
                        </a>{" "}
                        for detailed fee structures and course durations. For
                        current fees, payment options and guidance about your
                        preferred programme,{" "}
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-[#ef7d22] underline hover:text-orange-600"
                        >
                            contact admissions via WhatsApp
                        </a>
                        .
                    </>
                ),
            },
            {
                question: "When do courses start?",
                schemaAnswer:
                    "Intake dates and availability vary between courses. Contact the admissions team to confirm the next start date for your preferred programme.",
                answer: (
                    <>
                        Intake dates and availability vary between courses.{" "}
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-[#ef7d22] underline hover:text-orange-600"
                        >
                            Contact admissions on WhatsApp
                        </a>{" "}
                        to confirm the next intake and start date for your
                        preferred programme.
                    </>
                ),
            },
            {
                question: "Are flexible or weekend classes available?",
                schemaAnswer:
                    "Study schedules and delivery options vary by programme. Online, on-campus or hybrid learning may be available for selected courses. Contact admissions to confirm class times and weekend availability for your chosen course.",
                answer: (
                    <>
                        Study schedules and delivery options vary by programme.
                        Online, on-campus or hybrid learning may be available
                        for selected courses.{" "}
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-[#ef7d22] underline hover:text-orange-600"
                        >
                            Contact admissions on WhatsApp
                        </a>{" "}
                        to confirm class times and weekend availability for
                        your preferred course.
                    </>
                ),
            },
            {
                question: "Can I study online?",
                schemaAnswer:
                    "Online, on-campus and hybrid study options may be available depending on the programme. Contact admissions to confirm the delivery options for your preferred course.",
                answer: (
                    <>
                        Online study may be available depending on your chosen
                        programme. Some courses may also offer on-campus or
                        hybrid learning. Contact{" "}
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-[#ef7d22] underline hover:text-orange-600"
                        >
                            our admissions team
                        </a>{" "}
                        to confirm whether your preferred course is available
                        online and what you need to get started.
                    </>
                ),
            },
        ],
    },
    {
        number: "03",
        title: "Campus & support",
        description: "Getting in touch and finding us in Eldoret.",
        questions: [
            {
                question: "Where is Austra Training Institute located?",
                schemaAnswer:
                    "Austra Training Institute is located at Komora Center, Tulin Supermarket Building, 4th Floor, Room 415, Eldoret, Kenya.",
                answer: (
                    <>
                        Visit Austra Training Institute at Komora Center
                        (Tulin Supermarket Building), 4th Floor, Room 415,
                        in Eldoret, Kenya.{" "}
                        <Link
                            href="/contact"
                            className="font-medium text-[#ef7d22] underline hover:text-orange-600"
                        >
                            View our contact page
                        </Link>{" "}
                        for further information.
                    </>
                ),
            },
            {
                question: "How can I contact Austra Training Institute?",
                schemaAnswer:
                    "Contact Austra Training Institute by phone or WhatsApp on +254 703 710 401, or email info@austratraininginstitute.co.ke. Office hours are Monday to Friday, 08:00 to 17:00.",
                answer: (
                    <>
                        Call or{" "}
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-[#ef7d22] underline hover:text-orange-600"
                        >
                            WhatsApp us at {PHONE_NUMBER}
                        </a>
                        , or email{" "}
                        <a
                            href={`mailto:${EMAIL_ADDRESS}`}
                            className="font-medium text-[#ef7d22] underline hover:text-orange-600"
                        >
                            {EMAIL_ADDRESS}
                        </a>
                        . Our office hours are Monday to Friday, 08:00–17:00.
                    </>
                ),
            },
            {
                question: "Can I visit the campus before applying?",
                schemaAnswer:
                    "Yes. You can visit the Eldoret campus during office hours. Contact admissions beforehand if you would like guidance about a particular course.",
                answer: (
                    <>
                        Yes. You can visit our Eldoret campus during office
                        hours, Monday to Friday, 08:00–17:00. If you would like
                        to discuss a particular course,{" "}
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-[#ef7d22] underline hover:text-orange-600"
                        >
                            contact admissions via WhatsApp
                        </a>{" "}
                        beforehand so we can help direct your enquiry.
                    </>
                ),
            },
            {
                question: "Who can answer additional questions about courses and admissions?",
                schemaAnswer:
                    "The admissions team can help with course selection, entry requirements, fees and intakes. Contact the team by WhatsApp, phone, email or through the Contact page.",
                answer: (
                    <>
                        Our admissions team can help with course selection,
                        entry requirements, fees and intake dates. You can{" "}
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-[#ef7d22] underline hover:text-orange-600"
                        >
                            WhatsApp admissions ({PHONE_NUMBER})
                        </a>
                        , call, email, or visit our{" "}
                        <Link
                            href="/contact"
                            className="font-medium text-[#ef7d22] underline hover:text-orange-600"
                        >
                            Contact page
                        </Link>{" "}
                        to send your enquiry.
                    </>
                ),
            },
        ],
    },
];

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${PAGE_URL}#faq`,
    url: PAGE_URL,
    name: "Frequently Asked Questions | Austra Training Institute",
    mainEntity: faqGroups.flatMap((group) =>
        group.questions.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.schemaAnswer,
            },
        })),
    ),
};

export default function FaqsPage() {
    return (
        <main className="mx-auto w-full max-w-[1920px] px-5 pb-16 pt-28 text-[#142236] sm:px-8 sm:pb-20 lg:px-16 lg:pt-32 2xl:px-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
                }}
            />

            <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-3 text-[9px] font-extrabold uppercase tracking-[0.2em] text-slate-500 sm:text-[10px]">
                <span>Help & information</span>
                <span>Eldoret · Kenya</span>
            </div>

            <section className="relative isolate overflow-hidden rounded-sm bg-[#0b1f3a] px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/cta/class.png')",
                    }}
                />

                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-[#0b1f3a]/85"
                />

                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b1f3a]/95 via-[#0b1f3a]/75 to-[#0b1f3a]/40"
                />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-12 -top-36 -z-10 h-120 w-120 rounded-full border border-white/10"
                />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 -top-24 -z-10 h-96 w-[24rem] rounded-full border border-orange-300/20"
                />

                <div className="relative max-w-4xl">
                    <p className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-100">
                        <span
                            aria-hidden="true"
                            className="h-0.5 w-6 bg-[#ef7d22]"
                        />
                        Austra Training Institute
                    </p>

                    <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.065em] sm:text-6xl lg:text-7xl">
                        Frequently asked
                        <br />
                        <span className="font-serif font-normal italic text-[#ef7d22]">
                            questions.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base sm:leading-8">
                        Find answers about courses, admissions, fees, entry
                        requirements and study options at Austra Training
                        Institute in Eldoret, Kenya.
                    </p>

                    <Link
                        href="/courses"
                        className="mt-8 inline-flex min-h-12 items-center gap-3 bg-[#ef7d22] px-5 py-3 text-xs font-extrabold text-white transition-colors hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1f3a]"
                    >
                        Browse courses
                        <ArrowDownRight size={17} aria-hidden="true" />
                    </Link>
                </div>
            </section>

            <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(230px,0.65fr)_minmax(0,2fr)] lg:gap-16 xl:gap-24">
                <aside className="lg:sticky lg:top-28 lg:self-start">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#c3661f]">
                        Need a hand?
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tighter text-[#0b1f3a] sm:text-3xl">
                        We’re happy to help.
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-slate-600">
                        If you can’t find what you need, our team can point you
                        in the right direction.
                    </p>

                    <div className="mt-7 space-y-3">
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`WhatsApp Austra admissions at ${PHONE_NUMBER}`}
                            className="group flex min-h-12 items-center gap-3 rounded-sm border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#0b1f3a] transition-colors hover:border-orange-300"
                        >
                            <MessageSquare
                                size={17}
                                className="shrink-0 text-[#25D366]"
                                aria-hidden="true"
                            />
                            <span className="min-w-0 flex-1">
                                WhatsApp Admissions ({PHONE_NUMBER})
                            </span>
                            <ArrowRight
                                size={15}
                                className="shrink-0 text-slate-400 transition-transform group-hover:translate-x-1"
                                aria-hidden="true"
                            />
                        </a>

                        <a
                            href="tel:+254703710401"
                            className="group flex min-h-12 items-center gap-3 rounded-sm border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#0b1f3a] transition-colors hover:border-orange-300"
                        >
                            <Phone
                                size={17}
                                className="shrink-0 text-[#ef7d22]"
                                aria-hidden="true"
                            />
                            <span className="min-w-0 flex-1">
                                {PHONE_NUMBER}
                            </span>
                            <ArrowRight
                                size={15}
                                className="shrink-0 text-slate-400 transition-transform group-hover:translate-x-1"
                                aria-hidden="true"
                            />
                        </a>

                        <a
                            href={`mailto:${EMAIL_ADDRESS}`}
                            className="group flex min-h-12 items-center gap-3 rounded-sm border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#0b1f3a] transition-colors hover:border-orange-300"
                        >
                            <Mail
                                size={17}
                                className="shrink-0 text-[#ef7d22]"
                                aria-hidden="true"
                            />
                            <span className="min-w-0 flex-1 break-all">
                                Email Austra
                            </span>
                            <ArrowRight
                                size={15}
                                className="shrink-0 text-slate-400 transition-transform group-hover:translate-x-1"
                                aria-hidden="true"
                            />
                        </a>

                        <Link
                            href="/contact"
                            className="group flex min-h-12 items-center gap-3 rounded-sm border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#0b1f3a] transition-colors hover:border-orange-300"
                        >
                            <MapPin
                                size={17}
                                className="shrink-0 text-[#ef7d22]"
                                aria-hidden="true"
                            />
                            <span className="min-w-0 flex-1">
                                Visit our contact page
                            </span>
                            <ArrowRight
                                size={15}
                                className="shrink-0 text-slate-400 transition-transform group-hover:translate-x-1"
                                aria-hidden="true"
                            />
                        </Link>
                    </div>

                    <p className="mt-4 text-xs leading-6 text-slate-500">
                        Monday–Friday · 08:00–17:00
                    </p>

                    <div className="mt-7 border-t border-slate-200 pt-5">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#0b1f3a]">
                            Explore Austra
                        </p>
                        <ul className="mt-3 space-y-2 text-sm text-slate-600">
                            <li>
                                <Link
                                    href="/courses"
                                    className="underline decoration-slate-300 underline-offset-4 transition-colors hover:text-[#ef7d22]"
                                >
                                    Courses in Eldoret
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/apply"
                                    className="underline decoration-slate-300 underline-offset-4 transition-colors hover:text-[#ef7d22]"
                                >
                                    Course applications
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="underline decoration-slate-300 underline-offset-4 transition-colors hover:text-[#ef7d22]"
                                >
                                    Contact and campus information
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>

                <div className="min-w-0 space-y-14 sm:space-y-16">
                    {faqGroups.map((group) => (
                        <section
                            key={group.number}
                            aria-labelledby={`faq-group-${group.number}`}
                        >
                            <div className="mb-6 flex items-end justify-between gap-4 border-b border-slate-200 pb-5 sm:mb-8">
                                <div>
                                    <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#c3661f]">
                                        Chapter {group.number}
                                    </p>

                                    <h2
                                        id={`faq-group-${group.number}`}
                                        className="mt-2 text-2xl font-semibold tracking-[-0.055em] text-[#0b1f3a] sm:text-3xl lg:text-4xl"
                                    >
                                        {group.title}
                                        <span className="text-[#ef7d22]">
                                            .
                                        </span>
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        {group.description}
                                    </p>
                                </div>

                                <span
                                    aria-hidden="true"
                                    className="hidden font-serif text-5xl leading-none text-slate-100 sm:block"
                                >
                                    {group.number}
                                </span>
                            </div>

                            <div className="grid gap-3 xl:grid-cols-2 xl:gap-4">
                                {group.questions.map((item, index) => (
                                    <details
                                        key={item.question}
                                        className="group rounded-sm border border-slate-200 bg-white transition-all open:border-orange-200 open:shadow-[0_14px_38px_-28px_rgba(8,43,102,0.35)]"
                                    >
                                        <summary className="flex min-h-19 cursor-pointer list-none items-center gap-4 px-4 py-4 marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-400 sm:px-5 [&::-webkit-details-marker]:hidden">
                                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[#f4f6f8] text-xs font-bold text-[#0b1f3a] transition-colors group-open:bg-orange-100 group-open:text-[#c3661f]">
                                                {String(index + 1).padStart(
                                                    2,
                                                    "0",
                                                )}
                                            </span>

                                            <span className="min-w-0 flex-1 text-sm font-semibold leading-6 text-[#0b1f3a] sm:text-[15px]">
                                                {item.question}
                                            </span>

                                            <ChevronDown
                                                size={18}
                                                className="shrink-0 text-[#ef7d22] transition-transform duration-200 group-open:rotate-180"
                                                aria-hidden="true"
                                            />
                                        </summary>

                                        <div className="px-4 pb-5 pl-17 pr-5 text-sm leading-7 text-slate-600 sm:pl-19">
                                            {item.answer}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>

            <section
                aria-labelledby="faq-cta-heading"
                className="mt-16 flex flex-col gap-5 rounded-sm border border-orange-100 bg-orange-50/70 px-6 py-8 sm:mt-24 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-9"
            >
                <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#c3661f]">
                        Your next chapter
                    </p>

                    <h2
                        id="faq-cta-heading"
                        className="mt-2 text-2xl font-semibold tracking-tighter text-[#0b1f3a] sm:text-3xl"
                    >
                        Ready to get started?
                    </h2>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                        Explore available courses or apply to study at Austra
                        Training Institute in Eldoret, Kenya.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <Link
                        href="/apply"
                        className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-[#0b1f3a] px-4 py-3 text-xs font-bold text-white transition-colors hover:bg-[#173456] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
                    >
                        Apply now
                        <ArrowRight size={15} aria-hidden="true" />
                    </Link>

                    <Link
                        href="/courses"
                        className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-[#0b1f3a] transition-colors hover:border-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
                    >
                        Browse courses
                        <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
