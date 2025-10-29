import mongoose from 'mongoose';
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    details: {
      type: String,
      required: false,
    },
    lastdate: {
      type: Date,
      required: [true, 'last daye is required'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Task = mongoose.model('Task', taskSchema);
export default Task;
