import { gql } from '@apollo/client';

export const GET_ME = gql`
query me {
    me {
        _id
        username
        email
        password
        birthday
        profilePic
        postalCode
        intro
        pronouns
        reviews {
        _id
        reviewText
        starRating
        reviewAuthor
        createdAt
        breweryId {
            _id
        }
        }
        favBreweries
    }
}`


export const ALL_USERS = gql`
    query allUsers {
        users {
            _id
            username
            email
            password
            birthday
            friendCount
            intro
            postalCode
            profilePic
            pronouns
        }
    }
`;

export const GET_USER = gql`
query getUser($username: String) {
    user(username: $username) {
      username
      email
      password
      birthday
      profilePic
      postalCode
      intro
      pronouns
      favBreweries
    }
  }
`;
export const ALL_BREWERIES = gql`
    query allBreweries {
        breweries {
            _id
            breweryId
            reviews {
                starRating
            }
            avgRating
            reviewCount
        }
    }
`;

// Apollo error when data is empty: Cannot destructure property 'breweryId' of 'undefined' as it is undefined.
export const GET_BREWERY = gql`
    query oneBrewery {
        brewery {
            _id
            breweryId
            reviews {
              reviewText
              starRating
              reviewAuthor
              createdAt
            }
            avgRating
            reviewCount
        }
    }
`;

export const ALL_REVIEWS = gql`
    query allReviews {
        reviews {
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

export const BREWERY_REVIEW = gql`
    query Review($breweryId: String) {
        review(breweryId: $breweryId) {
            _id
            reviewAuthor
            createdAt
            reviewText
            starRating
        }
    }
`;