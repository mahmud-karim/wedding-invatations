import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './styles/global.css'

// V1 components
import ParticleField from './components/ParticleField'
import EnvelopeScene from './components/EnvelopeScene'
import InvitationCard from './components/InvitationCard'

// V2 components
import { WarmParticles, GoldOrbsV2 } from './components/v2/AmbientV2'
import EnvelopeV2 from './components/v2/EnvelopeV2'
import CardV2 from './components/v2/CardV2'
import './styles/v2/theme.css'

// V3 components
import SceneV3 from './components/v3/SceneV3'
import './styles/v3/theme.css'

// V4 components
import EnvelopeV4 from './components/v4/EnvelopeV4'
import CardV4 from './components/v4/CardV4'
import { GoldOrbsV4, DreamyBackground, CursorGlow } from './components/v4/AmbientV4'
import bgMusic from './assets/v4/background-music.mp3'
import './styles/v4/theme.css'

// V5 components
import EnvelopeV5 from './components/v5/EnvelopeV5'
import CardV5 from './components/v5/CardV5'
import './styles/v5/theme.css'

const VARIATIONS = [
  { id: 1, label: 'V1', title: 'Burgundy & Gold' },
  { id: 2, label: 'V2', title: 'Luxury Desi' },
  { id: 3, label: 'V3', title: 'Floral Garden' },
  { id: 4, label: 'V4', title: 'Our Story' },
  { id: 5, label: 'V5', title: 'Classic Gold' },
]

function VariationToggle({ current, onChange }) {
  return (
    <div style={{
      position: 'fixed',
      top: '16px',
      right: '16px',
      zIndex: 100,
      display: 'flex',
      gap: '6px',
      alignItems: 'center',
    }}>
      {VARIATIONS.map(v => (
        <motion.button
          key={v.id}
          onClick={() => onChange(v.id)}
          title={v.title}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          style={{
            background: current === v.id
              ? 'rgba(212, 168, 67, 0.9)'
              : 'rgba(20, 6, 6, 0.65)',
            color: current === v.id ? '#2a1a12' : 'rgba(212, 168, 67, 0.75)',
            border: `1px solid ${current === v.id ? '#d4a843' : 'rgba(212,168,67,0.3)'}`,
            borderRadius: '4px',
            padding: '5px 12px',
            fontSize: '0.72rem',
            fontFamily: 'EB Garamond, serif',
            fontWeight: current === v.id ? '600' : '400',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'background 0.2s, color 0.2s, border-color 0.2s',
          }}
        >
          {v.label}
        </motion.button>
      ))}
    </div>
  )
}

export default function App() {
  const [variation, setVariation] = useState(() => {
    return 5
  })

  const [stage, setStage] = useState('envelope')
  const [muted, setMuted] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [showVersionToggle, setShowVersionToggle] = useState(false)
  const audioRef = useRef(null)
  const longPressTimer = useRef(null)

  useEffect(() => {
    function startLongPress() {
      longPressTimer.current = setTimeout(() => setShowVersionToggle(v => !v), 10000)
    }
    function cancelLongPress() {
      clearTimeout(longPressTimer.current)
    }
    document.addEventListener('mousedown', startLongPress)
    document.addEventListener('mouseup', cancelLongPress)
    document.addEventListener('touchstart', startLongPress)
    document.addEventListener('touchend', cancelLongPress)
    return () => {
      document.removeEventListener('mousedown', startLongPress)
      document.removeEventListener('mouseup', cancelLongPress)
      document.removeEventListener('touchstart', startLongPress)
      document.removeEventListener('touchend', cancelLongPress)
    }
  }, [])

  function startV4Music() {
    if (!audioRef.current) {
      const audio = new Audio(bgMusic)
      audio.loop = true
      audio.volume = muted ? 0 : 1
      audio.play().catch(() => {})
      audioRef.current = audio
      setMusicPlaying(true)
    }
  }

  function toggleMute() {
    setMuted(prev => {
      const next = !prev
      if (audioRef.current) audioRef.current.volume = next ? 0 : 1
      return next
    })
  }

  useEffect(() => {
    if (variation !== 4 && audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
      audioRef.current = null
      setMusicPlaying(false)
    }
  }, [variation])

  function handleVariationChange(v) {
    if (v === variation) return
    setVariation(v)
    setStage('envelope')
    // localStorage.setItem('weddingVariation', v)
  }

  return (
    <>
      {showVersionToggle && <VariationToggle current={variation} onChange={handleVariationChange} />}

      {variation === 4 && musicPlaying && (
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Unmute music' : 'Mute music'}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 100,
            background: 'rgba(20, 6, 6, 0.6)',
            border: '1px solid rgba(212, 168, 67, 0.35)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'background 0.2s',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(212, 168, 67, 0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {muted ? (
              <>
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </>
            ) : (
              <>
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </>
            )}
          </svg>
        </button>
      )}

      <AnimatePresence mode="wait">
        {variation === 1 && (
          <motion.div key="v1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <ParticleField count={38} />
            <AnimatePresence mode="wait">
              {stage === 'envelope' && (
                <EnvelopeScene key="env1" onOpen={() => setStage('card')} />
              )}
              {stage === 'card' && (
                <InvitationCard key="card1" />
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {variation === 2 && (
          <motion.div key="v2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <WarmParticles count={28} />
            <AnimatePresence mode="wait">
              {stage === 'envelope' && (
                <EnvelopeV2 key="env2" onOpen={() => setStage('card')} />
              )}
              {stage === 'card' && (
                <>
                  <GoldOrbsV2 count={16} />
                  <CardV2 key="card2" />
                </>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {variation === 3 && (
          // V3 is self-contained — manages its own auto-play phases internally
          <motion.div key="v3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <SceneV3 />
          </motion.div>
        )}

        {variation === 4 && (
          <motion.div key="v4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <CursorGlow />
            <DreamyBackground />
            <AnimatePresence mode="wait">
              {stage === 'envelope' && (
                <EnvelopeV4 key="env4" onOpen={() => setStage('card')} onSealBreak={startV4Music} />
              )}
              {stage === 'card' && (
                <>
                  <GoldOrbsV4 count={16} />
                  <CardV4 key="card4" />
                </>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {variation === 5 && (
          <motion.div key="v5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <CursorGlow />
            <DreamyBackground />
            <AnimatePresence mode="wait">
              {stage === 'envelope' && (
                <EnvelopeV5 key="env5" onOpen={() => setStage('card')} />
              )}
              {stage === 'card' && (
                <>
                  <GoldOrbsV4 count={16} />
                  <CardV5 key="card5" />
                </>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
