import { useState } from "react";
import Chat from "../components/Chat";
import styles from "../styles/Main.module.css";

const Main = () => {
  const [title, setTitle] = useState("Building the stream layout!");
  const [subtitle, setSubtitle] = useState("Some copyin' and some pastin'");

  return (
    <div className={styles.main}>
      <div className={styles.upperSection}>
        <div className={styles.upperLeft}></div>
        <div className={styles.upperRight}></div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.bottomLeft}>
          <h2 className={styles.title}>{title}</h2>
          <span>{subtitle}</span>
        </div>
        <div className={styles.bottomRight}>
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Main;
