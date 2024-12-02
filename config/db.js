// db.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

let client;
let db;

const connectDB = async () => {
  try {
    client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db();
    console.log('MongoDB connected');
  } catch (error) {
    console.log('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit process if the connection fails
  }
};

const getDB = () => {
  if (!db) throw new Error('Database not connected');
  return db;
};

module.exports = { connectDB, getDB };
