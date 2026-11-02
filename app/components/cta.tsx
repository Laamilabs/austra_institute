import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";

/**
 * Bento layout on a 4 × 4 grid (items flow in this order):
 *
 *  ┌───────────┬────┬────┐
 *  │           │ 2  │    │
 *  │     1     ├────┤ 3  │
 *  │           │ 4  │    │
 *  ├────┬──────┴────┼────┤
 *  │    │     6     │ 7  │
 *  │ 5  ├────┬──────┴────┤
 *  │    │ 8  │     9     │
 *  └────┴────┴───────────┘
 *
 *  `featured` tiles always show their caption; the rest reveal it on hover.
 *  Tile 8 is the navy campus card (no image).
 */
type Tile =
  | { kind: "image"; src: string; alt: string; caption: string; span: string; featured?: boolean }
  | { kind: "campus"; span: string };

const bento: Tile[] = [
  { kind: "image", src: "/cta/careclass3.png", alt: "Students learning together at Austra Training Institute", caption: "Care training", span: "col-span-2 row-span-2", featured: true },
  { kind: "image", src: "/cta/cam1.jpg", alt: "Media and photography training at Austra", caption: "Media", span: "" },
  { kind: "image", src: "/cta/careclass2.png", alt: "Caregiving class at Austra", caption: "Caregiving", span: "row-span-2" },
  { kind: "image", src: "/cta/med1.jpg", alt: "Health support training at Austra", caption: "Health support", span: "" },
  { kind: "image", src: "/cta/class.jpg", alt: "Classroom session at Austra", caption: "Classroom", span: "row-span-2" },
  { kind: "image", src: "/cta/staff2.jpg", alt: "Austra staff and trainers", caption: "Our trainers", span: "col-span-2", featured: true },
  { kind: "image", src: "/cta/comp2.jpg", alt: "Practical ICT class at Austra", caption: "ICT", span: "" },
  { kind: "campus", span: "" },
  { kind: "image", src: "/cta/music2.jpg", alt: "Piano classes at Austra", caption: "Music", span: "col-span-2", featured: true },
];

const programmes = [
  { label: "Caregiving", href: "/programmes/caregiving" },
  { label: "Nurse aide & health support", href: "/programmes/health-support" },
  { label: "ICT & digital skills", href: "/programmes/ict-short-courses" },
  { label: "AI workplace automation", href: "/programmes/ai-workplace-automation" },
];

