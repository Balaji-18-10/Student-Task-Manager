import { Link } from 'react-router-dom';

function AuthForm({
  title,
  subtitle,
  children,
  onSubmit,
  submitLabel,
  loading,
  error,
  footerText,
  footerLink,
  footerLinkLabel,
  configWarning,
}) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <header className="auth-card__header">
          <h1 className="auth-card__title">{title}</h1>
          {subtitle && <p className="auth-card__subtitle">{subtitle}</p>}
        </header>

        {configWarning && (
          <div className="alert alert--error" role="alert">
            {configWarning}
          </div>
        )}

        {error && (
          <div className="alert alert--error" role="alert">
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={onSubmit} noValidate>
          {children}
          <button
            type="submit"
            className="btn btn--primary auth-form__submit"
            disabled={loading || Boolean(configWarning)}
          >
            {loading ? 'Please wait...' : submitLabel}
          </button>
        </form>

        <p className="auth-card__footer">
          {footerText}{' '}
          <Link to={footerLink} className="auth-card__link">
            {footerLinkLabel}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
