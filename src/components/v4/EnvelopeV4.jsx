import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WaxSealV4 from './WaxSealV4'
import VideoPlayer from './VideoPlayer'
import { SparkBurst } from './AmbientV4'
import styles from '../../styles/v4/EnvelopeV4.module.css'

/* ── Gold filigree corner ── */
function FiligreeCornerV4({ mirror }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48"
      style={{ transform: mirror ? `scale(${mirror})` : undefined }} aria-hidden="true">
      <path d="M4 4 Q4 24 24 24 Q24 4 44 4" fill="none" stroke="#C9952A" strokeWidth="1" opacity="0.45" />
      <path d="M4 4 Q4 16 16 16 Q16 4 28 4" fill="none" stroke="#C9952A" strokeWidth="0.8" opacity="0.35" />
      <path d="M4 4 L12 4 L4 12 Z" fill="#C9952A" opacity="0.3" />
      <circle cx="6" cy="6" r="1.5" fill="#E4CC7A" opacity="0.55" />
    </svg>
  )
}

/* ── Embossed gold line ── */
function GoldLineV4() {
  return (
    <svg width="100%" height="8" viewBox="0 0 300 8" preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" y1="4" x2="300" y2="4" stroke="#C9952A" strokeWidth="0.6" opacity="0.3" />
      <line x1="0" y1="3" x2="300" y2="3" stroke="#E4CC7A" strokeWidth="0.3" opacity="0.18" />
    </svg>
  )
}

// Phases: idle → peeling → opening → video → done
export default function EnvelopeV4({ onOpen, onSealBreak }) {
  const [phase, setPhase] = useState('idle')

  function handleSealClick() {
    if (phase !== 'idle') return
    if (onSealBreak) onSealBreak()
    setPhase('peeling')
    setTimeout(() => setPhase('opening'), 550)
    setTimeout(() => setPhase('video'), 550 + 1200)
  }

  function handleVideoEnd() {
    setPhase('done') // triggers VideoPlayer exit animation
    setTimeout(() => onOpen(), 1200) // wait for slide-down to finish before revealing card
  }

  const isOpening = phase === 'opening' || phase === 'video' || phase === 'done'
  const sealGone = phase !== 'idle'
  const showVideo = phase === 'video'

  return (
    <motion.div
      className={styles.scene}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.6 } }}
    >
      {/* Soft ambient glow */}
      <div className={styles.ambientGlow} />

      {/* Gold spark burst on seal tap */}
      <SparkBurst visible={sealGone && phase !== 'video' && phase !== 'done'} />

      {/* Floating envelope — hide during video */}
      <motion.div
        className={styles.envelopeFloat}
        animate={
          phase === 'video' || phase === 'done'
            ? { opacity: 0, y: 0 }
            : isOpening
              ? { opacity: 1, y: [0, -6, 0] }
              : { opacity: 1, y: [0, -10, 0, -6, 0] }
        }
        transition={
          phase === 'video' || phase === 'done'
            ? { duration: 0.5 }
            : isOpening
              ? { duration: 0.4 }
              : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <div className={styles.envelope}>
          {/* Back face */}
          <div className={styles.envBack} />

          {/* Card sliver sliding out */}
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

          {/* Envelope face */}
          <div className={styles.envFace}>
            <div className={styles.cornerRow}>
              <FiligreeCornerV4 />
              <FiligreeCornerV4 mirror="-1,1" />
            </div>
            <GoldLineV4 />
            <div className={styles.faceCenter} />
            <GoldLineV4 />
            <div className={styles.cornerRow}>
              <FiligreeCornerV4 mirror="1,-1" />
              <FiligreeCornerV4 mirror="-1,-1" />
            </div>
          </div>

          {/* Gold shimmer overlay */}
          <div className={styles.shimmerOverlay} />

          {/* Flap */}
          <motion.div
            className={styles.flap}
            animate={isOpening ? { rotateX: -180 } : { rotateX: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
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

      {/* Video overlay */}
      <AnimatePresence>
        {showVideo && (
          <VideoPlayer key="video" onVideoEnd={handleVideoEnd} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
