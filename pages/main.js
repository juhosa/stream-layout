import Chat from '../components/Chat';
import styles from '../styles/Main.module.css'

const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.upperSection}>
        <div className={styles.upperLeft}>upperLeft</div>
        <div className={styles.upperRight}>upperRight</div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.bottomLeft}>
          <h3>
            Learn how CSS grid works!
          </h3>
        </div>
        <div className={styles.bottomRight}><Chat /></div>
      </div>
    </div>
  )
}

export default Main;
