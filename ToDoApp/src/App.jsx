import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return [];
    }
  });  
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const addTask = () => {
    if (input.trim()) {
      setTasks([
        ...tasks,
        {
          text: input.trim(),
          done: false,
          dueDate: dueDate || null,
          priority: priority || 'medium',
        },
      ]);
      setInput('');
      setDueDate('');
      setPriority('medium');
      inputRef.current.focus();
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(newTasks);
  };

  return (
    <div className="todo">
      <h2>To-Do List</h2>

      <div className="input-group">
        <input
          type="text"
          placeholder="Add new task"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleInputKeyPress}
          ref={inputRef}
        />
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          className="date-input"
          style={{ minWidth: '120px', width: '100%' }}
          id="date-input"
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task, idx) => (
          <li key={idx} className={task.done ? 'done' : ''}>
            <span className="task-text">
              {task.text}
            </span>
            {task.dueDate && (
              <span style={{ fontSize: '0.85em', color: '#64748b', marginRight: '0.5em' }}>
                {task.dueDate}
              </span>
            )}
            <button className="remove-btn" onClick={() => removeTask(idx)}>
              Remove
            </button>
            <button className="finish-btn" onClick={() => toggleTask(idx)} disabled={task.done}>
              Finish
            </button>
          </li>
        ))}
      </ul>

      <div className="controls">
        <span>
          Total: {tasks.length} | Done: {tasks.filter(t => t.done).length}
        </span>
        <div>
          <button onClick={() => setTasks([])}>Clear All</button>
          <button onClick={() => setTasks(tasks.filter(t => !t.done))}>
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
  