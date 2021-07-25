import { protectedResolver } from '../../users/users.utils';

export default {
  Mutation: {
    uploadPhoto: protectedResolver(async (_, { file, caption }, context) => {
      if (caption) {
        // parse caption
        // get or create hash tags
      }
      // save the photo with the parsed hash tags
      // add the photo to the hash tags
    }),
  },
};
