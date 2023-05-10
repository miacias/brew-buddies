import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!, $birthday: String!, $profilePic: String, $postalCode: String, $intro: String, $pronouns: String) {
        addUser(username: $username, email: $email, password: $password, birthday: $birthday profilePic: $profilePic, postalCode: $postalCode, intro: $intro, pronouns: $pronouns) {
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

// error "context is not defined"
export const EDIT_USER = gql`
    mutation editUser($username: String, $email: String, $password: String, $profilePic: String, $postalCode: Int, $intro: String, $pronouns: String) {
        editUser(username: $username, email: $email, password: $password, profilePic: $profilePic, postalCode: $postalCode, intro: $intro, pronouns: $pronouns) {
            user {
                _id
                username
                email
                password
                friendCount
                intro
                postalCode
                profilePic
                pronouns
            }
        }
    }
`;

export const ADD_FAV_BREWERY = gql`
    mutation addFavBrewery($id: ID!, $breweryId: String!) {
        addFavBrewery(_id: $id, breweryId: $breweryId) {
            _id
        favBreweries {
            _id
        }
        }
    }
`;

export const REMOVE_FAV_BREWERY = gql`
    mutation removeFavBrewery($id: ID!, $breweryId: String!) {
        removeFavBrewery(_id: $id, breweryId: $breweryId) {
            _id
        }
    }
`;

// export const ADD_REVIEW = gql`

// `;
