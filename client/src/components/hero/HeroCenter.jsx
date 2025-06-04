import styles from './HeroCenter.module.css';
import { useEffect } from 'react';

export default function HeroCenter() {

  useEffect(() => {
    if (window.ScrollReveal) {
      window.ScrollReveal().reveal(`.${styles.heroCenter}`, {
        duration: 1000,
        distance: '100px',
        easing: 'ease',
        opacity: 0
      });
    }
  }, []);

  return <div className={styles.heroCenter}>
    <div className={styles.heroText}>The Future Of SaaS is Hatching Soon</div>
    <p className={styles.notifyText}>Get Notified When We Launch...</p>

    <div className={styles.notifyInputCont}>
      <input className={styles.notifyInput} type="text" placeholder="Enter Your Email..." />
      <button className={styles.notifyBtn}>Notify Me</button>
    </div>
  </div>
}