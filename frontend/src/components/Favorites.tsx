import { VehicleResponse } from '../graphql/models/Vehicle';
import { Rating } from './utils/Rating';
import { gql, useQuery } from '@apollo/client';

const GET_FAVORITES = gql`
  query {
    getFavorites {
      id
      image
      model
      rating
    }
  }
`;

export const Favorites = () => {
  const { data } = useQuery<{ getFavorites: VehicleResponse[] }>(GET_FAVORITES);

  return (
    <div className="favorites-container mx-3 py-3">
      <div className="container">
        <div className="title-container">
          <h2>Favorites</h2>
          <p>See our clients favorites of the year</p>
        </div>
        <div className="favorites">
          {data?.getFavorites.map((favorite, index) => (
            <div className="favorite" key={index}>
              <img src={favorite.image} alt="Vehicle" />
              <h4>{favorite.model}</h4>
              <Rating rating={favorite.rating} />
            </div>
          ))}
        </div>
        <button type="button">Show all Vehicles</button>
      </div>
    </div>
  );
};
