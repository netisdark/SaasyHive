import styles from './beeCell.module.css'
import { useEffect, useRef } from 'react';

export default function HeroRight() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.ScrollReveal) {
      window.ScrollReveal().reveal(`.${styles.cellWrap}`, {
        distance: '100px',
        duration: 900,
        easing: 'ease',
        origin: 'left',
        interval: 200,
        opacity: 0,
        afterReveal: (el) => {
          el.classList.add(styles.float);
        }
      });
    }
  }, []);

  let cellFeatures = ['Restro Management', 'School Management', 'Consultancy Management'];

  return (
    <div className={styles.cellContainer} ref={containerRef}>
      {cellFeatures.map((cell, index) => {
        const [firstWord, secondWord] = cell.split(' ');
        return (
          <div key={index} className={`
      ${styles.cellWrap} 
      ${styles['cell-l' + (index + 1)]}
      `}>
            <div className={styles.hiveCell}>
              <span>{firstWord}</span>
              <span>{secondWord}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
