import { motion } from 'framer-motion'
import styles from '../../styles/v3/CardV3.module.css'

/* Gold divider */
function Divider() {
  return (
    <div className={styles.divider}>
      <span className={styles.divLine} />
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <polygon points="7,1 13,7 7,13 1,7" fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity="0.7"/>
        <polygon points="7,4 10,7 7,10 4,7" fill="#C9A84C" opacity="0.4"/>
      </svg>
      <span className={styles.divLine} />
    </div>
  )
}

/* Gold filigree ornament for top/bottom of card */
function CardOrnament({ flip }) {
  return (
    <svg
      className={styles.ornament}
      viewBox="0 0 280 32"
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
      aria-hidden="true"
    >
      {/* Center diamond */}
      <polygon points="140,2 146,10 140,18 134,10" fill="#C9A84C" opacity="0.7"/>
      {/* Repeating side elements */}
      {[-80,-56,-32,32,56,80].map((dx, i) => (
        <g key={i} transform={`translate(${140 + dx}, 10)`}>
          <rect x="-4" y="-4" width="8" height="8" fill="none"
            stroke="#C9A84C" strokeWidth="0.8" opacity="0.5" transform="rotate(45)"/>
          <circle cx="0" cy="0" r="1.2" fill="#C9A84C" opacity="0.55"/>
        </g>
      ))}
      {/* Lines */}
      <line x1="0" y1="10" x2="124" y2="10" stroke="#C9A84C" strokeWidth="0.5" opacity="0.35"/>
      <line x1="156" y1="10" x2="280" y2="10" stroke="#C9A84C" strokeWidth="0.5" opacity="0.35"/>
      {/* Corner dots */}
      <circle cx="4" cy="10" r="2" fill="#C9A84C" opacity="0.4"/>
      <circle cx="276" cy="10" r="2" fill="#C9A84C" opacity="0.4"/>
    </svg>
  )
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
}

export default function CardV3() {
  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Card scales up from center */}
      <motion.div
        className={styles.cardOuter}
        initial={{ scale: 0.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Mughal arch notch at top — created with a before pseudo or SVG mask */}
        <div className={styles.archTop} aria-hidden="true" />

        {/* Outer gold border ring */}
        <div className={styles.cardInner}>
          <motion.div
            className={styles.content}
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Bismillah */}
            <motion.p variants={fadeUp} className={styles.bismillah}>
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </motion.p>

            {/* Top ornament */}
            <motion.div variants={fadeUp}>
              <CardOrnament />
            </motion.div>

            {/* Invite line */}
            <motion.p variants={fadeUp} className={styles.cordially}>
              WE CORDIALLY INVITE YOU TO THE
            </motion.p>

            {/* Event */}
            <motion.h2 variants={fadeUp} className={styles.eventScript}>
              Nikkah &amp; Reception
            </motion.h2>

            <motion.p variants={fadeUp} className={styles.ofLine}>
              of our beloved
            </motion.p>

            {/* Names */}
            <motion.h1 variants={fadeUp} className={styles.names}>
              Mahmud
            </motion.h1>
            <motion.p variants={fadeUp} className={styles.amp}>&amp;</motion.p>
            <motion.h1 variants={fadeUp} className={styles.names}>
              Fariah
            </motion.h1>

            <motion.div variants={fadeUp}>
              <Divider />
            </motion.div>

            {/* Date block */}
            <motion.div variants={fadeUp} className={styles.dateGrid}>
              <span className={styles.dayLabel}>SATURDAY</span>
              <span className={styles.dayNum}>26</span>
              <span className={styles.timeLabel}>AT 6:30 PM</span>
              <span className={styles.monthYear} style={{ gridColumn: '1 / -1' }}>APRIL · 2026</span>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Divider />
            </motion.div>

            {/* Venue */}
            <motion.div variants={fadeUp} className={styles.venue}>
              <p className={styles.venueName}>World's Fair Marina</p>
              <p className={styles.venueAddr}>Flushing Meadows Corona Park</p>
              <p className={styles.venueCity}>Queens, New York City</p>
            </motion.div>

            {/* Bottom ornament */}
            <motion.div variants={fadeUp}>
              <CardOrnament flip />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
