import styles from './HeroCenter.module.css';
import { useEffect, useRef, useState } from 'react';

export default function HeroCenter() {
  const heroBeeEle = useRef(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (window.ScrollReveal) {
      window.ScrollReveal().reveal(`.${styles.heroBee}`, {
        distance: '100px',
        duration: 900,
        easing: 'ease',
        origin: 'bottom',
        opacity: 0,
        scale: 0
      });

      window.ScrollReveal().reveal(`.${styles.centerTop}`, {
        duration: 2000,
        distance: '100px',
        easing: 'ease',
        opacity: 0
      });
    }
  }, []);

  const handleNotifyClick = async () => {
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    try {
      const response = await fetch('https://saasyhive.onrender.com/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const result = await response.json();

      if (response.ok) {
        alert('You have been successfully subscribed!');
        setEmail('');
      } else {
        alert(result.message || 'Something went wrong.');
      }
    } catch (error) {
      alert('Failed to send request.');
      console.error(error);
    }
  };

  return (
    <div className={styles.heroCenter}>
      <div className={styles.centerTop}>
        <div className={styles.heroText}>The Future Of SaaS is Hatching Soon</div>
        <p className={styles.notifyText}>Get Notified When We Launch...</p>

        <div className={styles.notifyInputCont}>
          <input
            className={styles.notifyInput}
            type="text"
            placeholder="Enter Your Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className={styles.notifyBtn} onClick={handleNotifyClick}>
            Notify Me
          </button>
        </div>
      </div>

      <div className={styles.centerBottom}>
        <div className={styles.heroBee} ref={heroBeeEle}></div>
      </div>
    </div>
  );
}
