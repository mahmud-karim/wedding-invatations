import { motion } from 'framer-motion'
import CoupleV3 from './CoupleV3'
import gardenBg from '../../assets/v3/garden-bg.png'
import styles from '../../styles/v3/GardenReveal.module.css'

/* Floral arch made of SVG roses */
function FloralArch() {
  return (
    <svg className={styles.arch} viewBox="0 0 360 300" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <defs>
        <radialGradient id="archGlow" cx="50%" cy="60%">
          <stop offset="0%" stopColor="#FDFAF6" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#E8E4E0" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Soft glow behind arch */}
      <ellipse cx="180" cy="200" rx="130" ry="160" fill="url(#archGlow)" opacity="0.5"/>

      {/* Arch outline */}
      <path d="M60 298 L60 160 Q60 60 180 40 Q300 60 300 160 L300 298"
        fill="none" stroke="#C9A84C" strokeWidth="1.5" opacity="0.4"/>
      <path d="M74 298 L74 165 Q74 75 180 56 Q286 75 286 165 L286 298"
        fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.25"/>

      {/* Rose clusters along arch — left side */}
      {[
        [62, 160], [54, 120], [60, 80], [82, 50], [110, 32],
      ].map(([x, y], i) => (
        <g key={`l${i}`}>
          <circle cx={x} cy={y} r={10 + (i % 2) * 3} fill="#F0C8D0" opacity="0.8"/>
          <circle cx={x} cy={y} r={6 + (i % 2) * 2} fill="#FDFAF6" opacity="0.6"/>
          <circle cx={x} cy={y} r={3} fill="#E4CC7A" opacity="0.5"/>
        </g>
      ))}
      {/* Rose clusters — right side (mirrored) */}
      {[
        [298, 160], [306, 120], [300, 80], [278, 50], [250, 32],
      ].map(([x, y], i) => (
        <g key={`r${i}`}>
          <circle cx={x} cy={y} r={10 + (i % 2) * 3} fill="#F0C8D0" opacity="0.8"/>
          <circle cx={x} cy={y} r={6 + (i % 2) * 2} fill="#FDFAF6" opacity="0.6"/>
          <circle cx={x} cy={y} r={3} fill="#E4CC7A" opacity="0.5"/>
        </g>
      ))}
      {/* Top arch roses */}
      {[140, 160, 180, 200, 220].map((x, i) => (
        <g key={`t${i}`}>
          <circle cx={x} cy={i === 2 ? 38 : 45 + Math.abs(i - 2) * 4} r={9 + (i % 2) * 2}
            fill="#F0C8D0" opacity="0.85"/>
          <circle cx={x} cy={i === 2 ? 38 : 45 + Math.abs(i - 2) * 4} r={5}
            fill="#FDFAF6" opacity="0.7"/>
        </g>
      ))}

      {/* Fountain base suggestion */}
      <ellipse cx="180" cy="285" rx="55" ry="12" fill="#C9A84C" opacity="0.12"/>
      <path d="M148 285 Q148 265 180 255 Q212 265 212 285"
        fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.2"/>
    </svg>
  )
}

export default function GardenReveal({ visible }) {
  return (
    <motion.div
      className={styles.scene}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.9 }}
    >
      {/* Garden background image */}
      <div className={styles.bg} style={{ backgroundImage: `url(${gardenBg})` }} />

      {/* Couple illustration */}
      <motion.div
        className={styles.coupleWrap}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
        transition={{ duration: 0.9, delay: 0.3 }}
      >
        <CoupleV3 />
      </motion.div>

      {/* Arabic verse */}
      <motion.div
        className={styles.verseWrap}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -12 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <p className={styles.arabic}>وَخَلَقْنَاكُمْ أَزْوَاجًا</p>
        <p className={styles.translation}>"And We created you in pairs"</p>
        <p className={styles.reference}>— Surah An-Naba, 78:8</p>
      </motion.div>
    </motion.div>
  )
}
