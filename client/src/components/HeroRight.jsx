import styles from './HeroRight.module.css';
import { useEffect, useRef } from 'react';


export default function HeroRight(){

    useEffect(() => {
        if (window.ScrollReveal) {
          window.ScrollReveal().reveal(`.${styles.cellWrap}`, {
            distance: '100px',
            duration: 900,
            easing: 'ease',
            origin : 'right',
            interval: 200,
            opacity : 0,
            afterReveal: (el) => {
              el.classList.add(styles.float);
            }
          });
        }
      }, []);

    return <div className={styles.heroRight}>
              <div className={styles.cellWrap}>
        <div className={styles.hiveCell}>
          <span>Web</span>
          <span>Development</span>
        </div>
      </div>

      <div className={styles.cellWrap}>
        <div className={styles.hiveCell}>
          <span>Digital</span>
          <span>Marketing</span>
        </div>
      </div>
    </div>
}