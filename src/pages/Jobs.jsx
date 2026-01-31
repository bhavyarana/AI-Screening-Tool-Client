import { useEffect, useState } from "react";
import { getJobs } from "../api/api";
import JobCard from "../components/JobCard";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs().then((res) => setJobs(res.jobs));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
}
