import { ResolverFn } from 'graphql-tools/dist/stitching/makeRemoteExecutableSchema';
import client from '../client';
import bcrypt from 'bcrypt';

interface ICreateAccount {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

interface ILogin {
  username: string;
  password: string;
}

export default {
  Mutation: {
    createAccount: async (
      _: ThisType<ResolverFn>,
      { firstName, lastName, username, email, password }: ICreateAccount
    ) => {
      try {
        // check duplicated email or username
        const existingUser = await client.user.findFirst({
          where: { OR: [{ username }, { email }] },
        });

        if (existingUser) {
          throw new Error('this email or username is already taken');
        }

        // hash password
        const uglyPassword = await bcrypt.hash(password, 10);

        // save and return user
        return await client.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: uglyPassword,
          },
        });
      } catch (e) {
        return e;
      }
    },
    login: async (_: ThisType<ResolverFn>, { username, password }: ILogin) => {
      try {
        //find use with args.username
        const user = await client.user.findFirst({ where: { username } });

        if (!user) {
          return {
            ok: false,
            error: 'User is not exist',
          };
        }

        // check password with args.password
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
          return {
            ok: false,
            error: 'password is not correct',
          };
        }
        // issue a token and send it to user
        return {
          ok: true,
        };
      } catch (e) {
        return e;
      }
    },
  },
};
