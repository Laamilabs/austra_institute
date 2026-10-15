"use client";

import Image from "next/image";

const partners = [
  { name: "TVETA", logo: "/partners/tvet.png" },
  { name: "LAAMI LABS", logo: "/partners/laami.webp" },
  { name: "Aussiz Education and Training", logo: "/partners/aussiz.png" },
  { name: "NITA", logo: "/partners/nita.png" },
  { name: "CDACC", logo: "/partners/cdacc.png" },
  { name: "KNEC", logo: "/partners/knec.png" },
  { name: "LAAMI LTD", logo: "/partners/laami.webp" },
  { name: "Ministry of Education", logo: "/partners/moe.png" },
  { name: "Sixty Four College", logo: "/partners/64.png" },
  { name: "Jaitah Memorial Hospital", logo: "/partners/jaitah.png" },
];

export default function PartnersSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
      {/* Faint drafting grid — ties the section to a technical/registry idea without shouting it */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(11,31,58,0.06) 1px, transparent 1px), linear-gradient(rgba(249,115,22,0.035) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-8xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between" style={{ fontFamily: "var(--font-nunito)" }}>
          <div className="flex items-center gap-3">
            <div className="flex h-8 items-center gap-0.75">
              <span className="h-full w-1 bg-[#0B1F3A]" />
              <span className="h-full w-1 bg-orange-600" />
            </div>
            <h2 className="text-xl font-semibold text-orange-400 sm:text-2xl">
              Partners &amp; affiliations
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-[#0B1F3A] sm:text-right">
            Recognized by the regulators, examination bodies and institutions
            we train, assess and work alongside.
          </p>
        </div>

        {/* Carousel */}
        <div className="group/carousel relative overflow-hidden">
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-20 w-10 bg-linear-to-r from-white to-transparent sm:w-20" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-20 w-10 bg-linear-to-l from-white to-transparent sm:w-20" />

          <div className="flex w-max animate-scroll group-hover/carousel:[animation-play-state:paused]">
            <div className="flex shrink-0">
              {partners.map((partner, index) => (
                <PartnerCard key={`a-${partner.name}`} partner={partner} index={index} />
              ))}
            </div>
            <div className="flex shrink-0">
              {partners.map((partner, index) => (
                <PartnerCard key={`b-${partner.name}`} partner={partner} index={index} />
              ))}
            </div>
          </div>
        </div>


      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 34s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

/* =========================================================
   PARTNER CARD — flat, bordered, corner-bracketed like a
   drawing frame; a small reference code stands in for a
   registry entry number rather than decorative numbering.
========================================================= */

function PartnerCard({
  partner,
  index,
}: {
  partner: (typeof partners)[number];
  index: number;
}) {
  const code = `P–${String(index + 1).padStart(2, "0")}`;

  return (
    <div className="group relative mr-4 h-48 w-56 shrink-0 border border-slate-200 bg-white transition-colors duration-200 last:mr-0 hover:border-orange-600/60 sm:h-52 sm:w-60">
      {/* Corner brackets */}
      <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-[#0B1F3A] transition-all duration-200 group-hover:h-4 group-hover:w-4 group-hover:border-orange-600" />
      <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-[#0B1F3A] transition-all duration-200 group-hover:h-4 group-hover:w-4 group-hover:border-orange-600" />
      <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-[#0B1F3A] transition-all duration-200 group-hover:h-4 group-hover:w-4 group-hover:border-orange-600" />
      <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-[#0B1F3A] transition-all duration-200 group-hover:h-4 group-hover:w-4 group-hover:border-orange-600" />

      <div className="flex h-full flex-col justify-between p-5">
        <span className="font-mono text-[11px] text-slate-400">{code}</span>

        <div className="relative flex h-16 w-full items-center justify-center">
          <Image
            src={partner.logo}
            alt={partner.name}
            width={150}
            height={70}
            className="max-h-14 w-auto object-contain transition-all duration-200 "
          />
        </div>

        <p className="truncate text-sm font-medium text-center text-[#0B1F3A]">
          {partner.name}
        </p>
      </div>
    </div>
  );
}