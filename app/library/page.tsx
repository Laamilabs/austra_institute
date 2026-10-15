"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
    ArrowUpRight,
    BookOpen,
    FileText,
    GraduationCap,
    LibraryBig,
    Link2Off,
    RotateCcw,
    Search,
    X,
} from "lucide-react";

import {
    getResourceDocuments,
    type LibraryDocument,
    type DocumentType,
} from "@/lib/api/documents";

const TYPE_LABELS: Record<DocumentType, string> = {
    resource: "Learning resource",
    academic: "Academic",
    professional: "Professional",
    institutional: "Institutional",
};

function relatedName(
    value: LibraryDocument["course"] | LibraryDocument["unit"],
) {
    if (!value || typeof value === "string") return null;
    return value.name || null;
}

function relatedId(
    value: LibraryDocument["course"] | LibraryDocument["unit"],
) {
    if (!value || typeof value === "string") return null;
    return value._id || null;
}

function isSafeDocumentUrl(value: string) {
    try {
        const url = new URL(value);
        return url.protocol === "https:" || url.protocol === "http:";
    } catch {
        return false;
    }
}

export default function LibraryPage() {
    const [documents, setDocuments] = useState<LibraryDocument[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [selectedCourse, setSelectedCourse] = useState<string>("all");

    const loadDocuments = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            setDocuments(await getResourceDocuments());
        } catch {
            setError("We couldn't load the library right now. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadDocuments();
    }, [loadDocuments]);

    const courseOptions = useMemo(() => {
        const map = new Map<string, string>();
        for (const doc of documents) {
            const id = relatedId(doc.course);
            const name = relatedName(doc.course);
            if (id && name && !map.has(id)) map.set(id, name);
        }
        return Array.from(map, ([id, name]) => ({ id, name })).sort((a, b) =>
            a.name.localeCompare(b.name),
        );
    }, [documents]);

    const filteredDocuments = useMemo(() => {
        const query = search.trim().toLowerCase();
        return documents.filter((document) => {
            const matchesCourse =
                selectedCourse === "all" ||
                relatedId(document.course) === selectedCourse;
            const matchesSearch =
                !query ||
                document.name.toLowerCase().includes(query) ||
                (relatedName(document.course) || "").toLowerCase().includes(query) ||
                (relatedName(document.unit) || "").toLowerCase().includes(query);
            return matchesCourse && matchesSearch;
        });
    }, [documents, search, selectedCourse]);

    const hasFilters = search.trim() !== "" || selectedCourse !== "all";

    const resetFilters = () => {
        setSearch("");
        setSelectedCourse("all");
    };

    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            {/* Hero */}
            <section className="relative overflow-hidden bg-[#0B1F3A] px-4 pb-24 pt-32 text-white sm:px-6 sm:pb-28 sm:pt-40 lg:px-8">
                <Image
                    src="/schools/edu.jpg"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-r from-[#0B1F3A]/70 via-[#0B1F3A]/60 to-[#0B1F3A]/50"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1 bg-orange-500"
                />

                <div className="relative mx-auto max-w-7xl">
                    <div className="mb-5 inline-flex items-center gap-2 border-b border-orange-400/40 px-3 py-1.5 text-sm font-medium text-orange-300">
                        <LibraryBig size={16} aria-hidden="true" />
                        Student resources
                    </div>
                    <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                        Austra Training Institute <span className="text-orange-400">Library</span>
                    </h1>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100">
                        Browse public learning materials, documents and resources from Austra Training Institute.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Sticky filter panel, overlaps the hero.
                    `top` clears the fixed navbar (~72px mobile, ~96px desktop).
                    `z-30` keeps it below the navbar (z-50) but above cards. */}
                <div className="sticky top-18 z-30 -mt-14 sm:top-24">
                    <div className="rounded-sm border border-slate-200 bg-white p-2 shadow-xl shadow-[#0B1F3A]/10 sm:p-2 sm:px-4">
                        <div className="flex flex-col gap-3 lg:flex-row">
                            <label className="relative block flex-1">
                                <span className="sr-only">Search library</span>
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    aria-hidden="true"
                                />
                                <input
                                    type="search"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Search by title, course or unit"
                                    className="w-full rounded-sm border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm text-slate-800 outline-none transition [&::-webkit-search-cancel-button]:hidden focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                                />
                                {search && (
                                    <button
                                        type="button"
                                        onClick={() => setSearch("")}
                                        aria-label="Clear search"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#0B1F3A]"
                                    >
                                        <X size={16} aria-hidden="true" />
                                    </button>
                                )}
                            </label>

                            <label className="flex items-center gap-3 text-sm font-semibold text-slate-600 lg:w-[30vw]">
                                <span className="shrink-0 hidden sm:block">Course</span>
                                <select
                                    value={selectedCourse}
                                    onChange={(event) => setSelectedCourse(event.target.value)}
                                    disabled={courseOptions.length === 0}
                                    className="w-full min-w-0 rounded-sm border border-slate-200 bg-white px-3 py-3 text-sm font-normal text-[#0B1F3A] outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 disabled:bg-slate-50 disabled:text-slate-400"
                                >
                                    <option value="all">All courses</option>
                                    {courseOptions.map((course) => (
                                        <option key={course.id} value={course.id}>
                                            {course.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Results bar */}
                {!loading && !error && (
                    <div className="mb-5 mt-6 flex items-center justify-between gap-4">
                        <p className="text-sm text-slate-600" aria-live="polite">
                            Showing{" "}
                            <span className="font-semibold text-[#0B1F3A]">
                                {filteredDocuments.length}
                            </span>{" "}
                            {filteredDocuments.length === 1 ? "document" : "documents"}
                        </p>
                        {hasFilters && (
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1.5 text-sm font-semibold text-orange-600 transition-colors hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                            >
                                <RotateCcw size={14} aria-hidden="true" />
                                Clear filters
                            </button>
                        )}
                    </div>
                )}

                {/* Content */}
                {loading ? (
                    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {[0, 1, 2, 3, 4, 5].map((item) => (
                            <div
                                key={item}
                                className="h-56 animate-pulse rounded-sm border border-slate-200 bg-white p-6"
                            >
                                <div className="mb-6 h-11 w-11 rounded-sm bg-slate-200" />
                                <div className="mb-3 h-5 w-3/4 rounded-sm bg-slate-200" />
                                <div className="h-4 w-1/2 rounded-sm bg-slate-100" />
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="mt-6 rounded-sm border border-slate-200 bg-white px-6 py-14 text-center">
                        <p className="text-sm text-slate-600">{error}</p>
                        <button
                            onClick={() => void loadDocuments()}
                            className="mt-5 rounded-sm bg-[#0B1F3A] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-orange-500"
                        >
                            Try again
                        </button>
                    </div>
                ) : filteredDocuments.length === 0 ? (
                    <div className="mt-6 rounded-sm border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-sm bg-orange-50 text-orange-500">
                            <BookOpen size={28} aria-hidden="true" />
                        </div>
                        <h2 className="mt-4 text-lg font-bold text-[#0B1F3A]">
                            {documents.length
                                ? "No matching documents"
                                : "The library is being updated"}
                        </h2>
                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                            {documents.length
                                ? "Try a different search, or choose another course."
                                : "Public learning materials will appear here as they become available."}
                        </p>
                        {hasFilters && (
                            <button
                                onClick={resetFilters}
                                className="mt-5 rounded-sm bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-400"
                            >
                                Clear all filters
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredDocuments.map((document, index) => {
                            const href = isSafeDocumentUrl(document.url) ? document.url : null;
                            const courseName = relatedName(document.course);
                            const unitName = relatedName(document.unit);
                            return (
                                <article
                                    key={document._id || document.id || `${document.name}-${index}`}
                                    className="group relative flex min-w-0 flex-col overflow-hidden rounded-sm border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-lg hover:shadow-[#0B1F3A]/10 sm:p-6"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-orange-500 transition-transform duration-300 group-hover:scale-x-100"
                                    />
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-[#0B1F3A] text-orange-400">
                                            {document.type === "academic" ? (
                                                <GraduationCap size={22} aria-hidden="true" />
                                            ) : (
                                                <FileText size={21} aria-hidden="true" />
                                            )}
                                        </div>
                                        <span className="rounded-sm bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700">
                                            {TYPE_LABELS[document.type] || "Document"}
                                        </span>
                                    </div>

                                    <h2 className="mt-5 break-words text-lg font-bold leading-snug text-[#0B1F3A]">
                                        {document.name}
                                    </h2>

                                    {(courseName || unitName) && (
                                        <dl className="mt-3 space-y-1 text-sm text-slate-500">
                                            {courseName && (
                                                <div className="flex gap-2">
                                                    <dt className="shrink-0 font-medium text-slate-600">Course</dt>
                                                    <dd className="min-w-0 break-words">{courseName}</dd>
                                                </div>
                                            )}
                                            {unitName && (
                                                <div className="flex gap-2">
                                                    <dt className="shrink-0 font-medium text-slate-600">Unit</dt>
                                                    <dd className="min-w-0 break-words">{unitName}</dd>
                                                </div>
                                            )}
                                        </dl>
                                    )}

                                    <div className="mt-auto pt-6">
                                        {href ? (
                                            <a
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#0B1F3A] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
                                            >
                                                Open document
                                                <ArrowUpRight
                                                    size={16}
                                                    aria-hidden="true"
                                                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                                />
                                            </a>
                                        ) : (
                                            <span className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-400">
                                                Link unavailable
                                                <Link2Off size={16} aria-hidden="true" />
                                            </span>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>
        </main>
    );
}