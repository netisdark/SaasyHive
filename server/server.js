import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { connectToMongoDB } from './config/db.js';
import subscriberRoutes from './routes/routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS for Azure deployment
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routes
app.use('/api', subscriberRoutes);

// Health check endpoint for Azure
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Backend API is running', version: '1.0.0' });
});

const startServer = async () => {
  await connectToMongoDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
