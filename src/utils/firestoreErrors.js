const FIRESTORE_ERROR_MESSAGES = {
  'permission-denied':
    'Missing or insufficient permissions. Publish Firestore rules that allow each user to access only their own tasks.',
  unavailable: 'Firestore is temporarily unavailable. Please try again.',
};

export function getFirestoreErrorMessage(error) {
  if (!error) return 'An unexpected error occurred.';

  if (error.code === 'failed-precondition' && error.message) {
    return error.message;
  }

  return (
    FIRESTORE_ERROR_MESSAGES[error.code] ??
    error.message ??
    'An unexpected error occurred.'
  );
}
