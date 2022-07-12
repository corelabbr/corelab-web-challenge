import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import express from 'express';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

import { typeDefs, resolvers } from './graphql';
import { dataSources, context } from './graphql/dataSources';

const PORT = process.env.PORT || 5000;

const startApolloServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    dataSources,
    csrfPrevention: true,

    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(graphqlUploadExpress());

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: true,
    },
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
};

startApolloServer();
