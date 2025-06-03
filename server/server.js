import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import fs from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const subscribersFile = path.join(__dirname, 'subscribers.json');

app.post('/api/notify', async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    let subscribers = [];
    if (fs.existsSync(subscribersFile)) {
      const data = fs.readFileSync(subscribersFile, 'utf8');
      subscribers = JSON.parse(data);
    }

    if (!subscribers.includes(email)) {
      subscribers.push(email);
      fs.writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2));
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"SaasyHIVE" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🎉 You’re on the List!',
      html: `<h2>Thanks for signing up!</h2><p>We’ll notify you at launch 🚀</p>`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Confirmation email sent.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});
