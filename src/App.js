import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';

const ProtectedRoute = ({ children }) => {
  const auth = JSON.parse(sessionStorage.getItem('auth'));
  return auth ? children : <Navigate to="/auth?mode=login" replace />;
};

const readStoredAuth = () => {
  try {
    const stored = sessionStorage.getItem('auth');
    return stored ? JSON.parse(stored) : null;
  } catch (err) {
    console.warn('Failed parsing stored auth credentials.', err);
    return null;
  }
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = useState(() => readStoredAuth());

  useEffect(() => {
    setAuth(readStoredAuth());
  }, [location]);

  const handleLogout = () => {
    sessionStorage.removeItem('auth');
    setAuth(null);
    navigate('/auth?mode=login', { replace: true });
  };

  const navItems = [
    { label: 'Home', to: '/', end: true },
    { label: 'Auth', to: '/auth' },
    { label: 'Projects', to: '/projects' },
  ];

  return (
    <div className="app-shell">
      <header className="app-nav">
        <div className="app-nav__brand">
          <span className="app-nav__spark" />
          TaskFlow
        </div>
        <nav className="app-nav__links">
          {navItems.map(({ label, to, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `app-nav__link${isActive ? ' app-nav__link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        {auth && (
          <button type="button" className="btn btn--ghost" onClick={handleLogout}>
            Sign out
          </button>
        )}
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:projectName"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
