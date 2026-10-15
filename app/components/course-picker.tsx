// components/CoursePicker.tsx
"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import {
  BookOpen,
  Check,
  ChevronDown,
  Search,
  Star,
  X,
} from "lucide-react";

import type { Course } from "@/lib/api/course";

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface CoursePickerProps {
  courses: Course[];
  value: string;
  onChange: (courseId: string) => void;
  loading?: boolean;
  error?: string | null;
  /** Optional: called with the hovered/active course so the parent can
   *  lazily fetch description/duration via courseApi.getById(). */
  onCoursePreview?: (course: Course | null) => void;
  /** Optional: id of a course to highlight as "recommended". */
  recommendedCourseId?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const norm = (s: string) => s.toLowerCase().trim();

function matches(course: Course, q: string): boolean {
  if (!q) return true;
  const hay = [
    course.courseCode,
    course.name,
    course.level,
    course.department?.name ?? "",
  ]
    .map(norm)
    .join(" ");
  return q
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => hay.includes(token));
}

interface DeptGroup {
  key: string;
  label: string;
  courses: Course[];
}

function groupByDepartment(courses: Course[]): DeptGroup[] {
  const map = new Map<string, DeptGroup>();
  for (const c of courses) {
    const key = c.department?._id ?? "__none__";
    const label = c.department?.name ?? "Other";
    if (!map.has(key)) map.set(key, { key, label, courses: [] });
    map.get(key)!.courses.push(c);
  }
  return Array.from(map.values()).sort((a, b) =>
    a.label.localeCompare(b.label),
  );
}

// ---------------------------------------------------------------------------
// CoursePicker
// ---------------------------------------------------------------------------

