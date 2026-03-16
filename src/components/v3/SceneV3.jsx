import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import FlowerCurtain from './FlowerCurtain'
import GardenReveal from './GardenReveal'
import CardV3 from './CardV3'
import styles from '../../styles/v3/SceneV3.module.css'

// Auto-play timeline:
//   0.0s → 'curtain'  (garlands sway, garden hidden behind)
//   2.0s → 'reveal'   (center garlands fade, garden + couple + quote appear)
//   5.5s → 'card'     (white scalloped card zooms in)

export default function SceneV3() {
  const [phase, setPhase] = useState('curtain')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 2000)
    const t2 = setTimeout(() => setPhase('card'),   5500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className={styles.scene}>
      {/* Layer 1 (bottom): Garden background + couple — always rendered, fades in on reveal */}
      <GardenReveal visible={phase === 'reveal' || phase === 'card'} />

      {/* Layer 2: Flower curtain — always rendered; center strips fade internally on reveal */}
      <FlowerCurtain phase={phase} />

      {/* Layer 3 (top): Invitation card — mounts on 'card' phase */}
      <AnimatePresence>
        {phase === 'card' && <CardV3 key="cardv3" />}
      </AnimatePresence>
    </div>
  )
}
