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
mutation editUser($input: UpdateUser!) {
    editUser(input: $input) {
      user {
        profilePic
        postalCode
        intro
        pronouns
      }
    }
  }
`;