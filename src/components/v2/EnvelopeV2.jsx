import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '../../styles/v2/EnvelopeV2.module.css'

/* ── Gold foil wax seal for V2 ── */
function SealV2({ size = 92 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      {/* Outer wax ring */}
      <circle cx="50" cy="50" r="46" fill="#8B2030" stroke="#C9A84C" strokeWidth="2.2" />
      <circle cx="50" cy="50" r="41" fill="none" stroke="#C9A84C" strokeWidth="0.7" opacity="0.5" />
      <circle cx="50" cy="50" r="37" fill="none" stroke="#C9A84C" strokeWidth="0.4" opacity="0.35" />
      {/* Eight-point star center */}
      <path d="M50 20 L55 40 L70 30 L60 45 L80 50 L60 55 L70 70 L55 60 L50 80 L45 60 L30 70 L40 55 L20 50 L40 45 L30 30 L45 40 Z"
        fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity="0.8" />
      <path d="M50 28 L54 43 L66 35 L58 46 L72 50 L58 54 L66 65 L54 57 L50 72 L46 57 L34 65 L42 54 L28 50 L42 46 L34 35 L46 43 Z"
        fill="#C9A84C" opacity="0.25" />
      {/* M & F */}
      <text x="50" y="55" textAnchor="middle" fontFamily="Cormorant Garamond, serif"
        fontSize="13" fontWeight="600" fill="#C9A84C" letterSpacing="2">M &amp; F</text>
    </svg>
  )
}

/* ── Gold filigree corner ── */
function FiligreCorner({ mirror }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48"
      style={{ transform: mirror ? `scale(${mirror})` : undefined }} aria-hidden="true">
      <path d="M4 4 Q4 24 24 24 Q24 4 44 4" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
      <path d="M4 4 Q4 16 16 16 Q16 4 28 4" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.4" />
      <path d="M4 4 L12 4 L4 12 Z" fill="#C9A84C" opacity="0.35" />
      <circle cx="6" cy="6" r="1.5" fill="#E4CC7A" opacity="0.6" />
    </svg>
  )
}

/* ── Embossed gold line ── */
function GoldLine() {
  return (
    <svg width="100%" height="8" viewBox="0 0 300 8" preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" y1="4" x2="300" y2="4" stroke="#C9A84C" strokeWidth="0.6" opacity="0.35" />
      <line x1="0" y1="3" x2="300" y2="3" stroke="#E4CC7A" strokeWidth="0.3" opacity="0.2" />
    </svg>
  )
}

// Phases: idle → peeling → opening → done
export default function EnvelopeV2({ onOpen }) {
  const [phase, setPhase] = useState('idle')

  function handleSealClick() {
    if (phase !== 'idle') return
    setPhase('peeling')
    setTimeout(() => setPhase('opening'), 550)
    setTimeout(() => { setPhase('done'); onOpen() }, 550 + 1200)
  }

  const isOpening = phase === 'opening' || phase === 'done'
  const sealGone = phase !== 'idle'

  return (
    <motion.div
      className={styles.scene}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.6 } }}
    >
      {/* Soft ambient glow behind envelope */}
      <div className={styles.ambientGlow} />

      {/* Floating envelope */}
      <motion.div
        className={styles.envelopeFloat}
        animate={
          isOpening
            ? { y: [0, -6, 0] }
            : { y: [0, -10, 0, -6, 0] }
        }
        transition={
          isOpening
            ? { duration: 0.4 }
            : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <div className={styles.envelope}>
          {/* Back face */}
          <div className={styles.envBack} />

          {/* Card sliding out */}
          <AnimatePresence>
            {isOpening && (
              <motion.div
                className={styles.cardSliver}
                initial={{ y: 0, opacity: 0.85 }}
                animate={{ y: -120, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </AnimatePresence>

          {/* Envelope face — ivory textured */}
          <div className={styles.envFace}>
            <div className={styles.cornerRow}>
              <FiligreCorner />
              <FiligreCorner mirror="-1,1" />
            </div>
            <GoldLine />
            <div className={styles.faceCenter} />
            <GoldLine />
            <div className={styles.cornerRow}>
              <FiligreCorner mirror="1,-1" />
              <FiligreCorner mirror="-1,-1" />
            </div>
          </div>

          {/* Gold foil shimmer overlay on face */}
          <div className={styles.shimmerOverlay} />

          {/* Top flap */}
          <motion.div
            className={styles.flap}
            animate={isOpening ? { rotateX: -180 } : { rotateX: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.flapInner}>
              {/* Faint gold inner triangle pattern */}
              <div className={styles.flapPattern} />
            </div>
          </motion.div>

          {/* Wax seal on flap fold */}
          <div className={styles.sealWrapper}>
            <AnimatePresence>
              {!sealGone && (
                <motion.button
                  className={styles.sealBtn}
                  onClick={handleSealClick}
                  aria-label="Break the seal to open your invitation"
                  exit={{
                    rotate: [0, -15, -40],
                    x: [0, 15, 55],
                    y: [0, -25, -80],
                    scale: [1, 1.06, 0.4],
                    opacity: [1, 1, 0],
                    transition: { duration: 0.55, ease: 'easeIn' },
                  }}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.94 }}
                >
                  <SealV2 size={92} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Prompt */}
      <AnimatePresence>
        {phase === 'idle' && (
          <motion.p
            className={styles.prompt}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: [0.4, 0.9, 0.4], y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            Tap the seal to open your invitation
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
