import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // change if needed
});

export const createJob = async (data) => {
  try {
    const res = await API.post("/prescreen/prescreen", data);
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || "Something went wrong";
  }
};

export const getJobs = async () => {
  try {
    const res = await API.get("/job");
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || "Something went wrong";
  }
};

export const getJobById = async (jobId) => {
  try {
    const res = await API.get(`/job/${jobId}`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || "Failed to load job";
  }
};

export const getJobCandidates = async (jobId) => {
  try {
    const res = await API.get(`/job/${jobId}/candidates`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || "Failed to load candidates";
  }
};

export const getCandidateById = async (candidateId) => {
  try {
    const res = await API.get(`/candidate/${candidateId}`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || "Failed to load candidate";
  }
};

export const uploadResume = async (jobId, file) => {
  const formData = new FormData();
  formData.append("resume", file);

  const res = await API.post(`/resume/upload/${jobId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const startCandidateCall = async (candidateId) => {
  try {
    const res = await axios.post(
      `http://localhost:5000/twilio/call/${candidateId}`,
    );
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || "Failed to start call";
  }
};

export const getJobInfo = async (jobId) => {
  const res = await API.get(`/job/${jobId}/info`);
  return res.data;
};

export const updateJobInfo = async (jobId, data) => {
  const res = await API.put(`/job/${jobId}`, data);
  return res.data;
};

export const addScreeningQuestion = async (jobId, question) => {
  const res = await API.post(`/job/${jobId}/question`, { question });
  return res.data;
};

export const removeScreeningQuestion = async (jobId, index) => {
  const res = await API.delete(`/job/${jobId}/question/${index}`);
  return res.data;
};

export const deleteJob = async (jobId) => {
  const res = await API.delete(`/job/${jobId}`);
  return res.data;
};

export const getCandidateTranscript = async (candidateId) => {
  const res = await axios.get(`/api/candidate/${candidateId}/transcript`);
  return res.data;
};
