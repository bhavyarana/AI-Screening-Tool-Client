import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCandidateById } from "../api/api";

export default function CandidateDetails() {
  const { candidateId } = useParams();
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const res = await getCandidateById(candidateId);
        setCandidate(res.candidate);
      } catch (err) {
        alert(err);
      }
    };

    fetchCandidate();
  }, [candidateId]);

  if (!candidate) {
    return <p className="p-6">Loading candidate...</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{candidate.name}</h1>

      <div className="border p-4 rounded">
        <p>
          <b>Email:</b> {candidate.email}
        </p>
        <p>
          <b>Phone:</b> {candidate.phone}
        </p>
        <p>
          <b>Resume Score:</b> {candidate.matchScore + "%"}
        </p>
        <p>
          <b>Screening Status:</b> {candidate.screeningStatus}
        </p>
        <p>
          <b>Call Status:</b> {candidate.callStatus}
        </p>
      </div>

      <div className="border p-4 rounded">
        <h2 className="font-semibold mb-2">Job Applied For</h2>
        <p>
          <b>Role:</b> {candidate.job?.jobRole}
        </p>
        <p>
          <b>Experience:</b> {candidate.job?.experience}
        </p>
      </div>

      <div className="border p-4 rounded">
        <h2 className="font-semibold mb-2">Evaluation</h2>
        <pre className="bg-gray-100 p-2 text-sm">
          {JSON.stringify(candidate.evaluation || {}, null, 2)}
        </pre>
      </div>
    </div>
  );
}
