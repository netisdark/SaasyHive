import { MongoClient } from 'mongodb';

let db;

export const connectToMongoDB = async () => {
  const url = process.env.MONGODB_URL;
  if (!url) throw new Error("MONGODB_URL is missing");

  const client = new MongoClient(url);
  await client.connect();
  db = client.db('SaasyHive');
  console.log('Connected to MongoDB');
};

export const getDB = () => {
  if (!db) throw new Error('DB not initialized');
  return db;
};
