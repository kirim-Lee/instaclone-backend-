import client from '../client';
import jwt from 'jsonwebtoken';

export const getUser = async (token: string | undefined) => {
  try {
    if (!token) {
      return null;
    }

    const { id } = (await jwt.verify(
      token,
      process.env.SECRET_KEY as string
    )) as any;

    const user = await client.user.findUnique({
      where: { id },
    });

    if (user) {
      return user;
    }
    return null;
  } catch {
    return null;
  }
};
