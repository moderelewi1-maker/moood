import { useReducedMotion, motion, useScroll, useSpring, useTransform } from 'framer-motion'

/**
 * Pinned background that tells Modar's three-phase story as the page scrolls:
 *
 *   0–33%   production   — camera viewfinder HUD
 *   34–66%  post         — editorial workstation timeline
 *   67–100% scaling      — media buyer cockpit
 *
 * Rendered as vector layers rather than a WebGL canvas so it stays crisp at
 * any resolution and costs almost nothing to composite. It sits behind all
 * content at very low opacity, never takes pointer events, and freezes on
 * the first phase when the visitor prefers reduced motion.
 */

const STROKE = 'rgba(148, 163, 184, 0.55)'
const ACCENT = 'rgba(56, 189, 248, 0.85)'

function ViewfinderLayer({ pulse }) {
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      {/* frame guides (rule of thirds) */}
      <g stroke={STROKE} strokeWidth="1" opacity="0.35">
        <line x1="480" y1="120" x2="480" y2="780" />
        <line x1="960" y1="120" x2="960" y2="780" />
        <line x1="200" y1="340" x2="1240" y2="340" />
        <line x1="200" y1="560" x2="1240" y2="560" />
      </g>

      {/* corner focus brackets */}
      <g stroke={ACCENT} strokeWidth="2.5" fill="none" strokeLinecap="square">
        <polyline points="200,180 200,120 270,120" />
        <polyline points="1240,180 1240,120 1170,120" />
        <polyline points="200,720 200,780 270,780" />
        <polyline points="1240,720 1240,780 1170,780" />
      </g>

      {/* centre reticle */}
      <g stroke={ACCENT} strokeWidth="1.5" fill="none" opacity="0.8">
        <circle cx="720" cy="450" r="46" strokeDasharray="6 10" />
        <line x1="720" y1="386" x2="720" y2="414" />
        <line x1="720" y1="486" x2="720" y2="514" />
        <line x1="656" y1="450" x2="684" y2="450" />
        <line x1="756" y1="450" x2="784" y2="450" />
      </g>

      {/* focus box that breathes */}
      <motion.rect
        x="600" y="340" width="240" height="220" rx="4"
        fill="none" stroke={ACCENT} strokeWidth="2" strokeDasharray="18 12"
        animate={{ opacity: [0.35, 0.8, 0.35] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* record indicator + telemetry */}
      <g fill={STROKE} fontFamily="monospace" fontSize="18" letterSpacing="2">
        <motion.circle cx="228" cy="836" r="8" fill="#f87171" style={{ opacity: pulse }} />
        <text x="252" y="843" fill="#f87171">REC</text>
        <text x="1090" y="843">24 FPS · f/1.8</text>
        <text x="200" y="98">SCENE 01 — PRODUCTION</text>
      </g>
    </svg>
  )
}

function EditorialLayer({ playhead }) {
  const tracks = [
    { y: 300, w: 900, label: 'V1' },
    { y: 360, w: 640, label: 'V2' },
    { y: 420, w: 780, label: 'A1' },
  ]
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      {/* viewport frame */}
      <rect x="200" y="90" width="1040" height="150" rx="6" fill="none" stroke={STROKE} strokeWidth="1.5" opacity="0.5" />
      <text x="200" y="72" fill={STROKE} fontFamily="monospace" fontSize="18" letterSpacing="2">
        SCENE 02 — POST-PRODUCTION
      </text>

      {/* timeline tracks with clip blocks */}
      {tracks.map((track) => (
        <g key={track.label}>
          <text x="200" y={track.y + 22} fill={STROKE} fontFamily="monospace" fontSize="15">
            {track.label}
          </text>
          <rect x="250" y={track.y} width="990" height="34" rx="3" fill="rgba(148,163,184,0.06)" stroke={STROKE} strokeWidth="1" opacity="0.5" />
          <rect x="250" y={track.y} width={track.w} height="34" rx="3" fill="rgba(56,189,248,0.12)" stroke={ACCENT} strokeWidth="1.2" />
        </g>
      ))}

      {/* cut markers */}
      <g stroke={ACCENT} strokeWidth="2" opacity="0.75">
        {[420, 610, 745, 980].map((x) => (
          <line key={x} x1={x} y1="292" x2={x} y2="462" strokeDasharray="4 6" />
        ))}
      </g>

      {/* audio waveform */}
      <g fill={ACCENT} opacity="0.55">
        {Array.from({ length: 74 }).map((_, i) => {
          const h = 8 + Math.abs(Math.sin(i * 0.9) * 40) + Math.abs(Math.cos(i * 0.35) * 18)
          return (
            <motion.rect
              key={i}
              x={252 + i * 13.4}
              y={560 - h / 2}
              width="5"
              height={h}
              rx="2"
              animate={{ scaleY: [1, 0.45 + ((i * 37) % 70) / 100, 1] }}
              transition={{ duration: 1.6 + (i % 5) * 0.25, repeat: Infinity, ease: 'easeInOut' }}
              style={{ originY: '50%', transformBox: 'fill-box' }}
            />
          )
        })}
      </g>

      {/* playhead sweeps with scroll */}
      <motion.g style={{ x: playhead }}>
        <line x1="250" y1="280" x2="250" y2="620" stroke={ACCENT} strokeWidth="2.5" />
        <polygon points="240,272 260,272 250,286" fill={ACCENT} />
      </motion.g>

      <text x="1090" y="700" fill={STROKE} fontFamily="monospace" fontSize="18" letterSpacing="2">
        00:00:14:08
      </text>
    </svg>
  )
}

