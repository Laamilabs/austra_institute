"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { departmentApi, type Department } from "@/lib/api/department";
import {
  FiChevronDown,
  FiMenu,
  FiX,
  FiArrowRight,
  FiArrowUpRight,
  FiUser,
  FiBriefcase,
  FiLoader,
  FiAlertCircle,
} from "react-icons/fi";

type MenuKey = "about" | "schools" | "portal";

const ABOUT_SECTIONS = [
  { label: "Our Philosophy", href: "/about#philosophy", desc: "What we believe about learning" },
  { label: "Our Mission & Vision", href: "/about#mission", desc: "Where we are headed" },
  { label: "Leadership & Team", href: "/about#team", desc: "The people behind the institute" },
] as const;

// Fallback departments used if the API fails or is slow, ensuring the menu is never empty
const FALLBACK_DEPARTMENTS: Department[] = [
  { _id: "german", name: "German Language Training", isActive: true },
  { _id: "caregiving", name: "Caregiving & Healthcare Support", isActive: true },
  { _id: "ict", name: "ICT & Computer Packages", isActive: true },
  { _id: "nursing", name: "Nursing Aide Training", isActive: true },
  { _id: "ielts", name: "IELTS Preparation", isActive: true },
];

const PORTALS = [
  {
    label: "Student portal",
    href: "/portal/student",
    desc: "Results, fees and course materials",
    icon: FiUser,
  },
  {
    label: "Staff portal",
    href: "https://staff.austratraininginstitute.co.ke",
    desc: "Manage classes, students and records",
    icon: FiBriefcase,
  },
] as const;

const MENU_INTRO: Record<
  MenuKey,
  { title: string; text: string; cta: { label: string; href: string } }
> = {
  about: {
    title: "About Austra",
    text: "Learn how we train, what we stand for and who leads us.",
    cta: { label: "Read our story", href: "/about" },
  },
  schools: {
    title: "Our Schools",
    text: "Find the school that matches your career path.",
    cta: { label: "Explore all schools", href: "/#schools" },
  },
  portal: {
    title: "Portals",
    text: "Sign in to your student or staff account.",
    cta: { label: "Apply now", href: "/apply" },
  },
};

const SIMPLE_LINKS = [
  { label: "Courses", href: "/courses", accent: false },
  { label: "News & events", href: "/news", accent: false },
  { label: "Get in touch", href: "/contact", accent: true },
  { label: "FAQs", href: "/faqs", accent: true },
] as const;

const tile =
  "group/tile flex min-w-0 items-center gap-3 rounded-sm border border-white/10 " +
  "bg-white/[0.04] px-4 py-3 text-sm font-medium text-blue-100 " +
  "transition-colors duration-200 hover:border-orange-400/50 hover:bg-white/10 " +
  "hover:text-white focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-orange-400";

const mobileSub =
  "block rounded-sm px-3 py-2.5 text-xs font-medium leading-relaxed text-blue-200 " +
  "transition-colors hover:bg-white/10 hover:text-white";

