import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import logger from 'morgan';

const PORT = process.env.PORT;

const app = express();
const apollo = new ApolloServer(schema);

app.use(logger('tiny'));

app.use('/static', express.static('uploads'));

apollo.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`
  );
});
