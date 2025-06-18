function TaskItem({ task, onComplete, onRemove }) {
  return (
    <div className="flex items-center justify-between p-2 bg-white rounded shadow">
      <div>
        <p className={`${task.completed ? 'line-through text-gray-500' : ''}`}>{task.content}</p>
        <small>Due: {new Date(task.due).toLocaleString()}</small>
      </div>
      <div className="space-x-2">
        {!task.completed && (
          <button onClick={() => onComplete(task.id)} className="px-2 py-1 bg-green-500 text-white rounded">
            Complete
          </button>
        )}
        <button onClick={() => onRemove(task.id)} className="px-2 py-1 bg-red-500 text-white rounded">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;