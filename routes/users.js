const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();

// Create a new user
router.post('/adduser', async (req, res) => {
  const { name, email, age } = req.body;
  const newUser = { name, email, age };
  const result = await db.collection('users').insertOne(newUser);
  res.status(201).json(result.ops[0]);
});

// Get all users
router.get('/', async (req, res) => {
  const users = await db.collection('users').find().toArray();
  res.status(200).json(users);
});

// Get a single user
router.get('/:id', async (req, res) => {
  const user = await db.collection('users').findOne({ _id: ObjectId(req.params.id) });
  res.status(200).json(user);
});

// Update a user
router.put('/:id', async (req, res) => {
  const updatedUser = req.body;
  const result = await db.collection('users').updateOne(
    { _id: ObjectId(req.params.id) },
    { $set: updatedUser }
  );
  res.status(200).json(result);
});

// Delete a user
router.delete('/:id', async (req, res) => {
  const result = await db.collection('users').deleteOne({ _id: ObjectId(req.params.id) });
  res.status(200).json(result);
});

module.exports = (db) => router;
