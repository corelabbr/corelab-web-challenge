import { gql, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Vehicle, VehicleResponse } from '../graphql/models/Vehicle';
import { useVehicleReducer } from '../hooks/useVehicleReducer';
import { GiveRate } from './utils/GiveRate';
import { Rating } from './utils/Rating';

const GET_VEHICLES = gql`
  query {
    vehicles {
      id
      model
      brand
      color
      price
      category
      year
      rating
      image
    }
  }
`;

const UPDATE_VEHICLE = gql`
  mutation Update(
    $id: ID!
    $model: String
    $brand: String
    $color: String
    $price: Float
    $category: String
    $year: Int
    $image: Upload
    $rating: Float
  ) {
    updateVehicle(
      id: $id
      model: $model
      brand: $brand
      color: $color
      price: $price
      category: $category
      year: $year
      image: $image
      rating: $rating
    ) {
      id
      model
      brand
      color
      price
      category
      year
      image
      rating
    }
  }
`;

export const Vehicles = () => {
  const { data, loading } = useQuery<{ vehicles: VehicleResponse[] }>(
    GET_VEHICLES
  );
  const [updateFunction] = useMutation(UPDATE_VEHICLE, {
    refetchQueries: [{ query: GET_VEHICLES }],
  });

  const [vehicleState, dispatch] = useVehicleReducer();

  const updateVehicleRate = (rate: number, vehicleId: number) => {
    updateFunction({ variables: { id: vehicleId, rating: rate } });
  };

  const handleUpdateVehicle = async () => {};

  return (
    <div className="vehicles-container">
      <div className="container mx-3 py-3">
        <div className="title-container">
          <h2>All Vehicles</h2>
          <h4>
            You can edit and delete from here, press "Enter" inside input to
            change the model of the car{' '}
          </h4>
        </div>
        <div className="vehicles-list-container">
          {loading ? (
            <h2>Carregando...</h2>
          ) : (
            data?.vehicles.map((vehicle) => (
              <div
                className="vehicle"
                style={{ backgroundColor: vehicle.color }}
                key={vehicle.id}
              >
                <img src={vehicle.image} alt="vehicle" />
                <input
                  type="text"
                  defaultValue={vehicle.model}
                  onChange={(e) =>
                    dispatch({ type: 'setModel', model: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      updateFunction({
                        variables: {
                          id: vehicle.id,
                          model: vehicleState.model,
                        },
                      });
                    }
                  }}
                />
                <GiveRate
                  rating={vehicle.rating}
                  onRating={(rate) => updateVehicleRate(rate, vehicle.id)}
                  count={5}
                />
              </div>
            ))
          )}
        </div>
        <button>Show All</button>
      </div>
    </div>
  );
};
