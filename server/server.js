const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

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
    // 1. Read existing subscribers
    let subscribers = [];
    if (fs.existsSync(subscribersFile)) {
      const data = fs.readFileSync(subscribersFile, 'utf8');
      subscribers = JSON.parse(data);
    }

    // 2. Avoid duplicate entries
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      fs.writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2));
    }

    // 3. Send confirmation email to the user
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
      html: `
        <h2>Thanks for signing up!</h2>
        <p>We're excited to launch soon. You’ll be the first to know when we go live 🚀</p>
        <p><small>If this wasn’t you, you can ignore this email.</small></p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Confirmation email sent and email stored.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to send email or store data.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
