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
        friendCount
        }
    }
`;