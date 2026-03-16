import { useMemo } from 'react'
import styles from '../../styles/v2/AmbientV2.module.css'

function rand(min, max) { return min + Math.random() * (max - min) }

/* Warm floating particles for envelope scene */
export function WarmParticles({ count = 28 }) {
  const particles = useMemo(() => (
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: rand(0, 100),
      y: rand(-10, 110),
      size: rand(3, 10),
      opacity: rand(0.06, 0.22),
      duration: rand(14, 30),
      delay: rand(0, 14),
      driftX: rand(-30, 30),
      driftY: rand(-50, -100),
    }))
  ), [count])

  return (
    <div className={styles.field} aria-hidden="true">
      {particles.map(p => (
        <span
          key={p.id}
          className={styles.warmDot}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            '--dx': `${p.driftX}px`,
            '--dy': `${p.driftY}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

/* Rising gold orbs for card scene */
export function GoldOrbsV2({ count = 16 }) {
  const orbs = useMemo(() => (
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rand(2, 98),
      size: rand(10, 44),
      duration: rand(6, 14),
      delay: rand(0, 12),
      drift: rand(-50, 50),
      opacity: rand(0.15, 0.45),
    }))
  ), [count])

  return (
    <div className={styles.orbField} aria-hidden="true">
      {orbs.map(o => (
        <span
          key={o.id}
          className={styles.goldOrb}
          style={{
            left: `${o.left}%`,
            width: `${o.size}px`,
            height: `${o.size}px`,
            '--drift': `${o.drift}px`,
            '--peak': o.opacity,
            animationDuration: `${o.duration}s`,
            animationDelay: `${o.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
