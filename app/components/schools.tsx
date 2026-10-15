"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, GraduationCap } from "lucide-react";
import { departmentApi, type Department } from "@/lib/api/department";

interface SchoolVisual {
  ids: string[];
  matches: string[];
  abbreviation: string;
  image: string;
  icon: string;
}

// School artwork stays in the frontend; the department API remains unchanged.
const SCHOOL_VISUALS: SchoolVisual[] = [
  {
    ids: ["6a9a88a9470df0ddc0bb2130"],
    matches: ["music", "creative arts", "media arts"],
    abbreviation: "SMMA",
    image: "/schools/music.png",
    icon: "https://res.cloudinary.com/dvhapucio/image/upload/v1788512424/music_i4s5ab.jpg",
  },
  {
    ids: ["6a2811becb8d971a933edc67"],
    matches: ["health", "social sciences"],
    abbreviation: "SHSS",
    image: "/schools/health.jpg",
    icon: "https://res.cloudinary.com/dvhapucio/image/upload/v1781010875/health-tech_dszbhd.png",
  },
  {
    ids: ["6a281bc2cb8d971a933edcca"],
    matches: ["computing", "information technology", "science", "engineering", "technology"],
    abbreviation: "SET",
    image: "/schools/code.jpg",
    icon: "https://res.cloudinary.com/dvhapucio/image/upload/v1781013438/atom_brfhhm.png",
  },
  {
    ids: ["6a9a8872470df0ddc0bb2122"],
    matches: ["education", "training", "languages", "international studies"],
    abbreviation: "SLIS",
    image: "/schools/edu.jpg",
    icon: "https://res.cloudinary.com/dvhapucio/image/upload/v1788512369/languagelogo_oeezwl.webp",
  },
  {
    ids: ["6a29581acb8d971a933ee4cb"],
    matches: ["hospitality", "tourism"],
    abbreviation: "SHT",
    image: "/schools/hospitality.jpg",
    icon: "https://res.cloudinary.com/dvhapucio/image/upload/v1781094424/hospitality_h5gnll.png",
  },
  {
    ids: ["6a281afdcb8d971a933edcac"],
    matches: ["business", "management", "economics"],
    abbreviation: "SBE",
    image: "/schools/business.jpg",
    icon: "https://res.cloudinary.com/dvhapucio/image/upload/v1781013243/economic_fwvsqu.png",
  },
];

function getVisual(department: Department) {
  const name = department.name.toLowerCase();
  return SCHOOL_VISUALS.find(
    (visual) =>
      visual.ids.includes(department._id) ||
      visual.matches.some((match) => name.includes(match)),
  );
}

function getAbbreviation(name: string) {
  const ignored = new Set(["and", "the", "of", "for", "in"]);
  const initials = name
    .replace(/&/g, " and ")
    .split(/\s+/)
    .filter((word) => word && !ignored.has(word.toLowerCase()))
    .slice(0, 4)
    .map((word) => word[0])
    .join("");
  return initials.toUpperCase() || "ATI";
}

