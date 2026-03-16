import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WaxSealV4 from '../v4/WaxSealV4'
import { SparkBurst } from '../v4/AmbientV4'
import styles from '../../styles/v5/EnvelopeV5.module.css'

/* ── E2: V1-style Gold on Cream — arabesque waves + corner ornaments ── */
function ArabesqueWave() {
  return (
    <svg width="100%" height="12" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M0 6 Q10 0 20 6 Q30 12 40 6 Q50 0 60 6 Q70 12 80 6 Q90 0 100 6 Q110 12 120 6 Q130 0 140 6 Q150 12 160 6 Q170 0 180 6 Q190 12 200 6"
        stroke="#C9952A" strokeWidth="1.2" fill="none" opacity="0.6"
      />
    </svg>
  )
}

function GoldCornerOrnament({ flip }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32"
      style={{ transform: flip ? 'scaleX(-1)' : undefined }} aria-hidden="true">
      <path d="M2 2 L16 2 L2 16 Z" fill="none" stroke="#C9952A" strokeWidth="1" opacity="0.7" />
      <path d="M2 2 L8 2 L2 8 Z" fill="#C9952A" opacity="0.4" />
      <circle cx="20" cy="20" r="2" fill="#C9952A" opacity="0.5" />
      <circle cx="26" cy="14" r="1.2" fill="#E4CC7A" opacity="0.35" />
    </svg>
  )
}

/* ── E3: Royal Mehrab — Arch & Arabesque ── */
function MehrabArch() {
  return (
    <svg className={styles.mehrabArch} viewBox="0 0 300 210" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <radialGradient id="archTint" cx="50%" cy="40%" r="45%">
          <stop offset="0%" stopColor="#4a1020" stopOpacity="0.03" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Pointed/ogee arch - outer */}
      <path d="M60,190 L60,90 Q60,20 150,10 Q240,20 240,90 L240,190"
        fill="url(#archTint)" stroke="#B8860B" strokeWidth="1.2" opacity="0.4" />
      {/* Arch - inner highlight */}
      <path d="M68,188 L68,92 Q68,28 150,18 Q232,28 232,92 L232,188"
        fill="none" stroke="#C9A94A" strokeWidth="0.5" opacity="0.25" />
      {/* Trefoil at left shoulder */}
      <circle cx="68" cy="90" r="6" fill="none" stroke="#B8860B" strokeWidth="0.6" opacity="0.3" />
      <circle cx="58" cy="84" r="4" fill="none" stroke="#B8860B" strokeWidth="0.5" opacity="0.2" />
      <circle cx="74" cy="82" r="4" fill="none" stroke="#B8860B" strokeWidth="0.5" opacity="0.2" />
      {/* Trefoil at right shoulder */}
      <circle cx="232" cy="90" r="6" fill="none" stroke="#B8860B" strokeWidth="0.6" opacity="0.3" />
      <circle cx="226" cy="82" r="4" fill="none" stroke="#B8860B" strokeWidth="0.5" opacity="0.2" />
      <circle cx="242" cy="84" r="4" fill="none" stroke="#B8860B" strokeWidth="0.5" opacity="0.2" />
      {/* Lotus finial at peak */}
      <path d="M150,10 Q147,0 150,-4 Q153,0 150,10" fill="#B8860B" opacity="0.3" />
      <path d="M150,10 Q143,2 140,6" fill="none" stroke="#B8860B" strokeWidth="0.5" opacity="0.25" />
      <path d="M150,10 Q157,2 160,6" fill="none" stroke="#B8860B" strokeWidth="0.5" opacity="0.25" />
      <circle cx="150" cy="-2" r="1.5" fill="#C9A94A" opacity="0.35" />
      {/* Faint Bismillah above arch */}
      <text x="150" y="6" fontFamily="Noto Naskh Arabic, serif" fontSize="8"
        fill="#B8860B" opacity="0.18" textAnchor="middle">بسم الله</text>
    </svg>
  )
}

