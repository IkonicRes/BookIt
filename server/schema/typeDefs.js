const typeDefs = `#graphql
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Book {
    bookId: ID!
    title: String!
    author: String!
    description: String!
  }

  type Auth {
    token: String!
    user: User!
  }

  # Define your queries and mutations here
  type Query {
    me: User
    getSavedBooks: [Book]  # Add this line to your schema
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    signup(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
  }

  input BookInput {
    bookId: ID!
    title: String!
    author: String!
    description: String!
  }
`
module.exports = typeDefs