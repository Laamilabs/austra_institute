import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { getArticles, type Article } from "@/lib/sanity";

const dateLabel = (date: string) =>
  new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

function NewsCard({ article }: { article: Article }) {
  return (
    <article className="group min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_18px_45px_-28px_rgba(11,31,58,0.35)]">
      <Link
        href={`/news/${article.slug}`}
        className="relative block aspect-[1.55] overflow-hidden bg-slate-100"
        aria-label={`Read ${article.title}`}
      >
        {article.coverImage?.url ? (
          <Image
            src={article.coverImage.url}
            alt={article.coverImage.alt || article.title}
            fill
            unoptimized
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#dce5e8] via-[#e9e0d5] to-[#cbd7db] font-serif text-6xl text-[#0b1f3a]">
            A<span className="text-[#ef7d22]">.</span>
          </span>
        )}
        <span className="absolute bottom-0 right-0 grid h-11 w-11 place-items-center bg-[#ef7d22] text-white transition-colors group-hover:bg-[#0b1f3a]">
          <ArrowDownRight size={19} aria-hidden="true" />
        </span>
      </Link>
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#c3661f]">
            {article.category || "Austra Journal"}
          </span>
          <time dateTime={article.publishedAt} className="text-[10px] text-slate-500">
            {dateLabel(article.publishedAt)}
          </time>
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-snug tracking-[-0.035em] text-[#0b1f3a] sm:text-xl">
          <Link href={`/news/${article.slug}`} className="transition-colors hover:text-[#c3661f]">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
          {article.excerpt}
        </p>
        <Link
          href={`/news/${article.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-[#0b1f3a] transition-colors hover:text-[#c3661f]"
        >
          Read story <ArrowRight size={15} className="text-[#ef7d22]" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default async function NewsHighlights() {
  const articles = await getArticles();
  const latest = [...articles]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 3);

  return (
    <section
      aria-labelledby="news-highlights-title"
      className="w-full px-5 py-6 sm:px-8 sm:py-2 lg:px-16 lg:py-2 2xl:px-24"
    >
      <div className="mx-auto max-w-[1760px]">
        <div className="mb-8 flex flex-col gap-5 border-b border-slate-200 pb-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.19em] text-slate-500">
              <span aria-hidden="true" className="h-0.5 w-6 bg-[#ef7d22]" />
              The Austra journal
            </p>
           <h2
              id="news-highlights-title"
              className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[#0b1f3a] sm:text-4xl lg:text-5xl"
            >
              News, blogs <span className="font-serif font-normal italic text-[#ef7d22]">& events.</span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              The latest stories, learning insights and event updates from Austra Training Institute.
            </p>
          </div>
          <Link
            href="/news"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-xl bg-[#0b1f3a] px-4 py-3 text-xs font-bold text-white transition-colors hover:bg-[#173456] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 sm:self-auto"
          >
            Explore all stories <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        {latest.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {latest.map((article) => (
              <NewsCard key={article._id} article={article} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 text-center sm:py-14">
            <p className="font-serif text-4xl text-[#0b1f3a]">A<span className="text-[#ef7d22]">.</span></p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-[#0b1f3a]">
              New stories are on the way.
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">
              Visit the News page for the latest campus updates, practical blogs and event announcements.
            </p>
            <Link href="/news" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-[#0b1f3a] hover:text-[#c3661f]">
              Visit News & Events <ArrowRight size={15} className="text-[#ef7d22]" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
