import styles from './Contact.module.css';


export default function Contact(){
       return <div className={styles.contactCont}>

       <div className={styles.contactBox}>
           <div className={styles.queryTitle}>Send us your query</div>
                    <input type="text" placeholder = "Enter your name"/>
                    <input type="email" placeholder="Enter your email"/>
                    <textarea placeholder="Let us know how can we help..."></textarea>
                    <button>Send Message</button>
            </div>
         </div>
}