import client from '../../client';
import bcrypt from 'bcrypt';
import { ResolverFn } from 'graphql-tools/dist/stitching/makeRemoteExecutableSchema';
import { IUser } from '../users.typeDefs';
interface IEditProfile {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export default {
  Mutation: {
    editProfile: async (
      _: ResolverFn,
      edit: Partial<IEditProfile>,
      { loggedUser }: { loggedUser: IUser }
    ) => {
      if (!loggedUser) {
        return {
          ok: false,
          error: 'couln`t edit profile, login before',
        };
      }

      if (edit.password) {
        const uglyPassword = await bcrypt.hash(edit.password, 10);
        edit.password = uglyPassword;
      }
      try {
        const user = await client.user.update({
          where: { id: loggedUser.id },
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
    },
  },
};
