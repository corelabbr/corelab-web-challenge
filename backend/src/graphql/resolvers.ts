import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { Car, DataSources } from '../types';

export const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    vehicles: async (
      _: any,
      __: any,
      { dataSources }: { dataSources: DataSources }
    ) => {
      const vehicles = await dataSources.carsApi.getCars();
      return vehicles;
    },
    vehicle: async (
      _: any,
      args: { id: string },
      { dataSources }: { dataSources: DataSources }
    ) => {
      const car = await dataSources.carsApi.getCar(args.id);
      return car;
    },
    getFavorites: async (
      _: any,
      __: any,
      { dataSources }: { dataSources: DataSources }
    ) => {
      const favorites = await dataSources.carsApi.getFavorites();
      console.log('eeee ', favorites);
      return favorites;
    },
  },

  Mutation: {
    createVehicle: async (
      _: any,
      args: Omit<Car, 'id'>,
      { dataSources }: { dataSources: DataSources }
    ) => {
      const createdCar = await dataSources.carsApi.createVehicle(args);
      console.log('returned car ', createdCar);
      return createdCar;
    },
    updateVehicle: async (
      _: any,
      args: Car,
      { dataSources }: { dataSources: DataSources }
    ) => {
      const updatedCar = await dataSources.carsApi.updateVehicle(args);
      return updatedCar;
    },
    deleteCar: async (
      _: any,
      args: { id: string },
      { dataSources }: { dataSources: DataSources }
    ) => {
      const deletedCar = await dataSources.carsApi.deleteCar(args.id);
      return deletedCar;
    },
  },
};
