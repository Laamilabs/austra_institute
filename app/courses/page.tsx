"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { courseApi, Course } from "@/lib/api/course";
import CoursesHero from "./CoursesHero";
import CoursesList from "./CoursesList";
import CoursesSidebar from "./CoursesSidebar";
import LocationSection from "../components/location";

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

    /* Mobile Floating Action States */
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    const loadCourses = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await courseApi.getAll();
            setCourses(data);
        } catch (err) {
            console.error("Failed to load courses:", err);
            setError("Failed to load courses. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCourses();
    }, [loadCourses]);


    /* Unique departments */
    const departments = useMemo(() => {
        const map = new Map<string, string>();

        courses.forEach((course) => {
            if (course.department?._id && course.department?.name) {
                map.set(course.department._id, course.department.name);
            }
        });

        return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
    }, [courses]);

    /* Unique levels */
    const levels = useMemo(() => {
        return Array.from(
            new Set(courses.map((course) => course.level).filter(Boolean)),
        ).sort();
    }, [courses]);

    /* Toggle Handlers for Multi-Select */
    const handleDepartmentToggle = (id: string) => {
        setSelectedDepartments((prev) =>
            prev.includes(id)
                ? prev.filter((deptId) => deptId !== id)
                : [...prev, id]
        );
    };

    const handleLevelToggle = (level: string) => {
        setSelectedLevels((prev) =>
            prev.includes(level)
                ? prev.filter((item) => item !== level)
                : [...prev, level]
        );
    };

    /* Filter courses */
    const filteredCourses = useMemo(() => {
        const searchTerm = search.trim().toLowerCase();

        return courses.filter((course) => {
            const matchesSearch =
                !searchTerm ||
                course.name?.toLowerCase().includes(searchTerm) ||
                course.courseCode?.toLowerCase().includes(searchTerm) ||
                course.department?.name?.toLowerCase().includes(searchTerm);

            const matchesDepartment =
                selectedDepartments.length === 0 ||
                (course.department?._id &&
                    selectedDepartments.includes(course.department._id));

            const matchesLevel =
                selectedLevels.length === 0 ||
                (course.level && selectedLevels.includes(course.level));

            return matchesSearch && matchesDepartment && matchesLevel;
        });
    }, [courses, search, selectedDepartments, selectedLevels]);

    /* Group filtered courses by department */
    const groupedCourses = useMemo(() => {
        const groups: Record<string, Course[]> = {};

        filteredCourses.forEach((course) => {
            const departmentName =
                course.department?.name || "Unassigned Department";

            if (!groups[departmentName]) {
                groups[departmentName] = [];
            }

            groups[departmentName].push(course);
        });

        return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
    }, [filteredCourses]);

    const clearFilters = () => {
        setSearch("");
        setSelectedDepartments([]);
        setSelectedLevels([]);
    };

    const hasFilters =
        search.trim() !== "" ||
        selectedDepartments.length > 0 ||
        selectedLevels.length > 0;

    return (
        <main className="relative min-h-screen bg-[#F5F6F8]">
            {/* Fixed Background Image Container */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <Image
                    src="/white.avif"
                    alt="Background texture"
                    fill
                    priority
                    className="object-cover opacity-95"
                />
            </div>

            {/* Foreground Content Wrapper */}
            <div className="relative z-10">
                <style>{`
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    .cp-hero-in { animation: fadeIn 0.5s ease-out both; }
                    .cp-card-in {
                        animation: fadeInUp 0.45s ease-out both;
                        animation-fill-mode: both;
                    }
                    .cp-section-in { animation: fadeInUp 0.40s ease-out both; }
                `}</style>

                <CoursesHero search={search} onSearchChange={setSearch} />

                <div className="mx-auto px-1 py-8 sm:px-4 md:px-2 lg:px-4">
                    {/* Top bar: count */}
                    <div className="mb-6 flex items-center justify-between">
                        <p className="text-sm text-[#5B6472]">
                            <span className="font-semibold text-[#101826]">
                                {filteredCourses.length}
                            </span>{" "}
                            of {courses.length}{" "}
                            {courses.length === 1 ? "course" : "courses"}
                            {hasFilters && (
                                <span className="ml-2 font-medium text-orange-500">
                                    &middot; filters applied
                                </span>
                            )}
                        </p>

                        {hasFilters && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="text-xs font-semibold text-orange-500 hover:text-orange-600 underline lg:hidden"
                            >
                                Clear all
                            </button>
                        )}
                    </div>

                    <div className="flex flex-col gap-6 lg:flex-row">
                        {/* Desktop Sidebar (Sticky on desktop, hidden on mobile) */}
                        <div className="hidden lg:block lg:w-80 shrink-0">
                            <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1">
                                <CoursesSidebar
                                    search={search}
                                    onSearchChange={setSearch}
                                    departments={departments}
                                    levels={levels}
                                    selectedDepartments={selectedDepartments}
                                    selectedLevels={selectedLevels}
                                    hasFilters={hasFilters}
                                    onDepartmentToggle={handleDepartmentToggle}
                                    onLevelToggle={handleLevelToggle}
                                    onClearFilters={clearFilters}
                                />
                            </div>
                        </div>

                        {/* Courses Grid List */}
                        <div className="flex-1">
                            <CoursesList
                                loading={loading}
                                error={error}
                                groupedCourses={groupedCourses}
                                filteredCount={filteredCourses.length}
                                hasFilters={hasFilters}
                                onClearFilters={clearFilters}
                                onRetry={loadCourses}
                            />
                        </div>
                    </div>
                </div>

                <LocationSection />
            </div>

            {/* ========================================================= */}
            {/* MOBILE FLOATING ACTION BUTTONS (Visible when scrolled)   */}
            {/* ========================================================= */}

            <div className="fixed right-4 bottom-20 z-40 flex flex-col items-center gap-3 lg:hidden">
                {/* Search Floating Button */}
                <button
                    type="button"
                    onClick={() => setShowMobileSearch((prev) => !prev)}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0F172A] text-white shadow-lg border border-slate-700/50 transition-all hover:scale-105 active:scale-95"
                    aria-label="Toggle Search"
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35m1.35-5.15a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />
                    </svg>
                </button>

                {/* Filter Floating Button */}
                <button
                    type="button"
                    onClick={() => setShowMobileFilter(true)}
                    className="relative flex h-12 w-12 items-center justify-center rounded-full bg-orange-400 text-slate-950 shadow-lg border border-orange-300 transition-all hover:scale-105 active:scale-95"
                    aria-label="Toggle Filters"
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    {hasFilters && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                            !
                        </span>
                    )}
                </button>
            </div>

            {/* ========================================================= */}
            {/* MOBILE QUICK SEARCH POP-OVER MODAL                        */}
            {/* ========================================================= */}
            {showMobileSearch && (
                <div className="fixed inset-x-0 top-16 z-50 p-4 lg:hidden animate-in slide-in-from-top duration-300">
                    <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur-md">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Search Courses
                            </p>
                            <button
                                type="button"
                                onClick={() => setShowMobileSearch(false)}
                                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                            >
                                Close ✕
                            </button>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name, code, department..."
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                                autoFocus
                            />
                            <svg className="absolute left-3 top-3 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35m1.35-5.15a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />
                            </svg>
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================= */}
            {/* MOBILE SIDEBAR FILTER OVERLAY / DRAWER                    */}
            {/* ========================================================= */}
            {showMobileFilter && (
                <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs lg:hidden animate-in fade-in duration-300">
                    {/* Backdrop Tap to Close */}
                    <div
                        className="fixed inset-0"
                        onClick={() => setShowMobileFilter(false)}
                    />

                    {/* Drawer Content */}
                    <div className="relative z-10 h-full w-full max-w-xs bg-white p-6 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                            <h2 className="text-base font-bold text-slate-900">
                                Filter Courses
                            </h2>
                            <button
                                type="button"
                                onClick={() => setShowMobileFilter(false)}
                                className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200"
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <CoursesSidebar
                            departments={departments}
                            levels={levels}
                            selectedDepartments={selectedDepartments}
                            selectedLevels={selectedLevels}
                            hasFilters={hasFilters}
                            onDepartmentToggle={handleDepartmentToggle}
                            onLevelToggle={handleLevelToggle}
                            onClearFilters={clearFilters}
                        />

                        <button
                            type="button"
                            onClick={() => setShowMobileFilter(false)}
                            className="mt-6 w-full rounded-xl bg-orange-400 py-3 text-center text-sm font-semibold text-slate-950 shadow-sm"
                        >
                            Apply & Close
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}