import { gql } from '@apollo/client';

export const GET_ME = gql`
query me {
    me {
      username
      email
      password
      birthday
      profilePic
      postalCode
      intro
      pronouns
      reviews {
        reviewText
        starRating
        reviewAuthor
        createdAt
        breweryId {
          breweryId
        }
      }
      favBreweries {
        breweryId
      }
      wishBreweries {
        breweryId
      }
      friends {
        _id
      }
      friendCount
    }
  }
`;

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
    query oneUser($username: String) {
        user(username: $username) {
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