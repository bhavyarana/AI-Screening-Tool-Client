import { useNavigate } from "react-router-dom";

export default function CandidateTable({ candidates }) {
  const navigate = useNavigate();

  return (
    <table className="w-full border mt-6">
      <thead>
        <tr className="bg-gray-100">
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Status</th>
          <th>Call</th>
        </tr>
      </thead>

      <tbody>
        {candidates.map((c) => (
          <tr key={c._id} className="border-t text-center">
            <td
              className="text-blue-600 cursor-pointer underline"
              onClick={() => navigate(`/candidates/${c._id}`)}
            >
              {c.name || "Unnamed"}
            </td>
            <td>{c.phone}</td>
            <td>{c.email}</td>
            <td>{c.screeningStatus}</td>
            <td>
              <button
                disabled={c.screeningStatus !== "AUTO_PASS"}
                className="bg-green-600 text-white px-2 py-1 disabled:opacity-50"
              >
                Call
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
