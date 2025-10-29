import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { getTasks, addTask, deleteTask, updateTask } from '../services/api';
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data.data);
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  const handleAdd = async (task) => {
    await addTask(task);
    fetchTasks();
  };
  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };
  const handleToggle = async (id, completed) => {
    await updateTask(id, { completed: !completed });
    fetchTasks();
  };
  return (
    <div>
      <TaskForm onAdd={handleAdd} />
      <TaskList tasks={tasks} onDelete={handleDelete} onToggle={handleToggle} />
    </div>
  );
};

export default Home;
