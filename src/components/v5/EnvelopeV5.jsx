import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WaxSealV4 from '../v4/WaxSealV4'
import { SparkBurst } from '../v4/AmbientV4'
import styles from '../../styles/v5/EnvelopeV5.module.css'

/* ── Rich filigree corner with more detail ── */
function FiligreeCorner({ mirror }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56"
      style={{ transform: mirror ? `scale(${mirror})` : undefined }} aria-hidden="true">
      {/* Outer curve */}
      <path d="M4 4 Q4 28 28 28 Q28 4 52 4" fill="none" stroke="#C9952A" strokeWidth="1" opacity="0.5" />
      {/* Middle curve */}
      <path d="M4 4 Q4 20 20 20 Q20 4 36 4" fill="none" stroke="#C9952A" strokeWidth="0.8" opacity="0.4" />
      {/* Inner curve */}
      <path d="M4 4 Q4 12 12 12 Q12 4 20 4" fill="none" stroke="#E4CC7A" strokeWidth="0.6" opacity="0.35" />
      {/* Corner triangle fill */}
      <path d="M4 4 L14 4 L4 14 Z" fill="#C9952A" opacity="0.25" />
      {/* Scroll flourish */}
      <path d="M28 28 Q32 24 30 18 Q28 12 34 10" fill="none" stroke="#C9952A" strokeWidth="0.6" opacity="0.3" />
      <path d="M28 28 Q24 32 18 30 Q12 28 10 34" fill="none" stroke="#C9952A" strokeWidth="0.6" opacity="0.3" />
      {/* Dot accents */}
      <circle cx="6" cy="6" r="2" fill="#E4CC7A" opacity="0.5" />
      <circle cx="18" cy="6" r="1" fill="#C9952A" opacity="0.35" />
      <circle cx="6" cy="18" r="1" fill="#C9952A" opacity="0.35" />
      <circle cx="30" cy="12" r="0.8" fill="#E4CC7A" opacity="0.3" />
      <circle cx="12" cy="30" r="0.8" fill="#E4CC7A" opacity="0.3" />
    </svg>
  )
}

/* ── Ornate gold line with center diamond ── */
function OrnateGoldLine() {
  return (
    <svg width="100%" height="12" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
      {/* Main line */}
      <line x1="0" y1="6" x2="130" y2="6" stroke="#C9952A" strokeWidth="0.6" opacity="0.35" />
      <line x1="170" y1="6" x2="300" y2="6" stroke="#C9952A" strokeWidth="0.6" opacity="0.35" />
      {/* Highlight line */}
      <line x1="0" y1="5" x2="130" y2="5" stroke="#E4CC7A" strokeWidth="0.3" opacity="0.2" />
      <line x1="170" y1="5" x2="300" y2="5" stroke="#E4CC7A" strokeWidth="0.3" opacity="0.2" />
      {/* Center diamond */}
      <polygon points="150,1 157,6 150,11 143,6" fill="none" stroke="#C9952A" strokeWidth="0.8" opacity="0.45" />
      <polygon points="150,3 154,6 150,9 146,6" fill="#C9952A" opacity="0.2" />
      {/* Side dots */}
      <circle cx="130" cy="6" r="1.2" fill="#C9952A" opacity="0.35" />
      <circle cx="170" cy="6" r="1.2" fill="#C9952A" opacity="0.35" />
      <circle cx="40" cy="6" r="0.8" fill="#C9952A" opacity="0.2" />
      <circle cx="260" cy="6" r="0.8" fill="#C9952A" opacity="0.2" />
    </svg>
  )
}

/* ── M & F monogram for envelope center ── */
function Monogram() {
  return (
    <svg className={styles.monogram} width="80" height="44" viewBox="0 0 80 44" aria-hidden="true">
      {/* Outer oval frame */}
      <ellipse cx="40" cy="22" rx="38" ry="20" fill="none" stroke="#C9952A" strokeWidth="0.8" opacity="0.35" />
      <ellipse cx="40" cy="22" rx="34" ry="17" fill="none" stroke="#C9952A" strokeWidth="0.4" opacity="0.2" />
      {/* M */}
      <text x="18" y="28" fontFamily="Cormorant Garamond, serif" fontSize="18" fontWeight="300"
        fill="#C9952A" opacity="0.5" textAnchor="middle">M</text>
      {/* Ampersand */}
      <text x="40" y="26" fontFamily="Cormorant Garamond, serif" fontSize="12" fontStyle="italic"
        fill="#E4CC7A" opacity="0.4" textAnchor="middle">&amp;</text>
      {/* F */}
      <text x="62" y="28" fontFamily="Cormorant Garamond, serif" fontSize="18" fontWeight="300"
        fill="#C9952A" opacity="0.5" textAnchor="middle">F</text>
      {/* Side flourish dots */}
      <circle cx="6" cy="22" r="1" fill="#C9952A" opacity="0.25" />
      <circle cx="74" cy="22" r="1" fill="#C9952A" opacity="0.25" />
    </svg>
  )
}

// Phases: idle → peeling → opening → flyout → done
export default function EnvelopeV5({ onOpen }) {
  const [phase, setPhase] = useState('idle')

  function handleSealClick() {
    if (phase !== 'idle') return
    setPhase('peeling')
    // Flap opens after seal peels
    setTimeout(() => setPhase('opening'), 550)
    // Card flies up after flap fully opens (flap takes 1s)
    setTimeout(() => setPhase('flyout'), 550 + 1000)
    // Hand off to card view after card flies off
    setTimeout(() => {
      setPhase('done')
      onOpen()
    }, 550 + 1000 + 2300)
  }

  const isOpening = phase === 'opening' || phase === 'flyout' || phase === 'done'
  const isFlyout = phase === 'flyout' || phase === 'done'
  const sealGone = phase !== 'idle'

  return (
    <motion.div
      className={styles.scene}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 60, transition: { duration: 0.5, ease: 'easeIn' } }}
    >
      {/* Soft ambient glow */}
      <div className={styles.ambientGlow} />

      {/* Gold spark burst on seal tap */}
      <SparkBurst visible={sealGone && phase !== 'done'} />

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

          {/* Card — flies up off screen after flap opens */}
          {isFlyout && (
            <motion.div
              className={styles.cardSliver}
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: [0, '-25%', '-15%', '-15%', '-120vh'] }}
              transition={{ duration: 2.2, times: [0, 0.3, 0.45, 0.57, 1], ease: 'easeInOut' }}
            />
          )}

          {/* Envelope face */}
          <div className={styles.envFace}>
            <div className={styles.cornerRow}>
              <FiligreeCorner />
              <FiligreeCorner mirror="-1,1" />
            </div>
            <div className={styles.goldLine}>
              <OrnateGoldLine />
            </div>
            <div className={styles.faceCenter}>
              <Monogram />
            </div>
            <div className={styles.goldLine}>
              <OrnateGoldLine />
            </div>
            <div className={styles.cornerRow}>
              <FiligreeCorner mirror="1,-1" />
              <FiligreeCorner mirror="-1,-1" />
            </div>
          </div>

          {/* Gold shimmer overlay */}
          <div className={styles.shimmerOverlay} />

          {/* Flap — opens and stays open */}
          <motion.div
            className={`${styles.flap} ${isFlyout ? styles.flapBack : ''}`}
            animate={isOpening ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className={styles.flapInner}>
              <div className={styles.flapPattern} />
            </div>
          </motion.div>

          {/* Wax seal */}
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
                  <WaxSealV4 size={92} />
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
