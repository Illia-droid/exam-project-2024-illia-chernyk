import React from "react";
import styles from "./WayItem.module.css";
const WayItem = ({ way: { src, alt, title, content, span } }) => {
  return (
    <div className={styles.itemWrapper}>
      <div className={styles.itemContainer}>
        <div className={styles.item}>
          <div className={styles.icon}>
            <img src={src} alt={alt} width="48 px" />
          </div>
          <h3>{title}</h3>
          <p>{content}</p>
        </div>
        <div className={styles.buttonWrapper}>
          <a href="/start-contest" className={styles.button}>
            <span>{span || title}</span> <span className={styles.arrow}></span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default WayItem;
