"use client";

import Image from "next/image";

interface CoursesHeroProps {
    search: string;
    onSearchChange: (value: string) => void;
}

export default function CoursesHero({ search, onSearchChange }: CoursesHeroProps) {
    return (
        <div className="cp-hero-in relative overflow-hidden bg-[#0B1E3D]">
            {/* Background Image */}
            <Image
                src="/cta/class.jpg"
                alt="Campus background"
                fill
                priority
                className="object-cover object-center"
            />

            {/* Dark Overlay (Gradient for contrast and readability) */}
            <div className="absolute inset-0 bg-linear-to-r from-[#0B1E3D]/95 via-[#0B1E3D]/85 to-[#0B1E3D]/70" />

            {/* Hero Content */}
            <div className="relative mx-auto max-w-400 px-6 pt-24 pb-10 md:px-8 md:pt-36 md:pb-10 ">
                <p className="text-xs font-medium text-orange-400">
                    Course catalog
                </p>

                <h1 className="mt-3 max-w-xl text-3xl font-bold leading-tight text-white md:text-4xl">
                    Find the right course, across every department.
                </h1>

                <p className="mt-3 max-w-lg text-sm text-[#AEB9CC]">
                    Search by course name, code, or department to see what's
                    offered right now.
                </p>

                <div className="mt-7 max-w-xl">
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <svg
                                className="h-5 w-5 text-[#7C8AA3]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.8}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m21 21-4.35-4.35m1.35-5.15a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
                                />
                            </svg>
                        </div>

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Search all courses..."
                            className="w-full rounded-[3px] border border-[#26385C] bg-[#102544]/90 py-3.5 pl-12 pr-4 text-sm text-white backdrop-blur-sm outline-none transition-colors placeholder:text-[#7C8AA3] focus:border-orange-400 focus:bg-[#0E2038] focus:ring-1 focus:ring-orange-400"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}