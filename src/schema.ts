import movieTypeDefs from './movies/movies.typeDefs';
import movieQueries from './movies/movies.queries';
import movieMutations from './movies/movies.mutations';

export const typeDefs = movieTypeDefs;
export const resolvers = { ...movieQueries, ...movieMutations };
