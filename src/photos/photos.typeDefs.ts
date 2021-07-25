import { gql } from 'apollo-server-express';

export default gql`
  type Photo {
    id: Number!
    use: User
    file: String!
    caption: String
    hashtags: [HashTag]
    createAt: String!
    updatedAt: String!
  }

  type HashTag {
    id: Number!
    hashtag: String!
    photos: [Photo]
    createdAt: String!
    updatedAt: String!
  }
`;
