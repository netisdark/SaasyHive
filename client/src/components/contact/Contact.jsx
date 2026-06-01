import { useState } from 'react';
import styles from './Contact.module.css';
import { contactApi } from '../../utils/api';



export default function Contact(){


    const [namee, setName] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');


    const handleContact = async () => {
    try {
      await contactApi(namee, email, text);
      alert('Message Sent!');
      setEmail('');
    } catch (error) {
      alert(error.message || 'Failed to send Message.');
      console.error(error);
    }
  };

       return <div className={styles.contactCont}>

       <div className={styles.contactBox}>
           <div className={styles.queryTitle}>Send us your query</div>
                    <input value={namee} onChange={(e) => setName(e.target.value)} type="text" placeholder = "Enter your name" required/>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" required/>
                    <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Let us know how can we help..." required></textarea>
                    <button onClick={handleContact}>Send Message</button>
            </div>
         </div>
}