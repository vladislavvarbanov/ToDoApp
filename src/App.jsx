import './App.css';
import { useState, useRef, useEffect } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage when the app initializes
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const inputRef = useRef(null);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  }

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { text: input.trim(), done: false }]);
      setInput('');
      inputRef.current.focus();
    }
  }

  const removeTask = (idx) => {
    setTasks(tasks.filter((_, index) => index !== idx));
  }

  const toggleTask = (idx) => {
    const newTasks = [...tasks];
    newTasks[idx].done = !newTasks[idx].done;
    setTasks(newTasks);
  }

  return (
    <div className="todo">
      <h2>To-Do List</h2>

      <div className="input-group">
          <input
            type="text"
            placeholder="Add new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKeyPress}
            ref={inputRef}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <ul>
          {tasks.map((task, idx) => (
            <li key={idx} className={task.done ? 'done' : ''}>
              <span className="task-text">
                {task.text}
              </span>
              <div className="task-buttons">
                <button className="remove-btn" onClick={() => removeTask(idx)}>
                  Remove
                </button>
                <button 
                  className="finish-btn" 
                  onClick={() => toggleTask(idx)}
                  disabled={task.done}
                >
                  {task.done ? 'Finished' : 'Finish'}
                </button>
              </div>
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
