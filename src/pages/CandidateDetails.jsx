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

      {/* =========================
          UPDATED EVALUATION SECTION
      ========================= */}
      <div className="border p-4 rounded space-y-4">
        <h2 className="font-semibold">Evaluation</h2>

        {candidate.evaluation ? (
          <div className="space-y-2 text-sm">
            <p>
              <b>Hire Recommendation:</b>{" "}
              {candidate.evaluation.hireRecommendation}
            </p>
            <p>
              <b>Technical Score:</b> {candidate.evaluation.technicalScore}
            </p>
            <p>
              <b>Communication Score:</b>{" "}
              {candidate.evaluation.communicationScore}
            </p>

            <div>
              <b>Strengths:</b>
              <ul className="list-disc ml-6">
                {candidate.evaluation.strengths?.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div>
              <b>Weaknesses:</b>
              <ul className="list-disc ml-6">
                {candidate.evaluation.weaknesses?.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>

            <p>
              <b>Reasoning:</b> {candidate.evaluation.reasoning}
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Evaluation not available yet.</p>
        )}
      </div>

      {/* =========================
          ✅ TRANSCRIPTION SECTION (NEW)
      ========================= */}
      <div className="border p-4 rounded space-y-3">
        <h2 className="font-semibold">Call Transcription</h2>

        {candidate.answers && candidate.answers.length > 0 ? (
          candidate.answers
            .sort((a, b) => a.questionIndex - b.questionIndex)
            .map((ans, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-3 rounded text-sm space-y-1"
              >
                <p>
                  <b>Q{ans.questionIndex + 1}:</b> {ans.question}
                </p>
                <p>
                  <b>A:</b> {ans.answerText ? ans.answerText : "No response"}
                </p>
              </div>
            ))
        ) : (
          <p className="text-sm text-gray-500">
            No transcription available yet.
          </p>
        )}
      </div>
    </div>
  );
}
