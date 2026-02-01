import { useState } from "react";
import { createJob } from "../api/api";

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    if (!text.trim()) {
      alert("Please enter client requirement");
      return;
    }

    setLoading(true);
    try {
      await createJob({ clientRequirement: text });
      alert("Job created successfully");
      setText("");
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setLoading(false); // ✅ ALWAYS RUNS
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <textarea
        className="w-full border p-3 rounded min-h-90"
        rows="5"
        placeholder="Enter client requirement"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
      />

      <button
        onClick={submitHandler}
        disabled={loading}
        className="bg-black text-white px-4 py-2 mt-3 disabled:opacity-60 cursor-pointer"
      >
        {loading ? "Processing..." : "Submit"}
      </button>
    </div>
  );
}
