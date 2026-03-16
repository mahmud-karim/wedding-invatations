import { useMemo, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

/* ══════════════════════════════════════
   Dreamy Background — 4 layered effects
   ══════════════════════════════════════ */

function Fireflies() {
  const items = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 3,
      duration: 3 + Math.random() * 3,
      delay: Math.random() * 6,
      wx: -12 + Math.random() * 24,
      wy: -12 + Math.random() * 24,
      opacityPeak: 0.45 + Math.random() * 0.35,
      opacityMid: 0.15 + Math.random() * 0.2,
    })), [])

  return items.map(f => (
    <span
      key={f.id}
      className={styles.firefly}
      style={{
        left: `${f.left}%`,
        top: `${f.top}%`,
        width: f.size,
        height: f.size,
        '--wx': `${f.wx}px`,
        '--wy': `${f.wy}px`,
        '--opacity-peak': f.opacityPeak,
        '--opacity-mid': f.opacityMid,
        animationDuration: `${f.duration}s`,
        animationDelay: `${f.delay}s`,
      }}
    />
  ))
}

function FallingDust() {
  const items = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 1 + Math.random() * 2,
      duration: 8 + Math.random() * 8,
      delay: Math.random() * 12,
      sway: -35 + Math.random() * 70,
      opacityPeak: 0.35 + Math.random() * 0.35,
    })), [])

  return items.map(d => (
    <span
      key={d.id}
      className={styles.dustSpeck}
      style={{
        left: `${d.left}%`,
        width: d.size,
        height: d.size,
        '--sway': `${d.sway}px`,
        '--opacity-peak': d.opacityPeak,
        animationDuration: `${d.duration}s`,
        animationDelay: `${d.delay}s`,
      }}
    />
  ))
}

function BokehOrbs() {
  const items = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: 5 + Math.random() * 90,
      top: 5 + Math.random() * 90,
      size: 25 + Math.random() * 65,
      blur: 10 + Math.random() * 8,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 10,
      dx1: -30 + Math.random() * 60,
      dy1: -30 + Math.random() * 60,
      dx2: -25 + Math.random() * 50,
      dy2: -25 + Math.random() * 50,
      dx3: -20 + Math.random() * 40,
      dy3: -20 + Math.random() * 40,
      opacityPeak: 0.12 + Math.random() * 0.18,
      opacityLo: 0.05 + Math.random() * 0.08,
    })), [])

  return items.map(b => (
    <span
      key={b.id}
      className={styles.bokeh}
      style={{
        left: `${b.left}%`,
        top: `${b.top}%`,
        width: b.size,
        height: b.size,
        '--blur': `${b.blur}px`,
        '--dx1': `${b.dx1}px`,
        '--dy1': `${b.dy1}px`,
        '--dx2': `${b.dx2}px`,
        '--dy2': `${b.dy2}px`,
        '--dx3': `${b.dx3}px`,
        '--dy3': `${b.dy3}px`,
        '--opacity-peak': b.opacityPeak,
        '--opacity-lo': b.opacityLo,
        animationDuration: `${b.duration}s`,
        animationDelay: `${b.delay}s`,
      }}
    />
  ))
}

function EmberWisps() {
  const items = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 2 + Math.random() * 2,
      duration: 7 + Math.random() * 7,
      delay: Math.random() * 10,
      wave1: -18 + Math.random() * 36,
      wave2: -14 + Math.random() * 28,
      opacityPeak: 0.4 + Math.random() * 0.3,
    })), [])

  return items.map(e => (
    <span
      key={e.id}
      className={styles.ember}
      style={{
        left: `${e.left}%`,
        width: e.size,
        height: e.size,
        '--wave1': `${e.wave1}px`,
        '--wave2': `${e.wave2}px`,
        '--opacity-peak': e.opacityPeak,
        animationDuration: `${e.duration}s`,
        animationDelay: `${e.delay}s`,
      }}
    />
  ))
}

/* ── Cursor glow + click sparkles ── */
export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [clicks, setClicks] = useState([])

  useEffect(() => {
    function onMove(e) {
      setPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const handleClick = useCallback((e) => {
    const id = Date.now()
    const x = e.clientX
    const y = e.clientY
    const sparks = Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * 360 + Math.random() * 30
      const rad = (angle * Math.PI) / 180
      const dist = 20 + Math.random() * 35
      return {
        id: i,
        dx: Math.cos(rad) * dist,
        dy: Math.sin(rad) * dist,
        size: 2 + Math.random() * 3,
        duration: 0.4 + Math.random() * 0.3,
      }
    })
    setClicks(prev => [...prev, { id, x, y, sparks }])
    setTimeout(() => setClicks(prev => prev.filter(c => c.id !== id)), 900)
  }, [])

  useEffect(() => {
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [handleClick])

  return (
    <>
      {/* Glow following cursor */}
      <div
        className={styles.cursorGlow}
        style={{ left: pos.x, top: pos.y }}
      />

      {/* Click sparkles */}
      <AnimatePresence>
        {clicks.map(click => (
          <div key={click.id}>
            {/* Expanding ring */}
            <motion.div
              className={styles.clickRing}
              style={{ left: click.x, top: click.y }}
              initial={{ width: 0, height: 0, opacity: 0.7 }}
              animate={{ width: 50, height: 50, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            {/* Radiating sparks */}
            {click.sparks.map(s => (
              <motion.span
                key={s.id}
                className={styles.clickSparkle}
                style={{ left: click.x, top: click.y, width: s.size, height: s.size }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: s.dx, y: s.dy, opacity: 0, scale: 0 }}
                transition={{ duration: s.duration, ease: 'easeOut' }}
              />
            ))}
          </div>
        ))}
      </AnimatePresence>
    </>
  )
}

export function DreamyBackground({ fireflies = true, dust = true, bokeh = true, embers = true }) {
  return (
    <div className={styles.dreamField} aria-hidden="true">
      {fireflies && <Fireflies />}
      {dust && <FallingDust />}
      {bokeh && <BokehOrbs />}
      {embers && <EmberWisps />}
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
