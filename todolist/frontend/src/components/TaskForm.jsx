import React, { useState } from 'react';

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [lastdate, setLastDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !lastdate) return alert('Title and date required');
    onAdd({ title, details, lastdate });
    setTitle('');
    setDetails('');
    setLastDate('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Details (optional)"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <input
        type="date"
        value={lastdate}
        onChange={(e) => setLastDate(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;
