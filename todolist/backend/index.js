import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';
dotenv.config();
connectDB();
const app = express();
// middleware
app.use(express.json());
// routes
app.use('/api/todolist', taskRoutes);
// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'route not found' });
});
// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'server Error' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('server is running on port', port);
});
