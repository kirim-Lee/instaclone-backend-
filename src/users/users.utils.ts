import client from '../client';
import jwt from 'jsonwebtoken';
import { GraphQLResolveInfo } from 'graphql';
import { Resolver } from '../types';

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

export const protectedResolver =
  (resolver: Resolver) =>
  (root: any, args?: any, context?: any, info?: GraphQLResolveInfo | any) => {
    if (!context.loggedInUser) {
      return { ok: false, error: 'pls login' };
    }
    return resolver(root, args, context, info);
  };
