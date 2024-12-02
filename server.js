const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const userRoutes = require('./routes/users');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());  // Parse JSON bodies

const uri = `mongodb+srv:${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uqi3nbn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Database connection
const url = 'mongodb://localhost:27017';
const dbName = 'userDatabase';
let db;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  })
  .catch(error => console.error(error));

// Use the user routes
app.use('/users', userRoutes(db));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
