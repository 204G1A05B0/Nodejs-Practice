import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database not connected:', error.message);
    // You can also throw again to be caught by global error handler
    throw new Error('Database not connected');
  }
};
export default connectDB;
