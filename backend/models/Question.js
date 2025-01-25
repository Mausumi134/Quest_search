const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
  text: String,
  showInOption: Boolean,
  isAnswer: Boolean
});

const questionSchema = new mongoose.Schema({
  title: String,
  type: String,
  anagramType: String,
  blocks: [blockSchema],
  solution: String,
  siblingId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Question', questionSchema);
