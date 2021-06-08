import client from '../../client';
import bcrypt from 'bcrypt';
interface IEditProfile {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export default {
  Mutation: {
    editProfile: async (_, edit: Partial<IEditProfile>) => {
      if (edit.password) {
        const uglyPassword = await bcrypt.hash(edit.password, 10);
        edit.password = uglyPassword;
      }
      try {
        const user = await client.user.update({ where: { id: 1 }, data: edit });
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
