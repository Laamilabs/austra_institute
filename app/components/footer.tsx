"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <h4 className="flex items-center gap-2 text-sm font-bold text-white">
            <span className="h-3 w-0.75 bg-orange-500" />
            {children}
        </h4>
    );
}

export default function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail("");
        }
    };

    return (
        <footer
            className="relative bg-[#0B1F3A] font-sans text-slate-300"
            style={{ fontFamily: "var(--font-nunito)" }}
        >
            {/* Top accent line */}
            <div className="flex h-1 w-full">
                <div className="h-full w-2/3 bg-slate-700" />
                <div className="h-full w-1/3 bg-orange-500" />
            </div>

            {/* Main Footer Body */}
            <div className="relative mx-auto px-4 pt-16 pb-12 sm:px-6 lg:px-8">

                {/* TOP ROW: Brand Info & Newsletter */}
                <div className="grid grid-cols-1 gap-10 border-b border-slate-800 pb-12 lg:grid-cols-12">

                    {/* Brand Overview */}
                    <div className="lg:col-span-5">
                        <Link href="/" className="w-full">
                            <div className="relative flex justify-center sm:justify-start bg-zinc-50/85 p-1.5">
                                <Image
                                    src="/logo.png"
                                    alt="Austra Training Institute Logo"
                                    width={200}
                                    height={100}
                                    className="h-auto w-50 object-contain"
                                />
                            </div>
                        </Link>

                        <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
                            Austra Training Institute is a premier TVET-accredited institution in
                            Eldoret, Kenya, empowering students through market-oriented training
                            in Health Sciences, ICT, Caregiving, and Global Languages.
                        </p>
                    </div>

                    {/* Newsletter Box */}
                    <div className="group relative border border-slate-800 bg-slate-900/60 p-6 lg:col-span-7 lg:p-8">
                        {/* Corner brackets — matches partners/CTA cards */}
                        <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-slate-600" />
                        <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-slate-600" />
                        <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-slate-600" />
                        <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-slate-600" />

                        <div className="flex flex-col justify-between gap-6">
                            <div>
                                <h3 className="text-lg font-bold text-white">
                                    Stay informed on new intakes &amp; scholarships
                                </h3>
                                <p className="mt-1 text-xs text-slate-400">
                                    Subscribe to receive updates on upcoming registration deadlines and courses.
                                </p>
                            </div>

                            {subscribed ? (
                                <div className="border border-emerald-800 bg-emerald-950/80 p-3 text-sm font-medium text-emerald-400">
                                    ✓ Thank you! You have been subscribed.
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleSubscribe}
                                    className="flex w-full flex-col gap-2 sm:flex-row"
                                >
                                    <input
                                        type="email"
                                        required
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                    />
                                    <button
                                        type="submit"
                                        className="shrink-0 bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-orange-600"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                </div>

                {/* MIDDLE ROW: Navigation Links Grid */}
                <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4 lg:grid-cols-5">

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <SectionHeading>Navigation</SectionHeading>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            <li><Link href="/" className="transition hover:text-orange-400">Home</Link></li>
                            <li><Link href="/about" className="transition hover:text-orange-400">About ATI</Link></li>
                            <li><Link href="/courses" className="transition hover:text-orange-400">Browse Courses</Link></li>
                            <li><Link href="/apply" className="transition hover:text-orange-400">Online Admission</Link></li>
                            <li><Link href="/news" className="transition hover:text-orange-400">News & Events</Link></li>
                            <li><Link href="/contact" className="transition hover:text-orange-400">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Health & Caregiving */}
                    <div className="col-span-1">
                        <SectionHeading>Health &amp; Care</SectionHeading>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            <li><Link href="/courses/67b4f458bd2ed471974bb09e" className="transition hover:text-orange-400">Caregiver Training</Link></li>
                            <li><Link href="/courses/67b4f4ddbd2ed471974bb023" className="transition hover:text-orange-400">Nursing Aide Course</Link></li>
                            <li><Link href="/courses/6864dcb3840c3052208635ff" className="transition hover:text-orange-400">Health Support Services 5</Link></li>
                            <li><Link href="/courses" className="transition hover:text-orange-400">Phlebotomy</Link></li>
                            <li><Link href="/courses" className="transition hover:text-orange-400">First Aide</Link></li>
                        </ul>
                    </div>

                    {/* ICT & Languages */}
                    <div className="col-span-1">
                        <SectionHeading>ICT &amp; Languages</SectionHeading>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            <li><Link href="/courses/68639476c53f7a78c20f3939" className="transition hover:text-orange-400">ICT LEVEL 5</Link></li>
                            <li><Link href="/courses/68639601c53f7a78c20f394f" className="transition hover:text-orange-400">ICT LEVEL 4</Link></li>
                            <li><Link href="/courses/67b4f4ddbd2ed471974bb0bc" className="transition hover:text-orange-400">Computer Packages</Link></li>
                            <li><Link href="/courses/6a9a8945470df0ddc0bb2144" className="transition hover:text-orange-400">German Language A1</Link></li>
                            <li><Link href="/courses/69e60eac35e5e1454cd7a359" className="transition hover:text-orange-400">Web Development</Link></li>
                        </ul>
                    </div>

                    {/* Student Portal & Downloads */}
                    <div className="col-span-1">
                        <SectionHeading>Portals &amp; Resources</SectionHeading>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            <li><Link href="/portal/student" className="font-semibold text-orange-400 transition hover:underline">Student Portal Login</Link></li>
                            <li><Link href="/apply" className="transition hover:text-orange-400">Application Form</Link></li>
                            <li><Link href="https://staff.austratraininginstitute.co.ke" className="font-semibold text-orange-400 transition hover:underline">Staff Portal Login</Link></li>
                            <li><Link href="/faqs" className="transition hover:text-orange-400">Frequently Asked Questions</Link></li>
                            <li><Link href="/prospectus.pdf" className="transition hover:text-orange-400">Download Prospectus</Link></li>
                        </ul>
                    </div>

                    {/* Location & Contact Info */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-1">
                        <SectionHeading>Main Campus</SectionHeading>
                        <address className="mt-4 not-italic space-y-3 text-sm text-slate-300">
                            <div className="flex items-start gap-2.5">
                                <svg className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Komora Centre, Eldoret</span>
                            </div>

                            <div className="flex items-start gap-2.5">
                                <svg className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <div className="flex flex-col">
                                    <a href="tel:+254 703 710 401" className="hover:text-orange-400">+254 703 710 401</a>
                                    <a href="tel:+254 720 480 750" className="hover:text-orange-400">+254 720 480 750</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-2.5">
                                <svg className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:info@austratraininginstitute.co.ke" className="break-all hover:text-orange-400">
                                    info@austratraininginstitute.co.ke
                                </a>
                            </div>

                            <div className="flex items-start gap-2.5 pt-1">
                                <svg className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Mon – Fri: 8:00 AM – 5:00 PM</span>
                            </div>
                        </address>
                    </div>

                </div>

                {/* BOTTOM ROW: Copyright & Legal */}
                <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-xs text-slate-500 sm:flex-row">
                    <p className="text-center sm:text-left">
                        © {new Date().getFullYear()} Austra Training Institute. All rights reserved.

                    </p>
                    <div>
                        <Link
                            href="https://www.laamilabs.co.ke"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-medium text-[#A50044] hover:text-[#8A0038]"
                        >
                            <img
                                src="/partners/laami.webp"
                                alt=""
                                className="inline-block h-4 w-4"
                            />
                            Designed and developed by LAAMI LABS
                        </Link>
                        <div className="flex flex-wrap items-center gap-6">
                            <Link href="/terms" className="hover:text-slate-300">Terms & Conditions</Link>
                            <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
                            <Link href="/faq" className="hover:text-slate-300">F.A.Q</Link>
                        </div></div>
                </div>

            </div>
        </footer>
    );
}