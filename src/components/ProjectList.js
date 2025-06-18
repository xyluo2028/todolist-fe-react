import { useNavigate } from 'react-router-dom';

function ProjectList({ projects }) {
  const navigate = useNavigate();

  const goToProject = (name) => {
    navigate(`/projects/${encodeURIComponent(name)}`);
  };

  return (
    <div className="space-y-2">
      {projects.map((p) => (
        <div
          key={p}
          className="p-4 bg-white rounded shadow cursor-pointer hover:bg-gray-100"
          onClick={() => goToProject(p)}
        >
          {p}
        </div>
      ))}
    </div>
  );
}

export default ProjectList;