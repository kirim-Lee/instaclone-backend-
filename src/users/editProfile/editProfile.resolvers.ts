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
        let avatarUrl: string = '';

        if (!context?.loggedInUser?.id) {
          return {
            ok: false,
            error: 'logged in user dont have id',
          };
        }

        if (avatar) {
          const { filename, createReadStream } = await avatar;
          const newFileName = `${
            context.loggedInUser.id
          }-${Date.now()}-${filename}`;

          const readStream = createReadStream();
          const writeStream = fs.createWriteStream(
            `${process.cwd()}/uploads/${newFileName}`
          );
          readStream.pipe(writeStream);

          avatarUrl = `http://localhost:4000/static/${newFileName}`;
        }

        if (edit.password) {
          const uglyPassword = await bcrypt.hash(edit.password, 10);
          edit.password = uglyPassword;
        }
        try {
          const user = await client.user.update({
            where: { id: context.loggedInUser.id },
            data: { ...edit, ...(avatarUrl && { avatar: avatarUrl }) },
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
