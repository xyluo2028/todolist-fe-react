import { useNavigate } from 'react-router-dom';

function ProjectList({ projects, onRemove }) {
  const navigate = useNavigate();

  const goToProject = (name) => {
    navigate(`/projects/${encodeURIComponent(name)}`);
  };

  const handleRemoveClick = (e, projectName) => {
    e.stopPropagation(); // Prevents navigating to the project page
    onRemove(projectName);
  };

  return (
    <div className="project-list">
      {projects.map((project) => (
        <div
          key={project}
          className="project-card"
          onClick={() => goToProject(project)}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              goToProject(project);
            }
          }}
        >
          <span className="project-card__title">{project}</span>
          <div className="project-card__actions">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={(event) => {
                event.stopPropagation();
                goToProject(project);
              }}
            >
              Open
            </button>
            <button
              type="button"
              className="btn btn--danger"
              onClick={(event) => handleRemoveClick(event, project)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
