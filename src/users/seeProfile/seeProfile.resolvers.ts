import { ResolverFn } from 'graphql-tools/dist/stitching/makeRemoteExecutableSchema';
import client from '../../client';

interface ISeeProfile {
  username: string;
}

export default {
  Query: {
    seeProfile: async (_: ThisType<ResolverFn>, { username }: ISeeProfile) => {
      try {
        const user = await client.user.findUnique({ where: { username } });
        if (!user) {
          throw Error('user is not exist');
        }
        return user;
      } catch (e) {
        return e;
      }
    },
  },
};
