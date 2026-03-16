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
import { GoldOrbsV4, DreamyParticles } from './components/v4/AmbientV4'
import bgMusic from './assets/v4/background-music.mp3'
import './styles/v4/theme.css'

const VARIATIONS = [
  { id: 1, label: 'V1', title: 'Burgundy & Gold' },
  { id: 2, label: 'V2', title: 'Luxury Desi' },
  { id: 3, label: 'V3', title: 'Floral Garden' },
  { id: 4, label: 'V4', title: 'Our Story' },
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
    const saved = localStorage.getItem('weddingVariation')
    return saved ? Number(saved) : 1
  })

  const [stage, setStage] = useState('envelope')
  const audioRef = useRef(null)

  function startV4Music() {
    if (!audioRef.current) {
      const audio = new Audio(bgMusic)
      audio.loop = true
      audio.volume = 1
      audio.play().catch(() => {})
      audioRef.current = audio
    }
  }

  useEffect(() => {
    if (variation !== 4 && audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
      audioRef.current = null
    }
  }, [variation])

  function handleVariationChange(v) {
    if (v === variation) return
    setVariation(v)
    setStage('envelope')
    localStorage.setItem('weddingVariation', v)
  }

  return (
    <>
      <VariationToggle current={variation} onChange={handleVariationChange} />

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
            <DreamyParticles count={30} />
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
      </AnimatePresence>
    </>
  )
}
