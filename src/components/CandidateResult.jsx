const CandidateResult = ({ candidate }) => {
  if (!candidate) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 space-y-3">
      <h2 className="text-xl font-semibold">Candidate Result</h2>

      <div>
        <strong>Name:</strong> {candidate.name}
      </div>
      <div>
        <strong>Email:</strong> {candidate.email}
      </div>
      <div>
        <strong>Phone:</strong> {candidate.phone}
      </div>
      <div>
        <strong>Experience:</strong> {candidate.experience} years
      </div>

      <div>
        <strong>Skills:</strong>{" "}
        {candidate.skills.length > 0 ? candidate.skills.join(", ") : "N/A"}
      </div>

      <div className="text-lg font-bold">
        Match Score:{" "}
        <span
          className={
            candidate.matchScore >= 80 ? "text-green-600" : "text-yellow-600"
          }
        >
          {candidate.matchScore}
        </span>
      </div>

      <div>
        Status:{" "}
        <span
          className={
            candidate.status === "AUTO_PASS"
              ? "text-green-600 font-semibold"
              : "text-orange-600 font-semibold"
          }
        >
          {candidate.status}
        </span>
      </div>
    </div>
  );
};

export default CandidateResult;
