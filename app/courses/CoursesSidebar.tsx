"use client";

import { Dispatch, SetStateAction, useState } from "react";

interface Department {
  id: string;
  name: string;
}

interface CoursesSidebarProps {
  search?: string;
  onSearchChange?: Dispatch<SetStateAction<string>> | ((value: string) => void);
  departments: Department[];
  levels: string[];
  selectedDepartments: string[];
  selectedLevels: string[];
  hasFilters: boolean;
  onDepartmentToggle: (id: string) => void;
  onLevelToggle: (level: string) => void;
  onClearFilters: () => void;
}

export default function CoursesSidebar({
  search = "",
  onSearchChange,
  departments,
  levels,
  selectedDepartments,
  selectedLevels,
  hasFilters,
  onDepartmentToggle,
  onLevelToggle,
  onClearFilters,
}: CoursesSidebarProps) {
  // Collapsible toggle states
  const [isDeptOpen, setIsDeptOpen] = useState(true);
  const [isLevelOpen, setIsLevelOpen] = useState(true);

  return (
    <aside className="lg:w-80 lg:shrink-0">
      {/* 
        sticky top-28 clears the fixed navbar completely.
        max-h-[calc(100vh-8rem)] restricts sidebar height to the visible screen area.
        flex flex-col allows internal scrolling without clipping elements.
      */}
      <div className="sticky top-28 flex max-h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-sm border border-slate-200 bg-white/40 shadow-sm transition-all">
        {/* Sidebar Header (Fixed at top of sidebar) */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-[#0F172A] px-5 py-4 text-white">
          <div className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-orange-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <h2 className="text-base font-bold tracking-wide">Filter Courses</h2>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="text-xs font-semibold text-orange-400 transition-colors hover:text-orange-300 hover:underline"
            >
              Reset All
            </button>
          )}
        </div>

        {/* Scrollable Filter Sections Body */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2 scrollbar-thin scrollbar-thumb-slate-200">
          
          {/* Quick Search Bar inside Sidebar */}
          {onSearchChange && (
            <div className="p-2">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search courses..."
                  className="w-full rounded-md border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
                <svg
                  className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m21 21-4.35-4.35m1.35-5.15a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Department Filter Section */}
          <div className="py-2">
            <button
              type="button"
              onClick={() => setIsDeptOpen(!isDeptOpen)}
              className="flex w-full items-center justify-between rounded-sm px-3 py-2 text-left font-semibold text-[#0F172A] transition-colors hover:bg-slate-50"
            >
              <span className="flex items-center gap-2 text-sm">
                Department
                {selectedDepartments.length > 0 && (
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-sm bg-orange-400 px-1.5 text-[11px] font-bold text-slate-950">
                    {selectedDepartments.length}
                  </span>
                )}
              </span>
              <svg
                className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                  isDeptOpen ? "rotate-180 transform" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDeptOpen && (
              <div className="mt-2 space-y-1 pl-2 pr-1">
                {departments.map((department) => {
                  const isChecked = selectedDepartments.includes(department.id);
                  return (
                    <label
                      key={department.id}
                      className={`flex cursor-pointer items-center justify-between rounded-sm px-3 py-2 text-sm transition-all ${
                        isChecked
                          ? "bg-orange-50/60 font-medium text-[#0F172A]"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span className="truncate pr-2">{department.name}</span>
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => onDepartmentToggle(department.id)}
                          className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-slate-300 transition-all checked:border-orange-400 checked:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
                        />
                        <svg
                          className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 stroke-white opacity-0 transition-opacity peer-checked:opacity-100"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="3.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Level Filter Section */}
          <div className="py-2">
            <button
              type="button"
              onClick={() => setIsLevelOpen(!isLevelOpen)}
              className="flex w-full items-center justify-between rounded-sm px-3 py-2 text-left font-semibold text-[#0F172A] transition-colors hover:bg-slate-50"
            >
              <span className="flex items-center gap-2 text-sm">
                Level
                {selectedLevels.length > 0 && (
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-sm bg-orange-400 px-1.5 text-[11px] font-bold text-slate-950">
                    {selectedLevels.length}
                  </span>
                )}
              </span>
              <svg
                className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                  isLevelOpen ? "rotate-180 transform" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isLevelOpen && (
              <div className="mt-2 space-y-1 pl-2 pr-1">
                {levels.map((level) => {
                  const isChecked = selectedLevels.includes(level);
                  return (
                    <label
                      key={level}
                      className={`flex cursor-pointer items-center justify-between rounded-sm px-3 py-2 text-sm transition-all ${
                        isChecked
                          ? "bg-orange-50/60 font-medium text-[#0F172A]"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span>{level}</span>
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => onLevelToggle(level)}
                          className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-slate-300 transition-all checked:border-orange-400 checked:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
                        />
                        <svg
                          className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 stroke-white opacity-0 transition-opacity peer-checked:opacity-100"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="3.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}