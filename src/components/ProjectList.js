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
    <div className="space-y-2">
      {projects.map((p) => (
        <div
          key={p}
          className="flex items-center justify-between p-4 bg-white rounded shadow cursor-pointer hover:bg-gray-100"
          onClick={() => goToProject(p)}
        >
          <span>{p}</span>
          <button
            onClick={(e) => handleRemoveClick(e, p)}
            className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;