import fs from 'fs';
import client from '../../client';
import bcrypt from 'bcrypt';
import { Resolvers } from '../../types';
import { protectedResolver } from '../users.utils';
import { ReadStream } from 'fs-capacitor';

interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(): ReadStream;
}

interface IEditProfile {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  avatar?: Promise<FileUpload>;
  bio?: string;
}

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (_, { avatar, ...edit }: Partial<IEditProfile>, context) => {
        const { filename, createReadStream } = (await avatar) || {};

        if (createReadStream) {
          const readStream = createReadStream();
          const writeStream = fs.createWriteStream(
            process.cwd() + '/uploads/' + filename
          );
          readStream.pipe(writeStream);
        }

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
