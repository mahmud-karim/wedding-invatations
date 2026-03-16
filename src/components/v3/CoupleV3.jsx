import coupleImg from '../../assets/v3/couple-seated.png'
import styles from '../../styles/v3/CoupleV3.module.css'

export default function CoupleV3() {
  return (
    <div className={styles.wrapper}>
      <img src={coupleImg} alt="" className={styles.img} />
    </div>
  )
}
