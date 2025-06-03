import styles from './beeCell.module.css';
import { useEffect, useRef } from 'react';


export default function HeroRight() {

  useEffect(() => {
    if (window.ScrollReveal) {
      window.ScrollReveal().reveal(`.${styles.cellWrap}`, {
        distance: '100px',
        duration: 900,
        easing: 'ease',
        origin: 'right',
        interval: 200,
        opacity: 0,
        afterReveal: (el) => {
          el.classList.add(styles.float);
        }
      });
    }
  }, []);

  const cellFeatures = ['Web Development', 'Digital Marketing', 'Graphics Desgin'];

  return <div className={styles.cellContainer}>

    {
      cellFeatures.map((cell,index)=>{
        const [firstWord,secondWord] = cell.split(' ');
        return (
          <div key={index} className={`
          ${styles.cellWrap} 
          ${styles.cellWrapRight} 
          ${styles['cell-r' + (index + 1)]}
          `}>
            <div className={styles.hiveCell}>
              <span>{firstWord}</span>
              <span>{secondWord}</span>
            </div>
          </div>
        );
      })
    }

  </div>
}