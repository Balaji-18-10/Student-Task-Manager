import { useState } from 'react';

const PRIORITIES = ['Low', 'Medium', 'High'];

function TaskEditForm({ task, onSave, onCancel, disabled = false }) {
  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    priority: task.priority,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || disabled || submitting) return;

    setSubmitting(true);
    try {
      await onSave(task.id, {
        title: form.title.trim(),
        description: form.description.trim(),
        dueDate: form.dueDate,
        priority: form.priority,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="task-edit-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor={`edit-title-${task.id}`}>Title</label>
        <input
          id={`edit-title-${task.id}`}
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          disabled={disabled || submitting}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor={`edit-description-${task.id}`}>Description</label>
        <textarea
          id={`edit-description-${task.id}`}
          name="description"
          rows={2}
          value={form.description}
          onChange={handleChange}
          disabled={disabled || submitting}
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor={`edit-dueDate-${task.id}`}>Due Date</label>
          <input
            id={`edit-dueDate-${task.id}`}
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
            disabled={disabled || submitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor={`edit-priority-${task.id}`}>Priority</label>
          <select
            id={`edit-priority-${task.id}`}
            name="priority"
            value={form.priority}
            onChange={handleChange}
            disabled={disabled || submitting}
          >
            {PRIORITIES.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="task-edit-form__actions">
        <button
          type="submit"
          className="btn btn--primary"
          disabled={disabled || submitting}
        >
          {submitting ? 'Saving...' : 'Save'}
        </button>
        <button
          type="button"
          className="btn btn--secondary"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TaskEditForm;
