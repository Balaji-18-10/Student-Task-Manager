function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isDueToday(dueDate) {
  return Boolean(dueDate) && dueDate === getTodayKey();
}

function isOverdue(task) {
  if (!task.dueDate || task.completed) return false;
  return task.dueDate < getTodayKey();
}

export function filterTasks(tasks, filter) {
  switch (filter) {
    case 'completed':
      return tasks.filter((task) => task.completed);
    case 'pending':
      return tasks.filter((task) => !task.completed);
    case 'high':
      return tasks.filter((task) => task.priority === 'High');
    case 'medium':
      return tasks.filter((task) => task.priority === 'Medium');
    case 'low':
      return tasks.filter((task) => task.priority === 'Low');
    case 'due-today':
      return tasks.filter((task) => isDueToday(task.dueDate));
    case 'overdue':
      return tasks.filter((task) => isOverdue(task));
    case 'all':
    default:
      return tasks;
  }
}
