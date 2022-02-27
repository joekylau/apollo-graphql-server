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
    author(id: ID!): Author
    authors: [Author]
    books: [Book]
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
    deleteAuthor(id: ID): ID
    deleteBook(id: ID): ID
    updateAuthor(id: ID, author: AuthorInput): Author
    updateBook(id: ID, book: BookInput): Book
  }
`;

module.exports = typeDefs;
