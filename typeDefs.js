const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    age: Int!
    books: [Book]
  }

  type Book {
    id: ID!
    title: String!
    price: Float!
    author: Author
  }

  type Query {
    hello: String
    authors: [Author]
  }

  input AuthorInput {
    name: String!
    age: Int!
  }

  input BookInput {
    title: String!
    price: Float!
    authorId: ID!
  }

  type Mutation {
    addAuthor(author: AuthorInput): Author
    addBook(book: BookInput): Book
  }
`;

module.exports = typeDefs;
