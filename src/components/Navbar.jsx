import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-black text-white px-6 py-4 flex justify-between">
      <h1 className="font-bold">AI Screening</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>
      </div>
    </div>
  );
}
