import coupleImg from '../../assets/v2/couple-standing.png'
import styles from '../../styles/v2/CoupleArt.module.css'

export default function CoupleArt() {
  return (
    <div className={styles.wrapper}>
      <img src={coupleImg} alt="" className={styles.img} />
    </div>
  )
}
