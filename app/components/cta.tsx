"use client";

import Image from "next/image";
import Link from "next/link";

const images = {
  column1: [
    "/cta/cam1.jpg",
    "/cta/careclass.png",
    "/cta/comp1.png",
    "/cta/med1.jpg",
    "/cta/staff1.jpg",
    "/cta/students1.png",
  ],
  column2: [
    "/cta/careclass2.png",
    "/cta/class.jpg",
    "/cta/music3.jpg",
    "/cta/careclass3.png",
    "/cta/tvet.png",
    "/cta/comp2.jpg",
  ],
  column3: [
    "/cta/posters/1.png",
    "/cta/posters/2.png",
    "/cta/posters/3.png",
    "/cta/posters/4.png",
    "/cta/posters/5.png",
    "/cta/posters/6.png",
  ],
};

function ImageCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group relative h-32 w-full shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100 shadow-sm sm:h-40 md:h-44 lg:h-48 2xl:h-52 3xl:h-56">
      {/* Subtle corner mark accent */}
      <span className="absolute left-0 top-0 z-10 h-2.5 w-2.5 border-l-2 border-t-2 border-orange-500 opacity-80" />
      <span className="absolute right-0 top-0 z-10 h-2.5 w-2.5 border-r-2 border-t-2 border-orange-500 opacity-80" />
      <span className="absolute bottom-0 left-0 z-10 h-2.5 w-2.5 border-b-2 border-l-2 border-orange-500 opacity-80" />
      <span className="absolute bottom-0 right-0 z-10 h-2.5 w-2.5 border-b-2 border-r-2 border-orange-500 opacity-80" />

      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 30vw, (max-width: 1024px) 25vw, (max-width: 1536px) 15vw, 12vw"
        className="object-cover object-center transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[#0B1F3A]/10 transition-colors duration-300 group-hover:bg-transparent" />
    </div>
  );
}