function ArabesqueVines() {
  return (
    <svg className={styles.arabesqueVines} viewBox="0 0 200 160" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {/* Left vine - flowing S-curve */}
      <path className={styles.arabesqueDraw}
        d="M100,80 Q80,60 85,40 Q90,20 70,15 Q55,12 50,25 Q45,38 60,45 Q75,52 70,70 Q65,85 50,90 Q35,95 40,110 Q45,125 60,120 Q75,115 80,130 Q85,145 100,150"
        fill="none" stroke="#B8860B" strokeWidth="0.8" opacity="0.12" />
      {/* Right vine - mirror */}
      <path className={styles.arabesqueDraw}
        d="M100,80 Q120,60 115,40 Q110,20 130,15 Q145,12 150,25 Q155,38 140,45 Q125,52 130,70 Q135,85 150,90 Q165,95 160,110 Q155,125 140,120 Q125,115 120,130 Q115,145 100,150"
        fill="none" stroke="#B8860B" strokeWidth="0.8" opacity="0.12" />
      {/* Leaf shapes along left vine */}
      <path d="M70,15 Q63,8 58,14 Q65,16 70,15" fill="#B8860B" opacity="0.08" />
      <path d="M50,90 Q42,83 38,90 Q44,92 50,90" fill="#B8860B" opacity="0.08" />
      <path d="M60,120 Q52,114 48,121 Q54,123 60,120" fill="#B8860B" opacity="0.08" />
      {/* Leaf shapes along right vine */}
      <path d="M130,15 Q137,8 142,14 Q135,16 130,15" fill="#B8860B" opacity="0.08" />
      <path d="M150,90 Q158,83 162,90 Q156,92 150,90" fill="#B8860B" opacity="0.08" />
      <path d="M140,120 Q148,114 152,121 Q146,123 140,120" fill="#B8860B" opacity="0.08" />
      {/* Small flower buds */}
      <circle cx="50" cy="25" r="2.5" fill="none" stroke="#C9A94A" strokeWidth="0.5" opacity="0.1" />
      <circle cx="150" cy="25" r="2.5" fill="none" stroke="#C9A94A" strokeWidth="0.5" opacity="0.1" />
      <circle cx="40" cy="110" r="2" fill="none" stroke="#C9A94A" strokeWidth="0.5" opacity="0.1" />
      <circle cx="160" cy="110" r="2" fill="none" stroke="#C9A94A" strokeWidth="0.5" opacity="0.1" />
    </svg>
  )
}

function Cartouche() {
  return (
    <svg className={styles.cartouche} width="100" height="36" viewBox="0 0 100 36" aria-hidden="true">
      {/* Pointed-end cartouche frame */}
      <path d="M10,18 L20,4 L80,4 L90,18 L80,32 L20,32 Z"
        fill="none" stroke="#B8860B" strokeWidth="0.8" opacity="0.35" />
      <path d="M15,18 L23,7 L77,7 L85,18 L77,29 L23,29 Z"
        fill="none" stroke="#C9A94A" strokeWidth="0.4" opacity="0.2" />
      {/* M */}
      <text x="35" y="23" fontFamily="Cormorant Garamond, serif" fontSize="16" fontWeight="300"
        fill="#B8860B" opacity="0.5" textAnchor="middle">M</text>
      {/* & */}
      <text x="50" y="21" fontFamily="Cormorant Garamond, serif" fontSize="10" fontStyle="italic"
        fill="#C9A94A" opacity="0.4" textAnchor="middle">&amp;</text>
      {/* F */}
      <text x="65" y="23" fontFamily="Cormorant Garamond, serif" fontSize="16" fontWeight="300"
        fill="#B8860B" opacity="0.5" textAnchor="middle">F</text>
      {/* End dots */}
      <circle cx="10" cy="18" r="1.2" fill="#C9A94A" opacity="0.3" />
      <circle cx="90" cy="18" r="1.2" fill="#C9A94A" opacity="0.3" />
    </svg>
  )
}

function ChainBorder() {
  return (
    <svg className={styles.chainBorder} viewBox="0 0 300 210" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id="chainLink" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          {/* Interlocking oval loops */}
          <ellipse cx="10" cy="5" rx="8" ry="4" fill="none" stroke="#B8860B" strokeWidth="0.6" opacity="0.25" />
          <ellipse cx="10" cy="15" rx="8" ry="4" fill="none" stroke="#C9A94A" strokeWidth="0.4" opacity="0.18" />
        </pattern>
      </defs>
      {/* Top border band */}
      <rect x="4" y="2" width="292" height="10" fill="url(#chainLink)" />
      {/* Bottom border band */}
      <rect x="4" y="198" width="292" height="10" fill="url(#chainLink)" />
      {/* Left border band */}
      <rect x="2" y="4" width="10" height="202" fill="url(#chainLink)" />
      {/* Right border band */}
      <rect x="288" y="4" width="10" height="202" fill="url(#chainLink)" />
      {/* Corner diamonds */}
      <polygon points="7,7 12,2 17,7 12,12" fill="#B8860B" opacity="0.15" />
      <polygon points="283,7 288,2 293,7 288,12" fill="#B8860B" opacity="0.15" />
      <polygon points="7,203 12,198 17,203 12,208" fill="#B8860B" opacity="0.15" />
      <polygon points="283,203 288,198 293,203 288,208" fill="#B8860B" opacity="0.15" />
    </svg>
  )
}

