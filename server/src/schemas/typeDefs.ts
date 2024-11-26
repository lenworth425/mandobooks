const typeDefs = `
  type Query {
    me: User
    }
    input addUserInput {
    username: String! 
    email: String! 
    password: String!
  }
    input BookInput {
    title: String!
    authors: [String!]
    description: String!
    bookId: String!
    image: String!
    link: String!
    }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(input: addUserInput ): Auth
    saveBook(input: BookInput ): User
    removeBook(bookId: ID!): User
    }

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int!
    savedBooks: [Book]
    }
   
  type Book {
    bookId: ID!
    author: [String!]
    description: String!
    title: String!
    image: String!
    link: String!
    }
    
  
  type Auth {
    token: String!
    user: User!
    }   
`;

export default typeDefs;