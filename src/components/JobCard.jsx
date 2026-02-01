import { useNavigate } from "react-router-dom";
import { InformationCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteJob } from "../api/api";

export default function JobCard({ job, onDeleted }) {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.stopPropagation();

    const confirmed = window.confirm(
      "Are you sure you want to delete this job?\nThis will also remove all candidates under it.",
    );
    if (!confirmed) return;

    try {
      await deleteJob(job._id);
      alert("Job deleted");
      onDeleted?.(); // refresh job list
    } catch (err) {
      alert("Failed to delete job");
    }
  };

  return (
    <div
      className="relative border p-4 rounded cursor-pointer hover:bg-gray-100"
      onClick={() => navigate(`/jobs/${job._id}`)}
    >
      {/* Info Icon */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/jobs/${job._id}/info`);
        }}
        className="absolute top-2 right-2 text-gray-500 hover:text-black transition cursor-pointer hover:scale-110"
      >
        <InformationCircleIcon className="w-6 h-6" />
      </button>

      {/* Delete Icon */}
      <button
        onClick={handleDelete}
        className="absolute bottom-2 right-2 text-red-600 hover:text-red-800 transition cursor-pointer hover:scale-110"
      >
        <TrashIcon className="w-5 h-5" />
      </button>

      <h2 className="font-semibold text-lg">{job.jobRole}</h2>
      <p className="text-sm text-gray-600">
        Experience: {job.experience} years
      </p>
    </div>
  );
}
