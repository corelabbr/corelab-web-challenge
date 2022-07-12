import { gql } from '@apollo/client';

export const VehiclesQuery = gql`
  query getVehicles {
    vehicles {
      id
      model
      brand
      color
      price
      year
      rating
      category
    }
  }
`;
