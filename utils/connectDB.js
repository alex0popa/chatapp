import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = () =>
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to db!'))
    .catch(e => console.error(e));
