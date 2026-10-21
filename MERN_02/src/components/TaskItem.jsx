import React from 'react';

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
        />
        <span className="task-text">{task.text}</span>
      </div>
      <button
        className="btn btn-danger btn-sm"
        onClick={() => onDelete(task.id)}
        title="Delete task"
      >
        ✕
      </button>
    </div>
  );
}

export default TaskItem;
