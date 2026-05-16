import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { useAuth } from '../hooks/useAuth';
import {
  getAuthErrorMessage,
  signUpWithEmail,
} from '../firebase/authService';

const CONFIG_WARNING =
  'Firebase is not configured. Copy .env.example to .env and add your project credentials.';

function SignupPage() {
  const navigate = useNavigate();
  const { isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await signUpWithEmail(email.trim(), password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthForm
      title="Create account"
      subtitle="Sign up to start tracking your tasks"
      onSubmit={handleSubmit}
      submitLabel="Sign up"
      loading={loading}
      error={error}
      configWarning={!isConfigured ? CONFIG_WARNING : null}
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkLabel="Log in"
    >
      <div className="form-group">
        <label htmlFor="signup-email">Email</label>
        <input
          id="signup-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="signup-password">Password</label>
        <input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          minLength={6}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="signup-confirm">Confirm password</label>
        <input
          id="signup-confirm"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
          minLength={6}
          required
        />
      </div>
    </AuthForm>
  );
}

export default SignupPage;
