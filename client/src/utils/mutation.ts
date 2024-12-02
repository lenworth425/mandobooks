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
    mutation addUser($input: addUserInput!) {
        addUser(input: $input) {
        user {
            _id
            username
            email
        }
        token
        }
  }
`;

export const SAVE_BOOK = gql`
  mutation SaveBook($input: BookInput) {
  saveBook(input: $input) {
    email
    username
    savedBooks {
      bookId
      authors
      description
      title
      image
      link
    }
  }
}
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId){
    email
    username
    savedBooks {
      bookId
      authors
      description
      title
      image
      link
      }
    }
  }
`;

