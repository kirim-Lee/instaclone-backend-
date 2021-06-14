import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import client from './client';
import { getUser, protectedResolver } from './users/users.utils';

const loadTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);

const typeDefs = mergeTypeDefs(loadTypes);
const resolvers = mergeResolvers(loadedResolvers);

// ContextFunction<ExpressContext, Context> | Context
const schema = {
  typeDefs,
  resolvers,
  context: async ({ req }: any): Promise<object> => {
    return {
      loggedInUser: await getUser(req?.headers?.['x-jwt']),
      client,
      protectedResolver,
    };
  },
};

export default schema;
