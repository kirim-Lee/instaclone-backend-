import { gql } from 'apollo-server';

export interface IUser {
  id: number;
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    bio: String
    avatar: String
    following: [User]
    followers: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    isFollowing: Boolean!
    isMe: Boolean!
  }
`;
