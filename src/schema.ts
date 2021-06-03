import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

const loadTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);

const typeDefs = mergeTypeDefs(loadTypes);
const resolvers = mergeResolvers(loadedResolvers);

const schema = { typeDefs, resolvers };

export default schema;
