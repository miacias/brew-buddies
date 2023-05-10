const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    birthday: String!
    profilePic: String
    postalCode: Int
    intro: String
    pronouns: String
    reviews: [Review]
    favBreweries: [Brewery]
    wishBreweries: [Brewery]
    friends: [User]
    friendCount: Int
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
    starRating: Int!
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
    editUser(
      username: String
      email: String
      password: String
      profilePic: String
      postalCode: Int
      intro: String
      pronouns: String
    ): Auth
    addReview(reviewText: String, starRating: Int!, breweryId: String): Auth
    editReview(
      reviewId: ID!
      reviewText: String
      starRating: Int
      breweryId: String
    ): Review
    # addFriend(): User
    # removeFriend(): User
    addFavBrewery(_id: ID!, breweryId: String!): User
    removeFavBrewery(_id: ID!, breweryId: String!): User
    # addWishBrewery()
    # removeWishBrewery()
  }
`;

module.exports = typeDefs;
