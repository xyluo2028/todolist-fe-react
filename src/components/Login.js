import { useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      alert('Please supply both a username and password.');
      return;
    }

    try {
      await api.getProjects({ username, password });
      sessionStorage.setItem('auth', JSON.stringify({ username, password }));
      navigate('/projects');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <form className="form-body" onSubmit={handleSubmit}>
      <div className="form-field">
        <label className="form-label" htmlFor="login-username">
          Username
        </label>
        <input
          id="login-username"
          className="form-input"
          type="text"
          placeholder="you@example.com"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="login-password">
          Password
        </label>
        <input
          id="login-password"
          className="form-input"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn--primary">
          Sign in
        </button>
        <p className="muted-note">Forgot your login? Contact an administrator.</p>
      </div>
    </form>
  );
}

export default Login;
