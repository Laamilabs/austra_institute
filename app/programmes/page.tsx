import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BrainCircuit, HeartHandshake, Laptop, Stethoscope } from "lucide-react";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Explore Our Programmes | Austra Training Institute, Eldoret",
  description: "Explore caregiving, health support and nurse aide training, ICT short courses, computer packages, and AI workplace automation at Austra Training Institute in Eldoret.",
  alternates: { canonical: `${SITE_URL}/programmes` },
  openGraph: {
    title: "Explore Our Programmes | Austra Training Institute",
    description: "Find practical health, care and technology training pathways in Eldoret, Kenya.",
    url: `${SITE_URL}/programmes`,
    type: "website",
  },
};

const pathways = [
  { slug: "caregiving", title: "Caregiving", description: "Explore practical training for people preparing to support individuals and families with everyday care needs.", Icon: HeartHandshake, number: "01" },
  { slug: "health-support", title: "Health support & nurse aide", description: "Find health support services and nurse aide courses listed in the current course catalogue.", Icon: Stethoscope, number: "02" },
  { slug: "ict-short-courses", title: "ICT & digital skills", description: "Browse computer packages and available ICT short courses, including web and cybersecurity topics where listed.", Icon: Laptop, number: "03" },
  { slug: "ai-workplace-automation", title: "AI & workplace automation", description: "Explore learning resources about practical AI skills and check the current catalogue for available enrolment options.", Icon: BrainCircuit, number: "04" },
];

export default function ProgrammesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Programmes at Austra Training Institute",
    description: "Caregiving, health support, nurse aide and ICT learning pathways in Eldoret, Kenya.",
    url: `${SITE_URL}/programmes`,
    mainEntity: { "@type": "ItemList", itemListElement: pathways.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title, url: `${SITE_URL}/programmes/${item.slug}` })) },
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="bg-[#0B1F3A] px-5 pb-14 pt-32 text-white sm:px-8 sm:pb-20 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-300">Austra Training Institute · Eldoret, Kenya</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl">Explore our courses and programmes</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">Choose a learning area to see the related courses currently listed in our catalogue. Course pages include the details available for each option.</p>
          <Link href="/courses" className="mt-7 inline-flex items-center gap-2 rounded-sm bg-orange-400 px-5 py-3 text-sm font-bold text-[#0B1F3A] transition-colors hover:bg-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Browse the full course catalogue <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>

      <section aria-label="Programme areas" className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2">
          {pathways.map(({ slug, title, description, Icon, number }) => (
            <Link key={slug} href={`/programmes/${slug}`} className="group relative flex min-h-56 flex-col justify-between border border-slate-200 bg-white p-6 transition-colors hover:border-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 sm:p-8">
              <span aria-hidden="true" className="absolute left-0 top-0 h-3 w-3 border-l border-t border-[#0B1F3A] transition-colors group-hover:border-orange-600" />
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-12 w-12 place-items-center bg-orange-50 text-orange-700"><Icon size={24} aria-hidden="true" /></div>
                <span className="font-mono text-xs text-slate-400">PATHWAY · {number}</span>
              </div>
              <div className="mt-8">
                <h2 className="text-2xl font-bold tracking-tight text-[#0B1F3A]">{title}</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">{description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0B1F3A] group-hover:text-orange-700">Explore courses <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
