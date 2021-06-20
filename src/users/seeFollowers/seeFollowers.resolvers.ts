import client from '../../client';

interface ISeeFollowers {
  username: string;
  page: number;
}

export default {
  Query: {
    seeFollowers: async (_: any, { username, page }: ISeeFollowers) => {
      try {
        const user = await client.user.findUnique({
          where: { username },
          select: { id: true },
        });

        if (!user) {
          return {
            ok: false,
            error: 'user is not exist',
          };
        }

        const followers = await client.user
          .findUnique({
            where: { username },
          })
          .followers({ take: 5, skip: (page - 1) * 5 });

        const totalPages = Math.ceil(
          (await client.user.count({
            where: { following: { some: { username } } },
          })) / 5
        );

        return {
          ok: true,
          followers,
          totalPages,
        };
      } catch (e) {
        return e;
      }
    },
  },
};
