"use client";

import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

export default function ContactSection() {
    return (
        <section className="relative mb-24 w-full bg-white">
            {/* Map */}
            <div className="relative h-100 w-full overflow-hidden sm:h-110 lg:h-112.5">
                <iframe
                    title="Austra Training Institute Location Map"
                    className="h-full min-h-0 w-full border-0"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1225.9880361174933!2d35.271790472213745!3d0.5168603000000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17810179667d6d9f%3A0x4ee051166531a269!2sAussiz%20Education%20%26%20Training!5e1!3m2!1sen!2ske!4v1736767720950!5m2!1sen!2ske"
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

                                <h2 className="text-3xl font-bold text-[#0B1F3A] sm:text-4xl">
                                    Contact Us
                                </h2>
                                <p className="mt-3 text-sm leading-6 md:hidden text-slate-500 sm:text-base">
                                    Have a question about our courses, admissions, training
                                    programmes, or student support? Send us a message.
                                </p>
                            </div>

                            <form className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-sm font-semibold text-[#0B1F3A]"
                                    >
                                        Name
                                    </label>

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Your name"
                                        className="w-full rounded-sm border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-semibold text-[#0B1F3A]"
                                    >
                                        Email address
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full rounded-sm border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="mb-2 block text-sm font-semibold text-[#0B1F3A]"
                                    >
                                        Message
                                    </label>

                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        placeholder="How can we help you?"
                                        className="w-full resize-none rounded-sm border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full rounded-sm bg-[#0B1F3A] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-orange-500"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="lg:col-span-7">
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                                {/* Address */}
                                <ContactItem
                                    icon={<FiMapPin className="h-6 w-6" />}
                                    title="Visit Us"
                                >
                                    <p>
                                        Teryet Business Centre
                                        <br />
                                        Room 28
                                        <br />
                                        Kitale Town, Kenya
                                    </p>
                                </ContactItem>

                                {/* Phone */}
                                <ContactItem
                                    icon={<FiPhone className="h-6 w-6" />}
                                    title="Call Us"
                                >
                                    <p>
                                        <a
                                            href="tel:0725990232"
                                            className="transition hover:text-orange-500"
                                        >
                                            0725 990 232
                                        </a>
                                        <br />
                                        <a
                                            href="tel:0119132560"
                                            className="transition hover:text-orange-500"
                                        >
                                            011 913 2560
                                        </a>
                                    </p>
                                </ContactItem>

                                {/* Email */}
                                <ContactItem
                                    icon={<FiMail className="h-6 w-6" />}
                                    title="Email Us"
                                >
                                    <p>
                                        <a
                                            href="mailto:info@aussizeducationandtraining.net"
                                            className="break-all transition hover:text-orange-500"
                                        >
                                            info@aussizeducationandtraining.net
                                        </a>
                                    </p>
                                </ContactItem>

                                {/* Opening Hours */}
                                <ContactItem
                                    icon={<FiClock className="h-6 w-6" />}
                                    title="Opening Hours"
                                >
                                    <p>
                                        Monday – Friday
                                        <br />
                                        8:00 AM – 5:00 PM
                                        <br />
                                        <span className="text-slate-400">
                                            Saturday by appointment
                                        </span>
                                    </p>
                                </ContactItem>
                            </div>

                            <p className="mt-3 text-sm leading-6 hidden md:block text-slate-500 sm:text-base">
                                Have a question about our courses, admissions, training
                                programmes, or student support? Send us a message.
                            </p>
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