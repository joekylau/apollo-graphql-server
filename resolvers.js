const Author = require('./models/Author.model');
const Book = require('./models/Book.model');

const resolvers = {
  Query: {
    hello: () => {
      return 'Hello World'
    },
    authors: async () => {
      return await Author.find();
    }
  },
  Mutation: {
    addAuthor: async (parent, args, context, info) => {
      const author = new Author(args.author);
      await author.save();

      return author;
    },
    addBook: async (parent, args, context, info) => {
      // Create book
      const book = new Book(args.book);
      book.author = args.book.authorId;
      await book.save();

      // Update author's books reference
      const author = await Author.findById(args.book.authorId);
      author.books.push(book);
      await author.save();

      return book;
    }
  },
  Author: {
    books: async (parent, args, context, info) => {
      const author = await parent.populate('books');
      return author.books;
    }
  },
  Book: {
    author: async (parent, args, context, info) => {
      const book = await parent.populate('author');
      return book.author;
    }
  }
}

module.exports = resolvers;
