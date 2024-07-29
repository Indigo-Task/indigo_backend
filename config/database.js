import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    const DB = process.env.DATABASE.replace(
      "<PASSWORD>",
      process.env.MONGODB_PASSWORD
    );

    mongoose.set("strictQuery", true);
    const { connection } = await mongoose.connect(DB, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB connected: ${connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit();
  }
};
