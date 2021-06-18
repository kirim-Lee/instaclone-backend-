import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';

const PORT = process.env.PORT;

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer(schema);

  await server.start();

  server.applyMiddleware({ app });

  app.listen(PORT);
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  return { server, app };
}

startApolloServer();
