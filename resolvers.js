const { Author, Book } = require('./models');

const resolvers = {
  Query: {
    hello: () => {
      return 'Hello World'
    },
    authors: async () => {
      return await Author.find();
    },
    books: async () => {
      return await Book.find();
    }
  },
  Mutation: {
    addAuthor: async (parent, args, context, info) => {
      // Create author
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
    },
    deleteAuthor: async (parent, args, context, info) => {
      // Delete author
      await Author.findByIdAndDelete(args.id);
      return args.id;
    },
    deleteBook: async (parent, args, context, info) => {
      // Delete book
      await Book.findByIdAndDelete(args.id);
      return args.id;
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
