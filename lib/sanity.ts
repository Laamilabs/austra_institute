export type Article = {
  _id: string
  title: string
  slug: string
  category: string
  excerpt: string
  publishedAt: string
  author?: string
  featured?: boolean
  coverImage?: {url: string; alt?: string}
  body?: Array<{_key?: string; _type: string; style?: string; children?: Array<{text?: string; marks?: string[]}>; asset?: {url: string}; alt?: string}>
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 's2pl19uz'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2025-02-19'

export async function getArticles(): Promise<Article[]> {
  const query = `*[_type == "post" && defined(slug.current) && defined(publishedAt) && !(_id in path("drafts.**"))] | order(featured desc, publishedAt desc){_id,title,"slug":slug.current,category,excerpt,publishedAt,author,featured,"coverImage":{"url":coverImage.asset->url,"alt":coverImage.alt},body[]{...,asset->{url}}}`
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`
  try {
    const response = await fetch(url, {next: {revalidate: 60}})
    if (!response.ok) return []
    const payload = await response.json()
    return Array.isArray(payload.result) ? payload.result as Article[] : []
  } catch {
    return []
  }
}

export async function getArticle(slug: string): Promise<Article | null> {
  const query = `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0]{_id,title,"slug":slug.current,category,excerpt,publishedAt,author,featured,"coverImage":{"url":coverImage.asset->url,"alt":coverImage.alt},body[]{...,asset->{url}}}`
  // Sanity's HTTP query API expects parameter values encoded as JSON literals.
  const params = new URLSearchParams({query, '$slug': JSON.stringify(slug)})
  try {
    const response = await fetch(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?${params}`, {next: {revalidate: 60}})
    if (!response.ok) return null
    const payload = await response.json()
    return payload.result ?? null
  } catch {
    return null
  }
}
