import styles from './Hero.module.css'
import HeroCenter from './HeroCenter'
import HeroLeft from './HeroLeft'
import HeroRight from './HeroRight'



export default function Hero(){
    return <div className={styles.hero}>
            <HeroLeft/>
            <HeroCenter/>
            <HeroRight/>
    </div>
}