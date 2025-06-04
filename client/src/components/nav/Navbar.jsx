import styles from './Navbar.module.css'
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

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

    return  <div className={styles.navCont}>
    <div className={styles.navbar}>
        <NavLink to='/' className={styles.brandName}>SaaSyHive</NavLink>

        <div className={styles.navItemCont}>
            <NavLink to='/' className={styles.navItem}>Home</NavLink>
            <NavLink to='/about' className={styles.navItem}>About</NavLink>
            <NavLink to='/contact' className={styles.navItem}>Contact</NavLink>
        </div>
    </div>
    <div className={styles.spacer}></div>
    </div>
}