export default function CTA() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-50 py-12 lg:py-16 2xl:py-24 3xl:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-[1536px] 2xl:px-12 3xl:max-w-[1920px]">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12 2xl:gap-16 3xl:gap-20">

          {/* =====================================================
              LEFT SIDE: MOVING IMAGE CAROUSEL COLUMNS
          ===================================================== */}
          <div className="relative h-90 w-full overflow-hidden sm:h-107.5 md:h-125 lg:col-span-6 lg:h-130 2xl:h-140 3xl:h-160 xl:col-span-5">
            <div className="grid h-full grid-cols-3 gap-2 sm:gap-3 md:gap-4 2xl:gap-5">

              {/* Column 1 — Scroll Down */}
              <div className="scroll-wrapper relative h-full overflow-hidden">
                <div className="scroll-down flex flex-col gap-2 sm:gap-3 md:gap-4 2xl:gap-5">
                  {[...images.column1, ...images.column1].map((src, index) => (
                    <ImageCard
                      key={`col1-${index}`}
                      src={src}
                      alt="Austra Training Institute - Health & Caregiving Training"
                    />
                  ))}
                </div>
              </div>

              {/* Column 2 — Scroll Up */}
              <div className="scroll-wrapper relative h-full overflow-hidden">
                <div className="scroll-up flex flex-col gap-2 sm:gap-3 md:gap-4 2xl:gap-5">
                  {[...images.column2, ...images.column2].map((src, index) => (
                    <ImageCard
                      key={`col2-${index}`}
                      src={src}
                      alt="Austra Training Institute - ICT and Practical Classes"
                    />
                  ))}
                </div>
              </div>

              {/* Column 3 — Scroll Down (Slower) */}
              <div className="scroll-wrapper relative h-full overflow-hidden">
                <div className="scroll-down-slow flex flex-col gap-2 sm:gap-3 md:gap-4 2xl:gap-5">
                  {[...images.column3, ...images.column3].map((src, index) => (
                    <ImageCard
                      key={`col3-${index}`}
                      src={src}
                      alt="Austra Training Institute - Posters and Events"
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* =====================================================
              RIGHT SIDE: CONTENT (LEFT-ALIGNED TEXT)
          ===================================================== */}
          <div className="flex flex-col items-start text-left lg:col-span-6 lg:pl-6 xl:col-span-7 2xl:pl-8">

            {/* Tagline Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-3.5 py-1.5 shadow-sm 2xl:mb-6 2xl:px-4 2xl:py-2">
              <span className="text-base font-semibold uppercase tracking-wider text-orange-400 sm:text-lg 2xl:text-xl">
                Admissions Open
              </span>
            </div>

            {/* Heading */}
            <h2
              className="text-3xl font-extrabold leading-tight text-[#0B1F3A] sm:text-4xl lg:text-5xl 2xl:text-6xl 3xl:text-7xl"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              Build Practical Skills for Market-Demand Careers.
            </h2>

            {/* Copy */}
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg 2xl:mt-6 2xl:max-w-2xl 2xl:text-xl 2xl:leading-relaxed">
              Gain recognized certifications in Health Sciences, Caregiving, ICT, Foreign Languages, and Business Studies designed to qualify you for domestic and international opportunities.
            </p>

            {/* Key Stats Grid */}
            <div className="mt-8 grid w-full max-w-xl grid-cols-2 gap-4 border-y border-slate-200 py-6 sm:grid-cols-4 2xl:mt-10 2xl:max-w-2xl 2xl:py-8">
              <div>
                <p className="text-2xl font-extrabold text-[#0B1F3A] 2xl:text-3xl">50+</p>
                <p className="mt-0.5 text-xs font-medium text-slate-500 2xl:text-sm">Certified Courses</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#0B1F3A] 2xl:text-3xl">10K+</p>
                <p className="mt-0.5 text-xs font-medium text-slate-500 2xl:text-sm">Trained Students</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#0B1F3A] 2xl:text-3xl">95%</p>
                <p className="mt-0.5 text-xs font-medium text-slate-500 2xl:text-sm">Graduation Rate</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#0B1F3A] 2xl:text-3xl">TVET</p>
                <p className="mt-0.5 text-xs font-medium text-slate-500 2xl:text-sm">Accredited</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center 2xl:mt-10 2xl:gap-4">
              <Link
                href="/courses"
                className="group inline-flex items-center justify-center rounded-md bg-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 2xl:px-8 2xl:py-4 2xl:text-base"
              >
                Browse All Courses
                <svg
                  className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 2xl:h-5 2xl:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>

              <Link
                href="/apply"
                className="inline-flex items-center justify-center rounded-md border-2 border-[#0B1F3A] bg-transparent px-7 py-3.5 text-sm font-bold text-[#0B1F3A] transition-all duration-200 hover:bg-[#0B1F3A] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#0B1F3A] focus:ring-offset-2 2xl:px-8 2xl:py-4 2xl:text-base"
              >
                Apply Online Today
              </Link>
            </div>

            {/* Location Footnote */}
            <div className="mt-6 flex items-center gap-2 text-xs text-slate-500 2xl:mt-8 2xl:text-sm">
              <svg
                className="h-4 w-4 shrink-0 text-orange-500 2xl:h-5 2xl:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Main Campus: Komora Center, Eldoret City, Kenya</span>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom accent strip */}
      <div className="absolute bottom-0 left-0 right-0 flex h-1 w-full">
        <div className="h-full w-2/3 bg-[#0B1F3A]" />
        <div className="h-full w-1/3 bg-orange-500" />
      </div>

      {/* Continuous Animation Styles */}
      <style jsx>{`
        .scroll-down {
          animation: infiniteScrollDown 22s linear infinite;
        }

        .scroll-up {
          animation: infiniteScrollUp 26s linear infinite;
        }

        .scroll-down-slow {
          animation: infiniteScrollDown 30s linear infinite;
        }

        .scroll-wrapper:hover .scroll-down,
        .scroll-wrapper:hover .scroll-up,
        .scroll-wrapper:hover .scroll-down-slow {
          animation-play-state: paused;
        }

        @keyframes infiniteScrollDown {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes infiniteScrollUp {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .scroll-down,
          .scroll-up,
          .scroll-down-slow {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}