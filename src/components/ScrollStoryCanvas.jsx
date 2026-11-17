import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * The narrative background: Modar's three-phase story, drawn as one canvas
 * behind the whole page.
 *
 *   0.00 – 0.34   PRODUCTION   nine-blade iris, viewfinder reticle, anamorphic flare
 *   0.34 – 0.66   POST         timecode ruler, NLE lanes, waveform, sweeping playhead
 *   0.66 – 1.00   SCALING      data matrix, growth vector, telemetry nodes
 *
 * Canvas rather than SVG. Every plane parallaxes at its own rate and the
 * flare tracks scroll momentum, so the geometry is recomputed each frame —
 * that is precisely the work the DOM is worst at. One canvas is a single
 * composited layer with no style recalc, no reflow, and no per-node cost.
 *
 * Budget: only scenes with opacity above the cull threshold draw at all, so
 * the common case is one scene and the crossfade case is two. Idle frames
 * where neither scroll nor time-based motion has moved anything are skipped
 * entirely.
 */

const BLADES = 9
const CULL = 0.012

/* Deterministic hash so waveform peaks and matrix cells are identical on
   every load — a background that reshuffles itself on reload reads as noise
   rather than as a real instrument readout. */
function hash(i) {
  const x = Math.sin(i * 127.1 + 11.7) * 43758.5453
  return x - Math.floor(x)
}

/* Trapezoid window: 0 before `a`, 1 across `b`→`c`, 0 after `d`. */
function ramp(p, a, b, c, d) {
  if (p <= a || p >= d) return 0
  if (p < b) return (p - a) / (b - a)
  if (p > c) return (d - p) / (d - c)
  return 1
}

function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

/* Palette is read from the stylesheet rather than duplicated here, so the
   canvas can never drift out of sync with the theme tokens. */
function readTheme(el) {
  const cs = getComputedStyle(el)
  const get = (name, fallback) => cs.getPropertyValue(name).trim() || fallback
  return {
    accent: get('--color-accent', '#e09a3e'),
    accentBright: get('--color-accent-bright', '#f5b15c'),
    accentDeep: get('--color-accent-deep', '#a96f22'),
    ember: get('--color-ember', '#3a2410'),
    ink: get('--color-ink-muted', '#9ba4b0'),
    faint: get('--color-ink-faint', '#737c89'),
  }
}

