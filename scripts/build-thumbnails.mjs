// Generates lightweight WebP previews for every image under public/assets.
//
//   npm run media
//
// Each source image gets a preview at public/assets/thumbs/<same path>.webp
// (longest side 960px). Covers, cards and thumbnail strips load the preview;
// the full-size original is only fetched when a project is opened.
//
// Run it after adding or replacing images. It is incremental: previews that
// are newer than their source are skipped. A missing preview is not an
// error — the site falls back to the original file.
import { mkdir, readdir, stat } from 'node:fs/promises'
import { dirname, extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ASSETS = fileURLToPath(new URL('../public/assets/', import.meta.url))
const OUTPUT = join(ASSETS, 'thumbs')
const SOURCES = ['gallery', 'video', 'works']
const IMAGE = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])
const LONGEST_SIDE = 960

async function* walk(directory) {
  let entries
  try {
    entries = await readdir(directory, { withFileTypes: true })
  } catch {
    return // the folder does not exist yet
  }
  for (const entry of entries) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) yield* walk(path)
    else if (IMAGE.has(extname(entry.name).toLowerCase())) yield path
  }
}

const modified = async (path) => (await stat(path).catch(() => null))?.mtimeMs ?? 0

let made = 0
let skipped = 0

for (const folder of SOURCES) {
  for await (const source of walk(join(ASSETS, folder))) {
    const target = join(OUTPUT, relative(ASSETS, source)).replace(/\.[^.]+$/, '.webp')
    if ((await modified(target)) >= (await modified(source))) {
      skipped += 1
      continue
    }
    await mkdir(dirname(target), { recursive: true })
    await sharp(source)
      .rotate() // honour EXIF orientation
      .resize({ width: LONGEST_SIDE, height: LONGEST_SIDE, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 76 })
      .toFile(target)
    made += 1
  }
}

console.log(`Previews: ${made} generated, ${skipped} up to date → public/assets/thumbs/`)