export default function CoursePicker({
  courses,
  value,
  onChange,
  loading = false,
  error = null,
  onCoursePreview,
  recommendedCourseId,
  disabled = false,
  placeholder = "Search for a course…",
  className = "",
}: CoursePickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const listboxId = useId();
  const labelId = useId();

  // ---- Derived list ---------------------------------------------------------

  // Featured first, then by code — within the filtered set.
  const filtered = useMemo(() => {
    const q = norm(query);
    const list = courses.filter((c) => matches(c, q));
    return [...list].sort((a, b) => {
      if (!!b.featured !== !!a.featured) return b.featured ? 1 : -1;
      return (a.courseCode ?? "").localeCompare(b.courseCode ?? "");
    });
  }, [courses, query]);

  const groups = useMemo(() => groupByDepartment(filtered), [filtered]);

  // Flat index → course, for keyboard navigation across groups.
  const flat = useMemo(() => groups.flatMap((g) => g.courses), [groups]);

  const selected = useMemo(
    () => courses.find((c) => c._id === value) ?? null,
    [courses, value],
  );

  // ---- Reset / sync ---------------------------------------------------------

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    // Keep the active item within bounds when the filtered set changes.
    setActiveIndex((i) => Math.min(Math.max(i, 0), Math.max(flat.length - 1, 0)));
  }, [flat.length]);

  // Notify parent of the currently-active course for preview fetch.
  useEffect(() => {
    if (!open) return;
    const c = flat[activeIndex] ?? null;
    onCoursePreview?.(c);
  }, [open, activeIndex, flat, onCoursePreview]);

  // Scroll the active item into view.
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${activeIndex}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  // ---- Outside click --------------------------------------------------------

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // ---- Handlers -------------------------------------------------------------

  function commit(course: Course) {
    onChange(course._id);
    setOpen(false);
    inputRef.current?.blur();
  }

  function clear(e: React.MouseEvent) {
    e.stopPropagation();
    onChange("");
    setQuery("");
    inputRef.current?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (disabled) return;

    if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, flat.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(flat.length - 1);
        break;
      case "Enter": {
        e.preventDefault();
        const c = flat[activeIndex];
        if (c) commit(c);
        break;
      }
      case "Escape":
        e.preventDefault();
        setOpen(false);
        inputRef.current?.blur();
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  // ---- Render ---------------------------------------------------------------

  const showEmpty = !loading && filtered.length === 0;

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {/* Trigger / search input ------------------------------------------- */}
      <div
        role="combobox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-haspopup="listbox"
        aria-labelledby={labelId}
        className={[
          "group flex w-full items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm shadow-sm",
          "transition focus-within:ring-2",
          disabled
            ? "cursor-not-allowed border-slate-200 bg-slate-50 opacity-70"
            : error
              ? "border-rose-300 focus-within:border-rose-400 focus-within:ring-rose-500/20"
              : "border-slate-200 focus-within:border-slate-400 focus-within:ring-slate-900/10",
        ].join(" ")}
        onClick={() => {
          if (disabled) return;
          setOpen(true);
          inputRef.current?.focus();
        }}
      >
        <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />

        {/* Selected chip */}
        {selected && !open ? (
          <span className="flex min-w-0 flex-1 items-center gap-2">
            <span className="truncate font-medium text-slate-900">
              {selected.courseCode}
            </span>
            <span className="truncate text-slate-600">{selected.name}</span>
            {selected.level && (
              <span className="hidden shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 sm:inline">
                {selected.level}
              </span>
            )}
          </span>
        ) : (
          <input
            ref={inputRef}
            id={labelId}
            type="text"
            role="searchbox"
            autoComplete="off"
            spellCheck={false}
            disabled={disabled}
            value={query}
            placeholder={selected ? `${selected.courseCode} — ${selected.name}` : placeholder}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            className="min-w-0 flex-1 bg-transparent text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
          />
        )}

        {/* Clear (only when a value is set and not editing) */}
        {selected && !open && !disabled && (
          <button
            type="button"
            onClick={clear}
            aria-label="Clear course"
            className="rounded p-0.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </div>

      {/* Popover ---------------------------------------------------------- */}
      {open && (
        <div
          className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg"
        >
          {loading ? (
            <ListSkeleton />
          ) : error ? (
            <p className="px-4 py-3 text-sm text-rose-600">{error}</p>
          ) : showEmpty ? (
            <div className="px-4 py-6 text-center text-sm text-slate-500">
              <p>No courses match {query ? <>&ldquo;{query}&rdquo;</> : "your search"}.</p>
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="mt-2 text-xs font-medium text-[#082B66] underline-offset-2 hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <ul
              ref={listRef}
              id={listboxId}
              role="listbox"
              aria-labelledby={labelId}
              className="max-h-80 overflow-y-auto py-1"
            >
              {groups.map((group) => (
                <li key={group.key} role="presentation">
                  <p
                    role="presentation"
                    className="sticky top-0 z-10 bg-slate-50/95 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 backdrop-blur"
                  >
                    {group.label}
                  </p>
                  <ul role="group" aria-label={group.label}>
                    {group.courses.map((c) => {
                      const index = flat.findIndex((f) => f._id === c._id);
                      const isActive = index === activeIndex;
                      const isSelected = c._id === value;
                      const isRecommended = c._id === recommendedCourseId;

                      return (
                        <li
                          key={c._id}
                          role="option"
                          aria-selected={isSelected}
                          data-index={index}
                          onMouseEnter={() => setActiveIndex(index)}
                          onMouseDown={(e) => {
                            // Prevent input blur before click registers.
                            e.preventDefault();
                          }}
                          onClick={() => commit(c)}
                          className={[
                            "flex cursor-pointer items-center gap-3 px-3 py-2 text-sm",
                            isActive ? "bg-slate-100" : "bg-white",
                          ].join(" ")}
                        >
                          <span
                            className={[
                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-md",
                              c.featured
                                ? "bg-orange-400 text-[#082B66]"
                                : "bg-slate-100 text-slate-500",
                            ].join(" ")}
                          >
                            <BookOpen className="h-3.5 w-3.5" />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2">
                              <span className="truncate font-medium text-slate-900">
                                {c.courseCode}
                              </span>
                              {c.featured && (
                                <Star
                                  className="h-3 w-3 shrink-0 fill-orange-400 text-orange-400"
                                  aria-label="Featured"
                                />
                              )}
                              {isRecommended && !c.featured && (
                                <span className="shrink-0 rounded-full bg-[#082B66]/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#082B66]">
                                  Recommended
                                </span>
                              )}
                            </span>
                            <span className="mt-0.5 block truncate text-slate-600">
                              {c.name}
                            </span>
                          </span>

                          {c.level && (
                            <span className="hidden shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 sm:inline">
                              {c.level}
                            </span>
                          )}

                          {isSelected && (
                            <Check className="h-4 w-4 shrink-0 text-[#082B66]" />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          )}

          {/* Footer hint */}
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-3 py-1.5 text-[11px] text-slate-500">
            <span>
              <Kbd>↑</Kbd> <Kbd>↓</Kbd> to navigate
            </span>
            <span>
              <Kbd>↵</Kbd> to select · <Kbd>Esc</Kbd> to close
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Bits
// ---------------------------------------------------------------------------

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border border-slate-200 bg-white px-1 font-mono text-[10px] text-slate-600">
      {children}
    </kbd>
  );
}

function ListSkeleton() {
  return (
    <ul className="space-y-1 p-2" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <li key={i} className="flex items-center gap-3 rounded-md p-2">
          <span className="h-7 w-7 shrink-0 animate-pulse rounded-md bg-slate-100" />
          <span className="flex-1 space-y-1.5">
            <span className="block h-3 w-24 animate-pulse rounded bg-slate-100" />
            <span className="block h-3 w-40 animate-pulse rounded bg-slate-100" />
          </span>
        </li>
      ))}
    </ul>
  );
}