function TaskSearch({ value, onChange, disabled = false }) {
  return (
    <div className="task-search">
      <label htmlFor="task-search" className="task-search__label">
        Search tasks
      </label>
      <div className="task-search__field">
        <input
          id="task-search"
          type="search"
          className="task-search__input"
          placeholder="Search by title or description..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          autoComplete="off"
          spellCheck={false}
        />
        {value && (
          <button
            type="button"
            className="task-search__clear"
            onClick={() => onChange('')}
            disabled={disabled}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskSearch;
