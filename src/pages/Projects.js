import { useState, useEffect, useMemo, useCallback } from 'react';
import ProjectList from '../components/ProjectList';
import { api } from '../api';

function Projects() {
  const auth = useMemo(() => JSON.parse(sessionStorage.getItem('auth')), []);
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState(''); // State for the new project name

  // useCallback for fetchProjects to call it on demand
  const fetchProjects = useCallback(async () => {
    if (!auth) return;
    try {
      const res = await api.getProjects(auth);
      console.log('raw projects payload:', res.data);
      
      let list = res.data.split('\n')              // Split the string into an array by newlines
                       .map(s => s.trim())     // Remove whitespace from start/end of each line
                       .filter(Boolean);
      console.log('parsed project list:', list);

      setProjects(list);
      console.log('Projects loaded:', projects);
    } catch (err) {
      console.error('Failed loading projects:', err);
      setProjects([]);
    }
  }, [auth]);


  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]); // Call fetchProjects when it (or its dependencies like auth) changes

  useEffect(() => {
    console.log('Projects loaded (from effect):', projects)
  }, [projects])

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
      {/* Add a button to manually fetch projects */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={fetchProjects}
      >
        Refresh Projects
      </button>
      {/* ← Add this block to actually render the list */}
      {projects.length > 0 ? (
        <ProjectList projects={projects} />
      ) : (
        <p className="text-gray-500">No projects found</p>
      )}
    </div>
  );
}

export default Projects;