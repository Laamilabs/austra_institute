import Link from "next/link";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { INSTITUTE_CONTACT } from "@/lib/site";

export default function ContactSection() {
    return (
        <section className="relative mb-24 w-full bg-white">
            {/* Map */}
            <div className="relative h-100 w-full overflow-hidden sm:h-110 lg:h-112.5">
                <iframe
                    title="Austra Training Institute Location Map"
                    className="h-full min-h-0 w-full border-0"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3792.2506977500902!2d35.27063022496464!3d0.5175814994773537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x178101baaea68e29%3A0xef4ed7975eb3b251!2sAustra%20Training%20Institute!5e1!3m2!1sen!2ske!4v1793606320859!5m2!1sen!2ske"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>

            {/* Contact Card */}
            <div className="relative z-10 mx-auto -mt-20 w-full max-w-7xl px-4 sm:px-6 lg:-mt-24 lg:px-8">
                <div className="rounded-sm border border-slate-200 bg-white/95 p-6 shadow-xl backdrop-blur-md sm:p-8 lg:p-12">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
                        {/* Contact Form */}
                        <div className="lg:col-span-5">
                            <div className="mb-2">
                                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                                    Get in touch
                                </p>

                                <h1 className="text-3xl font-bold text-[#0B1F3A] sm:text-4xl">
                                    Contact Austra Training Institute
                                </h1>
                                <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                                    Contact admissions about courses, application requirements,
                                    fees, and current intakes. Visit our main campus in Eldoret.
                                </p>
                            </div>

                            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href="/courses"
                                    className="inline-flex min-h-11 items-center justify-center rounded-sm bg-[#0B1F3A] px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-500"
                                >
                                    Explore courses
                                </Link>
                                <Link
                                    href="/apply"
                                    className="inline-flex min-h-11 items-center justify-center rounded-sm border border-[#0B1F3A] px-5 py-3 text-sm font-bold text-[#0B1F3A] transition hover:bg-slate-50"
                                >
                                    Apply online
                                </Link>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="lg:col-span-7">
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                                {/* Address */}
                                <ContactItem
                                    icon={<FiMapPin className="h-6 w-6" />}
                                    title="Main Campus"
                                >
                                    <p>{INSTITUTE_CONTACT.campus}</p>
                                </ContactItem>

                                {/* Phone */}
                                <ContactItem
                                    icon={<FiPhone className="h-6 w-6" />}
                                    title="Call Us"
                                >
                                    <p>
                                        {INSTITUTE_CONTACT.phones.map((phone, index) => (
                                            <span key={phone.href}>
                                                {index > 0 && <br />}
                                                <a href={phone.href} className="transition hover:text-orange-500">
                                                    {phone.display}
                                                </a>
                                            </span>
                                        ))}
                                    </p>
                                </ContactItem>

                                {/* Email */}
                                <ContactItem
                                    icon={<FiMail className="h-6 w-6" />}
                                    title="Email Us"
                                >
                                    <p>
                                        <a
                                            href={INSTITUTE_CONTACT.emailHref}
                                            className="break-all transition hover:text-orange-500"
                                        >
                                            {INSTITUTE_CONTACT.email}
                                        </a>
                                    </p>
                                </ContactItem>

                                {/* Opening Hours */}
                                <ContactItem
                                    icon={<FiClock className="h-6 w-6" />}
                                    title="Opening Hours"
                                >
                                    <p>
                                        {INSTITUTE_CONTACT.officeHours}
                                    </p>
                                </ContactItem>
                            </div>

                            {/* Branch information */}
                            <div className="mt-10 border-t border-slate-200 pt-8">
                                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                                    Austra Training Institute
                                </p>

                                <h3 className="font-(--font-nunito) text-2xl text-[#0B1F3A]">
                                    Empowering Futures Through Education
                                </h3>

                                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                                    Connect with Austra for professional training, computer
                                    courses, language programmes, IELTS preparation, and other
                                    career-focused educational opportunities.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------------- */
/* Contact Item                                                               */
/* -------------------------------------------------------------------------- */

function ContactItem({
    icon,
    title,
    children,
}: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm bg-orange-50 text-orange-500">
                {icon}
            </div>

            <div className="min-w-0">
                <h3 className="mb-2 font-(--font-nunito) text-base text-[#0B1F3A]">
                    {title}
                </h3>

                <div className="text-sm leading-6 text-slate-500">{children}</div>
            </div>
        </div>
    );
}
