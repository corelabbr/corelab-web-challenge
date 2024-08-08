import mongoose from "mongoose";

const { Schema } = mongoose;

const Folder = mongoose.model(
  "Note",
  new Schema(
    {
      title: {
        type: String,
        require: true,
      },
      favorite: {
        type: Boolean,
        require: true,
      },
      color: {
        type: String,
        require: true,
      },
      content: {
        type: String,
        require: true,
      },
    },
    { timestamps: true }
  )
);

export default Folder;
