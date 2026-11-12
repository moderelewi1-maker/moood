// ─────────────────────────────────────────────────────────────────────────
// Works registry — the single source of truth for every project on the site.
//
// HOW TO ADD A PROJECT
//   1. Open the file for its category (campaigns.js, video.js, design.js,
//      imagery.js, automation.js) or
//      create a new file for a new category and add it to `works` below.
//   2. Append one object. Only `id`, `category` and `title` are required:
//
//      {
//        id: 'unique-kebab-case-id',
//        category: 'design',                 // an id from categories.js
//        featured: true,                     // optional: adds it to "Selected Work"
//        title:   { en: '…', ar: '…' },
//        summary: { en: '…', ar: '…' },
//        scope:   [{ en: '…', ar: '…' }],    // optional: role / deliverable tags
//        stack:   ['n8n', 'PostgreSQL'],     // optional: technology tags
//        details: {                          // optional: any of these fields
//          objective, approach, concept, pacing, style, reading, nodes,
//          platform, outcome,
//        },
//        metrics: [{ label: 'roas', value: '4.2x' }],   // optional
//        illustrative: true,                 // optional: flags modelled metrics
//        cover: '/assets/gallery/cover.jpg', // optional: defaults to first image
//        media: [image('/assets/gallery/a.jpg', { en: 'Caption', ar: '…' })],
//      }
//
//   The Selected Work sequence, the Work Index, its filters, the project
//   viewer and all numbering are generated from this list — nothing else
//   needs to change. Text values accept either { en, ar } or a plain string
//   (shown as-is in both languages, e.g. a product name).
// ─────────────────────────────────────────────────────────────────────────
import { automationWorks } from './automation.js'
import { categories } from './categories.js'
import { campaignWorks } from './campaigns.js'
import { designWorks } from './design.js'
import { imageryWorks } from './imagery.js'
import { videoWorks } from './video.js'

function interleaveByCategory(list) {
  const queues = new Map()
  for (const work of list) {
    if (!queues.has(work.category)) queues.set(work.category, [])
    queues.get(work.category).push(work)
  }
  const result = []
  while (result.length < list.length) {
    for (const queue of queues.values()) {
      if (queue.length) result.push(queue.shift())
    }
  }
  return result
}

// Every project, in the order of the Work Index. The disciplines are dealt
// out in turn (one campaign, one film, one design project, …) so the index
// opens on the full range of work rather than on a single category; within a
// discipline, projects keep the order of their own file. To pin an exact
// order instead, replace this with a hand-written list.
export const works = interleaveByCategory([
  ...campaignWorks,
  ...videoWorks,
  ...designWorks,
  ...imageryWorks,
  ...automationWorks,
])

// The Selected Work sequence: every project marked `featured`, in index order.
export const featuredWorks = works.filter((work) => work.featured)

export const worksById = Object.fromEntries(works.map((work) => [work.id, work]))

const categoriesById = Object.fromEntries(categories.map((category) => [category.id, category]))

/** Categories that currently have at least one project, in registry order. */
export const activeCategories = categories.filter((category) =>
  works.some((work) => work.category === category.id),
)

export function getCategory(work) {
  return categoriesById[work.category] ?? { id: work.category, motif: 'default', label: work.category }
}

/**
 * Line-art shown on the cover of a project that has no image: the category's
 * motif (or `work.motif`), with a variant that differs between neighbours.
 */
export function getMotif(work) {
  const siblings = works.filter((other) => other.category === work.category)
  const vertical = getMedia(work)[0]?.orientation === 'vertical'
  const base = work.motif ?? getCategory(work).motif
  return {
    motif: base === 'video' && vertical ? 'videoVertical' : base,
    variant: siblings.indexOf(work),
  }
}

/** Stable two-digit catalogue number, e.g. "07". */
export function getNumber(work) {
  return String(works.indexOf(work) + 1).padStart(2, '0')
}

export function getMedia(work) {
  return work.media ?? []
}

/**
 * Cover image: explicit `cover`, else the first image, else a video poster.
 * `cover: false` opts out, so the project shows its line-art cover instead.
 */
export function getCover(work) {
  if (work.cover === false) return null
  if (work.cover) return work.cover
  const media = getMedia(work)
  const firstImage = media.find((item) => item.type === 'image')
  if (firstImage) return firstImage.src
  return media.find((item) => item.poster)?.poster ?? null
}

/** 'collection' | 'film' | 'image' | 'caseStudy' | 'system' — override with `work.format`. */
export function getFormat(work) {
  if (work.format) return work.format
  const media = getMedia(work)
  if (media.length > 1) return 'collection'
  if (media.length === 1) return media[0].type === 'image' ? 'image' : 'film'
  return 'caseStudy'
}
