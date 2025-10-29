import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDelete, onToggle }) => {
  if (!tasks.length) return <p>No tasks yet...</p>;

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
};

export default TaskList;
