import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getJobInfo,
  updateJobInfo,
  addScreeningQuestion,
  removeScreeningQuestion,
} from "../api/api";

export default function JobInfo() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getJobInfo(jobId).then((res) => {
      setJob(res.job);
      setLoading(false);
    });
  }, [jobId]);

  const handleChange = (field, value) => {
    setJob((prev) => ({ ...prev, [field]: value }));
  };

  const saveChanges = async () => {
    try {
      setSaving(true);
      await updateJobInfo(jobId, job);
      alert("Job updated successfully");
    } catch {
      alert("Failed to update job");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 pb-28">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{job.jobRole}</h1>
        <p className="text-gray-600 mt-1">
          Experience required: {job.experience} years
        </p>
      </div>

      {/* Skills */}
      <section className="bg-white border rounded p-5">
        <h2 className="font-semibold mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-gray-100 text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <EditableBlock
        title="Client Requirement"
        value={job.clientRequirement}
        onChange={(v) => handleChange("clientRequirement", v)}
        height="min-h-[220px]"
      />

      <EditableBlock
        title="Job Description"
        value={job.jobDescription}
        onChange={(v) => handleChange("jobDescription", v)}
        height="min-h-[300px]"
      />

      <EditableBlock
        title="LinkedIn Post"
        value={job.linkedinPost}
        onChange={(v) => handleChange("linkedinPost", v)}
        height="min-h-[240px]"
      />

      {/* ✅ Screening Questions */}
      <ScreeningQuestionsEditor
        jobId={jobId}
        questions={job.screeningQuestions}
        onChange={(updated) => handleChange("screeningQuestions", updated)}
      />

      {/* Save bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-end">
        <button
          onClick={saveChanges}
          disabled={saving}
          className="bg-black text-white px-6 py-2 rounded disabled:opacity-50 cursor-pointer"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

/* =========================
   Editable Block
========================= */

function EditableBlock({ title, value, onChange, height }) {
  return (
    <section className="bg-white p-5 ">
      <h2 className="font-semibold mb-3">{title}</h2>
      <textarea
        className={`w-full border rounded p-4 text-sm leading-relaxed resize-y ${height}`}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </section>
  );
}

/* =========================
   Screening Questions Editor
========================= */

function ScreeningQuestionsEditor({ jobId, questions, onChange }) {
  const updateQuestion = (index, value) => {
    const updated = [...questions];
    updated[index] = value;
    onChange(updated);
  };

  const addQuestion = async () => {
    try {
      const res = await addScreeningQuestion(jobId, "New screening question");
      onChange(res.screeningQuestions);
    } catch {
      alert("Failed to add question");
    }
  };

  const removeQuestion = async (index) => {
    if (!window.confirm("Remove this question?")) return;

    try {
      const res = await removeScreeningQuestion(jobId, index);
      onChange(res.screeningQuestions);
    } catch {
      alert("Failed to remove question");
    }
  };

  return (
    <section className="bg-white p-5 space-y-4">
      <h2 className="font-semibold">Screening Questions</h2>

      {questions.map((q, idx) => (
        <div key={idx} className=" p-4 bg-gray-50 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium text-sm">Question {idx + 1}</span>
            <button
              onClick={() => removeQuestion(idx)}
              className="text-red-600 text-sm hover:underline"
            >
              Remove
            </button>
          </div>

          <textarea
            className="w-full border rounded p-3 text-sm leading-relaxed min-h-[90px]"
            value={q}
            placeholder="Enter screening question..."
            onChange={(e) => updateQuestion(idx, e.target.value)}
          />
        </div>
      ))}

      <button
        onClick={addQuestion}
        className="text-sm px-4 py-2 border rounded hover:bg-gray-100"
      >
        + Add Question
      </button>
    </section>
  );
}
