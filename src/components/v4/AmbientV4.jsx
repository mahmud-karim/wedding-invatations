import { useMemo } from 'react'
import { motion } from 'framer-motion'
import styles from '../../styles/v4/AmbientV4.module.css'

/* Gold spark burst — radiates from envelope center when seal is tapped */
export function SparkBurst({ visible }) {
  const sparks = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => {
      const angle = (i / 14) * 360 + Math.random() * 15
      const distance = 55 + Math.random() * 65
      return {
        id: i,
        angle,
        distance,
        size: 3 + Math.random() * 4,
        duration: 0.45 + Math.random() * 0.35,
      }
    }), [])

  if (!visible) return null

  return (
    <div className={styles.sparkContainer} aria-hidden="true">
      {sparks.map(s => {
        const rad = (s.angle * Math.PI) / 180
        const tx = Math.cos(rad) * s.distance
        const ty = Math.sin(rad) * s.distance
        return (
          <motion.span
            key={s.id}
            className={styles.spark}
            style={{ width: s.size, height: s.size, marginLeft: -s.size / 2, marginTop: -s.size / 2 }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: tx, y: ty, opacity: 0, scale: 0 }}
            transition={{ duration: s.duration, ease: 'easeOut' }}
          />
        )
      })}
    </div>
  )
}

/* Dreamy floating particles — magical gold dust + soft orbs */
export function DreamyParticles({ count = 30 }) {
  const particles = useMemo(() => {
    const motes = Array.from({ length: count }, (_, i) => ({
      id: `m${i}`,
      type: 'mote',
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 6 + Math.random() * 10,
      delay: Math.random() * 12,
      dx: (-80 + Math.random() * 160),
      dy: (-80 + Math.random() * 160),
      opacityPeak: 0.4 + Math.random() * 0.5,
      opacityMid: 0.1 + Math.random() * 0.2,
      scaleStart: 0.3 + Math.random() * 0.4,
      scaleEnd: 0.6 + Math.random() * 0.5,
    }))

    const orbs = Array.from({ length: 6 }, (_, i) => ({
      id: `d${i}`,
      type: 'dreamOrb',
      left: 10 + Math.random() * 80,
      top: 10 + Math.random() * 80,
      size: 40 + Math.random() * 80,
      duration: 12 + Math.random() * 10,
      delay: Math.random() * 8,
      dx: (-40 + Math.random() * 80),
      dy: (-40 + Math.random() * 80),
      opacityPeak: 0.2 + Math.random() * 0.25,
    }))

    return [...motes, ...orbs]
  }, [count])

  return (
    <div className={styles.dreamField} aria-hidden="true">
      {particles.map(p => (
        <span
          key={p.id}
          className={p.type === 'mote' ? styles.mote : styles.dreamOrb}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            '--dx': `${p.dx}px`,
            '--dy': `${p.dy}px`,
            '--opacity-peak': p.opacityPeak,
            '--opacity-mid': p.opacityMid || 0.15,
            '--scale-start': p.scaleStart || 1,
            '--scale-end': p.scaleEnd || 1,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

/* Shooting stars — gold streaks across the sky */
export function ShootingStars({ count = 5 }) {
  const stars = useMemo(() =>
    Array.from({ length: count }, (_, i) => {
      const angle = -25 - Math.random() * 30 // angled downward-right
      const rad = (angle * Math.PI) / 180
      const travelDist = 250 + Math.random() * 350
      return {
        id: i,
        left: Math.random() * 80,
        top: 5 + Math.random() * 45,
        length: 40 + Math.random() * 60,
        angle,
        travelX: Math.cos(rad) * travelDist,
        travelY: -Math.sin(rad) * travelDist,
        duration: 6 + Math.random() * 8,
        delay: i * 3 + Math.random() * 5,
      }
    }), [count])

  return (
    <div className={styles.shootingStarField} aria-hidden="true">
      {stars.map(s => (
        <span
          key={s.id}
          className={styles.shootingStar}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            '--length': `${s.length}px`,
            '--angle': `${s.angle}deg`,
            '--travel-x': `${s.travelX}px`,
            '--travel-y': `${s.travelY}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

/* Gold firework bursts — periodic explosions at random positions */
export function GoldFireworks({ count = 3 }) {
  const fireworks = useMemo(() =>
    Array.from({ length: count }, (_, i) => {
      const x = 15 + Math.random() * 70
      const y = 10 + Math.random() * 50
      const sparkCount = 10 + Math.floor(Math.random() * 8)
      const sparks = Array.from({ length: sparkCount }, (_, j) => {
        const angle = (j / sparkCount) * 360 + Math.random() * 20
        const rad = (angle * Math.PI) / 180
        const dist = 25 + Math.random() * 45
        return {
          id: j,
          dx: Math.cos(rad) * dist,
          dy: Math.sin(rad) * dist,
          size: 2 + Math.random() * 3,
        }
      })
      return {
        id: i,
        x, y,
        sparks,
        trailLength: 15 + Math.random() * 20,
        duration: 8 + Math.random() * 6,
        delay: i * 4 + Math.random() * 3,
      }
    }), [count])

  return (
    <div className={styles.fireworkField} aria-hidden="true">
      {fireworks.map(fw => (
        <div
          key={fw.id}
          className={styles.fireworkOrigin}
          style={{ left: `${fw.x}%`, top: `${fw.y}%` }}
        >
          {/* Rising trail */}
          <span
            className={styles.fireworkTrail}
            style={{
              '--trail-length': `${fw.trailLength}px`,
              animationDuration: `${fw.duration}s`,
              animationDelay: `${fw.delay}s`,
            }}
          />
          {/* Burst sparks */}
          {fw.sparks.map(sp => (
            <span
              key={sp.id}
              className={styles.fireworkSpark}
              style={{
                '--spark-dx': `${sp.dx}px`,
                '--spark-dy': `${sp.dy}px`,
                '--spark-size': `${sp.size}px`,
                animationDuration: `${fw.duration}s`,
                animationDelay: `${fw.delay}s`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

/* Rising gold orbs for card scene */
export function GoldOrbsV4({ count = 16 }) {
  const orbs = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 12 + Math.random() * 40,
      duration: 5 + Math.random() * 8,
      delay: Math.random() * 10,
      drift: -60 + Math.random() * 120,
      opacity: 0.2 + Math.random() * 0.4,
    })), [count])

  return (
    <div className={styles.orbField} aria-hidden="true">
      {orbs.map(o => (
        <span
          key={o.id}
          className={styles.orb}
          style={{
            left: `${o.left}%`,
            width: o.size,
            height: o.size,
            '--drift': `${o.drift}px`,
            '--opacity-peak': o.opacity,
            animationDuration: `${o.duration}s`,
            animationDelay: `${o.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
