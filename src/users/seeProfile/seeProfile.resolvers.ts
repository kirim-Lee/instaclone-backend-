import { ResolverFn } from 'graphql-tools/dist/stitching/makeRemoteExecutableSchema';
import { Resolvers } from '../../types';
import { protectedResolver } from '../users.utils';

interface ISeeProfile {
  username: string;
}

const resolvers: Resolvers = {
  Query: {
    seeProfile: protectedResolver(
      (_: ThisType<ResolverFn>, { username }: ISeeProfile, context) => {
        try {
          const user = context?.client.user.findUnique({
            where: { username },
          });
          if (!user) {
            throw Error('user is not exist');
          }
          return user;
        } catch (e) {
          return e;
        }
      }
    ),
  },
};

export default resolvers;