export default function Navbar() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(true);
  const [departmentError, setDepartmentError] = useState(false);

  const [active, setActive] = useState<MenuKey | null>(null);
  const [lastActive, setLastActive] = useState<MenuKey>("about");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileSchoolsOpen, setMobileSchoolsOpen] = useState(false);
  const [mobilePortalOpen, setMobilePortalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Resilient Departments Fetch with timeout and fallback support
  useEffect(() => {
    let isCurrent = true;
    const controller = new AbortController();

    const fetchDepartments = async () => {
      try {
        setIsLoadingDepartments(true);
        setDepartmentError(false);

        // Add a safety timeout so slow API responses don't hang indefinitely
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const result = await departmentApi.getAll();
        clearTimeout(timeoutId);

        if (!isCurrent) return;

        const validDepts = Array.isArray(result)
          ? result.filter((d) => d.isActive !== false)
          : [];

        if (validDepts.length > 0) {
          setDepartments(validDepts);
        } else {
          // Fallback if empty array returned
          setDepartments(FALLBACK_DEPARTMENTS);
        }
      } catch {
        if (!isCurrent) return;
        setDepartmentError(true);
        // Graceful fallback to static core departments on failure or timeout
        setDepartments(FALLBACK_DEPARTMENTS);
      } finally {
        if (isCurrent) {
          setIsLoadingDepartments(false);
        }
      }
    };

    fetchDepartments();

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, []);

  // Scroll effect
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenus = () => {
    setActive(null);
    setMobileOpen(false);
    setMobileAboutOpen(false);
    setMobileSchoolsOpen(false);
    setMobilePortalOpen(false);
  };

  // Outside click, Escape, resize
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        closeMenus();
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenus();
    };
    const onResize = () => {
      setActive(null);
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Close after navigation
  useEffect(() => {
    closeMenus();
  }, [pathname]);

  const openMenu = (key: MenuKey) => {
    setLastActive(key);
    setActive(key);
  };

  const isAboutActive = pathname === "/about" || pathname.startsWith("/about/");
  const isSchoolActive = pathname.startsWith("/schools/");

  const panelOpen = active !== null;
  const panelKey = active ?? lastActive;
  const intro = MENU_INTRO[panelKey];

  // Mobile menu resilience: only show Schools if we actually have something to show
  // AND there was no fetch error. If loading or errored, we surface a safe state.
  const hasDepartments = departments.length > 0;
  const showMobileSchools = !departmentError && (isLoadingDepartments || hasDepartments);

  const underline = (on: boolean, group = "group") =>
    `absolute -bottom-0.5 left-0 h-0.5 bg-orange-400 transition-all duration-300 ${
      on ? "w-full" : `w-0 ${group === "group" ? "group-hover:w-full" : `group-hover/${group}:w-full`}`
    }`;

  const chevron = (key: MenuKey) => (
    <FiChevronDown
      size={14}
      aria-hidden="true"
      className={`transition-transform duration-300 ${
        active === key ? "rotate-180 text-orange-400" : "text-blue-300"
      }`}
    />
  );

  return (
    <header
      ref={headerRef}
      className="fixed top-0 z-50 w-full px-2 pt-2 sm:px-5 sm:pt-5"
    >
      <nav
        aria-label="Main Navigation"
        onMouseLeave={() => setActive(null)}
        className={`relative overflow-visible rounded-sm bg-[#0B1F3A]/90 backdrop-blur-md transition-all duration-300 ${
          scrolled || panelOpen
            ? "border border-blue-400/30 shadow-lg shadow-blue-950/40"
            : "border border-transparent"
        }`}
      >
        <div className="relative z-10 p-1">
          <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <div className="group flex shrink-0 items-center">
              <Link
                href="/"
                onClick={closeMenus}
                aria-label="Austra Training Institute home"
                className="relative flex items-center gap-3 transition-transform duration-300 group-hover:scale-[1.02]"
              >
                <div className="relative flex items-center justify-center rounded-l-sm border-r border-orange-400 bg-white/95 p-2 transition-colors duration-300 group-hover:bg-white">
                  <Image
                    src="/logo.png"
                    alt="Austra Training Institute"
                    width={200}
                    height={100}
                    priority
                    className="h-9 w-auto object-contain sm:h-10"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden min-w-0 items-center gap-4 lg:flex xl:gap-5 2xl:gap-7">
              <Link
                href="/"
                onClick={closeMenus}
                onMouseEnter={() => setActive(null)}
                aria-current={pathname === "/" ? "page" : undefined}
                className="group relative shrink-0 py-2"
              >
                <span
                  className={`text-sm font-medium transition-colors duration-200 group-hover:text-white ${
                    pathname === "/" ? "text-white" : "text-blue-100"
                  }`}
                >
                  Home
                </span>
                <span className={underline(pathname === "/")} />
              </Link>

              {/* About */}
              <div
                className="group/about relative flex shrink-0 items-center py-2"
                onMouseEnter={() => openMenu("about")}
              >
                <Link
                  href="/about"
                  onClick={closeMenus}
                  onFocus={() => openMenu("about")}
                  aria-current={isAboutActive ? "page" : undefined}
                  aria-expanded={active === "about"}
                  aria-controls="desktop-menu-panel"
                  className="flex items-center gap-1.5"
                >
                  <span
                    className={`text-sm font-medium transition-colors duration-200 group-hover/about:text-white ${
                      isAboutActive || active === "about"
                        ? "text-white"
                        : "text-blue-100"
                    }`}
                  >
                    About us
                  </span>
                  {chevron("about")}
                </Link>
                <span className={underline(isAboutActive || active === "about", "about")} />
              </div>

              {/* Departments */}
              <div
                className="group/schools relative flex shrink-0 items-center py-2"
                onMouseEnter={() => openMenu("schools")}
              >
                <Link
                  href="/#schools"
                  onClick={closeMenus}
                  onFocus={() => openMenu("schools")}
                  aria-current={isSchoolActive ? "page" : undefined}
                  aria-expanded={active === "schools"}
                  aria-controls="desktop-menu-panel"
                  className="flex items-center gap-1.5"
                >
                  <span
                    className={`text-sm font-medium transition-colors duration-200 group-hover/schools:text-white ${
                      isSchoolActive || active === "schools"
                        ? "text-white"
                        : "text-blue-100"
                    }`}
                  >
                    Schools
                  </span>
                  {chevron("schools")}
                </Link>
                <span className={underline(isSchoolActive || active === "schools", "schools")} />
              </div>

              {SIMPLE_LINKS.map((link) => {
                const current = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenus}
                    onMouseEnter={() => setActive(null)}
                    aria-current={current ? "page" : undefined}
                    className="group relative flex shrink-0 items-center py-2"
                  >
                    <span
                      className={`whitespace-nowrap text-sm transition-colors duration-200 ${
                        link.accent
                          ? "font-semibold text-orange-400 group-hover:text-orange-300"
                          : `font-medium group-hover:text-white ${
                              current ? "text-white" : "text-blue-100"
                            }`
                      }`}
                    >
                      {link.label}
                    </span>
                    <span className={underline(current)} />
                  </Link>
                );
              })}
            </div>

            {/* Desktop actions */}
            <div className="hidden shrink-0 items-center gap-3 lg:flex xl:gap-4">
              <button
                type="button"
                onMouseEnter={() => openMenu("portal")}
                onClick={() =>
                  active === "portal" ? setActive(null) : openMenu("portal")
                }
                aria-expanded={active === "portal"}
                aria-controls="desktop-menu-panel"
                className="flex items-center gap-1.5 rounded-sm px-3 py-2 text-sm font-medium text-blue-100 transition-all duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              >
                <span>Portal</span>
                {chevron("portal")}
              </button>

              <Link
                href="/apply"
                onClick={closeMenus}
                onMouseEnter={() => setActive(null)}
                className="group shrink-0"
              >
                <span className="flex items-center gap-2 rounded-sm bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-orange-400 xl:px-5">
                  <span>Apply now</span>
                  <FiArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => {
                setMobileOpen((prev) => !prev);
                setActive(null);
              }}
              className="rounded-sm p-2 text-blue-200 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 lg:hidden"
              aria-label={
                mobileOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-menu"
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div
              id="mobile-navigation-menu"
              className="mt-3 max-h-[calc(100dvh-6rem)] overflow-y-auto border-t border-white/10 pt-3 lg:hidden"
            >
              <div className="rounded-sm border border-white/10 bg-[#0B1F3A] p-3">
                <Link
                  href="/"
                  onClick={closeMenus}
                  aria-current={pathname === "/" ? "page" : undefined}
                  className={`block rounded-sm px-3 py-3 text-sm font-medium transition-colors duration-200 hover:bg-white/10 hover:text-white ${
                    pathname === "/" ? "bg-white/10 text-white" : "text-blue-100"
                  }`}
                >
                  Home
                </Link>

                {/* About accordion */}
                <div>
                  <div className="flex items-center justify-between rounded-sm px-3 py-2 text-sm font-medium text-blue-100 transition-colors duration-200 hover:bg-white/10">
                    <Link
                      href="/about"
                      onClick={closeMenus}
                      className="flex-1 py-1 font-medium hover:text-white"
                    >
                      About us
                    </Link>
                    <button
                      type="button"
                      onClick={() => setMobileAboutOpen((p) => !p)}
                      aria-label="Toggle About sections"
                      aria-expanded={mobileAboutOpen}
                      className="p-2 text-blue-300 hover:text-white"
                    >
                      <FiChevronDown
                        size={16}
                        aria-hidden="true"
                        className={`transition-transform duration-200 ${
                          mobileAboutOpen ? "rotate-180 text-orange-400" : ""
                        }`}
                      />
                    </button>
                  </div>
                  {mobileAboutOpen && (
                    <div className="my-1 ml-3 space-y-1 border-l-2 border-orange-400/40 pl-3">
                      {ABOUT_SECTIONS.map((s) => (
                        <Link key={s.label} href={s.href} onClick={closeMenus} className={mobileSub}>
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Departments accordion — hidden entirely if the fetch failed, so the
                    mobile menu stays functional and never renders a broken section. */}
                {showMobileSchools && (
                  <div>
                    <div
                      className={`flex items-center justify-between rounded-sm px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-white/10 ${
                        isSchoolActive ? "text-white" : "text-blue-100"
                      }`}
                    >
                      <Link
                        href="/#schools"
                        onClick={closeMenus}
                        className="flex-1 py-1 font-medium hover:text-white"
                      >
                        Schools
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileSchoolsOpen((p) => !p)}
                        aria-label="Toggle department links"
                        aria-expanded={mobileSchoolsOpen}
                        className="p-2 text-blue-300 hover:text-white"
                      >
                        <FiChevronDown
                          size={16}
                          aria-hidden="true"
                          className={`transition-transform duration-200 ${
                            mobileSchoolsOpen ? "rotate-180 text-orange-400" : ""
                          }`}
                        />
                      </button>
                    </div>
                    {mobileSchoolsOpen && (
                      <div className="my-1 ml-3 space-y-1 border-l-2 border-orange-400/40 pl-3">
                        {isLoadingDepartments ? (
                          <div className="flex items-center gap-2 py-2 text-xs text-blue-300">
                            <FiLoader className="animate-spin" size={14} />
                            <span>Loading departments...</span>
                          </div>
                        ) : (
                          departments.map((d) => (
                            <Link
                              key={d._id}
                              href={`/schools/${d._id}`}
                              onClick={closeMenus}
                              className={mobileSub}
                            >
                              {d.name}
                            </Link>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                )}

                {SIMPLE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenus}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={`block rounded-sm px-3 py-3 text-sm transition-colors duration-200 hover:bg-white/10 ${
                      link.accent
                        ? "font-semibold text-orange-300 hover:text-orange-200"
                        : `font-medium hover:text-white ${
                            pathname === link.href
                              ? "bg-white/10 text-white"
                              : "text-blue-100"
                          }`
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Portal accordion */}
                <div className="mt-2 border-t border-white/10 pt-2">
                  <button
                    type="button"
                    onClick={() => setMobilePortalOpen((p) => !p)}
                    aria-expanded={mobilePortalOpen}
                    aria-controls="mobile-portal-menu"
                    className="flex w-full items-center justify-between rounded-sm px-3 py-3 text-sm font-medium text-blue-100 transition-colors duration-200 hover:bg-white/10"
                  >
                    <span>Portal</span>
                    <FiChevronDown
                      size={16}
                      aria-hidden="true"
                      className={`transition-transform duration-200 ${
                        mobilePortalOpen ? "rotate-180 text-orange-400" : ""
                      }`}
                    />
                  </button>
                  {mobilePortalOpen && (
                    <div
                      id="mobile-portal-menu"
                      className="my-1 ml-3 space-y-1 border-l-2 border-orange-400/40 pl-3"
                    >
                      {PORTALS.map((p) => (
                        <Link key={p.label} href={p.href} onClick={closeMenus} className={mobileSub}>
                          {p.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3">
                  <Link
                    href="/apply"
                    onClick={closeMenus}
                    className="flex w-full items-center justify-center gap-2 rounded-sm bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-400"
                  >
                    <span>Apply now</span>
                    <FiArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Desktop dropdown: a collapsible extension of the navbar, same width */}
        <div
          id="desktop-menu-panel"
          aria-hidden={!panelOpen}
          className={`absolute inset-x-0 top-full z-0 hidden pt-1 transition-all duration-300 motion-reduce:transition-none lg:block ${
            panelOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
              panelOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div
              className={`relative min-h-0 overflow-hidden rounded-sm bg-[#0B1F3A] shadow-2xl shadow-blue-950/50 ${
                panelOpen ? "border border-blue-400/30" : "border-0"
              }`}
            >
              {/* Background image + navy overlay */}
              <Image
                src="/cta/staff2.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-r from-[#0B1F3A] via-[#0B1F3A]/90 to-[#0B1F3A]/70"
              />
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-orange-400" />

              <div className="relative grid gap-8 p-6 lg:grid-cols-[280px_1fr] xl:p-8">
                {/* Intro */}
                <div className="flex flex-col justify-between gap-6 border-white/10 lg:border-r lg:pr-8">
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {intro.title}
                    </h2>
                    <p className="mt-2 max-w-[28ch] text-sm leading-relaxed text-blue-200">
                      {intro.text}
                    </p>
                  </div>
                  <Link
                    href={intro.cta.href}
                    onClick={closeMenus}
                    tabIndex={panelOpen ? 0 : -1}
                    className="inline-flex w-fit items-center gap-2 rounded-sm bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
                  >
                    {intro.cta.label}
                    <FiArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>

                {/* Links */}
                <div className="min-w-0">
                  {panelKey === "about" && (
                    <div className="grid grid-cols-3 gap-3">
                      {ABOUT_SECTIONS.map((s) => (
                        <Link
                          key={s.label}
                          href={s.href}
                          role="menuitem"
                          onClick={closeMenus}
                          tabIndex={panelOpen ? 0 : -1}
                          className={`${tile} flex-col items-start gap-1 !py-4`}
                        >
                          <span className="flex w-full items-center justify-between text-white">
                            {s.label}
                            <FiArrowUpRight
                              size={15}
                              aria-hidden="true"
                              className="text-orange-400 transition-transform duration-200 group-hover/tile:translate-x-0.5 group-hover/tile:-translate-y-0.5"
                            />
                          </span>
                          <span className="text-xs font-normal text-blue-200">
                            {s.desc}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}

                  {panelKey === "schools" && (
                    <div className="grid max-h-[min(50dvh,22rem)] grid-cols-2 gap-2 overflow-y-auto pr-1 xl:grid-cols-3">
                      {isLoadingDepartments && (
                        <div className="col-span-full flex items-center gap-2 py-4 text-sm text-blue-200">
                          <FiLoader className="animate-spin text-orange-400" size={18} />
                          <span>Loading departments...</span>
                        </div>
                      )}

                      {!isLoadingDepartments && departmentError && (
                        <div className="col-span-full flex items-center gap-2 rounded-sm border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                          <FiAlertCircle className="shrink-0 text-amber-400" size={18} />
                          <span>Could not reach live departments. Showing standard core programs.</span>
                        </div>
                      )}

                      {!isLoadingDepartments &&
                        departments.map((d) => (
                          <Link
                            key={d._id}
                           href={departmentError ? "#" : `/schools/${d._id}`}
                            role="menuitem"
                            onClick={closeMenus}
                            tabIndex={panelOpen ? 0 : -1}
                            className={`${tile} justify-between`}
                          >
                            <span className="min-w-0 break-words">{d.name}</span>
                            <FiArrowUpRight
                              size={15}
                              aria-hidden="true"
                              className="shrink-0 text-orange-400 opacity-0 transition-opacity duration-200 group-hover/tile:opacity-100"
                            />
                          </Link>
                        ))}
                    </div>
                  )}

                  {panelKey === "portal" && (
                    <div className="grid grid-cols-2 gap-3">
                      {PORTALS.map((p) => {
                        const Icon = p.icon;
                        return (
                          <Link
                            key={p.label}
                            href={p.href}
                            role="menuitem"
                            onClick={closeMenus}
                            tabIndex={panelOpen ? 0 : -1}
                            className={`${tile} !gap-4 !py-5`}
                          >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-orange-500/15 text-orange-400 transition-colors duration-200 group-hover/tile:bg-orange-500 group-hover/tile:text-white">
                              <Icon size={18} aria-hidden="true" />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-white">{p.label}</span>
                              <span className="block text-xs font-normal text-blue-200">
                                {p.desc}
                              </span>
                            </span>
                            <FiArrowRight
                              size={15}
                              aria-hidden="true"
                              className="ml-auto shrink-0 text-orange-400"
                            />
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}