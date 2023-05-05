import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
        }
    }
`;

export const ALL_USERS = gql`
    query allUsers {
        users {
            _id
            username
            pronouns
            birthdate
            friendCount
        }
    }
`;

export const GET_USER = gql`
    query oneUser {
        user {
            _id
            username
            image
            birthdate
            intro
            pronouns
        }
    }
`;

export const ALL_BREWERIES = gql`
    query allBreweries {
        breweries {
            _id
            breweryId
            reviews
            avgRating
            reviewCount
        }
    }
`;

export const GET_BREWERY = gql`
    query oneBrewery {
        brewery {
            _id
            breweryId
            reviews
        }
    }
`;

export const ALL_REVIEWS = gql`
`;