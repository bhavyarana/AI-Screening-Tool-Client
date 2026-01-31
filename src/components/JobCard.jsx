import { useNavigate } from "react-router-dom";

export default function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/jobs/${job._id}`)}
      className="border p-4 cursor-pointer hover:bg-gray-100"
    >
      <h2 className="font-semibold">{job.jobRole}</h2>
      <p className="text-sm">Experience: {job.experience}</p>
    </div>
  );
}
