import { useState, useEffect, useMemo, useCallback } from 'react';
import ProjectList from '../components/ProjectList';
import { api } from '../api';

function Projects() {
  const auth = useMemo(() => JSON.parse(sessionStorage.getItem('auth')), []);
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState(''); // State for the new project name

  // useCallback for fetchProjects to call it on demand
  const fetchProjects = useCallback(async () => {
    if (!auth) return; // Should be handled by ProtectedRoute
    try {
      const res = await api.getProjects(auth);
      console.log('projects payload:', res.data);
      const list = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.projects)
        ? res.data.projects
        : [];
      setProjects(list);
    } catch (err) {
      console.error('Failed loading projects:', err);
      setProjects([]);
    }
  }, [auth]); // Depends on auth

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]); // Call fetchProjects when it (or its dependencies like auth) changes

  const handleCreateProject = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!auth || !auth.username || !auth.password) {
      console.warn('🔒 Missing credentials, aborting createProject')
      alert('You must be signed in to create a project.')
      return
    }
    if (!newProjectName.trim()) {
      alert('Project name cannot be empty.');
      return;
    }
    try {
      await api.createProject(newProjectName.trim(), auth);
      setNewProjectName(''); // Clear the input field
      fetchProjects(); // Refresh the projects list
      // alert('Project created successfully!'); // Optional success feedback
    } catch (err) {
      console.error('Failed to create project:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Failed to create project.';
      alert(`Error creating project: ${errorMsg}`); // User-friendly error
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Your Projects</h2>

      {/* Form to create a new project */}
      <form onSubmit={handleCreateProject} className="mb-6 flex space-x-2">
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="Enter new project name"
          className="border p-2 rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Project
        </button>
      </form>

      <ProjectList projects={projects} />
    </div>
  );
}

export default Projects;