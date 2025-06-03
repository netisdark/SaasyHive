import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

dotenv.config();

// Debug: Check if environment variables are loaded
console.log('Environment variables check:');
console.log('MONGODB_URL:', process.env.MONGODB_URL ? 'Found' : 'Not found');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Found' : 'Not found');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Found' : 'Not found');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
let db;
const connectToMongoDB = async () => {
  try {
    // Check if MONGODB_URL is defined
    if (!process.env.MONGODB_URL) {
      throw new Error('MONGODB_URL environment variable is not defined. Please check your .env file.');
    }
    
    console.log('Attempting to connect to MongoDB...');
    
    const client = new MongoClient(process.env.MONGODB_URL);
    await client.connect();
    
    // Test the connection
    await client.db("admin").command({ ping: 1 });
    
    db = client.db('SaasyHive'); // Explicitly specify database name
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    console.error('Connection string format should be: mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority');
    process.exit(1);
  }
};

app.post('/api/notify', async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    // Check if email already exists in MongoDB
    const existingSubscriber = await db.collection('subscribers').findOne({ email: email });
    
    if (!existingSubscriber) {
      // Add new subscriber to MongoDB
      await db.collection('subscribers').insertOne({ 
        email: email,
        subscribedAt: new Date()
      });
      console.log(`New subscriber added: ${email}`);
    } else {
      console.log(`Email already exists: ${email}`);
    }

    // Send confirmation email
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
      subject: "🎉 You're on the List!",
      html: "<h2>Thanks for signing up!</h2><p>We'll notify you at launch 🚀</p>"
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Confirmation email sent.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to process request.' });
  }
});

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Updated subscribers endpoint to fetch from MongoDB
app.get('/server/subscribers', async (req, res) => {
  try {
    const subscribers = await db.collection('subscribers').find({}).toArray();
    res.status(200).json(subscribers);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({ message: 'Failed to fetch subscribers.' });
  }
});

// Initialize MongoDB connection and start server
const startServer = async () => {
  await connectToMongoDB();
  app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
  });
};

startServer();