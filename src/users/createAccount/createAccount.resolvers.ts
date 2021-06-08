import { ResolverFn } from 'graphql-tools/dist/stitching/makeRemoteExecutableSchema';
import client from '../../client';
import bcrypt from 'bcrypt';

interface ICreateAccount {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export default {
  Mutation: {
    createAccount: async (
      _: ResolverFn,
      { firstName, lastName, username, email, password }: ICreateAccount
    ) => {
      try {
        // check duplicated email or username
        const existingUser = await client.user.findFirst({
          where: { OR: [{ username }, { email }] },
        });

        if (existingUser) {
          return {
            ok: false,
            error: 'this email or username is already taken',
          };
        }

        // hash password
        const uglyPassword = await bcrypt.hash(password, 10);

        // save and return user
        await client.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: uglyPassword,
          },
        });

        return {
          ok: true,
        };
      } catch (e) {
        return e;
      }
    },
  },
};
