import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import NewsList from "./news-list";
import styles from "./news.module.css";
import { getArticles } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "News, Insights & Events",
  description:
    "Stay updated with the latest news, instructional blogs, event announcements, and learning insights from Austra Training Institute in Eldoret, Kenya.",
  alternates: { canonical: "/news" },
};

export default async function NewsPage() {
  const articles = await getArticles();
  return (
    <main className={styles.page}>
      <div className={styles.topLine}>
        <span>NEWS, BLOGS & EVENTS</span>
        <span>ELDORET · KENYA</span>
      </div>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>
            <span className={styles.orangeRule} /> The Austra Journal
          </p>
          <h1>
            News, guides
            <br />
            <em>& event updates.</em>
          </h1>
          <p className={styles.intro}>
            Your central hub for campus news, practical instructional blogs, and upcoming event updates from Austra Training Institute.
          </p>
          <Link href="#stories" className={styles.explore}>
            Explore the latest <ArrowDownRight size={17} />
          </Link>
        </div>
        <div className={styles.heroAside}>
          <div className={styles.heroStamp}>
            A<span>.</span>
          </div>
          <p>
            Stay informed and keep learning.
            <br />
            Discover insights and stay up to date.
          </p>
          <span className={styles.asideIndex}>AUSTRA / JOURNAL</span>
        </div>
        <div className={styles.heroNumber} aria-hidden="true">
          01
        </div>
      </section>
      <NewsList articles={articles} />
      <section className={styles.bottomCta}>
        <div>
          <span className={styles.eyebrow}>
            <span className={styles.orangeRule} /> Your next chapter
          </span>
          <h2>
            Ready to make
            <br />
            something of it<span>?</span>
          </h2>
        </div>
        <Link href="/courses" className={styles.ctaLink}>
          Find your course <ArrowDownRight size={18} />
        </Link>
        <span className={styles.ctaDecor} aria-hidden="true">
          A.
        </span>
      </section>
    </main>
  );
}