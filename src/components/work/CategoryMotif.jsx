// Line-art drawn on a project's cover when it has no image, in the manner of
// a draughtsman's plate: ivory hairlines with a single brass element. Each
// discipline has a few variants so neighbouring projects do not repeat, and
// an image-less project still looks deliberate.

const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 1, vectorEffect: 'non-scaling-stroke' }
const soft = { ...line, opacity: 0.5 }
const brass = { ...line, stroke: 'var(--color-accent)' }
const dot = { fill: 'var(--color-accent)' }

const MOTIFS = {
  campaigns: [
    // Rising performance curve against a reference grid.
    <>
      {[70, 115, 160, 205].map((y) => (
        <line key={y} {...soft} x1="60" y1={y} x2="340" y2={y} strokeDasharray="2 6" />
      ))}
      <polyline {...line} points="60,50 60,235 340,235" />
      <path {...brass} d="M60 215 C 110 208, 140 190, 175 160 S 245 118, 280 92 S 325 66, 340 58" />
      {[[175, 160], [280, 92], [340, 58]].map(([x, y]) => (
        <circle key={x} {...dot} cx={x} cy={y} r="3" />
      ))}
    </>,
    // Conversion funnel.
    <>
      {[
        [70, 260],
        [102, 196],
        [134, 132],
      ].map(([x, width], i) => (
        <rect key={x} {...line} x={x} y={58 + i * 50} width={width} height="34" />
      ))}
      <rect {...brass} x="166" y="208" width="68" height="34" />
      <line {...soft} x1="200" y1="40" x2="200" y2="260" strokeDasharray="2 6" />
    </>,
    // Budget scaling by period.
    <>
      <line {...line} x1="60" y1="235" x2="340" y2="235" />
      {[52, 78, 70, 104].map((height, i) => (
        <rect key={i} {...line} x={80 + i * 50} y={235 - height} width="26" height={height} />
      ))}
      <rect {...brass} x="280" y="67" width="26" height="168" />
      <line {...soft} x1="60" y1="67" x2="340" y2="67" strokeDasharray="2 6" />
    </>,
  ],
  video: [
    // Camera frame with title-safe marks and a timeline.
    <>
      <rect {...line} x="70" y="52" width="260" height="146" />
      <path
        {...soft}
        d="M92 74 h18 M92 74 v18 M308 74 h-18 M308 74 v18 M92 176 h18 M92 176 v-18 M308 176 h-18 M308 176 v-18"
      />
      <path {...brass} d="M186 104 L222 125 L186 146 Z" />
      <line {...line} x1="70" y1="232" x2="330" y2="232" />
      {Array.from({ length: 14 }, (_, i) => (
        <line key={i} {...soft} x1={70 + i * 20} y1="226" x2={70 + i * 20} y2="238" />
      ))}
      <line {...brass} x1="150" y1="220" x2="150" y2="244" />
    </>,
    // Edit timeline: picture track, cuts and audio waveform.
    <>
      <rect {...line} x="60" y="70" width="280" height="44" />
      {[128, 176, 252, 296].map((x) => (
        <line key={x} {...soft} x1={x} y1="70" x2={x} y2="114" />
      ))}
      {Array.from({ length: 36 }, (_, i) => {
        const height = 8 + Math.abs(Math.sin(i * 0.9) * 34) + Math.abs(Math.cos(i * 0.37) * 14)
        return <line key={i} {...soft} x1={64 + i * 7.8} y1={184 - height / 2} x2={64 + i * 7.8} y2={184 + height / 2} />
      })}
      <line {...brass} x1="212" y1="48" x2="212" y2="240" />
      <path {...dot} d="M205 44 h14 l-7 10 Z" />
    </>,
  ],
  // Vertical (9:16) frame for short-form work.
  videoVertical: [
    <>
      <rect {...line} x="148" y="30" width="104" height="186" />
      <path {...soft} d="M162 46 h14 M162 46 v14 M238 46 h-14 M238 46 v14 M162 200 h14 M162 200 v-14 M238 200 h-14 M238 200 v-14" />
      <path {...brass} d="M190 106 L216 123 L190 140 Z" />
      <line {...line} x1="100" y1="250" x2="300" y2="250" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} {...soft} x1={100 + i * 20} y1="244" x2={100 + i * 20} y2="256" />
      ))}
      <line {...brass} x1="160" y1="238" x2="160" y2="262" />
    </>,
  ],
  design: [
    // Geometric construction of a mark.
    <>
      <rect {...line} x="110" y="60" width="180" height="180" />
      <line {...soft} x1="110" y1="60" x2="290" y2="240" />
      <line {...soft} x1="290" y1="60" x2="110" y2="240" />
      <line {...soft} x1="200" y1="40" x2="200" y2="260" strokeDasharray="2 6" />
      <line {...soft} x1="90" y1="150" x2="310" y2="150" strokeDasharray="2 6" />
      <circle {...line} cx="200" cy="150" r="90" />
      <circle {...brass} cx="200" cy="150" r="45" />
    </>,
    // Identity system: a mark and its applications on a grid.
    <>
      {[0, 1, 2].flatMap((row) =>
        [0, 1, 2, 3].map((column) => (
          <rect key={`${row}-${column}`} {...soft} x={72 + column * 66} y={54 + row * 66} width="58" height="58" />
        )),
      )}
      <rect {...line} x="72" y="54" width="124" height="124" />
      <circle {...brass} cx="134" cy="116" r="34" />
      <line {...line} x1="216" y1="205" x2="300" y2="205" />
      <line {...soft} x1="216" y1="222" x2="270" y2="222" />
    </>,
  ],
  // Isometric solid.
  '3d': [
    <>
      <path {...line} d="M200 55 L290 105 L290 205 L200 255 L110 205 L110 105 Z" />
      <path {...line} d="M110 105 L200 155 L290 105 M200 155 L200 255" />
      <path {...soft} strokeDasharray="2 6" d="M200 55 L200 155 M110 205 L200 155 L290 205" />
      <circle {...dot} cx="200" cy="155" r="3.5" />
    </>,
  ],
  // Connected processing stages.
  ai: [
    <>
      {[90, 150, 210].flatMap((y1) =>
        [110, 190].map((y2) => <line key={`a${y1}${y2}`} {...soft} x1="95" y1={y1} x2="200" y2={y2} />),
      )}
      {[110, 190].map((y1) => (
        <line key={`b${y1}`} {...soft} x1="200" y1={y1} x2="305" y2="150" />
      ))}
      {[90, 150, 210].map((y) => (
        <circle key={y} {...line} cx="95" cy={y} r="9" />
      ))}
      {[110, 190].map((y) => (
        <circle key={y} {...line} cx="200" cy={y} r="9" />
      ))}
      <circle {...brass} cx="305" cy="150" r="13" />
      <circle {...dot} cx="305" cy="150" r="3.5" />
    </>,
  ],
  // Browser window with a layout wireframe.
  web: [
    <>
      <rect {...line} x="70" y="55" width="260" height="190" />
      <line {...line} x1="70" y1="85" x2="330" y2="85" />
      <circle {...soft} cx="88" cy="70" r="3" />
      <circle {...soft} cx="102" cy="70" r="3" />
      <rect {...soft} x="92" y="150" width="96" height="72" />
      <rect {...soft} x="212" y="150" width="96" height="72" />
      <line {...brass} x1="92" y1="112" x2="238" y2="112" />
      <line {...soft} x1="92" y1="128" x2="190" y2="128" />
    </>,
  ],
  // Concentric rings — the instrument, flattened.
  default: [
    <>
      <circle {...line} cx="200" cy="150" r="100" />
      <circle {...soft} cx="200" cy="150" r="72" />
      <circle {...brass} cx="200" cy="150" r="44" />
      <circle {...dot} cx="200" cy="150" r="3.5" />
    </>,
  ],
}

/** `motif` is a key above; `variant` (any integer) picks one of its drawings. */
export default function CategoryMotif({ motif = 'default', variant = 0, className = '' }) {
  const variants = MOTIFS[motif] ?? MOTIFS.default
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={`text-ink/30 ${className}`}
    >
      {variants[Math.abs(variant) % variants.length]}
    </svg>
  )
}
