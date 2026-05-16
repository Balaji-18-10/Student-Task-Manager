import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getAuthErrorMessage, logOut } from '../firebase/authService';

function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState(null);

  async function handleLogout() {
    setLogoutError(null);
    setLoggingOut(true);
    try {
      await logOut();
      navigate('/login', { replace: true });
    } catch (err) {
      setLogoutError(getAuthErrorMessage(err));
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="navbar__brand">
          <h1 className="navbar__title">Student Task Manager</h1>
          <p className="navbar__subtitle">Stay on top of your assignments</p>
        </div>
        <div className="navbar__actions">
          {user?.email && (
            <span className="navbar__email" title={user.email}>
              {user.email}
            </span>
          )}
          <button
            type="button"
            className="btn btn--outline"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? 'Logging out...' : 'Log out'}
          </button>
        </div>
      </div>
      {logoutError && (
        <p className="navbar__error" role="alert">
          {logoutError}
        </p>
      )}
    </header>
  );
}

export default Navbar;
