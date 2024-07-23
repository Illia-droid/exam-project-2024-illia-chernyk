import React from "react";
import waysToUseData from "./data.json";
import WayItem from "./WayItem";
import styles from "./WaysToUseAtom.module.css";
const WaysToUseAtom = () => {
  const renderWaysToUse = (way, i) => <WayItem key={i} way={way} />;
  return (
    <>
      <section className={styles.waysSection}>
        <div className={styles.waysContainer}>
          <div className={styles.headerBlock}>
            <div className={styles.maxWidth500}>
              <span>Our Services</span>
              <h2>3 Ways To Use Atom</h2>
              <p>
                Atom offers 3 ways to get you a perfect name for your business.
              </p>
            </div>
          </div>
          <div className={styles.flexBox}>{waysToUseData.map(renderWaysToUse)}</div>
        </div>
      </section>
    </>
  );
};

export default WaysToUseAtom;
