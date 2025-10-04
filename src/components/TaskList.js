import { useState } from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, project, refresh }) {
  const [content, setContent] = useState('');
  const [due, setDue] = useState('');
  const [priority, setPriority] = useState(1);

  const addTask = async () => {
    if (!content || !due) {
      alert('Please provide a task description and due date.');
      return;
    }
    await refresh({
      content,
      due: new Date(due).toISOString(),
      priority: parseInt(priority, 10),
      completed: false,
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
    <div className="task-area">
      <div className="task-header">
        <form
          className="task-inputs"
          onSubmit={(event) => {
            event.preventDefault();
            addTask();
          }}
        >
          <input
            className="form-input"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Add a task to ${project}`}
          />
          <input
            className="form-input"
            type="datetime-local"
            value={due}
            onChange={(e) => setDue(e.target.value)}
          />
          <select
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                Priority {num}
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn--primary">
            Add task
          </button>
        </form>
      </div>

      {tasks.length > 0 ? (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onComplete={onComplete} onRemove={onRemove} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          No tasks yet — capture your first idea above to get the ball rolling.
        </div>
      )}
    </div>
  );
}

export default TaskList;
