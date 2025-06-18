import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom'; // Added Link
import TaskList from '../components/TaskList';
import { api } from '../api';

function Tasks() {
  const { projectName } = useParams();
  const auth = useMemo(() => JSON.parse(sessionStorage.getItem('auth')), []);
  const [tasks, setTasks] = useState([]);

  const loadTasks = useCallback(async (newTask, key, action) => {
    try {
      if (!projectName) {
        // If no project is selected, don't attempt to modify or load tasks.
        if (newTask || action) {
          console.warn("Cannot perform task operations without a project selected.");
        }
        setTasks([]); // Ensure tasks list is empty
        return;
      }

      // Proceed with existing logic if projectName is available
      if (action === 'complete') {
        await api.completeTask(projectName, key, auth);
      } else if (action === 'remove') {
        await api.removeTask(projectName, key, auth);
      } else if (newTask) {
        await api.writeTask(projectName, newTask, auth);
      }
      const res = await api.getTasks(projectName, auth);
      setTasks(res.data || []); // Ensure tasks is an array
    } catch (error) {
      console.error('Failed to process tasks:', error);
      setTasks([]); // Set to empty array or handle error state
    }
  }, [projectName, auth]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">
        {projectName ? `Project: ${decodeURIComponent(projectName)}` : "Tasks"}
      </h2>
      {projectName ? (
        <TaskList tasks={tasks} project={projectName} auth={auth} refresh={loadTasks} />
      ) : (
        <p>
          Please select a project from the <Link to="/projects" className="text-blue-500 hover:underline">Projects page</Link> to view and manage tasks.
        </p>
      )}
    </div>
  );
}

export default Tasks;