import { gql } from '@apollo/client';

const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!, $profilePic: String, $birthdate: String!, $postalCode: Int, $intro: String, $pronouns: String) {
        addUser(username: $username, email: $email, password: $password, profilePic: $profilePic, birthdate: $birthdate, postalCode: $postalCode, intro: $intro, pronouns: $pronouns) {
            token
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
const EDIT_USER = gql`
    mutation editUser($username: String, $email: String, $password: String, $profilePic: String, $postalCode: Int, $intro: String, $pronouns: String) {
        editUser(username: $username, email: $email, password: $password, profilePic: $profilePic, postalCode: $postalCode, intro: $intro, pronouns: $pronouns) {
            token
            user {
                _id
                username
                email
                password
            }
        }
    }
`;