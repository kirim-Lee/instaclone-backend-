import { ApolloServer, gql } from 'apollo-server';
import client from './client';

const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    year: Int!
    genre: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }

  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    deleteMovie(id: Int!): Movie
    updateMovie(id: Int!, year: Int!): Movie
  }
`;

const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_: any, { id }: any) => client.movie.findUnique({ where: { id } }),
  },

  Mutation: {
    createMovie: async (_: any, { title, year, genre }: any) =>
      await client.movie.create({ data: { title, year, genre } }),
    deleteMovie: (_: any, { id }: any) =>
      client.movie.delete({ where: { id } }),
    updateMovie: (_: any, { id, year }: any) =>
      client.movie.update({ where: { id }, data: { year } }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`server is running ${url}`));
