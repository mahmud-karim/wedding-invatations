import { motion } from 'framer-motion'
import GlowOrbs from './GlowOrbs'
import RsvpForm from './RsvpForm'
import styles from '../styles/InvitationCard.module.css'

// Arabesque top/bottom border SVG
function ArabesqueBorder({ flip }) {
  return (
    <svg
      className={styles.border}
      viewBox="0 0 400 40"
      preserveAspectRatio="xMidYMid meet"
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
      aria-hidden="true"
    >
      {/* Central diamond */}
      <polygon points="200,4 208,14 200,24 192,14" fill="var(--color-gold)" opacity="0.9" />

      {/* Repeating geometric pattern */}
      {[-120, -80, -40, 0, 40, 80, 120].map((offset, i) => (
        <g key={i} transform={`translate(${200 + offset}, 14)`}>
          <rect x="-5" y="-5" width="10" height="10" fill="none"
            stroke="var(--color-gold)" strokeWidth="0.8" opacity="0.6"
            transform="rotate(45)" />
          <circle cx="0" cy="0" r="1.5" fill="var(--color-gold)" opacity="0.7" />
        </g>
      ))}

      {/* Horizontal lines */}
      <line x1="0" y1="14" x2="175" y2="14" stroke="var(--color-gold)" strokeWidth="0.6" opacity="0.4" />
      <line x1="225" y1="14" x2="400" y2="14" stroke="var(--color-gold)" strokeWidth="0.6" opacity="0.4" />

      {/* Corner ornaments */}
      <polygon points="0,4 12,4 0,16" fill="var(--color-gold)" opacity="0.5" />
      <polygon points="400,4 388,4 400,16" fill="var(--color-gold)" opacity="0.5" />

      {/* Side dots */}
      {[30, 60, 90].map(x => (
        <g key={x}>
          <circle cx={x} cy="14" r="1" fill="var(--color-gold)" opacity="0.4" />
          <circle cx={400 - x} cy="14" r="1" fill="var(--color-gold)" opacity="0.4" />
        </g>
      ))}
    </svg>
  )
}

function GoldDivider() {
  return (
    <div className={styles.divider} aria-hidden="true">
      <span className={styles.dividerLine} />
      <svg width="14" height="14" viewBox="0 0 14 14">
        <polygon points="7,1 13,7 7,13 1,7" fill="var(--color-gold)" opacity="0.85" />
      </svg>
      <span className={styles.dividerLine} />
    </div>
  )
}

// Stagger container variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function InvitationCard() {
  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <GlowOrbs />
      <motion.div
        className={styles.card}
        initial={{ scale: 0.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className={styles.inner}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Bismillah */}
          <motion.p variants={itemVariants} className={styles.bismillah}>
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </motion.p>

          {/* Top arabesque border */}
          <motion.div variants={itemVariants}>
            <ArabesqueBorder />
          </motion.div>

          {/* Together line */}
          <motion.p variants={itemVariants} className={styles.together}>
            Together with their families
          </motion.p>

          {/* Names */}
          <motion.h1 variants={itemVariants} className={styles.names}>
            Mahmud
            <span className={styles.ampersand}>&</span>
            Fariah
          </motion.h1>

          <motion.div variants={itemVariants}>
            <GoldDivider />
          </motion.div>

          {/* Request line */}
          <motion.p variants={itemVariants} className={styles.request}>
            request the honour of your presence at their
          </motion.p>

          {/* Event title */}
          <motion.h2 variants={itemVariants} className={styles.eventTitle}>
            Nikah &amp; Reception
          </motion.h2>

          <motion.div variants={itemVariants}>
            <GoldDivider />
          </motion.div>

          {/* Date & Time */}
          <motion.div variants={itemVariants} className={styles.dateTime}>
            <p className={styles.date}>Sunday, the Twenty-Sixth of April</p>
            <p className={styles.year}>Two Thousand &amp; Twenty-Six</p>
            <p className={styles.time}>6:30 in the evening until 11:30</p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <GoldDivider />
          </motion.div>

          {/* Venue */}
          <motion.div variants={itemVariants} className={styles.venue}>
            <p className={styles.venueName}>World's Fair Marina</p>
            <p className={styles.venueAddress}>
              Flushing Meadows Corona Park
            </p>
            <p className={styles.venueCity}>Queens, New York</p>
          </motion.div>

          {/* Bottom arabesque border */}
          <motion.div variants={itemVariants}>
            <ArabesqueBorder flip />
          </motion.div>

          <motion.div variants={itemVariants}>
            <RsvpForm styles={styles} />
          </motion.div>

          {/* Closing du'a */}
          <motion.p variants={itemVariants} className={styles.dua}>
            جَزَاكَ اللَّهُ خَيْرًا
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
