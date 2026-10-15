import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export default function AboutHero() {
  return (
    <main className="relative w-full overflow-hidden bg-white text-[#0B1330]">
      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/white1.avif"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70 md:opacity-45 object-center"
        />
      </div>

      <style>{`
        @keyframes austraRise {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes austraDraw {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes austraReveal {
          from { clip-path: inset(0 0 100% 0); }
          to   { clip-path: inset(0 0 0% 0); }
        }
        .austra-rise {
          opacity: 0;
          animation: austraRise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
        }
        .austra-rule {
          transform: scaleX(0);
          transform-origin: left;
          animation: austraDraw 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
        }
        .austra-image {
          clip-path: inset(0 0 100% 0);
          animation: austraReveal 1s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .austra-rise, .austra-rule, .austra-image {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            clip-path: none !important;
          }
        }
      `}</style>

      {/* Hero Content */}
      <section className="relative z-10 w-full px-6 pt-16 pb-1 sm:px-8 lg:px-12 lg:pt-24 2xl:px-16 2xl:pt-32 3xl:px-24 3xl:pt-40">
        <div className="mx-auto w-full max-w-7xl 2xl:max-w-384 3xl:max-w-[1920px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 2xl:gap-24 3xl:gap-32">

            {/* Main Introduction */}
            <div className="lg:col-span-7">
              <div className="flex gap-6 sm:gap-8 2xl:gap-10">
                {/* Marking rule — signals the start of the About narrative */}
                <span
                  className="austra-rule mt-2 hidden w-1 shrink-0 self-stretch bg-orange-400 sm:block 2xl:w-1.5"
                  style={{ animationDelay: "0.15s" }}
                />

                <div className="flex flex-col gap-4 pt-10 md:pt-16 sm:gap-6 2xl:gap-8 2xl:pt-20">
                  <h2 className="austra-rise max-w-2xl text-3xl font-bold leading-[1.08] tracking-tight text-[#0B1330] sm:text-4xl lg:text-[3.25rem] 2xl:max-w-4xl 2xl:text-6xl 3xl:text-7xl">
                    Building skills.
                    <br />
                    Shaping futures.
                  </h2>

                  <p
                    className="austra-rise mt-5 max-w-xl text-base leading-7 text-[#6B7280] sm:text-lg sm:leading-8 2xl:mt-6 2xl:max-w-2xl 2xl:text-xl 2xl:leading-9 3xl:max-w-3xl 3xl:text-2xl"
                    style={{ animationDelay: "0.18s" }}
                  >
                    Through TVET programmes, caregiving and healthcare
                    training, language courses, and practical ICT education,
                    we create pathways that connect learning with real
                    careers.
                  </p>

                  {/* CTA */}
                  <div
                    className="austra-rise mt-10 sm:mt-12 2xl:mt-16"
                    style={{ animationDelay: "0.26s" }}
                  >
                    <Link
                      href="/courses"
                      className="group relative inline-flex items-center gap-3 overflow-hidden bg-orange-400 px-6 py-3.5 text-sm font-semibold text-[#0B1330] transition-colors duration-300 hover:text-orange-400 2xl:px-8 2xl:py-4.5 2xl:text-base 3xl:px-10 3xl:py-5 3xl:text-lg"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-[#0B1330] transition-transform duration-300 ease-out group-hover:translate-x-0" />
                      <span className="relative z-10">Explore our programmes</span>
                      <FiArrowUpRight
                        className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        size={18}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Institute Information */}
            <div
              className="austra-rise lg:col-span-5 lg:pl-8 xl:pl-16 2xl:pl-20"
              style={{ animationDelay: "0.32s" }}
            >
              <div className="pt-2 lg:pt-8 2xl:pt-16">
                <h3 className="mb-6 text-lg font-semibold tracking-tight text-[#0B1330] 2xl:mb-8 2xl:text-xl 3xl:text-2xl">
                  More on us
                </h3>

                <ul className="border-t-2 border-[#0B1330]">
                  {[
                    {
                      label: "Philosophy",
                      link: "#philosophy",
                    },
                    {
                      label: "Our mission",
                      link: "#mission",
                    },
                    {
                      label: "Our Team",
                      link: "#team",
                    },
                  ].map((item) => (
                    <li key={item.label} className="group relative border-b border-gray-200">
                      <Link
                        href={item.link}
                        className="block w-full"
                      >
                        {/* Slide-in Hover Fill */}
                        <span className="absolute inset-y-0 left-0 w-0 bg-[#0B1330] transition-[width] duration-300 ease-out group-hover:w-full" />

                        <div className="relative z-10 flex items-center justify-between px-2 py-5 transition-colors duration-300 2xl:py-7">
                          <span className="text-sm font-medium leading-6 text-[#0B1330] transition-colors duration-300 group-hover:text-white sm:text-base 2xl:text-lg 2xl:leading-7">
                            {item.label}
                          </span>

                          <FiArrowUpRight
                            className="text-[#0B1330] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange-400"
                            size={18}
                          />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Admissions Link */}
                <div className="mt-8 2xl:mt-12">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 border-b-2 border-orange-400 pb-1 text-sm font-semibold text-[#0B1330] transition-colors hover:text-orange-500 2xl:text-base 3xl:text-lg"
                  >
                    Talk to admissions
                    <FiArrowUpRight
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      size={18}
                    />
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Featured Image */}
          <div className="mt-12 lg:mt-20 2xl:mt-28 3xl:mt-36">
            <div
              className="austra-image relative aspect-video w-full overflow-hidden rounded-sm 2xl:aspect-21/9"
              style={{ animationDelay: "0.3s" }}
            >
              <Image
                src="/cta/staff2.jpg"
                alt="Students and staff at Austra Training Institute in Eldoret"
                fill
                priority
                sizes="(max-width: 1536px) 100vw, 1920px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}