import { useMemo } from 'react'
import styles from '../styles/GlowOrbs.module.css'

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

export default function GlowOrbs({ count = 18 }) {
  const orbs = useMemo(() => (
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left:     randomBetween(0, 100),         // vw %
      size:     randomBetween(12, 52),          // px
      duration: randomBetween(5, 13),           // s
      delay:    randomBetween(0, 10),           // s
      drift:    randomBetween(-60, 60),         // px horizontal drift
      opacity:  randomBetween(0.25, 0.65),
    }))
  ), [count])

  return (
    <div className={styles.field} aria-hidden="true">
      {orbs.map(o => (
        <span
          key={o.id}
          className={styles.orb}
          style={{
            left:              `${o.left}%`,
            width:             `${o.size}px`,
            height:            `${o.size}px`,
            '--drift':         `${o.drift}px`,
            '--opacity-peak':  o.opacity,
            animationDuration: `${o.duration}s`,
            animationDelay:    `${o.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
