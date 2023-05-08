import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!, $birthday: String!) {
    addUser(username: $username, email: $email, password: $password, birthday: $birthday) {
      user {
        username
        email
        password
        birthday
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