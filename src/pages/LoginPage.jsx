import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { useAuth } from '../hooks/useAuth';
import {
  getAuthErrorMessage,
  signInWithEmail,
} from '../firebase/authService';

const CONFIG_WARNING =
  'Firebase is not configured. Copy .env.example to .env and add your project credentials.';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const from = location.state?.from?.pathname ?? '/';

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmail(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthForm
      title="Welcome back"
      subtitle="Sign in to manage your tasks"
      onSubmit={handleSubmit}
      submitLabel="Log in"
      loading={loading}
      error={error}
      configWarning={!isConfigured ? CONFIG_WARNING : null}
      footerText="Don't have an account?"
      footerLink="/signup"
      footerLinkLabel="Sign up"
    >
      <div className="form-group">
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
      </div>
    </AuthForm>
  );
}

export default LoginPage;
