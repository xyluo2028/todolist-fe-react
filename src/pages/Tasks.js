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
        if (newTask || action) {
          console.warn("Cannot perform task operations without a project selected.");
        }
        setTasks([]);
        return;
      }

      if (action === 'complete') {
        await api.completeTask(projectName, key, auth);
      } else if (action === 'remove') {
        await api.removeTask(projectName, key, auth);
      } else if (newTask) {
        await api.writeTask(projectName, newTask, auth);
      }
      const res = await api.getTasks(projectName, auth);

      let data = res.data;
      console.log('raw tasks payload:', data);
      console.log('data type:', typeof data);
      let list;

      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
          console.log('Parsed JSON data:', data);
        } catch {
          // Not JSON, treat as newline-separated
          console.warn('Data is not valid JSON, treating as newline-separated string');
          list = data.split('\n').map(s => s.trim()).filter(Boolean).map((content, idx) => ({
            id: idx,
            content,
            due: new Date().toISOString(),
            priority: 1,
            completed: false
          }));
          setTasks(list);
          console.log('Parsed tasks from string:', list);
          return;
        }
      }

      // If data is an array, use it directly; otherwise, fallback to empty array
      list = Array.isArray(data) ? data : [];
      console.log('Parsed tasks from string:', list);
      setTasks(list);
    } catch (error) {
      console.error('Failed to process tasks:', error);
      setTasks([]);
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