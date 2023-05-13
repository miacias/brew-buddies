import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $birthday: String!
    $profilePic: String
    $postalCode: String
    $intro: String
    $pronouns: String
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      birthday: $birthday
      profilePic: $profilePic
      postalCode: $postalCode
      intro: $intro
      pronouns: $pronouns
    ) {
      token
      user {
        _id
        username
        email
        password
        birthday
        intro
        postalCode
        profilePic
        pronouns
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser($input: UpdateUser!) {
    editUser(input: $input) {
      user {
        _id
        profilePic
        postalCode
        intro
        pronouns
      }
    }
  }
`;

export const ADD_FAV_BREWERY = gql`
  mutation addFavBrewery($breweryId: String!) {
    addFavBrewery(breweryId: $breweryId) {
      favBreweries
    }
  }
`;

export const REMOVE_FAV_BREWERY = gql`
  mutation removeFavBrewery($breweryId: String!) {
    removeFavBrewery(breweryId: $breweryId) {
      username
      favBreweries
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview(
    $starRating: String!
    $reviewText: String
    $breweryId: String
  ) {
    addReview(
      starRating: $starRating
      reviewText: $reviewText
      breweryId: $breweryId
    ) { 
      user {
        _id
      }
    }
  }
`;

export const EDIT_REVIEW = gql`
  mutation editReview($reviewId: ID!, $starRating: String, $reviewText: String) {
    editReview(
      reviewId: $reviewId
      starRating: $starRating
      reviewText: $reviewText
    ) {
      _id
      reviewText
      starRating
      reviewAuthor
      createdAt
      breweryId {
        _id
      }
    }
  }
`;

export const ADD_FRIEND = gql`
    mutation AddFriend($friendId: ID!) {
        addFriend(friendId: $friendId) {
        _id
        }
    }
`;

export const REMOVE_FRIEND = gql`
mutation RemoveFriend($friendId: ID!) {
    removeFriend(friendId: $friendId) {
      friendCount
    }
  }
`;
