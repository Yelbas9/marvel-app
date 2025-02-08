import React from "react";

const AuthForm = ({
  title,
  email,
  password,
  confirmPassword,
  setEmail,
  setPassword,
  setConfirmPassword,
  handleSubmit,
  error,
  showConfirmPassword = false,
}) => {
  return (
    <div className="auth-form-container">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {showConfirmPassword && (
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}

        {error && <p className="error-message">{error}</p>}

        <button type="submit">{title}</button>
      </form>
    </div>
  );
};

export default AuthForm;
