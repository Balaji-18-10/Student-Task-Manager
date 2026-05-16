const FILTER_GROUPS = [
  {
    label: 'Status',
    filters: [
      { id: 'all', label: 'All' },
      { id: 'completed', label: 'Completed' },
      { id: 'pending', label: 'Pending' },
    ],
  },
  {
    label: 'Priority',
    filters: [
      { id: 'high', label: 'High' },
      { id: 'medium', label: 'Medium' },
      { id: 'low', label: 'Low' },
    ],
  },
  {
    label: 'Due date',
    filters: [
      { id: 'due-today', label: 'Due today' },
      { id: 'overdue', label: 'Overdue' },
    ],
  },
];

function TaskFilters({ activeFilter, onFilterChange }) {
  return (
    <div className="task-filters" role="group" aria-label="Filter tasks">
      {FILTER_GROUPS.map((group) => (
        <div key={group.label} className="task-filters__group">
          <span className="task-filters__label">{group.label}</span>
          <div className="task-filters__buttons">
            {group.filters.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className={`task-filters__btn ${
                  activeFilter === id ? 'task-filters__btn--active' : ''
                }`}
                onClick={() => onFilterChange(id)}
                aria-pressed={activeFilter === id}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskFilters;
