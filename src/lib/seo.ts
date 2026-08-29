// Central SEO helpers: canonical base URL, per-page metadata builders and
// JSON-LD builders. Imported by both server pages and (client) view components,
// so this file stays free of `server-only` and of any Node-only APIs.

import type { Metadata } from 'next'
import { getTopic, formatHref } from '@/lib/cheatsheet/registry'
import type { TopicFormat, TopicSlug } from '@/lib/cheatsheet/types'

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  const raw = explicit || (vercel ? `https://${vercel}` : 'https://cheat-hub.vercel.app')
  return raw.replace(/\/+$/, '')
}

/** Canonical origin for metadata, canonicals, sitemap and robots (no trailing slash). */
export const SITE_URL = resolveSiteUrl()

export const SITE_NAME = 'Cheat Hub'

const SITE_DESCRIPTION =
  'Шпаргалки та теорія для підготовки до співбесід: Architecture, React, Angular, JS/TS, Git, AI та практика LeetCode в редакторі коду.'

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = '/'): string {
  return new URL(path, `${SITE_URL}/`).toString()
}

/** Self-referential canonical for a route. `/` has no trailing slash. */
export function canonicalUrl(path: string): string {
  return path === '/' ? SITE_URL : absoluteUrl(path)
}

interface PageMetaInput {
  title: string | { absolute: string }
  description: string
  /** Site-relative path, e.g. `/react` or `/problems/two-sum`. */
  path: string
  type?: 'website' | 'article'
  /** Optional OG/Twitter image; omit to inherit the nearest `opengraph-image` file. */
  image?: string
  /** OpenGraph locale. Defaults to Ukrainian. */
  locale?: string
  robots?: Metadata['robots']
}

/**
 * Builds a `Metadata` object with a self-referential canonical plus matching
 * OpenGraph and Twitter cards. When `image` is omitted, Next merges the nearest
 * `opengraph-image` file convention automatically.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
  image,
  locale = 'uk_UA',
  robots,
}: PageMetaInput): Metadata {
  const url = canonicalUrl(path)
  const ogTitle = typeof title === 'string' ? title : title.absolute

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      locale,
      title: ogTitle,
      description,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
    ...(robots ? { robots } : {}),
  }
}

// Deliberately not `FORMAT_LABELS` from the registry — its `extended` label is
// "Розширена", which disagrees with the live page titles ("Теорія").
const FORMAT_META_LABEL: Partial<Record<TopicFormat, string>> = {
  extended: 'Теорія',
  cheatsheet: 'Шпаргалка',
  quiz: 'Квіз',
  links: 'Посилання',
  tasks: 'Практичні завдання',
}

/** Metadata for a registry-driven topic page (`/react`, `/git/cheatsheet`, …). */
export function topicMetadata(slug: TopicSlug, format: TopicFormat): Metadata {
  const topic = getTopic(slug)
  if (!topic) return {}

  const label = FORMAT_META_LABEL[format]
  const title = label ? `${topic.title} — ${label}` : topic.title
  const description =
    format === 'quiz' ? `Перевір знання з теми ${topic.title}.` : topic.blurb
  const type = format === 'extended' || format === 'cheatsheet' ? 'article' : 'website'

  return pageMetadata({ title, description, path: formatHref(slug, format), type })
}

/* ---------- JSON-LD builders (plain objects; rendered via <JsonLd />) ---------- */

export type JsonLdData = Record<string, unknown>

export function websiteJsonLd(): JsonLdData {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'uk',
    description: SITE_DESCRIPTION,
  }
}

export function organizationJsonLd(): JsonLdData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/icon.svg'),
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLdData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function learningResourceJsonLd(input: {
  name: string
  description: string
  path: string
  educationalLevel: string
  keywords: string
}): JsonLdData {
  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: input.name,
    description: input.description,
    url: canonicalUrl(input.path),
    educationalLevel: input.educationalLevel,
    keywords: input.keywords,
    inLanguage: 'en',
    isAccessibleForFree: true,
    learningResourceType: 'coding problem',
    isPartOf: { '@type': 'WebSite', url: SITE_URL },
  }
}
