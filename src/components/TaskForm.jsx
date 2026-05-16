import { useState } from 'react';

const PRIORITIES = ['Low', 'Medium', 'High'];

const initialForm = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'Medium',
};

function TaskForm({ onAddTask, disabled = false }) {
  const [form, setForm] = useState(initialForm);
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
      await onAddTask({
        title: form.title.trim(),
        description: form.description.trim(),
        dueDate: form.dueDate,
        priority: form.priority,
      });
      setForm({ ...initialForm });
    } catch (err) {
      console.error('Failed to add task:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="task-form-section">
      <h2 className="section-title">Add New Task</h2>
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Math homework"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Optional details..."
            rows={3}
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              {PRIORITIES.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn--primary"
          disabled={disabled || submitting}
        >
          {submitting ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </section>
  );
}

export default TaskForm;
