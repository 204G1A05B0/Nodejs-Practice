import React from 'react';

const TaskItem = ({ task, onDelete, onToggle }) => {
  return (
    <li style={{ marginBottom: '8px' }}>
      <span
        style={{
          textDecoration: task.completed ? 'line-through' : 'none',
          marginRight: '10px',
        }}
      >
        {task.title} — {new Date(task.lastdate).toLocaleDateString()}
      </span>
      <button onClick={() => onToggle(task._id, task.completed)}>
        {task.completed ? 'Undo' : 'Done'}
      </button>
      <button onClick={() => onDelete(task._id)} style={{ marginLeft: '8px' }}>
        ❌
      </button>
    </li>
  );
};

export default TaskItem;
