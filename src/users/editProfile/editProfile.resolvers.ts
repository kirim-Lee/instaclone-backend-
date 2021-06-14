import client from '../../client';
import bcrypt from 'bcrypt';
import { ResolverFn } from 'graphql-tools/dist/stitching/makeRemoteExecutableSchema';
import { IUser } from '../users.typeDefs';
import { Resolvers } from '../../types';
import { protectedResolver } from '../users.utils';
interface IEditProfile {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
}

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (_, { avatar, ...edit }: Partial<IEditProfile>, context) => {
        if (!context?.loggedInUser?.id) {
          return {
            ok: false,
            error: 'logged in user dont have id',
          };
        }

        if (edit.password) {
          const uglyPassword = await bcrypt.hash(edit.password, 10);
          edit.password = uglyPassword;
        }
        try {
          const user = await client.user.update({
            where: { id: context.loggedInUser.id },
            data: edit,
          });
          if (user.id) {
            return {
              ok: true,
            };
          } else {
            return {
              ok: false,
              error: 'something is wrong so couln`t update',
            };
          }
        } catch (e) {
          return e;
        }
      }
    ),
  },
};

export default resolvers;
