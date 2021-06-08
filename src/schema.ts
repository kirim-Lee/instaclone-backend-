import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { getUser } from './users/users.utils';

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
      loggedUser: await getUser(req?.headers?.['x-jwt']),
    };
  },
};

export default schema;