function ConcentricArchFlap() {
  const arches = [
    { scale: 1, opacity: 0.15 },
    { scale: 0.75, opacity: 0.12 },
    { scale: 0.52, opacity: 0.1 },
    { scale: 0.33, opacity: 0.08 },
    { scale: 0.18, opacity: 0.06 },
  ]
  return (
    <svg className={styles.concentricFlap} viewBox="0 0 300 170" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      {arches.map((a, i) => {
        const w = 240 * a.scale
        const h = 150 * a.scale
        const x = 150 - w / 2
        const y = 170 - h
        const mx = 150
        const cp = y - h * 0.15
        return (
          <path key={i}
            d={`M${x},170 L${x},${y + h * 0.4} Q${x},${cp} ${mx},${y} Q${x + w},${cp} ${x + w},${y + h * 0.4} L${x + w},170`}
            fill="none" stroke="#B8860B" strokeWidth={1 - i * 0.15}
            opacity={a.opacity} />
        )
      })}
      {/* Crescent moon at innermost arch peak */}
      <path d="M150,125 Q146,118 150,112 Q152,118 150,125"
        fill="#C9A94A" opacity="0.2" />
      <circle cx="151" cy="117" r="2" fill="#C9A94A" opacity="0.15" />
    </svg>
  )
}

const ENVELOPE_STYLES = [
  { id: 1, label: 'E1', title: 'Imperial Mughal' },
  { id: 2, label: 'E2', title: 'Classic Gold' },
  { id: 3, label: 'E3', title: 'Royal Mehrab' },
]

function EnvelopeStyleToggle({ current, onChange }) {
  return (
    <motion.div
      className={styles.envelopeToggle}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4 }}
    >
      {ENVELOPE_STYLES.map(s => (
        <motion.button
          key={s.id}
          onClick={() => onChange(s.id)}
          title={s.title}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className={`${styles.toggleBtn} ${current === s.id ? styles.toggleBtnActive : ''}`}
        >
          {s.label}
        </motion.button>
      ))}
    </motion.div>
  )
}

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

// Phases: idle → peeling → opening → done
export default function EnvelopeV5({ onOpen }) {
  const [phase, setPhase] = useState('idle')
  const [envelopeStyle, setEnvelopeStyle] = useState(() => {
    const saved = localStorage.getItem('v5EnvelopeStyle')
    return saved ? Number(saved) : 1
  })

  useEffect(() => {
    localStorage.setItem('v5EnvelopeStyle', String(envelopeStyle))
  }, [envelopeStyle])

  function handleSealClick() {
    if (phase !== 'idle') return
    setPhase('peeling')
    setTimeout(() => setPhase('opening'), 550)
    setTimeout(() => {
      setPhase('done')
      onOpen()
    }, 550 + 1200)
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
          <div className={`${styles.envFace} ${envelopeStyle === 2 ? styles.envFaceE2 : envelopeStyle === 3 ? styles.envFaceE3 : ''}`}>
            {envelopeStyle === 1 && (
              <>
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
              </>
            )}
            {envelopeStyle === 2 && (
              <>
                <div className={styles.cornerRow}>
                  <GoldCornerOrnament />
                  <GoldCornerOrnament flip />
                </div>
                <ArabesqueWave />
                <div className={styles.faceCenter} />
                <ArabesqueWave />
                <div className={`${styles.cornerRow} ${styles.cornerRowFlipped}`}>
                  <GoldCornerOrnament />
                  <GoldCornerOrnament flip />
                </div>
              </>
            )}
            {envelopeStyle === 3 && (
              <>
                <ChainBorder />
                <MehrabArch />
                <div className={styles.faceCenter}>
                  <ArabesqueVines />
                  <Cartouche />
                </div>
              </>
            )}
          </div>

          {/* Gold shimmer overlay */}
          <div className={`${styles.shimmerOverlay} ${envelopeStyle === 3 ? styles.shimmerOverlayE3 : ''}`} />

          {/* Flap */}
          <motion.div
            className={styles.flap}
            animate={isOpening ? { rotateX: -180 } : { rotateX: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.flapInner}>
              {envelopeStyle === 1 && <div className={styles.flapPattern} />}
              {envelopeStyle === 2 && null}
              {envelopeStyle === 3 && <ConcentricArchFlap />}
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

      {/* Envelope style toggle */}
      <AnimatePresence>
        {phase === 'idle' && (
          <EnvelopeStyleToggle current={envelopeStyle} onChange={setEnvelopeStyle} />
        )}
      </AnimatePresence>

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
