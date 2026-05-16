import { useState, useEffect, useCallback } from 'react';
import { isConfigured } from '../firebase/config';
import {
  subscribeToUserTasks,
  createTask,
  updateTask,
  updateTaskCompleted,
  deleteTaskById,
} from '../firebase/taskService';
import { useAuth } from './useAuth';
import { getFirestoreErrorMessage } from '../utils/firestoreErrors';

export function useTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!isConfigured) {
      setError('Firebase is not configured. Add your credentials to .env.');
      setLoading(false);
      return undefined;
    }

    if (!user?.uid) {
      setTasks([]);
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    setError(null);

    const unsubscribe = subscribeToUserTasks(
      user.uid,
      (fetched) => {
        setTasks(fetched);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error(err);
        setError(getFirestoreErrorMessage(err));
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user?.uid, retryCount]);

  const runMutation = useCallback(async (mutation) => {
    setSaving(true);
    setError(null);
    try {
      await mutation();
    } catch (err) {
      console.error(err);
      const message = getFirestoreErrorMessage(err);
      setError(message);
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  const addTask = useCallback(
    async (taskData) => {
      if (!user?.uid) return;
      await runMutation(() => createTask(user.uid, taskData));
    },
    [user?.uid, runMutation]
  );

  const editTask = useCallback(
    async (taskId, taskData) => {
      await runMutation(() => updateTask(taskId, taskData));
    },
    [runMutation]
  );

  const toggleTask = useCallback(
    async (taskId) => {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;
      await runMutation(() => updateTaskCompleted(taskId, !task.completed));
    },
    [tasks, runMutation]
  );

  const deleteTask = useCallback(
    async (taskId) => {
      await runMutation(() => deleteTaskById(taskId));
    },
    [runMutation]
  );

  const clearError = useCallback(() => setError(null), []);

  const retry = useCallback(() => {
    setError(null);
    setRetryCount((count) => count + 1);
  }, []);

  return {
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
  };
}
