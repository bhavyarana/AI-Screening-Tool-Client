import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getJobCandidates, uploadResume, getJobById } from "../api/api";
import CandidateTable from "../components/CandidateTable";

export default function JobDetails() {
  const { jobId } = useParams();
  const [file, setFile] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [job, setJob] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

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
    if (uploading) return;

    try {
      setUploading(true);
      await uploadResume(jobId, file);
      alert("Resume uploaded successfully");

      // 🔥 Reset file input
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      fetchCandidates();
    } catch (err) {
      alert(`Upload failed: ${err}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Job Heading */}
      <h1 className="text-2xl font-bold mb-4">
        {job ? job.jobRole : "Loading job..."}
      </h1>

      {/* Resume upload */}
      <div className="mb-4 border p-6 rounded inline-flex items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          disabled={uploading}
          onChange={(e) => setFile(e.target.files[0])}
          className="cursor-pointer"
        />

        <button
          onClick={uploadHandler}
          disabled={uploading}
          className={`px-4 py-2 text-white rounded transition ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black cursor-pointer hover:bg-gray-800"
          }`}
        >
          {uploading ? "Uploading..." : "Upload Resume"}
        </button>
      </div>

      {/* Candidates */}
      <CandidateTable candidates={candidates} refresh={fetchCandidates} />
    </div>
  );
}
