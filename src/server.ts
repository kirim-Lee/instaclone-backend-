import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

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
    movie(title: String): Movie
  }

  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    deleteMovie(title: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: ({ title }: any) => client.movie.findUnique({ where: title }),
  },

  Mutation: {
    createMovie: async (_: any, { title, year, genre }: any) => {
      const movie = await client.movie.create({ data: { title, year, genre } });
      return movie;
    },
    deleteMovie: (_: any, args: any) => {
      console.log(args);
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`server is running ${url}`));
