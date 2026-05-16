import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from './config';

const AUTH_ERROR_MESSAGES = {
  'auth/email-already-in-use': 'This email is already registered. Try logging in instead.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/operation-not-allowed': 'Email/password sign-in is not enabled for this project.',
  'auth/weak-password': 'Password must be at least 6 characters.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/too-many-requests': 'Too many attempts. Please wait and try again.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
};

export function getAuthErrorMessage(error) {
  if (!error) return 'An unexpected error occurred.';
  return AUTH_ERROR_MESSAGES[error.code] ?? error.message ?? 'An unexpected error occurred.';
}

function assertAuth() {
  if (!auth) {
    throw new Error('Firebase is not configured. Add your credentials to a .env file.');
  }
  return auth;
}

export async function signUpWithEmail(email, password) {
  return createUserWithEmailAndPassword(assertAuth(), email, password);
}

export async function signInWithEmail(email, password) {
  return signInWithEmailAndPassword(assertAuth(), email, password);
}

export async function logOut() {
  return signOut(assertAuth());
}
