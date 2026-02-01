import { useNavigate } from "react-router-dom";
import { startCandidateCall } from "../api/api";
// import { callCandidate } from "../api/api";

export default function CandidateTable({ candidates, refresh }) {
  const navigate = useNavigate();
  const handleCall = async (candidateId) => {
    try {
      //   await callCandidate(candidateId);
      await startCandidateCall(candidateId);
      alert("Call started");
      refresh(); // refresh callStatus
      //   refresh(); // re-fetch candidates to update status
    } catch (err) {
      alert(err);
    }
  };

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
                disabled={
                  c.screeningStatus !== "AUTO_PASS" ||
                  c.callStatus !== "pending"
                }
                onClick={() => handleCall(c._id)}
                className={`bg-green-600 text-white px-8 my-1 py-1 disabled:opacity-50  ${c.screeningStatus == "AUTO_PASS" ? "cursor-pointer " : "cursor-not-allowed bg-red-600"}`}
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
