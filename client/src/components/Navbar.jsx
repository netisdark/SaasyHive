import styles from './Navbar.module.css'
import { useEffect, useRef, useState } from 'react';

export default function Navbar(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return <div className={styles.navbar}>
        <div className={styles.brandName}>SaaSyHive</div>

        {/* Hamburger Button */}
        <button className={styles.hamburger} onClick={toggleMenu}>
            <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.active : ''}`}></span>
            <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.active : ''}`}></span>
            <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.active : ''}`}></span>
        </button>

        {/* Desktop Navigation */}
        <div className={styles.navItemCont}>
            <div className={styles.navItem}>Products</div>
            <div className={styles.navItem}>About</div>
            <div className={styles.navItem}>Contact</div>
        </div>

        {/* Mobile Navigation */}
        <div className={`${styles.mobileNavCont} ${isMenuOpen ? styles.open : ''}`}>
            <div className={styles.mobileNavItem} onClick={toggleMenu}>Products</div>
            <div className={styles.mobileNavItem} onClick={toggleMenu}>About</div>
            <div className={styles.mobileNavItem} onClick={toggleMenu}>Contact</div>
        </div>
    </div>
}