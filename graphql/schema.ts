import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type User {
    id: Int!
    username: String!
    email: String!
  }

  type Order {
    id: Int!
    name: String!
    user_id: Int!
    order_date: String!
    total_amount: Int!
  }

  type Query {
    users: [User!]!
    user(user_id: Int!): User
    userOrders(user_id: Int!): [Order!]!
  }

  type Mutation {
    createUser(username: String!, email: String!): User!
    createOrder(user_id: Int!, name: String!, order_date: String!, total_amount: Int!): Order!
  }
`)
