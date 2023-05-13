const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    birthday: String!
    profilePic: String
    postalCode: String
    intro: String
    pronouns: String
    reviews: [Review]
    favBreweries: [String]
    wishBreweries: [Brewery]
    friends: [User]
    friendCount: Int
  }

  input UpdateUser {
    _id: ID
    profilePic: String
    postalCode: String
    intro: String
    pronouns: String
  }

  type Brewery {
    _id: ID
    breweryId: String!
    reviews: [Review]
    avgRating: Int
    reviewCount: Int
  }

  type Review {
    _id: ID
    reviewText: String
    starRating: String!
    reviewAuthor: String!
    createdAt: String
    breweryId: Brewery
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String): User
    me: User
    breweries: [Brewery]
    brewery(breweryId: String): Brewery
    reviews: [Review]
    review(breweryId: String): [Review]
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      profilePic: String
      birthday: String!
      postalCode: String
      intro: String
      pronouns: String
    ): Auth
    login(email: String!, password: String!): Auth
    editUser(input: UpdateUser!): Auth
    addReview(reviewText: String, starRating: String!, breweryId: String): Auth
    editReview(
      reviewId: ID!
      reviewText: String
      starRating: String!
      breweryId: String
    ): Review
    addFriend(friendId: ID!): User
    removeFriend(friendId: ID!): User
    addFavBrewery(breweryId: String!): User
    removeFavBrewery(breweryId: String!): User
    # addWishBrewery()
    # removeWishBrewery()
  }
`;

module.exports = typeDefs;
