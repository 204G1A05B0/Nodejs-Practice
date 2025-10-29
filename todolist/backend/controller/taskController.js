import asyncHandler from 'express-async-handler';

import Task from '../model/task.js';

export const addtask = asyncHandler(async (req, res) => {
  const { title, details, lastdate } = req.body;
  if (!title || !lastdate) {
    res.status(400);
    throw new Error('Title and lastdate are required');
  }
  const task = await Task.create({ title, details, lastdate });
  return res.status(201).json({
    success: true,
    data: task,
  });
});
export const deletetask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }
  await task.deleteOne();
  res.status(200).json({
    success: true,
    message: 'task deleted successfully',
  });
});
export const updatetask = asyncHandler(async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedTask) {
    res.status(404);
    throw new Error('Task not found');
  }
  res.status(200).json({ success: true, data: updatedTask });
});
export const getall = asyncHandler(async (req, res) => {
  const alltasks = await Task.find();
  return res.status(200).json({
    success: true,
    count: alltasks.length,
    data: alltasks,
  });
});
export const completedtasks = asyncHandler(async (req, res) => {
  const completed = await Task.find({ completed: true });
  return res.status(200).json({
    success: true,
    count: completed.length,
    data: completed,
  });
});
