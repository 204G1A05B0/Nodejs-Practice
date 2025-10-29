import axios from 'axios';

const API = '/api/todolist';

// GET all tasks
export const getTasks = async () => {
  const res = await axios.get(API);
  return res.data;
};

// ADD task
export const addTask = async (taskData) => {
  const res = await axios.post(API, taskData);
  return res.data;
};

// DELETE task
export const deleteTask = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};

// UPDATE task
export const updateTask = async (id, updates) => {
  const res = await axios.patch(`${API}/${id}`, updates);
  return res.data;
};
