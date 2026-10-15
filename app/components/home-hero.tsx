"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white font-sans">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <picture>
          {/* Ultrawide Screens (2xl: 1536px and up) */}
          <source media="(min-width: 1536px)" srcSet="/hero4.png" />
           <source media="(max-width: 640px)" srcSet="/hero5.png" />
          {/* Standard Screens */}
          <img
            src="/hero2.png"
            alt="Austra Training Institute"
            className="h-full w-full origin-center object-cover object-left animate-[kenBurns_10s_ease-in-out_infinite_alternate]"
          />
        </picture>
      </div>

      {/* Hero Content Wrapper */}
      <div className="relative z-10 flex min-h-screen items-center overflow-visible">
        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-20 sm:px-8 sm:py-20 md:py-24 lg:px-12 xl:px-16 2xl:max-w-384 2xl:px-20 3xl:max-w-[1920px]">
          <div className="relative z-20 flex w-full max-w-2xl flex-col items-center justify-between text-center md:items-start md:text-left 2xl:max-w-3xl 3xl:max-w-4xl">

            {/* Accent */}
            <div className="hero-reveal hero-reveal-1 mt-0 flex items-center gap-3 md:mt-8">
              <span className="h-1 w-0 rounded-full bg-orange-400 animate-[growLine_0.9s_ease-out_0.5s_forwards]" />

              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#0B1F3A] sm:text-sm sm:tracking-[0.2em] 2xl:text-base">
                Empower Your Potential. Ignite Your Future.
              </span>
            </div>

            {/* Heading */}
            <h1
              className="hero-heading mt-6 w-full max-w-2xl text-7xl font-extrabold leading-[1.02] tracking-tight text-[#0B1F3A] sm:text-7xl md:text-left md:text-7xl lg:text-8xl xl:text-8xl 2xl:max-w-3xl 2xl:text-9xl 3xl:max-w-4xl 3xl:text-[10rem]"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              AUSTRA <br />
              <p className="text-3xl sm:text-4xl md:text-left md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl">
                TRAINING INSTITUTE
              </p>
            </h1>

            {/* Description */}
            <p className="hero-reveal hero-reveal-2 mt-6 w-full max-w-lg text-center text-base font-bold leading-7 text-[#0B1F3A] sm:text-lg sm:leading-8 md:text-left 2xl:max-w-xl 2xl:text-xl 3xl:max-w-2xl 3xl:text-2xl 3xl:leading-10">
              Gain practical skills and TVET-certified qualifications across
              Healthcare, IT, Business, and Language programs in Eldoret.
            </p>

            {/* CTA */}
            <div className="hero-reveal hero-reveal-3 mt-8 flex w-full flex-col items-center gap-5 sm:flex-row sm:items-center md:justify-start 3xl:mt-12 3xl:gap-8">
              <Link
                href="/courses"
                className="group relative inline-flex w-full max-w-sm items-center justify-center overflow-hidden rounded-full bg-orange-400 px-7 py-4 text-sm font-bold text-[#0B1F3A] shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-orange-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 sm:w-auto sm:max-w-none 2xl:px-9 2xl:py-5 2xl:text-base 3xl:px-12 3xl:py-6 3xl:text-lg"
              >
                <span className="relative z-10 flex items-center">
                  Explore Courses
                  <svg
                    className="ml-7 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 3xl:h-6 3xl:w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M13 9l3 3m0 0l-3 3m3-3H8"
                    />
                  </svg>
                </span>
              </Link>

              <p className="w-full text-center text-sm font-medium text-slate-500 sm:w-auto md:text-left 2xl:text-base 3xl:text-lg">
                <Link
                  href="/apply"
                  className="font-bold text-[#0B1F3A] underline decoration-orange-400 decoration-2 underline-offset-4 transition-colors hover:text-orange-500"
                >
                  Apply Now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Cue */}
      <div className="scroll-cue absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#0B1F3A]/60">
          Scroll
        </span>
        <span className="h-8 w-px bg-[#0B1F3A]/30" />
      </div>

      {/* Animations */}
      <style jsx global>{`
        .hero-reveal {
          opacity: 0;
          transform: translateY(24px);
          animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .hero-reveal-1 {
          animation-delay: 0.1s;
        }

        .hero-reveal-2 {
          animation-delay: 0.4s;
        }

        .hero-reveal-3 {
          animation-delay: 0.55s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-heading {
          opacity: 0;
          transform: translateY(35px) scale(0.97);
          animation: heroTextReveal 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards;
        }

        @keyframes heroTextReveal {
          0% {
            opacity: 0;
            transform: translateY(35px) scale(0.97);
          }
          60% {
            opacity: 1;
            transform: translateY(-3px) scale(1.005);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes growLine {
          from {
            width: 0;
          }
          to {
            width: 2.5rem;
          }
        }

        @keyframes kenBurns {
          from {
            transform: scale(1) translateX(0);
          }
          to {
            transform: scale(1.08) translateX(-1%);
          }
        }

        .scroll-cue {
          opacity: 0;
          animation:
            fadeInUp 0.8s ease-out 1.2s forwards,
            bob 2.2s ease-in-out 2s infinite;
        }

        @keyframes bob {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-heading,
          .hero-reveal,
          .scroll-cue,
          * {
            animation-duration: 0.01ms !important;
            animation-delay: 0s !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}