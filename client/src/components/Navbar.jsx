import styles from './Navbar.module.css'
import { useEffect, useRef } from 'react';

export default function Navbar(){

    useEffect(() => {
        if (window.ScrollReveal) {
          window.ScrollReveal().reveal(`.${styles.brandName}`, {
            distance: '100px',
            duration: 900,
            easing: 'ease',
            origin : 'left',
            opacity : 0
          });

          window.ScrollReveal().reveal(`.${styles.navItemCont}`, {
            distance: '100px',
            duration: 900,
            easing: 'ease',
            origin : 'right',
            opacity : 0
          });
        }
      }, []);

    return <div className={styles.navbar}>
        <div className={styles.brandName}>SaaSyHive</div>

        <div className={styles.navItemCont}>
            <div className={styles.navItem}>Products</div>
            <div className={styles.navItem}>About</div>
            <div className={styles.navItem}>Contact</div>
        </div>
    </div>
}