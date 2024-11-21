import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_USER = gql`
    mutation signup($input: SignupInput!) {
        signup(input: $input) {
        user {
            _id
            username
            email
        }
        token
        }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($id: ID!, $input: BookInput!) {
    updateBook(id: $id, input: $input) {
      id
      title
      author
      description
      link
      image
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($id: ID!) {
    deleteBook(id: $id)
  }
`;

