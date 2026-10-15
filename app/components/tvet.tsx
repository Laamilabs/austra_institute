"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    display: "swap",
    weight: [
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
    ],
});

export default function TVETCertification() {
    return (
        <section
            className={`${poppins.variable} relative z-20 w-full -mt-6 sm:-mt-12 sm:pb-16 md:-mt-10 lg:-mt-12`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="rounded-lg border border-t-4 border-orange-500/80 bg-white/90 p-6 shadow-xl transition-shadow duration-300 hover:shadow-2xl sm:p-8">
                    <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">

                        {/* TVET Logo */}
                        <div className="flex w-full justify-center md:w-4/12">
                            <div className="relative flex h-32 w-48 items-center justify-center rounded-sm p-4 sm:h-36 sm:w-52 md:h-40 md:w-56">
                                <Image
                                    src="/tvet.png"
                                    alt="TVET accreditation logo"
                                    fill
                                    sizes="240px"
                                    className="object-contain p-2"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div
                            className="w-full md:w-8/12"
                            style={{ fontFamily: "var(--font-poppins)" }}
                        >
                            {/* Accreditation Label */}
                            <span className="mb-3 inline-block w-full rounded-sm text-center sm:text-start bg-orange-50 px-3 py-1 text-sm font-bold tracking-wide text-orange-600 sm:text-base">
                                TVET ACCREDITED
                            </span>

                            {/* Heading */}
                            <h2 className="mb-3 text-2xl font-bold tracking-tight text-center sm:text-start text-[#0B1F3A] sm:text-3xl" style={{ fontFamily: "var(--font-nunito)" }}>
                                Recognised. Accredited. Career-focused.
                            </h2>

                            {/* Description */}
                            <p className="max-w-xl text-sm font-normal leading-7 text-center sm:text-start text-[#0B1F3A] sm:text-base">
                                Austra Training Institute is TVET accredited, offering
                                recognised vocational training designed to prepare students
                                for real careers.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}