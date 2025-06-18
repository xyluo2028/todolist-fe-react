import { useState } from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, project, auth, refresh }) {
  const [content, setContent] = useState('');
  const [due, setDue] = useState('');
  const [priority, setPriority] = useState(1);

  const addTask = async () => {
    if (!content || !due) return;
    await refresh({
      content,
      due: new Date(due).toISOString(),
      priority: parseInt(priority, 10),
      completed: false
    });
    setContent('');
    setDue('');
    setPriority(1);
  };

  const onComplete = async (id) => {
    await refresh(null, id, 'complete');
  };

  const onRemove = async (id) => {
    await refresh(null, id, 'remove');
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <input
          className="flex-1 p-2 border rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="New task"
        />
        <input
          type="datetime-local"
          className="p-2 border rounded"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="p-2 border rounded">
          {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
        <button onClick={addTask} className="px-4 py-2 bg-blue-500 text-white rounded">Add</button>
      </div>
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onComplete={onComplete} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default TaskList;