export default function SchoolsGrid() {
  const [schools, setSchools] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let isCurrent = true;

    async function loadSchools() {
      setLoading(true);
      setError(null);
      try {
        const departments = await departmentApi.getAll();
        if (isCurrent) {
          setSchools(
            Array.isArray(departments)
              ? departments.filter((department) => department.isActive !== false)
              : [],
          );
        }
      } catch {
        if (isCurrent) setError("We couldn't load the schools right now.");
      } finally {
        if (isCurrent) setLoading(false);
      }
    }

    loadSchools();
    return () => {
      isCurrent = false;
    };
  }, [retry]);

  return (
    <section id="schools" className="w-full bg-slate-50 px-4 pb-16 pt-4 sm:px-6 sm:pb-20 sm:pt-6 lg:px-8 2xl:px-12 2xl:pb-28">
      <div className="mx-auto max-w-7xl 2xl:max-w-384 3xl:max-w-[1920px]">
        <div className="mb-10 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between 2xl:mb-14 2xl:pb-8">
          <div style={{ fontFamily: "var(--font-nunito)" }}>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-0.75 w-10 bg-orange-500 2xl:w-12" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500 2xl:text-sm">
                Schools
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#0B1F3A] sm:text-3xl 2xl:text-4xl 3xl:text-5xl">
              Specialized Faculties & Training
            </h2>
          </div>
          <p className="max-w-md text-start text-sm leading-6 text-slate-500 sm:text-end 2xl:max-w-lg 2xl:text-base 2xl:leading-7">
            Discover academic programmes and professional opportunities across our specialized schools.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-6" aria-label="Loading schools">
            {[0, 1, 2].map((item) => (
              <div key={item} className="animate-pulse overflow-hidden rounded-sm border border-slate-200 bg-white">
                <div className="h-48 bg-slate-200 2xl:h-56 3xl:h-64" />
                <div className="space-y-3 px-6 py-5">
                  <div className="h-5 w-3/4 rounded-sm bg-slate-200" />
                  <div className="h-4 w-full rounded-sm bg-slate-100" />
                  <div className="h-4 w-2/3 rounded-sm bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-sm border border-slate-200 bg-white px-6 py-12 text-center">
            <Building2 className="mx-auto text-orange-500" size={30} aria-hidden="true" />
            <p className="mt-4 text-sm text-slate-600">{error}</p>
            <button
              type="button"
              onClick={() => setRetry((value) => value + 1)}
              className="mt-5 rounded-sm bg-[#0B1F3A] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-orange-500"
            >
              Try again
            </button>
          </div>
        ) : schools.length === 0 ? (
          <div className="rounded-sm border border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500">
            No schools are available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-6">
            {schools.map((school) => {
              const visual = getVisual(school);
              const coursesCount = Array.isArray(school.courses) ? school.courses.length : null;

              return (
                <Link
                  key={school._id}
                  href={`/schools/${school._id}`}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-sm border border-slate-200/80 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-[#0B1F3A] to-slate-700 2xl:h-56 3xl:h-64">
                    {visual && (
                      <Image
                        src={visual.image}
                        alt={school.name}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 20vw"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071626]/75 via-[#0B1F3A]/15 to-[#0B1F3A]/20 transition-colors duration-300 group-hover:from-[#071626]/55" />

                    <span className="absolute right-3 top-3 rounded-sm bg-[#0B1F3A] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition-colors duration-300 group-hover:bg-orange-500 2xl:px-3.5 2xl:py-2 2xl:text-sm">
                      {visual?.abbreviation || getAbbreviation(school.name)}
                    </span>

                    <div className="absolute bottom-3 left-4 flex h-12 w-12 items-center justify-center rounded-sm border border-white/20 bg-white/90 p-2.5 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 2xl:h-14 2xl:w-14 2xl:p-3">
                      {school.iconLink || visual?.icon ? (
                        <Image
                          src={school.iconLink || visual?.icon || ""}
                          alt=""
                          width={32}
                          height={32}
                          loading="lazy"
                          unoptimized
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <Building2 size={22} className="text-[#0B1F3A]" aria-hidden="true" />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col px-6 py-5 2xl:px-7 2xl:py-6">
                    <h3 className="mb-2 text-lg font-bold leading-snug text-[#0B1F3A] transition-colors duration-300 group-hover:text-orange-500 2xl:text-xl">
                      {school.name}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-6 text-slate-500 2xl:text-base 2xl:leading-7">
                      {school.description || "Explore the programmes and learning opportunities offered by this school."}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
                      <span className="inline-flex items-center gap-2">
                        <GraduationCap size={16} className="text-orange-500" aria-hidden="true" />
                        {coursesCount === null
                          ? "Explore programmes"
                          : `${coursesCount} ${coursesCount === 1 ? "programme" : "programmes"}`}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#0B1F3A] transition-colors group-hover:text-orange-600">
                        View school <ArrowRight size={14} className="text-orange-500" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
