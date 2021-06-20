import { User } from '@prisma/client';
import client from '../client';
import { Context } from '../types';

export default {
  User: {
    totalFollowing: ({ id }: User): Promise<number> =>
      client.user.count({
        where: { followers: { some: { id } } },
      }),
    totalFollowers: ({ id }: User): Promise<number> =>
      client.user.count({
        where: { following: { some: { id } } },
      }),
    isMe: (root: User, _: any, context: Context): boolean => {
      return root.id === context?.loggedInUser?.id;
    },
  },
};
