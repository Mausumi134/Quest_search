const express = require('express');
const mongoose = require('mongoose');
const Question = require('./models/Question');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
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
    console.log('Search Results:', questions); 
    res.json({ questions });
  } catch (error) {
    res.status(500).send({ error: 'Error searching for questions' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
