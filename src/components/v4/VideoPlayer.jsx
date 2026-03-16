import { useRef } from 'react'
import { motion } from 'framer-motion'
import coupleVideo from '../../assets/v4/wedding-intro.mp4'
import styles from '../../styles/v4/VideoPlayer.module.css'

const BAR_HEIGHT = 'clamp(18px, 5vh, 48px)'

export default function VideoPlayer({ onVideoEnd }) {
  const videoRef = useRef(null)

  return (
    <motion.div
      className={styles.overlay}
      initial={{ y: '-110vh' }}
      animate={{ y: 0 }}
      exit={{ y: '110vh' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Vertical video card */}
      <div className={styles.videoCard}>
        <video
          ref={videoRef}
          className={styles.video}
          src={coupleVideo}
          autoPlay
          playsInline
          muted
          onEnded={onVideoEnd}
        />

        {/* Vignette */}
        <div className={styles.vignette} />

        {/* Cinematic bars */}
        <motion.div
          className={styles.barTop}
          initial={{ height: 0 }}
          animate={{ height: BAR_HEIGHT }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        />
        <motion.div
          className={styles.barBottom}
          initial={{ height: 0 }}
          animate={{ height: BAR_HEIGHT }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}
