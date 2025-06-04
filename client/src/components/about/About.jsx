import styles from './About.module.css';
import {useEffect} from 'react';


export default function About(){

    useEffect(()=>{
        if(window.ScrollReveal){
            ScrollReveal().reveal(`.${styles.aboutTitle}`, {
                duration: 800,
                origin: 'bottom',
                distance: '200px',
                opacity: 0,
                easing: 'ease',
                delay: 200,
                reset: false
            });

            ScrollReveal().reveal(`.${styles.aboutDesc}`, {
                duration: 800,
                origin: 'bottom',
                distance: '200px',
                opacity: 0,
                easing: 'ease',
                delay: 600,
                reset: false
            });
        }
    },[])

    return <div className={styles.aboutCont}>
        <div className={styles.aboutTitle}>
            Elevating Education, Hospitality &amp; Tourism
            through Automated SaaS Solutions.
        </div>
        <div className={styles.aboutDesc}>
        Our SaaS platform empowers organizations in education, hospitality, and tourism with smart, scalable solutions designed to simplify operations, enhance user experiences, and drive measurable growth. From streamlined workflows and real-time analytics to seamless integrations and automation, we provide industry-focused technology that adapts to your unique needs. Whether you're managing a campus, a hotel, or a tour operation, our platform delivers the efficiency, insight, and innovation you need to stay ahead.        </div>
    </div>
}