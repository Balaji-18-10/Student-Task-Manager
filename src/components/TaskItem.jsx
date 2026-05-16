import { useState } from 'react';
import TaskEditForm from './TaskEditForm';

function TaskItem({ task, onToggle, onEdit, onDelete, disabled = false }) {
  const [isEditing, setIsEditing] = useState(false);
  const priorityClass = `priority--${task.priority.toLowerCase()}`;

  const handleDelete = () => {
    if (window.confirm(`Delete "${task.title}"?`)) {
      onDelete(task.id);
    }
  };

  const handleSave = async (taskId, taskData) => {
    await onEdit(taskId, taskData);
    setIsEditing(false);
  };

  const formattedDate = task.dueDate
    ? new Date(task.dueDate + 'T00:00:00').toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'No due date';

  if (isEditing) {
    return (
      <li className="task-item task-item--editing">
        <TaskEditForm
          task={task}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
          disabled={disabled}
        />
      </li>
    );
  }

  return (
    <li className={`task-item ${task.completed ? 'task-item--completed' : ''}`}>
      <div className="task-item__main">
        <label className="task-item__checkbox-label">
          <input
            type="checkbox"
            className="task-item__checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            disabled={disabled}
            aria-label={
              task.completed
                ? `Mark "${task.title}" as incomplete`
                : `Mark "${task.title}" as complete`
            }
          />
        </label>
        <div className="task-item__content">
          <h3 className="task-item__title">{task.title}</h3>
          {task.description && (
            <p className="task-item__description">{task.description}</p>
          )}
          <div className="task-item__meta">
            <span className="task-item__date">{formattedDate}</span>
            <span className={`task-item__priority ${priorityClass}`}>
              {task.priority}
            </span>
            {task.completed && (
              <span className="task-item__status">Completed</span>
            )}
          </div>
        </div>
      </div>
      <div className="task-item__actions">
        <button
          type="button"
          className="btn btn--secondary"
          onClick={() => setIsEditing(true)}
          disabled={disabled}
          aria-label={`Edit "${task.title}"`}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn--danger"
          onClick={handleDelete}
          disabled={disabled}
          aria-label={`Delete "${task.title}"`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
