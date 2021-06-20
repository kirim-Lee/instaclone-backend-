import client from '../../client';

interface ISeeFollowing {
  username: string;
  lastId?: number;
}
export default {
  Query: {
    seeFollowing: async (_: any, { username, lastId }: ISeeFollowing) => {
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

        const following = await client.user
          .findUnique({ where: { username } })
          .following({
            take: 5,
            ...(lastId && { cursor: { id: lastId }, skip: 1 }),
          });

        return {
          ok: true,
          following,
        };
      } catch (e) {
        return e;
      }
    },
  },
};
