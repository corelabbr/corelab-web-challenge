import { prisma } from '../../services/prismaClient';
import { CarsApi } from './CarsApi';

export const dataSources = () => ({
  carsApi: new CarsApi({ store: prisma }),
});

export const context = async ({ req }: { req: any }) => {
  return null;
};
