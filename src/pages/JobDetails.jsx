import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJobCandidates, uploadResume, getJobById } from "../api/api";
import CandidateTable from "../components/CandidateTable";

export default function JobDetails() {
  const { jobId } = useParams();
  const [file, setFile] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [job, setJob] = useState(null);

  const fetchCandidates = async () => {
    try {
      const res = await getJobCandidates(jobId);
      setCandidates(res.candidates);
    } catch (err) {
      alert(err);
    }
  };

  const fetchJob = async () => {
    try {
      const res = await getJobById(jobId);
      setJob(res.job);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchJob();
    fetchCandidates();
  }, [jobId]);

  const uploadHandler = async () => {
    if (!file) {
      alert("Select a resume PDF");
      return;
    }

    try {
      await uploadResume(jobId, file);
      alert("Resume uploaded");
      setFile(null);
      fetchCandidates();
    } catch (err) {
      alert(`Upload failed: ${err}`);
    }
  };

  return (
    <div className="p-6">
      {/* ✅ Job Heading */}
      <h1 className="text-2xl font-bold mb-4">
        {job ? job.jobRole : "Loading job..."}
      </h1>

      {/* Resume upload */}
      <div className="mb-3 border p-6 rounded inline-block ">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="cursor-pointer"
        />
        <button
          onClick={uploadHandler}
          className="bg-black text-white px-4 py-2 ml-2 cursor-pointer"
        >
          Upload Resume
        </button>
      </div>

      {/* Candidates */}
      <CandidateTable candidates={candidates} refresh={fetchCandidates} />
    </div>
  );
}
