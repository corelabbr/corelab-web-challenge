import { PrismaClient, Vehicle } from '@prisma/client';
import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { FileUpload } from 'graphql-upload';
import { createWriteStream, readFileSync } from 'fs';
import { finished } from 'stream/promises';
import multer from 'multer';
import { multerConfig } from '../../config/multerConfig';
import { randomBytes } from 'crypto';
import { S3 } from 'aws-sdk';

const storageS3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
  },
  region: process.env.AWS_DEFAULT_REGION,
});

multer(multerConfig);

type Car = {
  id: number;
  model: string;
  brand: string;
  color: string;
  price: number;
  year: number;
  rating: number | null;
  category: string;
  image: Promise<FileUpload>;
};

class CarsApi extends DataSource {
  store: PrismaClient;
  context: any;

  constructor({ store }: { store: PrismaClient }) {
    super();
    this.store = store;
  }

  initialize(config: DataSourceConfig<any>) {
    this.context = config.context;
  }

  getCar = async (id: string) => {
    try {
      const car = await this.store.vehicle.findFirst({
        where: {
          id: Number(id),
        },
      });

      return car;
    } catch (error) {
      console.log(error);
    }
  };

  getCars = async () => {
    try {
      const cars = await this.store.vehicle.findMany();

      return cars;
    } catch (error) {
      console.log(error);
    }
  };

  getFavorites = async () => {
    try {
      const favorites = await this.store.vehicle.findMany({
        orderBy: [
          {
            rating: 'desc',
          },
        ],
        skip: 0,
        take: 4,
      });

      console.log(favorites);

      return favorites;
    } catch (error) {
      console.log(error);
    }
  };

  createVehicle = async (args: Omit<Car, 'id'>) => {
    try {
      const { filename, mimetype, createReadStream } = await args.image;

      const stream = createReadStream();

      let newFilename: string;
      let uploadedFile: {
        ETag: string;
        Location: string;
        key?: string;
        Key: string;
        Bucket: string;
      };

      await new Promise<void>((resolve, reject) => {
        randomBytes(16, async (err, hash) => {
          if (err) {
            reject('Error generating bytes');
          } else {
            newFilename = `tmp/uploads/${hash.toString('hex')}-${filename}`;
            const out = createWriteStream(newFilename);
            stream.pipe(out);
            await finished(out);

            uploadedFile = await storageS3
              .upload({
                Bucket: 'corelab-uploads',
                Key: newFilename.split('uploads/')[1],
                ContentType: mimetype,
                ACL: 'public-read',
                Body: readFileSync(newFilename),
              })
              .promise();

            resolve();
          }
        });
      });
      const vehicle = await this.store.vehicle.create({
        data: {
          model: args.model,
          brand: args.brand,
          color: args.color,
          price: args.price,
          year: args.year,
          category: args.category,
          rating: args.rating,
          image: uploadedFile.Location,
        },
      });
      return vehicle;
    } catch (error) {
      console.log(error);
    }
  };

  updateVehicle = async (args: Car) => {
    if (args.image) {
      const { filename, mimetype, createReadStream } = await args.image;
      let newFilename: string;
      let uploadedFile: {
        ETag: string;
        Location: string;
        key?: string;
        Key: string;
        Bucket: string;
      };
      const stream = createReadStream();

      await new Promise<void>((resolve, reject) => {
        randomBytes(16, async (err, hash) => {
          if (err) {
            reject('Error generating bytes');
          } else {
            newFilename = `tmp/uploads/${hash.toString('hex')}-${filename}`;
            const out = createWriteStream(newFilename);
            stream.pipe(out);
            await finished(out);

            uploadedFile = await storageS3
              .upload({
                Bucket: 'corelab-uploads',
                Key: newFilename.split('uploads/')[1],
                ContentType: mimetype,
                ACL: 'public-read',
                Body: readFileSync(newFilename),
              })
              .promise();

            resolve();
          }
        });
      });
      try {
        const updatedVehicle = await this.store.vehicle.update({
          where: {
            id: Number(args.id),
          },
          data: {
            model: args.model,
            brand: args.brand,
            color: args.color,
            price: args.price,
            category: args.category,
            year: args.year,
            rating: args.rating,
            image: uploadedFile.Location,
          },
        });

        return updatedVehicle;
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const updatedCar = await this.store.vehicle.update({
          where: {
            id: Number(args.id),
          },
          data: {
            model: args.model,
            brand: args.brand,
            color: args.color,
            price: args.price,
            category: args.category,
            year: args.year,
            rating: args.rating,
          },
        });

        return updatedCar;
      } catch (error) {
        console.log(error);
      }
    }
  };

  deleteCar = async (id: string) => {
    try {
      const deletedCar = await this.store.vehicle.delete({
        where: { id: Number(id) },
      });
      return deletedCar;
    } catch (error) {
      console.log(error);
    }
  };
}

export { CarsApi };