export default function CTA() {
  return (
    <section
      aria-labelledby="cta-title"
      className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 sm:py-14 lg:py-16 2xl:py-24 3xl:py-28 min-[2400px]:py-36"
    >
      {/* Soft background texture + glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(rgba(11,31,58,0.10) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-orange-400/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-[#0B1F3A]/[0.06] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 2xl:max-w-384 2xl:px-12 3xl:max-w-[1920px] min-[2400px]:max-w-[2400px] min-[2400px]:px-16">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-12 2xl:gap-16 3xl:gap-20 min-[2400px]:gap-28">

          {/* =====================================================
              BENTO IMAGE GRID (below the text on mobile, left on desktop)
              Fills the full height of the text column on lg+.
          ===================================================== */}
          <div className="relative order-2 h-96 sm:h-120 lg:order-1 lg:col-span-6 lg:h-auto lg:min-h-130 xl:col-span-5">
            <div className="grid h-full w-full grid-cols-4 grid-rows-4 gap-1.5 sm:gap-2.5 lg:absolute lg:inset-0 2xl:gap-3 min-[2400px]:gap-4">
              {bento.map((tile, i) => {
                if (tile.kind === "campus") {
                  return (
                    <Link
                      key="campus"
                      href="/contact"
                      aria-label="Visit our main campus in Eldoret"
                      className={`group relative flex flex-col justify-between overflow-hidden rounded-sm bg-[#0B1F3A] p-2 text-white shadow-sm ring-1 ring-[#0B1F3A] transition-colors duration-300 hover:bg-[#10305a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 sm:p-3 2xl:p-4 ${tile.span}`}
                    >
                      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-orange-400" />
                      <FiMapPin aria-hidden="true" className="h-4 w-4 text-orange-400 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6" />
                      <span className="leading-tight">
                        <span className="hidden text-[10px] font-medium uppercase tracking-wider text-white/60 sm:block 2xl:text-xs">
                          Main campus
                        </span>
                        <span className="block text-[11px] font-semibold sm:text-sm 2xl:text-lg min-[2400px]:text-2xl">
                          Eldoret
                        </span>
                      </span>
                      <FiArrowUpRight
                        aria-hidden="true"
                        className="absolute right-1.5 top-2 h-3.5 w-3.5 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-400 sm:right-2 sm:top-3 sm:h-4 sm:w-4"
                      />
                    </Link>
                  );
                }

                return (
                  <div
                    key={`${tile.src}-${i}`}
                    className={`group relative overflow-hidden rounded-sm border border-slate-200 bg-slate-100 shadow-sm ${tile.span}`}
                  >
                    <Image
                      src={tile.src}
                      alt={tile.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, (max-width: 1536px) 30vw, 25vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Depth: navy fade from the bottom, clears on hover */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/35 via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-40"
                    />

                    {/* Caption chip */}
                    <span
                      className={`absolute bottom-1.5 left-1.5 z-10 rounded-sm bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold text-[#0B1F3A] shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-all duration-300 sm:bottom-2.5 sm:left-2.5 sm:px-2 sm:py-1 sm:text-xs 2xl:text-sm min-[2400px]:text-lg ${
                        tile.featured
                          ? ""
                          : "hidden sm:block sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
                      }`}
                    >
                      <span aria-hidden="true" className="mr-1.5 inline-block h-1.5 w-1.5 bg-orange-500 align-middle" />
                      {tile.caption}
                    </span>

                    {/* Orange line that draws in on hover */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-orange-400 transition-transform duration-300 ease-out group-hover:scale-x-100"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* =====================================================
              CONTENT
          ===================================================== */}
          <div className="order-1 flex flex-col items-start text-left lg:order-2 lg:col-span-6 lg:pl-6 xl:col-span-7 xl:pl-10 2xl:pl-12 min-[2400px]:pl-20">

            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-0.5 w-8 bg-orange-400 2xl:w-10" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 sm:text-sm 2xl:text-base min-[2400px]:text-lg">
                Programmes
              </span>
            </div>

            {/* Heading */}
            <h2
              id="cta-title"
              className="mt-4 max-w-2xl text-3xl font-bold leading-[1.08] tracking-tight text-[#0B1F3A] sm:text-4xl lg:text-[3.25rem] 2xl:mt-6 2xl:max-w-4xl 2xl:text-6xl 3xl:text-7xl min-[2400px]:max-w-5xl min-[2400px]:text-8xl"
            >
              Skills for health,
              <br />
              care and{" "}
              <span className="relative inline-block">
                technology
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-0.5 h-[0.14em] bg-orange-400 sm:-bottom-1"
                />
              </span>
              .
            </h2>

            {/* Copy */}
            <p className="mt-5 max-w-md text-base leading-7 text-slate-600 sm:max-w-lg sm:text-lg sm:leading-8 2xl:mt-7 2xl:max-w-xl 2xl:text-xl 2xl:leading-9 min-[2400px]:max-w-3xl min-[2400px]:text-2xl min-[2400px]:leading-10">
              Pick a programme, then talk to admissions to confirm requirements, fees and intake dates.
            </p>

            {/* Programme list (same pattern as "More on us") */}
            <div className="mt-8 w-full max-w-xl 2xl:mt-12 2xl:max-w-2xl min-[2400px]:mt-14 min-[2400px]:max-w-4xl">
              <h3 className="mb-4 text-lg font-semibold tracking-tight text-[#0B1F3A] 2xl:mb-6 2xl:text-xl 3xl:text-2xl">
                Explore by pathway
              </h3>

              <ul className="border-t-2 border-[#0B1F3A]">
                {programmes.map((item, i) => (
                  <li key={item.href} className="group relative border-b border-slate-200">
                    <Link href={item.href} className="block w-full focus-visible:outline-none">
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-0 w-0 bg-[#0B1F3A] transition-[width] duration-300 ease-out group-hover:w-full group-focus-within:w-full"
                      />
                      <div className="relative z-10 flex items-center justify-between gap-4 px-2 py-4 sm:py-5 2xl:py-7 min-[2400px]:py-8">
                        <span className="flex items-baseline gap-4 2xl:gap-5">
                          <span
                            aria-hidden="true"
                            className="font-mono text-xs text-slate-400 transition-colors duration-300 group-hover:text-orange-400 group-focus-within:text-orange-400 2xl:text-sm"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm font-medium leading-6 text-[#0B1F3A] transition-colors duration-300 group-hover:text-white group-focus-within:text-white sm:text-base 2xl:text-lg 2xl:leading-7 min-[2400px]:text-2xl">
                            {item.label}
                          </span>
                        </span>
                        <FiArrowUpRight
                          aria-hidden="true"
                          className="shrink-0 text-[#0B1F3A] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-400 group-focus-within:text-orange-400"
                          size={18}
                        />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center 2xl:mt-12 2xl:gap-4 min-[2400px]:mt-14">
              <Link
                href="/courses"
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-sm bg-orange-400 px-6 py-3.5 text-sm font-semibold text-[#0B1F3A] shadow-sm transition-colors duration-300 hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 2xl:px-8 2xl:py-4 2xl:text-base min-[2400px]:px-10 min-[2400px]:py-5 min-[2400px]:text-xl"
              >
                <span aria-hidden="true" className="absolute inset-0 -translate-x-full bg-[#0B1F3A] transition-transform duration-300 ease-out group-hover:translate-x-0" />
                <span className="relative z-10">Browse all courses</span>
                <FiArrowUpRight
                  aria-hidden="true"
                  className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  size={18}
                />
              </Link>

              <Link
                href="/apply"
                className="inline-flex items-center justify-center rounded-sm border-2 border-[#0B1F3A] bg-white/60 px-6 py-3.5 text-sm font-semibold text-[#0B1F3A] backdrop-blur-sm transition-colors duration-200 hover:bg-[#0B1F3A] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A] focus-visible:ring-offset-2 2xl:px-8 2xl:py-4 2xl:text-base min-[2400px]:px-10 min-[2400px]:py-5 min-[2400px]:text-xl"
              >
                Apply online
              </Link>
            </div>

            {/* Location */}
            <p className="mt-6 flex items-center gap-2 text-xs text-slate-500 2xl:mt-8 2xl:text-sm min-[2400px]:text-base">
              <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-orange-400" />
              Main campus: Komora Centre, Eldoret
            </p>
          </div>
        </div>
      </div>

      {/* Bottom accent strip */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 flex h-1 w-full">
        <div className="h-full w-2/3 bg-[#0B1F3A]" />
        <div className="h-full w-1/3 bg-orange-400" />
      </div>
    </section>
  );
}