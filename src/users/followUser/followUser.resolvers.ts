import client from '../../client';
import { protectedResolver } from '../users.utils';

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { username }, context) => {
      if (!context?.loggedInUser?.id) {
        return {
          ok: false,
          error: 'logged in user is not exist',
        };
      }
      try {
        const userToFollow = await client.user.findUnique({
          where: { username },
        });

        if (!userToFollow) {
          return {
            ok: false,
            error: 'user to follow is not exist',
          };
        }

        await client.user.update({
          where: {
            id: context!.loggedInUser!.id,
          },
          data: {
            following: {
              connect: {
                username,
              },
            },
          },
        });

        return {
          ok: true,
        };
      } catch (e) {
        return e;
      }
    }),
  },
};
