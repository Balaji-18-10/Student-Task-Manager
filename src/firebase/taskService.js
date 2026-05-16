import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

const COLLECTION = 'tasks';

function assertDb() {
  if (!db) {
    throw new Error('Firebase is not configured.');
  }
  return db;
}

function mapDoc(snapshot) {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    userId: data.userId ?? '',
    title: data.title ?? '',
    description: data.description ?? '',
    dueDate: data.dueDate ?? '',
    priority: data.priority ?? 'Medium',
    completed: Boolean(data.completed),
    createdAt: data.createdAt?.toMillis?.() ?? 0,
    updatedAt: data.updatedAt?.toMillis?.() ?? 0,
  };
}

export function subscribeToUserTasks(userId, onTasks, onError) {
  const firestore = assertDb();
  const q = query(
    collection(firestore, COLLECTION),
    where('userId', '==', userId)
  );

  return onSnapshot(
    q,
    (snap) => {
      const tasks = snap.docs
        .map(mapDoc)
        .sort((a, b) => b.createdAt - a.createdAt);
      onTasks(tasks);
    },
    onError
  );
}

export async function createTask(userId, taskData) {
  const firestore = assertDb();
  await addDoc(collection(firestore, COLLECTION), {
    userId,
    title: taskData.title,
    description: taskData.description,
    dueDate: taskData.dueDate,
    priority: taskData.priority,
    completed: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateTask(taskId, taskData) {
  const firestore = assertDb();
  await updateDoc(doc(firestore, COLLECTION, taskId), {
    title: taskData.title,
    description: taskData.description,
    dueDate: taskData.dueDate,
    priority: taskData.priority,
    updatedAt: serverTimestamp(),
  });
}

export async function updateTaskCompleted(taskId, completed) {
  const firestore = assertDb();
  await updateDoc(doc(firestore, COLLECTION, taskId), {
    completed,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteTaskById(taskId) {
  const firestore = assertDb();
  await deleteDoc(doc(firestore, COLLECTION, taskId));
}
