import { User } from '@prisma/client';
import client from '../client';

export default {
  User: {
    totalFollowing: ({ id }: User) =>
      client.user.count({
        where: { followers: { some: { id } } },
      }),
    totalFollowers: ({ id }: User) =>
      client.user.count({
        where: { following: { some: { id } } },
      }),
  },
};
