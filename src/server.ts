import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';

const PORT = process.env.PORT;

const app = express();
const server = new ApolloServer(schema);

server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
});
