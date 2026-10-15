import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getArticle, getArticles } from "@/lib/sanity";
import styles from "../article.module.css";

type Params = {params: Promise<{slug: string}>};
type Span = {text?: string; marks?: string[]};
type Block = { _key?: string; _type: string; style?: string; children?: Span[]; markDefs?: Array<{_key: string; _type: string; href?: string}>; asset?: {url: string}; alt?: string };

export async function generateMetadata({params}: Params): Promise<Metadata> {
  const {slug} = await params;
  const article = await getArticle(slug);
  return article ? {title: article.title, description: article.excerpt, alternates: {canonical: `/news/${slug}`}, openGraph: {type: "article", title: article.title, description: article.excerpt, images: article.coverImage?.url ? [article.coverImage.url] : undefined}} : {};
}

function renderBlock(block: Block, index: number) {
  if (block._type === "image" && block.asset?.url) return <figure className={styles.inlineImage} key={block._key || index}><Image src={block.asset.url} alt={block.alt || ""} width={1200} height={760} unoptimized /><figcaption>{block.alt}</figcaption></figure>;
  if (block._type !== "block" || !block.children) return null;
  const marks = new Map((block.markDefs || []).map((mark) => [mark._key, mark]));
  const text = block.children.map((span, spanIndex) => {
    let child: React.ReactNode = span.text;
    for (const mark of span.marks || []) {
      const definition = marks.get(mark);
      child = mark === "strong" ? <strong key={`${index}-${spanIndex}-s`}>{child}</strong> : mark === "em" ? <em key={`${index}-${spanIndex}-e`}>{child}</em> : definition?._type === "link" && definition.href ? <a key={`${index}-${spanIndex}-a`} href={definition.href}>{child}</a> : child;
    }
    return <span key={`${index}-${spanIndex}`}>{child}</span>;
  });
  const key = block._key || index;
  if (block.style === "h2") return <h2 key={key}>{text}</h2>;
  if (block.style === "h3") return <h3 key={key}>{text}</h3>;
  if (block.style === "blockquote") return <blockquote key={key}>{text}</blockquote>;
  return <p key={key}>{text}</p>;
}

const dateLabel = (date: string) => new Intl.DateTimeFormat("en-KE", {day: "numeric", month: "long", year: "numeric"}).format(new Date(date));

export default async function ArticlePage({params}: Params) {
  const {slug} = await params;
  const [article, allArticles] = await Promise.all([getArticle(slug), getArticles()]);
  if (!article) notFound();
  const related = allArticles.filter((item) => item.slug !== slug && item.category === article.category).slice(0, 3);
  return <main className={styles.page}>
    <div className={styles.topLine}><Link href="/news"><ArrowLeft size={14} /> All stories</Link><span>ELDORET · KENYA</span></div>
    <article>
      <header className={styles.header}><Link href="/news" className={styles.back}><ArrowLeft size={15} /> Back to the journal</Link><p className={styles.category}>{article.category}</p><h1>{article.title}</h1><p className={styles.excerpt}>{article.excerpt}</p><div className={styles.meta}><span>{article.author || "Austra Training Institute"}</span><i /><time dateTime={article.publishedAt}>{dateLabel(article.publishedAt)}</time><i /><span>Austra Journal</span></div></header>
      {article.coverImage?.url && <div className={styles.cover}><Image src={article.coverImage.url} alt={article.coverImage.alt || article.title} fill priority unoptimized sizes="(max-width: 900px) 100vw, 1100px" /></div>}
      <div className={styles.body}>{(article.body || []).map((block, index) => renderBlock(block, index))}</div>
    </article>
    <div className={styles.share}><span>Keep the conversation going</span><div><a href={`https://wa.me/?text=${encodeURIComponent(`${article.title} https://austratraininginstitute.co.ke/news/${slug}`)}`} target="_blank" rel="noreferrer">Share on WhatsApp <ArrowUpRight size={14} /></a><a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://austratraininginstitute.co.ke/news/${slug}`)}`} target="_blank" rel="noreferrer">Share on Facebook <ArrowUpRight size={14} /></a></div></div>
    {related.length > 0 && <section className={styles.related}><div className={styles.relatedHead}><p className={styles.category}>Keep reading</p><h2>More from Austra<span>.</span></h2></div><div className={styles.relatedGrid}>{related.map((item) => <Link href={`/news/${item.slug}`} key={item._id} className={styles.relatedCard}><span>{item.category}</span><h3>{item.title}</h3><ArrowUpRight size={17} /></Link>)}</div></section>}
  </main>;
}
