"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowRight, Search } from "lucide-react";
import type { Article } from "@/lib/sanity";
import styles from "./news.module.css";

const pageSize = 6;
const dateLabel = (date: string) => new Intl.DateTimeFormat("en-KE", { day: "numeric", month: "short", year: "numeric" }).format(new Date(date));

export default function NewsList({ articles }: { articles: Article[] }) {
  const categories = ["All stories", ...Array.from(new Set(articles.map((article) => article.category).filter(Boolean)))];
  const [category, setCategory] = useState("All stories");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const remaining = featured ? articles.filter((article) => article._id !== featured._id) : articles;
  const filtered = useMemo(() => remaining.filter((article) =>
    (category === "All stories" || article.category === category) &&
    `${article.title} ${article.excerpt} ${article.category}`.toLowerCase().includes(search.toLowerCase().trim())
  ), [remaining, category, search]);
  const resetFilters = () => { setCategory("All stories"); setSearch(""); };

  return <>
    {featured && category === "All stories" && !search && <section className={styles.featured} aria-label="Featured story">
      <Link href={`/news/${featured.slug}`} className={styles.featuredImage} aria-label={`Read ${featured.title}`}>
        {featured.coverImage?.url ? <Image src={featured.coverImage.url} alt={featured.coverImage.alt || featured.title} fill priority unoptimized sizes="(max-width: 900px) 100vw, 52vw" /> : <div className={styles.imageFallback}>Austra <span>Training Institute</span></div>}
        <span className={styles.featuredFlag}><span /> Editor’s pick</span>
      </Link>
      <div className={styles.featuredCopy}>
        <p className={styles.eyebrow}><span className={styles.orangeRule} /> Featured story</p>
        <span className={styles.category}>{featured.category}</span>
        <h2><Link href={`/news/${featured.slug}`}>{featured.title}</Link></h2>
        <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
        <div className={styles.storyMeta}><span>{dateLabel(featured.publishedAt)}</span><i /> <span>{featured.author || "Austra Training Institute"}</span></div>
        <Link href={`/news/${featured.slug}`} className={styles.readLink}>Read the story <ArrowRight size={16} /></Link>
      </div>
    </section>}

    <section className={styles.stories} id="stories">
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}><span className={styles.orangeRule} /> From Austra</p><h2>Latest stories<span>.</span></h2></div><span className={styles.storyCount}>{filtered.length.toString().padStart(2, "0")} stories</span></div>
      <div className={styles.filters}>
        <div className={styles.categoryList} role="group" aria-label="Filter by category">
          {categories.map((item) => <button key={item} type="button" onClick={() => { setCategory(item); setVisibleCount(pageSize); }} aria-pressed={category === item} className={`${styles.filterButton} ${category === item ? styles.activeFilter : ""}`}>{item}</button>)}
        </div>
        <label className={styles.searchBox}><Search size={17} aria-hidden="true" /><span className="sr-only">Search stories</span><input value={search} onChange={(event) => { setSearch(event.target.value); setVisibleCount(pageSize); }} placeholder="Search stories" /></label>
      </div>
      {filtered.length ? <div className={styles.grid}>
        {filtered.slice(0, visibleCount).map((article, index) => <article className={styles.card} key={article._id}>
          <Link href={`/news/${article.slug}`} className={styles.cardImage} aria-label={`Read ${article.title}`}>
            {article.coverImage?.url ? <Image src={article.coverImage.url} alt={article.coverImage.alt || article.title} fill unoptimized sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw" /> : <div className={`${styles.imageFallback} ${styles[`fallback${index % 3}`]}`}>A<span>.</span></div>}
            <span className={styles.cardArrow}><ArrowDownRight size={19} /></span>
          </Link>
          <div className={styles.cardBody}><div className={styles.cardTop}><span className={styles.category}>{article.category}</span><time dateTime={article.publishedAt}>{dateLabel(article.publishedAt)}</time></div><h3><Link href={`/news/${article.slug}`}>{article.title}</Link></h3><p>{article.excerpt}</p><Link href={`/news/${article.slug}`} className={styles.cardRead}>Read story <ArrowRight size={14} /></Link></div>
        </article>)}
      </div> : <div className={styles.empty}><div className={styles.emptyMark}>A<span>.</span></div><h3>{articles.length ? "No stories found" : "Good things are in the works."}</h3><p>{articles.length ? "Try another search or category." : "Our next story is on its way. Check back soon for news, student opportunities and learning updates from Austra."}</p>{(search || category !== "All stories") && <button type="button" onClick={resetFilters}>Clear filters</button>}</div>}
      {filtered.length > visibleCount && <button className={styles.loadMore} type="button" onClick={() => setVisibleCount((count) => count + pageSize)}>Show more stories <ArrowDownRight size={17} /></button>}
    </section>
  </>;
}
