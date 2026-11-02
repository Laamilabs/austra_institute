"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FocusEvent, PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { ArrowRight, Building2, ChevronLeft, ChevronRight, Clock3, GraduationCap, Pause, Play } from "lucide-react";
import type { Course } from "@/lib/api/course";

const SPEED_PX_PER_SEC = 36; // gentle drift, readable on small screens
const TOUCH_RESUME_MS = 2500; // how long auto-scroll waits after the user lets go
const BUTTON_RESUME_MS = 4000;

export default function FeaturedCourses({ initialCourses }: { initialCourses: Course[] }) {
  const courses = initialCourses;

  // Few courses -> render more copies so the track always fills ultrawide screens.
  const copyCount = courses.length >= 6 ? 3 : 5;
  const ACCESSIBLE_COPY = 1; // the middle copy is the "real" one; the rest are clones

  const trackRef = useRef<HTMLDivElement>(null);
  const copyARef = useRef<HTMLDivElement>(null);
  const copyBRef = useRef<HTMLDivElement>(null);

  const posRef = useRef(0);
  const holdUntilRef = useRef(0);
  const hoverRef = useRef(false);
  const focusRef = useRef(false);
  const pressRef = useRef(false);
  const visibleRef = useRef(true);
  const pausedRef = useRef(false);

  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const hold = useCallback((ms = TOUCH_RESUME_MS) => {
    holdUntilRef.current = performance.now() + ms;
  }, []);

  // Width of one full set of cards (distance between two identical copies).
  const loopWidth = useCallback(() => {
    const a = copyARef.current;
    const b = copyBRef.current;
    return a && b ? b.offsetLeft - a.offsetLeft : 0;
  }, []);

  // Keep the scroll position inside the middle copy so the loop is seamless in both directions.
  const wrap = useCallback(
    (el: HTMLDivElement) => {
      const loop = loopWidth();
      if (!loop) return;
      let p = el.scrollLeft;
      if (p >= loop * 2) p -= loop;
      else if (p < loop) p += loop;
      else return;
      el.scrollLeft = p;
      posRef.current = p;
    },
    [loopWidth],
  );

  // Respect reduced-motion: no auto-scroll, manual swiping still works.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Only animate while the carousel is on screen.
  useEffect(() => {
    const el = trackRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    });
    io.observe(el);
    return () => io.disconnect();
  }, [courses.length]);

  // Auto-scroll loop. Uses real scrollLeft so native swipe, vertical page scroll and momentum all keep working.
  useEffect(() => {
    const el = trackRef.current;
    if (!el || !courses.length) return;

    const start = loopWidth();
    el.scrollLeft = start;
    posRef.current = el.scrollLeft;

    if (reducedMotion) return;

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;

      const blocked =
        pausedRef.current ||
        hoverRef.current ||
        focusRef.current ||
        pressRef.current ||
        !visibleRef.current ||
        now < holdUntilRef.current;

      const loop = loopWidth();
      if (!blocked && loop) {
        let next = posRef.current + (SPEED_PX_PER_SEC * dt) / 1000;
        if (next >= loop * 2) next -= loop;
        posRef.current = next;
        el.scrollLeft = next;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [courses.length, reducedMotion, loopWidth]);

  // Any scroll we did not cause is the user (touch, trackpad, scrollbar, keyboard, buttons).
  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    if (Math.abs(el.scrollLeft - posRef.current) > 2) {
      posRef.current = el.scrollLeft;
      hold();
      wrap(el);
    }
  };

  const handlePointerEnter = (e: ReactPointerEvent) => {
    if (e.pointerType === "mouse") hoverRef.current = true;
  };
  const handlePointerLeave = (e: ReactPointerEvent) => {
    if (e.pointerType === "mouse") hoverRef.current = false;
  };
  const handlePointerDown = () => {
    pressRef.current = true;
  };
  const handlePointerEnd = () => {
    pressRef.current = false;
    hold();
  };
  const handleFocus = (e: FocusEvent<HTMLDivElement>) => {
    if (e.target.matches(":focus-visible")) focusRef.current = true;
  };
  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) focusRef.current = false;
  };

  const step = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const width = (card?.getBoundingClientRect().width ?? 330) + 20;
    hold(BUTTON_RESUME_MS);
    el.scrollBy({ left: direction * width, behavior: "smooth" });
  };

  return (
    <section
      aria-labelledby="featured-courses-title"
      className="relative w-full overflow-hidden bg-linear-to-b from-slate-50 via-white to-slate-50 px-5 py-14 sm:px-8 sm:py-16 lg:px-12"
    >
      {/* Mica-style soft glows */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#082B66]/6 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-orange-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-8xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-start gap-3.5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-600">Find your next step</p>
              <h2 id="featured-courses-title" className="mt-1 text-2xl font-semibold tracking-tight text-[#082B66] sm:text-3xl">
                Featured courses
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Practical training in caregiving, health support, business technology and ICT at our Eldoret campus.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:justify-end">
            <Link
              href="/programmes"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-[#082B66] shadow-sm transition-all hover:border-orange-400 hover:bg-orange-50 hover:text-orange-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
            >
              Programmes <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[#082B66] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#0B3A85] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
            >
              All courses <ArrowRight size={15} className="text-orange-400" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {courses.length ? (
          <>
            <div className="relative -mx-5 sm:-mx-8 lg:-mx-12">
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-linear-to-r from-slate-50 to-transparent sm:w-16" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-linear-to-l from-slate-50 to-transparent sm:w-16" />

              {/*
                Native horizontal scroller: swipe sideways to browse, scroll the page up/down as normal.
                overscroll-x-contain stops a sideways swipe from triggering browser back/forward.
              */}
              <div
                ref={trackRef}
                role="region"
                aria-roledescription="carousel"
                aria-label="Featured courses"
                onScroll={handleScroll}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerEnd}
                onPointerCancel={handlePointerEnd}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="flex overflow-x-auto overflow-y-hidden overscroll-x-contain px-5 py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:px-8 lg:px-12"
              >
                {Array.from({ length: copyCount }, (_, copy) => (
                  <div
                    key={copy}
                    ref={copy === 0 ? copyARef : copy === 1 ? copyBRef : undefined}
                    className="flex shrink-0"
                    aria-hidden={copy !== ACCESSIBLE_COPY}
                  >
                    {courses.map((course, index) => (
                      <article
                        key={`${copy}-${course._id}`}
                        className="group/card relative mr-4 flex h-64 w-[min(82vw,330px)] shrink-0 flex-col justify-between overflow-hidden rounded-sm border border-slate-200/90 bg-white/90 p-5 shadow-[0_1px_2px_rgba(8,43,102,0.06)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-[0_8px_24px_-8px_rgba(8,43,102,0.25)] active:border-orange-300 active:bg-orange-50/40 sm:mr-5 sm:h-72 sm:w-87.5 sm:p-6"
                      >
                        {/* Accent bar */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-[0.18] bg-linear-to-r from-orange-400 to-orange-500 transition-transform duration-300 group-hover/card:scale-x-100 group-active/card:scale-x-100"
                        />

                        <div className="flex items-center justify-between gap-3">
                          <span className="inline-flex items-center gap-2 text-[11px] font-medium text-slate-500">
                            <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-sm bg-[#082B66]/[0.07] font-mono text-[10px] font-bold text-[#082B66]">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            Course
                          </span>
                          {course.courseCode && (
                            <span className="rounded-sm bg-orange-50 px-2.5 py-1 font-mono text-[10px] font-bold text-orange-700 ring-1 ring-inset ring-orange-200">
                              {course.courseCode}
                            </span>
                          )}
                        </div>

                        <div className="py-3">
                          <h3 className="text-xl font-semibold leading-snug tracking-tight text-[#082B66] sm:text-[22px]">
                            <Link
                              href={`/courses/${course._id}`}
                              tabIndex={copy !== ACCESSIBLE_COPY ? -1 : undefined}
                              draggable={false}
                              className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-orange-400"
                            >
                              {course.name}
                            </Link>
                          </h3>
                          {course.description && (
                            <p className="mt-2.5 line-clamp-2 text-sm leading-6 text-slate-600">{course.description}</p>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-3.5 text-xs font-medium text-slate-700">
                          {course.department?.name && (
                            <span className="inline-flex items-center gap-1.5 rounded-sm bg-slate-100/80 px-2 py-1">
                              <Building2 size={13} className="text-orange-500" aria-hidden="true" />
                              {course.department.name}
                            </span>
                          )}
                          {course.level && (
                            <span className="inline-flex items-center gap-1.5 rounded-sm bg-slate-100/80 px-2 py-1">
                              <GraduationCap size={14} className="text-orange-500" aria-hidden="true" />
                              {course.level}
                            </span>
                          )}
                          {course.duration && (
                            <span className="inline-flex items-center gap-1.5 rounded-sm bg-slate-100/80 px-2 py-1">
                              <Clock3 size={13} className="text-orange-500" aria-hidden="true" />
                              {course.duration}
                            </span>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Controls: hint on mobile, buttons everywhere. Pause satisfies WCAG 2.2.2 for moving content. */}
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-xs text-slate-500 sm:invisible">Swipe to browse. Tap a course for details.</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous courses"
                  className="hidden min-h-11 min-w-11 items-center justify-center rounded-sm border border-slate-300 bg-white text-[#082B66] shadow-sm transition-all hover:border-orange-400 hover:bg-orange-50 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 sm:inline-flex"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next courses"
                  className="hidden min-h-11 min-w-11 items-center justify-center rounded-sm border border-slate-300 bg-white text-[#082B66] shadow-sm transition-all hover:border-orange-400 hover:bg-orange-50 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 sm:inline-flex"
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
                {!reducedMotion && (
                  <button
                    type="button"
                    onClick={() => setPaused((p) => !p)}
                    aria-pressed={paused}
                    aria-label={paused ? "Resume auto-scroll" : "Pause auto-scroll"}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm bg-[#082B66] text-white shadow-sm transition-all hover:bg-[#0B3A85] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
                  >
                    {paused ? (
                      <Play size={16} className="text-orange-400" aria-hidden="true" />
                    ) : (
                      <Pause size={16} className="text-orange-400" aria-hidden="true" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="mx-auto max-w-xl rounded-sm border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
            <h3 className="mt-4 text-xl font-semibold text-[#082B66]">Explore courses at Austra</h3>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">
              Browse programmes and the full catalogue to find a path that fits your goals.
            </p>
            <Link
              href="/programmes"
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-sm bg-[#082B66] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#0B3A85] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
            >
              Explore our programmes <ArrowRight size={15} className="text-orange-400" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}