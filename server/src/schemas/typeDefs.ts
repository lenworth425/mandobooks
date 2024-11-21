const typeDefs = `
  type Query {
    me: User
    }
    
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookId: ID!): User
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