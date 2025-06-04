import styles from './HeroCenter.module.css';
import { useEffect, useState } from 'react';

export default function HeroCenter() {

  const [email, setEmail] = useState('');

  const handleNotifyClick = async () => {
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    try {
      const response = await fetch('https://localhost:5000/api/notify', {
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
    <input
            id="email"
            className={styles.notifyInput}
            type="text"
            placeholder="Enter Your Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleNotifyClick} className={styles.notifyBtn}>Notify Me</button>
        </div>
  </div>
}

