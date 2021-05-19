import client from '../client';

export default {
  Mutation: {
    createMovie: async (_: any, { title, year, genre }: any) =>
      await client.movie.create({ data: { title, year, genre } }),
    deleteMovie: (_: any, { id }: any) =>
      client.movie.delete({ where: { id } }),
    updateMovie: (_: any, { id, year }: any) =>
      client.movie.update({ where: { id }, data: { year } }),
  },
};
