const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    age: Int!
  }

  type Query {
    hello: String
    authors: [Author]
  }

  input AuthorInput {
    name: String!
    age: Int!
  }

  type Mutation {
    addAuthor(author: AuthorInput): Author
  }
`;

module.exports = typeDefs;