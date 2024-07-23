import React from "react";
import styles from "./HowDoesAtomWork.module.css";
const HowDoesAtomWork = () => {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.flexContainer}>
              <article className={styles.leftSection}>
                <h4>World's #1 Naming Platform</h4>
                <h1>How Does Atom Work?</h1>
                <p>
                  Atom helps you come up with a great name for your business by
                  combining the power of crowdsourcing with sophisticated
                  technology and Agency-level validation services.
                </p>
                <div className={styles.playVideo}>
                  <a href="https://vimeo.com/826948811" className={styles.a}>
                    <i className={styles.i}></i>
                    <span>Play Video</span>
                  </a>
                </div>
              </article>
              <article className={styles.rightSection}>
                <img width="450" src="/app-user.svg" alt="app-user" />
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowDoesAtomWork;
