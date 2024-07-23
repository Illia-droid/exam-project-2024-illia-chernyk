import React from 'react';
import styles from './BottomBlock.module.css';

const BottomBlock = () => {
  return (
    <section className={styles.bottomBlock}>
      <div className={styles.container}>
        <div className={styles.flex}>
          <div className={styles.allright}>Copyright © 2024 Atom.com </div>
          <div>
            <a
              className={styles.approved}
              href="https://www.trustpilot.com/review/atom.com"
              target="_blank"
              rel="nopener"
            >
              <div className={styles.paymentMethod}>
                <div className={styles.trustPilot}>
                  <strong>Excellent</strong>
                  <div className={styles.tpStars}>
                    <div className={styles.star}></div>
                    <div className={styles.star}></div>
                    <div className={styles.star}></div>
                    <div className={styles.star}></div>
                    <div className={styles.halfStar}></div>
                  </div>
                  <div className={styles.tpName}>
                    <div className={styles.icon}></div>
                    <span>Trustpilot</span>
                  </div>
                </div>
                <div className={styles.footerRatings}>
                  <div className={styles.basedOn}>
                    <div>
                      <strong itemprop="ratingValue">
                        4.7 /<span itemprop="bestRating">5</span>
                      </strong>
                    </div>
                    <p>
                      based on <span itemprop="ratingCount"> 345 ratings</span>
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className={styles.social}>
            <a href="#" className={styles.tdPreferences}>
              Consent Preferences
            </a>
            <a
              href="https://www.facebook.com/atomdotcom"
              aria-label="Facebook"
              target="_blank"
              className={styles.facebook}
            ></a>
            <a
              href="https://twitter.com/squadhelp"
              aria-label="Twitter"
              target="_blank"
              className={styles.twitter}
            ></a>
            <a
              href="https://www.instagram.com/workwithatom/"
              aria-label="Instagram"
              target="_blank"
              className={styles.instagam}
            ></a>
            <a
              href="https://www.linkedin.com/company/atomdotcom/"
              aria-label="LinkedIn"
              target="_blank"
              className={styles.in}
            ></a>
            <a
              href="https://www.youtube.com/@atomdotcom"
              aria-label="YouTube"
              target="_blank"
              className={styles.youtube}
            ></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomBlock;
