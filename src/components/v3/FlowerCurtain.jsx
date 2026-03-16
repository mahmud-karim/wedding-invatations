import styles from '../../styles/v3/FlowerCurtain.module.css'

/* Single 5-petal flower blossom */
function Blossom({ x, y, r = 7, color = '#FDFAF6', opacity = 0.9 }) {
  const petals = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180)
    const px = x + r * 1.4 * Math.cos(angle)
    const py = y + r * 1.4 * Math.sin(angle)
    return <ellipse key={i} cx={px} cy={py} rx={r * 0.75} ry={r * 1.1}
      fill={color} opacity={opacity}
      transform={`rotate(${i * 72}, ${px}, ${py})`} />
  })
  return (
    <g>
      {petals}
      <circle cx={x} cy={y} r={r * 0.45} fill="#F0C8D0" opacity={opacity} />
      <circle cx={x} cy={y} r={r * 0.2} fill="#C9A84C" opacity={opacity * 0.7} />
    </g>
  )
}

/* Single garland strip SVG */
function GarlandStrip({ height, isCenter, phase }) {
  const blossomPositions = []
  // Alternate blossoms and small buds every ~40px
  for (let y = 10; y < height; y += 38) {
    blossomPositions.push({ y, isBud: (y % 76) === 48 })
  }

  const fading = isCenter && phase !== 'curtain'

  return (
    <svg
      width="28"
      height={height}
      viewBox={`0 0 28 ${height}`}
      className={styles.strip}
      style={{
        opacity: fading ? 0 : 1,
        transition: fading ? 'opacity 0.9s ease-in-out' : 'none',
      }}
      aria-hidden="true"
    >
      {/* Stem line */}
      <line x1="14" y1="0" x2="14" y2={height}
        stroke="#B8C4B0" strokeWidth="1.2" opacity="0.6" />

      {blossomPositions.map(({ y, isBud }, i) =>
        isBud ? (
          /* Small bud */
          <g key={i}>
            <circle cx="14" cy={y} r="5" fill="#F0C8D0" opacity="0.85" />
            <circle cx="14" cy={y} r="2.5" fill="#C9A84C" opacity="0.5" />
          </g>
        ) : (
          /* Full blossom */
          <Blossom key={i} x={14} y={y} r={7 + (i % 3) * 1.5} />
        )
      )}

      {/* Leaf accents */}
      {blossomPositions.filter((_, i) => i % 3 === 1).map(({ y }, i) => (
        <g key={i}>
          <ellipse cx="7" cy={y + 12} rx="4" ry="8" fill="#B8C4B0" opacity="0.55"
            transform={`rotate(-30, 7, ${y + 12})`} />
          <ellipse cx="21" cy={y + 12} rx="4" ry="8" fill="#B8C4B0" opacity="0.55"
            transform={`rotate(30, 21, ${y + 12})`} />
        </g>
      ))}
    </svg>
  )
}

/* Chandelier SVG */
function Chandelier({ x, scale = 1 }) {
  return (
    <svg
      width={80 * scale} height={90 * scale}
      viewBox="0 0 80 90"
      style={{ position: 'absolute', left: x, top: 0 }}
      aria-hidden="true"
    >
      {/* Hanging chain */}
      <line x1="40" y1="0" x2="40" y2="14" stroke="#C9A84C" strokeWidth="1.2" opacity="0.5" />
      {/* Body */}
      <ellipse cx="40" cy="22" rx="16" ry="8" fill="#E4CC7A" opacity="0.35" />
      <ellipse cx="40" cy="24" rx="12" ry="6" fill="#C9A84C" opacity="0.3" />
      {/* Arms */}
      {[-24, -12, 0, 12, 24].map((dx, i) => (
        <g key={i}>
          <path d={`M40 28 Q${40 + dx * 0.5} 34 ${40 + dx} 42`}
            stroke="#C9A84C" strokeWidth="1" fill="none" opacity="0.5" />
          {/* Candle */}
          <rect x={40 + dx - 2} y={42} width="4" height="8" rx="1"
            fill="#F5EDE0" opacity="0.6" />
          {/* Flame */}
          <ellipse cx={40 + dx} cy={40} rx="2" ry="3" fill="#E4CC7A" opacity="0.5" />
        </g>
      ))}
      {/* Bottom crystal drops */}
      {[-16, -8, 0, 8, 16].map((dx, i) => (
        <ellipse key={i} cx={40 + dx} cy={56 + (i % 2) * 6}
          rx="2" ry="4" fill="#E4CC7A" opacity="0.3" />
      ))}
    </svg>
  )
}

const STRIP_COUNT = 14
// Strips that fade out on reveal (center 4)
const CENTER_STRIPS = new Set([5, 6, 7, 8])

export default function FlowerCurtain({ phase }) {
  const viewportH = typeof window !== 'undefined' ? window.innerHeight : 900

  return (
    <div className={styles.curtain}>
      {/* Chandeliers at top */}
      <div className={styles.chandeliers}>
        <Chandelier x="5%" scale={0.9} />
        <Chandelier x="38%" scale={1} />
        <Chandelier x="68%" scale={0.85} />
      </div>

      {/* Garland strips */}
      <div className={styles.strips}>
        {Array.from({ length: STRIP_COUNT }, (_, i) => (
          <div
            key={i}
            className={styles.stripWrap}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <GarlandStrip
              height={viewportH + 40}
              isCenter={CENTER_STRIPS.has(i)}
              phase={phase}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
