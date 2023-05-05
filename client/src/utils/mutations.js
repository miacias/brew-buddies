import { gql } from '@apollo/client';

const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!, $birthdate: Date!, $image: String,, $city: String, $state: String, $intro: String, $pronouns: String) {
        addUser(username: $username, email: $email, password: $password, birthdate: $birthdate, image: $image, city: $city, state: $state, intro: $intro, pronouns: $pronouns) {
            token
        }
    }
`;

const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;

const EDIT_USER = gql`
    mutation editUser($username: String, $email: String, $password: String, $image: String, $city: String, $state: String, $intro: String, $pronouns: String) {
        editUser(username: $username, email: $email, password: $password, image: $image, city: $city, state: $state, intro: $intro, pronouns: $pronouns) {
            username
            email
            password
            image
            city
            state
            intro
            pronouns
        }
    }
`;