const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });

  await server.start();
  server.applyMiddleware({ app });

  // connect to mongoDB
  await mongoose.connect('mongodb+srv://joelau:8pqGMxKP6v7BZeeg@cluster0.trgl2.mongodb.net/storedb?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  await new Promise(resolve => httpServer.listen({ port : 4000 }, resolve));
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
