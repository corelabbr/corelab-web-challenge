import { gql, useQuery } from '@apollo/client';
import { Vehicle, VehicleResponse } from '../graphql/models/Vehicle';

const GET_RECOMMENDED = gql`
  query {
    vehicles {
      id
      model
      color
      price
      year
      rating
      image
    }
  }
`;

export const Recommended = () => {
  const { data, loading } = useQuery<{ vehicles: VehicleResponse[] }>(
    GET_RECOMMENDED
  );

  return (
    <div className="recommended-container">
      <div className="container mx-3 py-3">
        <div className="title-container">
          <h2>Recommended for you</h2>
        </div>
        <div className="recommended-list-container">
          {loading ? (
            <h2>Carregando...</h2>
          ) : (
            data?.vehicles.slice(0, 4).map((recommended, index) => (
              <div className="recommended" key={index}>
                <img src={recommended.image} alt="vehicle" />
                <h4>{recommended.model}</h4>
              </div>
            ))
          )}
        </div>
        <button>Show All</button>
      </div>
    </div>
  );
};
