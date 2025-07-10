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
      <button onClick={addTask}>Add</button>
    </div>

    <ul>
      {tasks.map((task, idx) => (
        <li key={idx} className={task.done ? 'done' : ''}>
          <span className="task-text" onClick={() => toggleTask(idx)}>
            {task.text}
          </span>
          <button className="remove-btn" onClick={() => removeTask(idx)}>
            Remove
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
  </>
);
}

export default App;

