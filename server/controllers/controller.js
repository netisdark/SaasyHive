import { getDB } from '../config/db.js';
import { sendConfirmationEmail } from '../utils/email.js';
import { sendMessageMail } from '../utils/sendMessage.js';

export const handleNotify = async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    const db = getDB();
    const existing = await db.collection('subscribers').findOne({ email });

    if (!existing) {
      await db.collection('subscribers').insertOne({ email, subscribedAt: new Date() });
      console.log(`New subscriber added: ${email}`);
    } else {
      console.log(`Email already exists: ${email}`);
    }

    await sendConfirmationEmail(email);
    res.status(200).json({ message: 'Confirmation email sent.' });
  } catch (err) {
    console.error('Notify error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getSubscribers = async (req, res) => {
  try {
    const db = getDB();
    const subscribers = await db.collection('subscribers').find({}).toArray();
    res.status(200).json(subscribers);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch subscribers' });
  }
};

export const contact = async (req, res) => {
  const {email , namee, text} = req.body;
  try {
    const db = getDB();
    await db.collection('messages').insertOne({ namee, email, text,  At: new Date() });
    console.log('Message sent Succesfully!');

    await sendMessageMail(email, namee, text);
    res.status(200).json({ message: 'Mail sent Succedfully!' });
  }
  catch(err){
    console.error('Notify error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}