const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = Schema({
  title: String,
  description: String,
  author: { type: Schema.Types.ObjectId, ref: 'Author' }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;