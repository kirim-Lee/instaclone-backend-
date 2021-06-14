import { PrismaClient, User } from '@prisma/client';
import { GraphQLResolveInfo } from 'graphql';

type Context = {
  loggedInUser?: User;
  client: PrismaClient;
};

export type Resolver = (
  root: any,
  args?: any,
  context?: Context,
  info?: GraphQLResolveInfo | any
) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};
