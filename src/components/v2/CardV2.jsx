import { motion } from 'framer-motion'
import CoupleArt from './CoupleArt'
import RsvpForm from '../RsvpForm'
import styles from '../../styles/v2/CardV2.module.css'

/* ── Eight-point star medallion ── */
function StarMedallion() {
  return (
    <svg className={styles.medallion} viewBox="0 0 120 120" aria-hidden="true">
      {/* Outer ring */}
      <circle cx="60" cy="60" r="56" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.4" />
      <circle cx="60" cy="60" r="52" fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity="0.3" />
      {/* Eight-point star */}
      <path d="M60 12 L67 44 L96 28 L76 53 L108 60 L76 67 L96 92 L67 76 L60 108 L53 76 L24 92 L44 67 L12 60 L44 53 L24 28 L53 44 Z"
        fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.6" />
      {/* Inner star smaller */}
      <path d="M60 28 L65 48 L82 38 L72 54 L92 60 L72 66 L82 82 L65 72 L60 92 L55 72 L38 82 L48 66 L28 60 L48 54 L38 38 L55 48 Z"
        fill="#C9A84C" opacity="0.1" />
      {/* Center circle */}
      <circle cx="60" cy="60" r="10" fill="none" stroke="#C9A84C" strokeWidth="0.7" opacity="0.5" />
      <circle cx="60" cy="60" r="4" fill="#C9A84C" opacity="0.3" />
    </svg>
  )
}

/* ── Jamdani-inspired border band ── */
function JamdaniBorder() {
  return (
    <svg className={styles.jamdani} viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true">
      {/* Repeating Jamdani diamond/lozenge pattern */}
      {Array.from({ length: 20 }, (_, i) => {
        const x = i * 20 + 10
        return (
          <g key={i}>
            <polygon points={`${x},4 ${x + 6},12 ${x},20 ${x - 6},12`}
              fill="none" stroke="#C9A84C" strokeWidth="0.7" opacity="0.5" />
            <polygon points={`${x},7 ${x + 3},12 ${x},17 ${x - 3},12`}
              fill="#C9A84C" opacity="0.15" />
            <circle cx={x} cy="12" r="1" fill="#E4CC7A" opacity="0.4" />
          </g>
        )
      })}
      {/* Top and bottom lines */}
      <line x1="0" y1="1" x2="400" y2="1" stroke="#C9A84C" strokeWidth="0.4" opacity="0.3" />
      <line x1="0" y1="23" x2="400" y2="23" stroke="#C9A84C" strokeWidth="0.4" opacity="0.3" />
    </svg>
  )
}

/* ── Ornamental arch frame ── */
function ArchFrame() {
  return (
    <svg className={styles.arch} viewBox="0 0 300 60" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {/* Main arch */}
      <path d="M20 58 L20 24 Q20 4 150 4 Q280 4 280 24 L280 58"
        fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity="0.6" />
      {/* Inner arch */}
      <path d="M36 58 L36 28 Q36 12 150 12 Q264 12 264 28 L264 58"
        fill="none" stroke="#C9A84C" strokeWidth="0.6" opacity="0.35" />
      {/* Keystone ornament */}
      <polygon points="150,2 156,10 150,18 144,10" fill="#C9A84C" opacity="0.5" />
      {/* Side dots */}
      <circle cx="20" cy="58" r="2" fill="#C9A84C" opacity="0.45" />
      <circle cx="280" cy="58" r="2" fill="#C9A84C" opacity="0.45" />
    </svg>
  )
}

/* ── Gold divider ── */
function GoldDividerV2() {
  return (
    <div className={styles.divider}>
      <span className={styles.divLine} />
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <polygon points="9,1 17,9 9,17 1,9" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.7" />
        <polygon points="9,4 14,9 9,14 4,9" fill="#C9A84C" opacity="0.3" />
      </svg>
      <span className={styles.divLine} />
    </div>
  )
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.35 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function CardV2() {
  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className={styles.card}
        initial={{ scale: 0.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Gold shimmer sweep on card */}
        <div className={styles.cardShimmer} />

        <motion.div
          className={styles.inner}
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Top medallion */}
          <motion.div variants={fadeUp}>
            <StarMedallion />
          </motion.div>

          {/* Bismillah */}
          <motion.p variants={fadeUp} className={styles.bismillah}>
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </motion.p>

          <motion.p variants={fadeUp} className={styles.bismillahEn}>
            In the name of Allah, the Most Merciful, the Most Compassionate
          </motion.p>

          {/* Arch frame */}
          <motion.div variants={fadeUp}>
            <ArchFrame />
          </motion.div>

          {/* Intro text */}
          <motion.p variants={fadeUp} className={styles.intro}>
            With gratitude to Allah and joy in our hearts, we invite you to celebrate the
          </motion.p>

          {/* Event title */}
          <motion.h2 variants={fadeUp} className={styles.eventTitle}>
            Nikkah &amp; Reception
          </motion.h2>

          <motion.p variants={fadeUp} className={styles.ofText}>of</motion.p>

          {/* Names */}
          <motion.h1 variants={fadeUp} className={styles.names}>
            Mahmud
            <span className={styles.amp}>&amp;</span>
            Fariah
          </motion.h1>

          {/* Jamdani border */}
          <motion.div variants={fadeUp}>
            <JamdaniBorder />
          </motion.div>

          {/* Couple illustration */}
          <motion.div variants={fadeUp}>
            <CoupleArt />
          </motion.div>

          <motion.div variants={fadeUp}>
            <JamdaniBorder />
          </motion.div>

          <motion.div variants={fadeUp}>
            <GoldDividerV2 />
          </motion.div>

          {/* Date & Time */}
          <motion.div variants={fadeUp} className={styles.dateBlock}>
            <p className={styles.date}>April Twenty-Sixth</p>
            <p className={styles.year}>Two Thousand &amp; Twenty-Six</p>
            <p className={styles.time}>6:30 in the evening</p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <GoldDividerV2 />
          </motion.div>

          {/* Venue */}
          <motion.div variants={fadeUp} className={styles.venue}>
            <p className={styles.venueName}>World's Fair Marina</p>
            <p className={styles.venueAddr}>Flushing Meadows Corona Park</p>
            <p className={styles.venueCity}>Queens, New York City</p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <GoldDividerV2 />
          </motion.div>

          {/* Closing */}
          <motion.p variants={fadeUp} className={styles.closing}>
            Please join us for an evening of love, prayer, and celebration
          </motion.p>

          <motion.div variants={fadeUp}>
            <GoldDividerV2 />
          </motion.div>

          <motion.div variants={fadeUp}>
            <RsvpForm styles={styles} />
          </motion.div>

          {/* Bottom medallion */}
          <motion.div variants={fadeUp}>
            <StarMedallion />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
