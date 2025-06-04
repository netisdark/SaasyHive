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

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', subscriberRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get(/^\/(?!api|server).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const startServer = async () => {
  await connectToMongoDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