function rgba(hex, a) {
  const h = hex.replace('#', '')
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`
}

function meta(ctx, text, x, y, color, size = 11) {
  ctx.font = `500 ${size}px "IBM Plex Mono", ui-monospace, monospace`
  ctx.fillStyle = color
  ctx.fillText(text, x, y)
}

/* ── Scene 01 — Production ──────────────────────────────────────────────
   A real nine-blade iris rather than a decorative circle: the aperture
   polygon is inscribed so its inradius is the true opening, and each blade
   edge is drawn back to the barrel the way the mechanism actually sits. The
   iris stops down as the phase advances. */
function drawProduction(ctx, W, H, t, phase, vel, C) {
  const cx = W * 0.5
  const cy = H * 0.47
  const R = Math.min(W, H) * 0.3

  // Atmospheric light — the ambient bloom the lens is sitting in.
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 2.4)
  glow.addColorStop(0, rgba(C.ember, 0.5))
  glow.addColorStop(1, rgba(C.ember, 0))
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, W, H)

  // Plane 1 (deepest): barrel rings and the f-stop scale.
  ctx.save()
  ctx.translate(0, phase * 26)
  ctx.strokeStyle = rgba(C.faint, 0.5)
  ctx.lineWidth = 1
  for (const r of [R * 1.28, R * 1.42]) {
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.stroke()
  }
  // f-stop ticks around the barrel
  ctx.strokeStyle = rgba(C.faint, 0.75)
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2
    const long = i % 6 === 0
    const r0 = R * 1.28
    const r1 = r0 + (long ? 14 : 7)
    ctx.beginPath()
    ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0)
    ctx.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1)
    ctx.stroke()
  }
  ctx.restore()

  // Plane 2: the iris itself.
  ctx.save()
  ctx.translate(0, phase * 12)
  const opening = 0.66 - 0.3 * phase // stops down through the phase
  const spin = phase * 0.42 + t * 0.04
  const vertexR = (R * opening) / Math.cos(Math.PI / BLADES)

  ctx.beginPath()
  for (let i = 0; i < BLADES; i++) {
    const a = spin + (i / BLADES) * Math.PI * 2
    const x = cx + Math.cos(a) * vertexR
    const y = cy + Math.sin(a) * vertexR
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.strokeStyle = rgba(C.accent, 0.85)
  ctx.lineWidth = 1.6
  ctx.stroke()
  ctx.fillStyle = rgba(C.ember, 0.32)
  ctx.fill()

  // Blade edges running back into the barrel.
  ctx.strokeStyle = rgba(C.accentDeep, 0.55)
  ctx.lineWidth = 1
  for (let i = 0; i < BLADES; i++) {
    const a = spin + (i / BLADES) * Math.PI * 2
    ctx.beginPath()
    ctx.moveTo(cx + Math.cos(a) * vertexR, cy + Math.sin(a) * vertexR)
    ctx.lineTo(cx + Math.cos(a - 0.5) * R * 1.26, cy + Math.sin(a - 0.5) * R * 1.26)
    ctx.stroke()
  }
  ctx.restore()

  // Plane 3: viewfinder reticle and framing brackets, nearest the eye.
  ctx.save()
  ctx.translate(vel * 10, phase * -18)
  ctx.strokeStyle = rgba(C.accent, 0.6)
  ctx.lineWidth = 1.2
  const gap = 16
  const arm = 40
  for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    ctx.beginPath()
    ctx.moveTo(cx + dx * gap, cy + dy * gap)
    ctx.lineTo(cx + dx * (gap + arm), cy + dy * (gap + arm))
    ctx.stroke()
  }
  ctx.fillStyle = rgba(C.accentBright, 0.9)
  ctx.beginPath()
  ctx.arc(cx, cy, 2, 0, Math.PI * 2)
  ctx.fill()

  // Corner framing brackets on the safe-action box.
  const bx = W * 0.14
  const by = H * 0.16
  const bw = W * 0.72
  const bh = H * 0.66
  const L = 30
  ctx.strokeStyle = rgba(C.accent, 0.5)
  ctx.lineWidth = 2
  const corners = [
    [bx, by, 1, 1], [bx + bw, by, -1, 1],
    [bx, by + bh, 1, -1], [bx + bw, by + bh, -1, -1],
  ]
  for (const [x, y, sx, sy] of corners) {
    ctx.beginPath()
    ctx.moveTo(x, y + sy * L)
    ctx.lineTo(x, y)
    ctx.lineTo(x + sx * L, y)
    ctx.stroke()
  }
  ctx.restore()

  // Anamorphic flare: a horizontal streak with ghosts along the axis,
  // sliding against scroll momentum the way a real flare tracks the light.
  const fx = cx + vel * 90
  const streak = ctx.createLinearGradient(fx - R * 1.9, cy, fx + R * 1.9, cy)
  streak.addColorStop(0, rgba(C.accent, 0))
  streak.addColorStop(0.5, rgba(C.accentBright, 0.16 + Math.abs(vel) * 0.1))
  streak.addColorStop(1, rgba(C.accent, 0))
  ctx.fillStyle = streak
  ctx.fillRect(fx - R * 1.9, cy - 1.2, R * 3.8, 2.4)

  for (const [k, r, a] of [[-0.55, 16, 0.13], [0.4, 9, 0.16], [0.78, 22, 0.08]]) {
    ctx.beginPath()
    ctx.arc(fx + k * R * 1.5, cy - k * 12, r, 0, Math.PI * 2)
    ctx.strokeStyle = rgba(C.accentBright, a)
    ctx.lineWidth = 1.5
    ctx.stroke()
  }

  // Slate metadata.
  meta(ctx, 'SCENE 01 — PRODUCTION', bx, by - 18, rgba(C.faint, 0.85))
  meta(ctx, `f/${(1.4 + phase * 6.2).toFixed(1)}  ·  24 FPS  ·  ISO 800`, bx, by + bh + 26, rgba(C.faint, 0.7))
  const rec = 0.45 + 0.55 * Math.abs(Math.sin(t * 1.6))
  ctx.beginPath()
  ctx.arc(bx + bw - 54, by + bh + 22, 4, 0, Math.PI * 2)
  ctx.fillStyle = rgba(C.accentBright, rec)
  ctx.fill()
  meta(ctx, 'REC', bx + bw - 44, by + bh + 26, rgba(C.accentBright, rec))
}

/* ── Scene 02 — Post-production ─────────────────────────────────────────
   A working NLE timeline: timecode ruler with frame ticks, four lanes whose
   clips slide into place as the phase advances, keyframe diamonds, a real
   waveform, razor guides, and a playhead driven by scroll. */
function drawPost(ctx, W, H, t, phase, vel, C) {
  const x0 = W * 0.11
  const x1 = W * 0.89
  const span = x1 - x0
  const top = H * 0.3

  ctx.save()
  ctx.translate(vel * -14, 0)

  // Timecode ruler.
  const rulerY = top - 16
  ctx.strokeStyle = rgba(C.faint, 0.5)
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(x0, rulerY)
  ctx.lineTo(x1, rulerY)
  ctx.stroke()
  const ticks = 96
  for (let i = 0; i <= ticks; i++) {
    const x = x0 + (i / ticks) * span
    const major = i % 8 === 0
    ctx.strokeStyle = rgba(C.faint, major ? 0.8 : 0.4)
    ctx.beginPath()
    ctx.moveTo(x, rulerY)
    ctx.lineTo(x, rulerY - (major ? 10 : 5))
    ctx.stroke()
    if (i % 24 === 0) {
      const secs = Math.floor((i / ticks) * 48)
      const tc = `00:${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`
      meta(ctx, tc, x + 4, rulerY - 16, rgba(C.faint, 0.65), 9)
    }
  }

  // Lanes. Each clip eases into position on its own offset so the timeline
  // assembles itself rather than appearing whole.
  const lanes = [
    { label: 'V2', clips: [[0.06, 0.2], [0.32, 0.16]], kind: 'video' },
    { label: 'V1', clips: [[0.0, 0.28], [0.3, 0.34], [0.68, 0.3]], kind: 'video' },
    { label: 'A1', clips: [[0.0, 0.66]], kind: 'audio' },
    { label: 'A2', clips: [[0.5, 0.48]], kind: 'audio' },
  ]
  const laneH = Math.min(30, H * 0.045)
  const laneGap = 8

  lanes.forEach((lane, li) => {
    const y = top + li * (laneH + laneGap)

    meta(ctx, lane.label, x0 - 26, y + laneH * 0.66, rgba(C.faint, 0.8), 10)

    // Empty lane bed.
    ctx.fillStyle = rgba(C.ink, 0.035)
    ctx.fillRect(x0, y, span, laneH)
    ctx.strokeStyle = rgba(C.faint, 0.22)
    ctx.lineWidth = 1
    ctx.strokeRect(x0 + 0.5, y + 0.5, span - 1, laneH - 1)

    lane.clips.forEach(([start, len], ci) => {
      const settle = clamp01((phase - 0.06 * (li + ci)) * 2.6)
      if (settle <= 0) return
      const slide = (1 - settle) * 90 * (ci % 2 === 0 ? -1 : 1)
      const cx0 = x0 + start * span + slide
      const cw = len * span

      ctx.globalAlpha = settle
      ctx.fillStyle = rgba(C.accent, lane.kind === 'audio' ? 0.1 : 0.16)
      ctx.fillRect(cx0, y, cw, laneH)
      ctx.strokeStyle = rgba(C.accent, 0.7)
      ctx.strokeRect(cx0 + 0.5, y + 0.5, cw - 1, laneH - 1)

      if (lane.kind === 'audio') {
        // Symmetric waveform inside the clip.
        const mid = y + laneH / 2
        ctx.strokeStyle = rgba(C.accentBright, 0.55)
        ctx.lineWidth = 1
        const step = 3
        for (let x = cx0 + 2; x < cx0 + cw - 2; x += step) {
          const n = hash(Math.floor(x * 0.7) + li * 91)
          const n2 = hash(Math.floor(x * 0.23) + li * 17)
          const amp = (laneH / 2 - 3) * (0.18 + n * 0.55 + n2 * 0.3)
          ctx.beginPath()
          ctx.moveTo(x, mid - amp)
          ctx.lineTo(x, mid + amp)
          ctx.stroke()
        }
      } else {
        // Keyframe diamonds along the clip's lower edge.
        const count = Math.max(2, Math.floor(cw / 60))
        for (let k = 0; k <= count; k++) {
          const kx = cx0 + (k / count) * cw
          const ky = y + laneH - 4
          ctx.beginPath()
          ctx.moveTo(kx, ky - 3.4)
          ctx.lineTo(kx + 3.4, ky)
          ctx.lineTo(kx, ky + 3.4)
          ctx.lineTo(kx - 3.4, ky)
          ctx.closePath()
          ctx.fillStyle = rgba(C.accentBright, 0.85)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
    })
  })

  const stackH = lanes.length * (laneH + laneGap)

  // Razor cut guides.
  ctx.setLineDash([4, 6])
  ctx.strokeStyle = rgba(C.accentBright, 0.35)
  ctx.lineWidth = 1
  for (const k of [0.3, 0.5, 0.68]) {
    const x = x0 + k * span
    ctx.beginPath()
    ctx.moveTo(x, top - 6)
    ctx.lineTo(x, top + stackH)
    ctx.stroke()
  }
  ctx.setLineDash([])

  // Playhead, driven by phase position.
  const px = x0 + clamp01(phase) * span
  ctx.strokeStyle = rgba(C.accentBright, 0.95)
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(px, rulerY - 12)
  ctx.lineTo(px, top + stackH + 10)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(px - 6, rulerY - 12)
  ctx.lineTo(px + 6, rulerY - 12)
  ctx.lineTo(px, rulerY - 4)
  ctx.closePath()
  ctx.fillStyle = rgba(C.accentBright, 0.95)
  ctx.fill()

  const frame = Math.floor(clamp01(phase) * 48 * 24)
  meta(ctx, 'SCENE 02 — POST-PRODUCTION', x0, top - 44, rgba(C.faint, 0.85))
  meta(
    ctx,
    `TC 00:${String(Math.floor(frame / 24 / 60)).padStart(2, '0')}:${String(Math.floor(frame / 24) % 60).padStart(2, '0')}:${String(frame % 24).padStart(2, '0')}`,
    x0,
    top + stackH + 34,
    rgba(C.faint, 0.7)
  )
  meta(ctx, 'CUT  ·  RIPPLE  ·  ROLL', x1 - 150, top + stackH + 34, rgba(C.faint, 0.55))

  ctx.restore()
}

/* ── Scene 03 — Scaling & media buying ──────────────────────────────────
   Telemetry: a data matrix whose lit cells resolve as the phase advances, a
   growth vector on a logarithmic ramp against a flat baseline, and readout
   nodes on the curve. */
function drawScaling(ctx, W, H, t, phase, vel, C) {
  const x0 = W * 0.12
  const x1 = W * 0.88
  const yBase = H * 0.68
  const yTop = H * 0.26
  const span = x1 - x0
  const rise = yBase - yTop

  // Plane 1: the data matrix.
  ctx.save()
  ctx.translate(vel * -8, 0)
  const cols = 44
  const rows = 14
  const gx = span / cols
  const gy = (yBase - yTop) / rows
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const n = hash(c * 31 + r * 7)
      const x = x0 + c * gx
      const y = yTop + r * gy
      const lit = n > 0.93 && phase > n - 0.6
      if (lit) {
        ctx.fillStyle = rgba(C.accent, 0.22)
        ctx.fillRect(x - gx * 0.34, y - gy * 0.34, gx * 0.68, gy * 0.68)
      }
      ctx.fillStyle = rgba(C.faint, 0.16 + n * 0.12)
      ctx.fillRect(x - 0.6, y - 0.6, 1.2, 1.2)
    }
  }
  ctx.restore()

  // Axes.
  ctx.strokeStyle = rgba(C.faint, 0.45)
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(x0, yBase)
  ctx.lineTo(x1, yBase)
  ctx.stroke()
  for (let i = 0; i <= 8; i++) {
    const x = x0 + (i / 8) * span
    ctx.beginPath()
    ctx.moveTo(x, yBase)
    ctx.lineTo(x, yBase + (i % 2 === 0 ? 8 : 4))
    ctx.stroke()
  }

  // Flat baseline: what the account did before it was restructured.
  ctx.setLineDash([5, 7])
  ctx.strokeStyle = rgba(C.faint, 0.45)
  ctx.beginPath()
  ctx.moveTo(x0, yBase - rise * 0.14)
  ctx.lineTo(x1, yBase - rise * 0.24)
  ctx.stroke()
  ctx.setLineDash([])

  // Growth vector on a logarithmic ramp — steep early return that keeps
  // compounding as spend scales.
  const drawn = clamp01(phase * 1.35)
  const pointAt = (u) => {
    const y = Math.log(1 + u * 11) / Math.log(12)
    return [x0 + u * span, yBase - y * rise]
  }

  ctx.beginPath()
  ctx.moveTo(x0, yBase)
  for (let i = 0; i <= 120; i++) {
    const u = (i / 120) * drawn
    const [px, py] = pointAt(u)
    ctx.lineTo(px, py)
  }
  const [ex] = pointAt(drawn)
  ctx.lineTo(ex, yBase)
  ctx.closePath()
  const fill = ctx.createLinearGradient(0, yTop, 0, yBase)
  fill.addColorStop(0, rgba(C.accent, 0.2))
  fill.addColorStop(1, rgba(C.accent, 0))
  ctx.fillStyle = fill
  ctx.fill()

  ctx.beginPath()
  for (let i = 0; i <= 120; i++) {
    const u = (i / 120) * drawn
    const [px, py] = pointAt(u)
    if (i === 0) ctx.moveTo(px, py)
    else ctx.lineTo(px, py)
  }
  ctx.strokeStyle = rgba(C.accentBright, 0.9)
  ctx.lineWidth = 2
  ctx.lineJoin = 'round'
  ctx.stroke()

  // Telemetry nodes that resolve as the curve reaches them.
  const nodes = [0.18, 0.42, 0.68, 0.9]
  nodes.forEach((u, i) => {
    if (drawn < u) return
    const [px, py] = pointAt(u)
    const pulse = 0.5 + 0.5 * Math.sin(t * 1.4 + i)
    ctx.beginPath()
    ctx.arc(px, py, 3, 0, Math.PI * 2)
    ctx.fillStyle = rgba(C.accentBright, 0.95)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(px, py, 7 + pulse * 3, 0, Math.PI * 2)
    ctx.strokeStyle = rgba(C.accent, 0.3 * (1 - pulse * 0.5))
    ctx.lineWidth = 1
    ctx.stroke()
    meta(ctx, ['REACH', 'CPA ↓', 'ROAS ↑', 'SCALE'][i], px + 10, py - 8, rgba(C.faint, 0.7), 9)
  })

  meta(ctx, 'SCENE 03 — SCALING & MEDIA BUYING', x0, yTop - 26, rgba(C.faint, 0.85))
  meta(ctx, 'SPEND', x0, yBase + 26, rgba(C.faint, 0.6), 9)
  meta(ctx, 'RETURN', x1 - 44, yBase + 26, rgba(C.faint, 0.6), 9)
}

export default function ScrollStoryCanvas() {
  const prefersReduced = useReducedMotion()
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return undefined

    const C = readTheme(document.documentElement)
    let W = 0
    let H = 0
    let raf = 0
    let smoothed = 0
    let vel = 0
    let lastY = window.scrollY
    let lastDrawn = -1
    const start = performance.now()

    function resize() {
      // Capped at 2 — beyond that the extra pixels cost fill rate and buy
      // nothing on a background sitting at 9% opacity.
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = Math.floor(W * dpr)
      canvas.height = Math.floor(H * dpr)
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      lastDrawn = -1
    }

    function frame(now) {
      raf = requestAnimationFrame(frame)
      if (document.hidden) return

      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const target = max > 0 ? clamp01(window.scrollY / max) : 0

      // Momentum, normalised and eased. This is what the flare and the
      // parallax planes ride on.
      const raw = (window.scrollY - lastY) / Math.max(window.innerHeight, 1)
      lastY = window.scrollY
      vel += (clamp01(Math.abs(raw) * 6) * Math.sign(raw) - vel) * 0.09

      // Weighted follow, deliberately slower than the scroll itself so the
      // background trails the content with some mass behind it.
      smoothed += (target - smoothed) * 0.075

      const t = (now - start) / 1000
      const p = smoothed

      const wProd = ramp(p, -1, 0, 0.26, 0.42)
      const wPost = ramp(p, 0.26, 0.42, 0.6, 0.74)
      const wScale = ramp(p, 0.6, 0.74, 2, 3)

      // Skip the frame when nothing has moved enough to change a pixel.
      const sig = Math.round(p * 2000) + Math.round(vel * 400) + Math.round(t * 24)
      if (sig === lastDrawn) return
      lastDrawn = sig

      ctx.clearRect(0, 0, W, H)
      ctx.lineCap = 'butt'
      ctx.textBaseline = 'alphabetic'

      if (wProd > CULL) {
        ctx.globalAlpha = wProd
        drawProduction(ctx, W, H, t, clamp01(p / 0.34), vel, C)
      }
      if (wPost > CULL) {
        ctx.globalAlpha = wPost
        drawPost(ctx, W, H, t, clamp01((p - 0.3) / 0.34), vel, C)
      }
      if (wScale > CULL) {
        ctx.globalAlpha = wScale
        drawScaling(ctx, W, H, t, clamp01((p - 0.64) / 0.34), vel, C)
      }
      ctx.globalAlpha = 1
    }

    if (prefersReduced) {
      // One static frame of the opening scene: the motif without the motion.
      resize()
      ctx.globalAlpha = 1
      drawProduction(ctx, W, H, 0, 0.2, 0, C)
      window.addEventListener('resize', () => {
        resize()
        drawProduction(ctx, W, H, 0, 0.2, 0, C)
      })
      return undefined
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [prefersReduced])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-[0.13]" />
      {/* Vignette seats the scene into the ground so its edges never compete
          with body copy at the margins. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_48%,var(--color-ground)_96%)]" />
    </div>
  )
}
