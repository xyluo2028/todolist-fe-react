function TaskItem({ task, onComplete, onRemove }) {
  const isCompleted = Boolean(task.completed);
  const dueDate = task.due ? new Date(task.due) : null;
  const dueLabel = dueDate && !Number.isNaN(dueDate.getTime())
    ? dueDate.toLocaleString()
    : 'No due date';

  return (
    <div className={`task-card${isCompleted ? ' task-card--completed' : ''}`}>
      <div className="task-card__info">
        <p className={`task-card__title${isCompleted ? ' task-card__title--done' : ''}`}>
          {task.content}
        </p>
        <div className="task-card__meta">
          <span className="badge badge--due">Due · {dueLabel}</span>
          {typeof task.priority === 'number' && (
            <span className="badge badge--priority">Priority {task.priority}</span>
          )}
          {isCompleted && <span className="badge badge--done">Completed</span>}
        </div>
      </div>
      <div className="task-card__actions">
        {!isCompleted && (
          <button
            type="button"
            className="btn btn--secondary"
            onClick={() => onComplete(task.id)}
          >
            Mark done
          </button>
        )}
        <button
          type="button"
          className="btn btn--danger"
          onClick={() => onRemove(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
