const Author = require('./models/Author.model');

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
    }
  }
}

module.exports = resolvers;