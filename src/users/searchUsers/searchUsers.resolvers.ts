import client from '../../client';

interface ISearchUsers {
  keyword: string;
  page?: number;
}
export default {
  Query: {
    searchUsers: async (_: any, { keyword, page }: ISearchUsers) => {
      try {
        if (keyword.length < 2) {
          return {
            ok: false,
            error: 'keyword is more than 2 characters',
          };
        }

        const users = await client.user.findMany({
          where: { username: { startsWith: keyword.toLowerCase() } },
          take: 10,
          skip: ((page ?? 1) - 1) * 5,
        });

        return {
          ok: true,
          users,
        };
      } catch (e) {
        return e;
      }
    },
  },
};
