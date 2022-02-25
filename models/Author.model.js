const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorSchema = Schema({
  name: String,
  age: Number,
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;