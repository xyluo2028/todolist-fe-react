import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Login from './components/Login';
import Register from './components/Register';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';

const ProtectedRoute = ({ children }) => {
  const auth = JSON.parse(sessionStorage.getItem('auth'));
  return auth ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div className="p-6">
      <nav className="mb-6 space-x-8">
        <Link to="/" className="mr-10">Home     </Link>
        <Link to="/auth" className="mr-6">Login/Register  </Link>
        <Link to="/projects" className="mr-6"> Projects </Link>
        <Link to="/tasks" className="mr-6"> Tasks </Link> {/* Changed /Tasks to /tasks */}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        {/* Protected Routes */}
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:projectName" // For specific project tasks
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks" /* New route for general tasks access */
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        {/* catch‐all redirect back to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
