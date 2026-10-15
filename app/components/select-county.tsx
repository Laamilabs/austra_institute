// app/components/select-county.tsx
"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

// ---------------------------------------------------------------------------
// Data — all 47 counties of Kenya, alphabetical
// ---------------------------------------------------------------------------

export const KENYAN_COUNTIES = [
  "Baringo",
  "Bomet",
  "Bungoma",
  "Busia",
  "Elgeyo-Marakwet",
  "Embu",
  "Garissa",
  "Homa Bay",
  "Isiolo",
  "Kajiado",
  "Kakamega",
  "Kericho",
  "Kiambu",
  "Kilifi",
  "Kirinyaga",
  "Kisii",
  "Kisumu",
  "Kitui",
  "Kwale",
  "Laikipia",
  "Lamu",
  "Machakos",
  "Makueni",
  "Mandera",
  "Marsabit",
  "Meru",
  "Migori",
  "Mombasa",
  "Murang'a",
  "Nairobi",
  "Nakuru",
  "Nandi",
  "Narok",
  "Nyamira",
  "Nyandarua",
  "Nyeri",
  "Samburu",
  "Siaya",
  "Taita-Taveta",
  "Tana River",
  "Tharaka-Nithi",
  "Trans Nzoia",
  "Turkana",
  "Uasin Gishu",
  "Vihiga",
  "Wajir",
  "West Pokot",
] as const;

export type KenyanCounty = (typeof KENYAN_COUNTIES)[number];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface SelectCountyProps {
  /** Currently selected county name (empty string when none). */
  value: string;
  /** Fired with the chosen county name. */
  onChange: (county: string) => void;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  /** Renders the input in the error state. */
  invalid?: boolean;
  className?: string;
}

export default function SelectCounty({
  value,
  onChange,
  id,
  placeholder = "Search or select a county…",
  disabled = false,
  invalid = false,
  className,
}: SelectCountyProps) {
  const autoId = useId();
  const inputId = id ?? `county-${autoId}`;
  const listboxId = `${inputId}-listbox`;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return KENYAN_COUNTIES;
    return KENYAN_COUNTIES.filter((c) => c.toLowerCase().includes(q));
  }, [query]);

  // Close on outside click / focus loss
  useEffect(() => {
    if (!open) return;

    function handlePointer(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }

    document.addEventListener("mousedown", handlePointer);
    return () => document.removeEventListener("mousedown", handlePointer);
  }, [open]);

  // Reset the highlighted row whenever the list changes
  useEffect(() => {
    setHighlight(0);
  }, [query, open]);

  // Keep the highlighted row in view
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLLIElement>(
      `[data-index="${highlight}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [highlight, open]);

  function commit(county: string) {
    onChange(county);
    setOpen(false);
    setQuery("");
    inputRef.current?.blur();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlight((h) => Math.min(h + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlight((h) => Math.max(h - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setHighlight(0);
        break;
      case "End":
        e.preventDefault();
        setHighlight(filtered.length - 1);
        break;
      case "Enter":
        e.preventDefault();
        if (filtered[highlight]) commit(filtered[highlight]);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        setQuery("");
        break;
      case "Tab":
        setOpen(false);
        setQuery("");
        break;
    }
  }

  // Closed → show selected value. Open → show live query.
  const displayValue = open ? query : value;

  return (
    <div ref={rootRef} className={`relative ${className ?? ""}`}>
      {/* Input + chevron */}
      <div className="relative">
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          role="combobox"
          autoComplete="off"
          spellCheck={false}
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-invalid={invalid || undefined}
          value={displayValue}
          placeholder={value ? value : placeholder}
          disabled={disabled}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => {
            setOpen(true);
            setQuery("");
          }}
          onKeyDown={handleKeyDown}
          className={[
            "w-full rounded-lg border bg-white px-3 py-2 pr-9 text-sm text-slate-900 shadow-sm",
            "placeholder-slate-400 focus:outline-none focus:ring-2",
            invalid
              ? "border-rose-300 focus:border-rose-400 focus:ring-rose-500/20"
              : "border-slate-200 focus:border-slate-400 focus:ring-slate-900/10",
            "disabled:cursor-not-allowed disabled:bg-slate-50",
          ].join(" ")}
        />

        <button
          type="button"
          tabIndex={-1}
          disabled={disabled}
          aria-label={open ? "Close county list" : "Open county list"}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            inputRef.current?.focus();
            setOpen((o) => !o);
          }}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 transition-colors hover:text-slate-600 disabled:cursor-not-allowed"
        >
          <svg
            className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown */}
      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-sm text-slate-500">
              No counties match &ldquo;{query}&rdquo;
            </li>
          ) : (
            filtered.map((county, i) => {
              const selected = county === value;
              const active = i === highlight;

              return (
                <li
                  key={county}
                  data-index={i}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setHighlight(i)}
                  onMouseDown={(e) => {
                    // Prevent focus loss before the click commits.
                    e.preventDefault();
                    commit(county);
                  }}
                  className={[
                    "flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm",
                    active
                      ? "bg-[#082B66] text-white"
                      : selected
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-700",
                  ].join(" ")}
                >
                  <span className="truncate">{county}</span>
                  {selected && (
                    <svg
                      className={`h-3.5 w-3.5 shrink-0 ${
                        active ? "text-orange-400" : "text-[#082B66]"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}