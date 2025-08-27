// Login page component

import React, { useState } from 'react';
import { useAuthContext } from '../contexts';
import './LoginPage.css';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    try {
      await login({ username, password });
    } catch (err) {
      // Error is handled by the context
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>AI Chat Assistant</h1>
          <p>Sign in to start chatting</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading || !username || !password}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="demo-credentials">
          <h3>Demo Credentials:</h3>
          <p><strong>Username:</strong> demo | <strong>Password:</strong> demo123</p>
          <p><strong>Username:</strong> admin | <strong>Password:</strong> admin123</p>
        </div>
      </div>
    </div>
  );
};