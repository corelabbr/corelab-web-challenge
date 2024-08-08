import mongoose from "mongoose";

const mongoDB = async () => {
  await mongoose.connect(
    process.env.MONGO_URI as string,
    {
      dbName: "coreNotes",
    }
  );
};

export default mongoDB;
