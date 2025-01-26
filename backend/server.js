const express = require('express');
const mongoose = require('mongoose');
const Question = require('./models/Question');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error'));
db.once('open', () => {
  console.log('connected to MongoDB');
});

app.post('/find', async (req, res) => {
  const query = req.body.query;
  try {
    const questions = await Question.find({
      $or: [
        { title: new RegExp(query, 'i') },
        { 'blocks.text': new RegExp(query, 'i') },
        { solution: new RegExp(query, 'i') },
      ],
    });
    console.log('results:', questions); 
    res.json({ questions });
  } catch (error) {
    res.status(500).send({ error: 'Not Found' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
