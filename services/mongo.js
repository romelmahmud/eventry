import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    return conn;
  } catch (error) {
    console.log(error);
  }
};
