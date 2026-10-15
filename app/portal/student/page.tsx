import { Construction, GraduationCap } from "lucide-react";

export default function StudentPortalPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-5 py-16 sm:px-8">
      <section
        aria-labelledby="student-portal-title"
        className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-12 text-center shadow-[0_24px_70px_-32px_rgba(8,43,102,0.3)] sm:px-12 sm:py-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-orange-100/70 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-12 h-56 w-56 rounded-full bg-blue-100/70 blur-3xl"
        />

        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#082B66] text-orange-300 shadow-lg shadow-[#082B66]/15">
          <GraduationCap aria-hidden="true" size={38} strokeWidth={1.7} />
          <span className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-orange-400 text-[#082B66]">
            <Construction aria-hidden="true" size={17} strokeWidth={2.2} />
          </span>
        </div>

        <p className="relative mt-8 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
          Student portal
        </p>
        <h1
          id="student-portal-title"
          className="relative mt-3 text-3xl font-semibold tracking-tight text-[#082B66] sm:text-4xl"
        >
          Under construction
        </h1>
        <p className="relative mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
          We’re building a dedicated space for students to access their studies
          and stay connected. The portal will be available here soon.
        </p>
        <div className="relative mx-auto mt-8 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-800">
          <span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
          Coming soon
        </div>
      </section>
    </main>
  );
}
