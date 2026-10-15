import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

const focus = [
  {
    number: "01",
    label: "Practical skills",
    description: "Lab work, simulation, and real clinical or industry practice — not lectures alone.",
  },
  {
    number: "02",
    label: "Real-world confidence",
    description: "Training built to be used immediately, not filed away for later.",
  },
  {
    number: "03",
    label: "Pathways beyond Kenya",
    description: "Frameworks aligned to international standards, for wherever the work takes you.",
  },
];

export default function Philosophy() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-50 py-16 text-[#0B1330] sm:py-20 lg:py-28 2xl:py-36">
      {/* Parallax Background Background Image + Overlays */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-40"
        style={{ backgroundImage: "url('/cta/class.jpg')" }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/30 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-b from-white via-white/30 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 2xl:max-w-384 3xl:max-w-[1920px]">
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-12">

          {/* LEFT — STATEMENT */}
          <div className="flex flex-col justify-between lg:col-span-7 lg:pr-6 2xl:pr-12">
            <div className="inline-flex items-center gap-2 rounded-sm border-l-2 border-orange-400 bg-orange-400/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 sm:text-sm">

              Our philosophy
            </div>

            <h2
              className="mt-6 text-3xl font-extrabold leading-[1.15] tracking-tight text-[#0B1330] sm:text-4xl lg:text-5xl 2xl:text-6xl"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              Education should be <span className="underline decoration-orange-400 decoration-4 underline-offset-8">enabling and empowering.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg 2xl:mt-8 2xl:text-xl 2xl:leading-relaxed">
              We focus on practical skills, meaningful training, and the confidence to use what you learn in the real world. We support students as they start a career, change direction, build a new skill, or prepare for opportunities beyond Kenya, our role is to give them the knowledge, practice, and support to take that next step.
            </p>
            <div></div>
          </div>

          {/* RIGHT — NAVY FOCUS PANEL */}
          <div className="lg:col-span-5">
            <div className="relative h-full overflow-hidden rounded-sm bg-[#0B1330]/95 p-8 shadow-2xl ring-1 ring-white/10 sm:p-10 2xl:p-12">
              {/* Decorative Background Accent */}
              <div className="absolute -top-24 -right-24 h-60 w-60 rounded-full bg-orange-500/10 blur-3xl" />

              <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                {focus.map((item, i) => (
                  <div
                    key={item.label}
                    className={`group py-4 transition-all duration-300 first:pt-0 last:pb-0 ${i !== focus.length - 1 ? "border-b border-white/10 pb-6" : ""
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-orange-400/80">
                          {item.number}
                        </span>
                        <h3 className="text-lg font-bold text-white transition-colors duration-200 group-hover:text-orange-400 sm:text-xl 2xl:text-2xl">
                          {item.label}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base 2xl:text-lg">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA BAND */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-sm  bg-white/10 p-8 shadow-sm backdrop-blur-md sm:flex-row sm:items-center lg:mt-20 2xl:mt-28">
          <div>
            <h3 className="text-xl font-bold text-[#0B1330] sm:text-2xl 2xl:text-3xl">
              Ready to take the next step?
            </h3>
            <p className="mt-1 text-sm text-slate-600 sm:text-base">
              Explore our wide range of industry-aligned certificate and diploma programs.
            </p>
          </div>

          <Link
            href="/courses"
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-sm bg-orange-400 px-8 py-4 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition-all duration-300 hover:bg-[#0B1330] hover:shadow-xl 2xl:px-9 2xl:py-5 2xl:text-base"
          >
            <span className="relative z-10">Discover our programs</span>
            <FiArrowUpRight
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              size={20}
            />
          </Link>
        </div>

      </div>
    </section>
  );
}