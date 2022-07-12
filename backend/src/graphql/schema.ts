import { gql } from 'apollo-server';

export const typeDefs = gql`
  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Vehicle {
    id: ID!
    model: String!
    brand: String!
    color: String!
    price: Float!
    category: String!
    year: Int!
    rating: Float
    image: Upload!
  }
  type VehicleResponse {
    id: ID!
    model: String!
    brand: String!
    color: String!
    price: Float!
    category: String!
    year: Int!
    rating: Float
    image: String!
  }

  type Query {
    vehicles: [VehicleResponse!]
    vehicle(id: ID!): VehicleResponse
    getFavorites: [VehicleResponse!]
  }

  type Mutation {
    createVehicle(
      model: String!
      brand: String!
      color: String!
      price: Float!
      category: String!
      year: Int!
      rating: Float
      image: Upload!
    ): VehicleResponse
    updateVehicle(
      id: ID!
      model: String
      brand: String
      year: Int
      rating: Float
      color: String
      price: Float
      category: String
      image: Upload
    ): VehicleResponse
    deleteCar(id: ID!): VehicleResponse
  }
`;
