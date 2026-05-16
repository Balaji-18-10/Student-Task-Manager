export function searchTasks(tasks, query) {
  const term = query.trim().toLowerCase();
  if (!term) return tasks;

  return tasks.filter((task) => {
    const title = (task.title ?? '').toLowerCase();
    const description = (task.description ?? '').toLowerCase();
    return title.includes(term) || description.includes(term);
  });
}
