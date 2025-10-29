import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import router from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();

connectDB();

// middleware
app.use(express.json());
app.use(cookieParser());
// route
app.use('/api/authDB', router);
//404 handler
app.use((req, res) => {
  res.status(500).json({ success: false, message: 'route not found' });
});
// error handler middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ success: false, message: 'error found' });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