function CockpitLayer({ curveLength, curveOffset }) {
  const funnel = [
    { y: 250, w: 620, label: 'IMPRESSIONS' },
    { y: 330, w: 470, label: 'CLICKS' },
    { y: 410, w: 320, label: 'LEADS' },
    { y: 490, w: 190, label: 'PURCHASES' },
  ]
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <text x="200" y="150" fill={STROKE} fontFamily="monospace" fontSize="18" letterSpacing="2">
        SCENE 03 — SCALING &amp; GROWTH
      </text>

      {/* conversion funnel */}
      <g>
        {funnel.map((row, i) => (
          <g key={row.label}>
            <rect
              x={200 + (620 - row.w) / 2}
              y={row.y}
              width={row.w}
              height="52"
              rx="4"
              fill={`rgba(56,189,248,${0.06 + i * 0.045})`}
              stroke={ACCENT}
              strokeWidth="1.2"
              opacity="0.8"
            />
            <text
              x={200 + 310}
              y={row.y + 33}
              textAnchor="middle"
              fill={STROKE}
              fontFamily="monospace"
              fontSize="14"
              letterSpacing="2"
            >
              {row.label}
            </text>
          </g>
        ))}
      </g>

      {/* performance curve — draws itself as you scroll into the phase */}
      <g transform="translate(900, 240)">
        <g stroke={STROKE} strokeWidth="1" opacity="0.3">
          {[0, 70, 140, 210, 280].map((y) => (
            <line key={y} x1="0" y1={y} x2="420" y2={y} />
          ))}
        </g>
        <motion.path
          d="M0 280 C 70 268, 110 240, 160 196 S 250 150, 300 96 S 380 44, 420 16"
          fill="none"
          stroke={ACCENT}
          strokeWidth="3"
          strokeLinecap="round"
          style={{ pathLength: curveLength }}
        />
        <motion.path
          d="M0 280 C 70 268, 110 240, 160 196 S 250 150, 300 96 S 380 44, 420 16"
          fill="none"
          stroke={ACCENT}
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.12"
          style={{ pathLength: curveLength }}
        />
        <text x="0" y="-18" fill={STROKE} fontFamily="monospace" fontSize="16" letterSpacing="2">
          ROAS TREND
        </text>
      </g>

      {/* spend bars */}
      <g transform="translate(900, 600)">
        {[40, 66, 88, 120, 150, 178].map((h, i) => (
          <motion.rect
            key={i}
            x={i * 70}
            y={-h}
            width="34"
            height={h}
            rx="3"
            fill="rgba(56,189,248,0.22)"
            stroke={ACCENT}
            strokeWidth="1"
            style={{ scaleY: curveOffset, originY: '100%', transformBox: 'fill-box' }}
          />
        ))}
        <text x="0" y="34" fill={STROKE} fontFamily="monospace" fontSize="16" letterSpacing="2">
          SPEND SCALING
        </text>
      </g>
    </svg>
  )
}

export default function ScrollStoryCanvas() {
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 28, mass: 0.25 })

  // Crossfade windows overlap so one phase is always dissolving into the next.
  const productionOpacity = useTransform(progress, [0, 0.28, 0.4], [1, 1, 0])
  const postOpacity = useTransform(progress, [0.28, 0.4, 0.62, 0.74], [0, 1, 1, 0])
  const scalingOpacity = useTransform(progress, [0.62, 0.74, 1], [0, 1, 1])

  const recPulse = useTransform(progress, [0, 0.1, 0.2, 0.3], [1, 0.25, 1, 0.25])
  const playhead = useTransform(progress, [0.28, 0.74], [0, 960])
  const curveLength = useTransform(progress, [0.66, 0.92], [0, 1])
  const curveScale = useTransform(progress, [0.66, 0.95], [0.15, 1])

  if (prefersReduced) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.05]" aria-hidden="true">
        <ViewfinderLayer pulse={1} />
      </div>
    )
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* keeps the vectors from competing with body copy */}
      <div className="absolute inset-0 opacity-[0.07]">
        <motion.div className="absolute inset-0" style={{ opacity: productionOpacity }}>
          <ViewfinderLayer pulse={recPulse} />
        </motion.div>
        <motion.div className="absolute inset-0" style={{ opacity: postOpacity }}>
          <EditorialLayer playhead={playhead} />
        </motion.div>
        <motion.div className="absolute inset-0" style={{ opacity: scalingOpacity }}>
          <CockpitLayer curveLength={curveLength} curveOffset={curveScale} />
        </motion.div>
      </div>

      {/* vignette so the edges never fight the content */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--color-carbon)_92%)]" />
    </div>
  )
}
