import styles from './HeroLeft.module.css'
import { useEffect, useRef } from 'react';

export default function HeroRight() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.ScrollReveal) {
      window.ScrollReveal().reveal(`.${styles.cellWrap}`, {
        distance: '100px',
        duration: 900,
        easing: 'ease',
        origin : 'left',
        interval: 200,
        opacity : 0,
        afterReveal: (el) => {
          el.classList.add(styles.float);
        }
      });
    }
  }, []);

  return (
    <div className={styles.heroRight} ref={containerRef}>
      <div className={styles.cellWrap}>
        <div className={styles.hiveCell}>
          <span>Restro</span>
          <span>Management</span>
        </div>
      </div>

      <div className={styles.cellWrap}>
        <div className={styles.hiveCell}>
          <span>School</span>
          <span>Management</span>
        </div>
      </div>

      <div className={styles.cellWrap}>
        <div className={styles.hiveCell}>
          <span>Consultancy</span>
          <span>Management</span>
        </div>
      </div>
    </div>
  );
}
