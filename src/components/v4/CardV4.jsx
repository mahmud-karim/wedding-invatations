import { motion } from 'framer-motion'
import RsvpForm from '../RsvpForm'
import styles from '../../styles/v4/CardV4.module.css'

/* ── Crescent & Star medallion — ties to wax seal motif ── */
function CrescentMedallion() {
  return (
    <svg className={styles.medallion} viewBox="0 0 120 120" aria-hidden="true">
      {/* Outer decorative rings */}
      <circle cx="60" cy="60" r="56" fill="none" stroke="#B8860B" strokeWidth="0.8" opacity="0.35" />
      <circle cx="60" cy="60" r="52" fill="none" stroke="#B8860B" strokeWidth="0.5" opacity="0.25" />
      {/* 12 radial ticks */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        const x1 = 60 + 48 * Math.cos(angle)
        const y1 = 60 + 48 * Math.sin(angle)
        const x2 = 60 + 53 * Math.cos(angle)
        const y2 = 60 + 53 * Math.sin(angle)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#B8860B" strokeWidth="0.8" opacity="0.3" />
      })}
      {/* Crescent moon */}
      <path d="M60 28 A22 22 0 1 1 38 60 A15 15 0 1 0 60 28 Z"
        fill="#B8860B" opacity="0.45" />
      {/* Five-pointed star */}
      <path d="M75 42 L78 52 L88 52 L80 58 L83 68 L75 62 L67 68 L70 58 L62 52 L72 52 Z"
        fill="#B8860B" opacity="0.4" />
      {/* Inner ring */}
      <circle cx="60" cy="60" r="24" fill="none" stroke="#B8860B" strokeWidth="0.5" opacity="0.2" />
    </svg>
  )
}

/* ── Mughal-inspired arch — gold on cream ── */
function MughalArch() {
  return (
    <svg className={styles.arch} viewBox="0 0 300 70" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {/* Outer pointed arch */}
      <path d="M30 68 L30 30 Q30 6 150 6 Q270 6 270 30 L270 68"
        fill="none" stroke="#B8860B" strokeWidth="1" opacity="0.5" />
      {/* Inner arch */}
      <path d="M48 68 L48 34 Q48 14 150 14 Q252 14 252 34 L252 68"
        fill="none" stroke="#B8860B" strokeWidth="0.6" opacity="0.3" />
      {/* Keystone — pointed drop */}
      <path d="M150,4 L155,14 L150,24 L145,14 Z" fill="#B8860B" opacity="0.4" />
      {/* Small ornament dots at arch base */}
      <circle cx="30" cy="68" r="2.5" fill="#B8860B" opacity="0.35" />
      <circle cx="270" cy="68" r="2.5" fill="#B8860B" opacity="0.35" />
      {/* Tiny trefoil at top center */}
      <circle cx="150" cy="30" r="2" fill="#B8860B" opacity="0.2" />
      <circle cx="143" cy="33" r="1.5" fill="#B8860B" opacity="0.15" />
      <circle cx="157" cy="33" r="1.5" fill="#B8860B" opacity="0.15" />
    </svg>
  )
}

/* ── Gold divider with diamond ── */
function GoldDividerV4() {
  return (
    <div className={styles.divider}>
      <span className={styles.divLine} />
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <polygon points="9,1 17,9 9,17 1,9" fill="none" stroke="#B8860B" strokeWidth="1" opacity="0.5" />
        <polygon points="9,4 14,9 9,14 4,9" fill="#B8860B" opacity="0.2" />
      </svg>
      <span className={styles.divLine} />
    </div>
  )
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function CardV4() {
  return (
    <motion.div
      className={styles.overlay}
      initial={{ y: '100vh' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className={styles.card}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {/* Gold shimmer sweep */}
        <div className={styles.cardShimmer} />
        {/* Warm vignette pulse */}
        <div className={styles.glowPulse} />

        <motion.div
          className={styles.inner}
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <CrescentMedallion />
          </motion.div>

          <motion.p variants={fadeUp} className={styles.bismillah}>
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </motion.p>

          <motion.p variants={fadeUp} className={styles.bismillahEn}>
            In the name of Allah, the Most Merciful, the Most Compassionate
          </motion.p>

          <motion.div variants={fadeUp}>
            <MughalArch />
          </motion.div>

          <motion.p variants={fadeUp} className={styles.intro}>
            With gratitude to Allah and joy in our hearts, we invite you to celebrate the
          </motion.p>

          <motion.h2 variants={fadeUp} className={styles.eventTitle}>
            Nikkah &amp; Reception
          </motion.h2>

          <motion.p variants={fadeUp} className={styles.ofText}>of</motion.p>

          <motion.h1 variants={fadeUp} className={styles.names}>
            Mahmud
            <span className={styles.amp}>&amp;</span>
            Fariah
          </motion.h1>

          <motion.div variants={fadeUp}>
            <GoldDividerV4 />
          </motion.div>

          <motion.div variants={fadeUp} className={styles.dateBlock}>
            <p className={styles.date}>April Twenty-Sixth</p>
            <p className={styles.year}>Two Thousand &amp; Twenty-Six</p>
            <p className={styles.time}>6:30 in the evening until 11:30</p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <GoldDividerV4 />
          </motion.div>

          <motion.div variants={fadeUp} className={styles.venue}>
            <p className={styles.venueName}>World's Fair Marina</p>
            <p className={styles.venueAddr}>Flushing Meadows Corona Park</p>
            <p className={styles.venueCity}>Queens, New York City</p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <GoldDividerV4 />
          </motion.div>

          <motion.p variants={fadeUp} className={styles.closing}>
            Please join us for an evening of love, prayer, and celebration
          </motion.p>

          <motion.div variants={fadeUp}>
            <GoldDividerV4 />
          </motion.div>

          <motion.div variants={fadeUp}>
            <RsvpForm styles={styles} />
          </motion.div>

          <motion.div variants={fadeUp}>
            <CrescentMedallion />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
