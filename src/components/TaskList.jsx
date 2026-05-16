import { useState } from 'react';
import TaskItem from './TaskItem';
import TaskFilters from './TaskFilters';
import TaskSearch from './TaskSearch';
import { filterTasks } from '../utils/filterTasks';
import { searchTasks } from '../utils/searchTasks';

const EMPTY_MESSAGES = {
  all: 'No tasks yet. Add one above to get started!',
  completed: 'No completed tasks yet.',
  pending: 'No pending tasks. Great job!',
  high: 'No high priority tasks.',
  medium: 'No medium priority tasks.',
  low: 'No low priority tasks.',
  'due-today': 'No tasks due today.',
  overdue: 'No overdue tasks. Nice work!',
};

function TaskList({
  tasks,
  onToggleTask,
  onEditTask,
  onDeleteTask,
  disabled = false,
}) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredByStatus = filterTasks(tasks, activeFilter);
  const visibleTasks = searchTasks(filteredByStatus, searchQuery);
  const sortedTasks = [...visibleTasks].sort(
    (a, b) => b.createdAt - a.createdAt
  );

  const isSearching = searchQuery.trim().length > 0;

  function getEmptyMessage() {
    if (tasks.length === 0) return EMPTY_MESSAGES.all;
    if (isSearching && sortedTasks.length === 0) return 'No tasks found';
    if (sortedTasks.length === 0) return EMPTY_MESSAGES[activeFilter];
    return null;
  }

  const emptyMessage = getEmptyMessage();

  return (
    <section className="task-list-section">
      <h2 className="section-title">
        Your Tasks
        <span className="task-count">{sortedTasks.length}</span>
      </h2>

      <TaskSearch
        value={searchQuery}
        onChange={setSearchQuery}
        disabled={disabled}
      />

      <TaskFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {emptyMessage ? (
        <p className="empty-state">{emptyMessage}</p>
      ) : (
        <ul className="task-list">
          {sortedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              disabled={disabled}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default TaskList;
