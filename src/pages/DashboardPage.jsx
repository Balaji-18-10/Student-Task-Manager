import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import LoadingScreen from '../components/LoadingScreen';
import { useTasks } from '../hooks/useTasks';

function DashboardPage() {
  const {
    tasks,
    loading,
    saving,
    error,
    clearError,
    retry,
    addTask,
    editTask,
    toggleTask,
    deleteTask,
  } = useTasks();

  const busy = loading || saving;

  if (loading) {
    return (
      <div className="app">
        <Navbar />
        <LoadingScreen message="Loading your tasks..." />
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar />
      <main className="main">
        {error && (
          <div className="alert alert--error" role="alert">
            <div>
              <strong>Firebase error:</strong> {error}
            </div>
            <div className="alert__actions">
              <button type="button" className="btn btn--secondary" onClick={retry}>
                Retry
              </button>
              <button
                type="button"
                className="alert__dismiss"
                onClick={clearError}
                aria-label="Dismiss error"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {saving && (
          <p className="saving-state" role="status" aria-live="polite">
            Saving changes...
          </p>
        )}

        <TaskForm onAddTask={addTask} disabled={busy} />

        <TaskList
          tasks={tasks}
          onToggleTask={toggleTask}
          onEditTask={editTask}
          onDeleteTask={deleteTask}
          disabled={busy}
        />
      </main>
    </div>
  );
}

export default DashboardPage;
