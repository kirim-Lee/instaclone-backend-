import { ResolverFn } from 'graphql-tools/dist/stitching/makeRemoteExecutableSchema';
import client from '../../client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface ILogin {
  username: string;
  password: string;
}

export default {
  Mutation: {
    login: async (_: ResolverFn, { username, password }: ILogin) => {
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
        const token = jwt.sign(
          { id: user.id },
          process.env.SECRET_KEY as string
        );

        return {
          ok: true,
          token,
        };
      } catch (e) {
        return e;
      }
    },
  },
};
