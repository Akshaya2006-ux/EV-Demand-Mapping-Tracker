import { useState } from "react";
import { STOPS } from "../data/stops";
import { useDemand } from "../context/DemandContext";
import LiveMap from "../components/LiveMap";

const StudentDashboard = () => {
  const { voteRoute } = useDemand();

  const [current, setCurrent] = useState("");
  const [destination, setDestination] = useState("");

  const handleVote = () => {
    if (!current || !destination) {
      alert("Please select both locations");
      return;
    }

    if (current === destination) {
      alert("Source and destination cannot be same");
      return;
    }

    voteRoute(current, destination);

    // ✅ Reset dropdowns after vote (UX improvement)
    setCurrent("");
    setDestination("");

    alert("Vote submitted successfully ⚡");
  };

  return (
    <div className="min-h-screen bg-charcoal text-white flex items-center justify-center p-6">
      <div className="bg-glass backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-electric text-center">
          Student Dashboard
        </h1>

        <div className="bg-glass backdrop-blur-lg p-6 rounded-2xl shadow-lg max-w-md">
          <h2 className="text-lg font-semibold mb-4">Request Ride</h2>

          {/* Current Location */}
          <label className="block mb-2 text-sm">Current Location</label>
          <select
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className="w-full p-2 mb-4 rounded-lg bg-gray-800 border border-gray-600"
          >
            <option value="">Select location</option>
            {STOPS.map((stop) => (
              <option key={stop} value={stop}>
                {stop}
              </option>
            ))}
          </select>

          {/* Destination */}
          <label className="block mb-2 text-sm">Destination</label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-2 mb-4 rounded-lg bg-gray-800 border border-gray-600"
          >
            <option value="">Select destination</option>
            {STOPS.map((stop) => (
              <option key={stop} value={stop}>
                {stop}
              </option>
            ))}
          </select>

          <button
            onClick={handleVote}
            className="w-full bg-electric text-black font-semibold py-2 rounded-lg hover:opacity-80 transition"
          >
            Vote for EV
          </button>
        </div>

        {/* Live Map */}
        <LiveMap />
      </div>
    </div>
  );
};

export default StudentDashboard;