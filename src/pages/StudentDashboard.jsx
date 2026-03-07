import { useState, useEffect } from "react";
import { STOPS } from "../data/stops";
import { useDemand } from "../context/DemandContext";
import LiveMap from "../components/LiveMap";
import { getDatabase, ref, onValue } from "firebase/database";

const StudentDashboard = () => {

  const { voteRoute } = useDemand();

  const [current, setCurrent] = useState("");
  const [destination, setDestination] = useState("");

  const [occupiedSeats, setOccupiedSeats] = useState(0);

  const totalSeats = 6;

  // 🔥 Fetch seat occupancy from Firebase
useEffect(() => {

  const db = getDatabase();

  const occupancyRef = ref(db, "bus/status/occupancy");

  onValue(occupancyRef, (snapshot) => {

    const data = snapshot.val(); // "4/6"

    console.log("Firebase occupancy:", data);

    if (data) {

      const occupied = parseInt(data.split("/")[0]);

      setOccupiedSeats(occupied);

    }

  });

}, []);

  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);

const handleVote = async () => {

  if (!current || !destination) {
    alert("Please select both locations");
    return;
  }

  if (current === destination) {
    alert("Source and destination cannot be same");
    return;
  }

  voteRoute(current, destination);

  try {

    await fetch("https://ev-demand-mapping-tracker-1.onrender.com/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        route: `${current} → ${destination}`
      })
    });

  } catch (error) {
    console.error("Email error:", error);
  }

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

        {/* REQUEST RIDE */}

        <div className="bg-glass backdrop-blur-lg p-6 rounded-2xl shadow-lg max-w-md">

          <h2 className="text-lg font-semibold mb-4">Request Ride</h2>

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

        {/* LIVE MAP */}

        <LiveMap />

        {/* SEAT OCCUPANCY */}

        <div className="mt-8 bg-gray-900 p-6 rounded-xl">

          <h2 className="text-lg font-semibold mb-4 text-center">
            EV Seat Status
          </h2>

          {/* FRONT ROW */}

          <div className="flex justify-center gap-6 mb-6">

            {/* DRIVER */}

            <div className="w-12 h-12 flex items-center justify-center rounded bg-red-500 text-white">
              Driver
            </div>

            {/* SEAT 1 */}

            <div
              className={`w-12 h-12 flex items-center justify-center rounded text-white ${
                occupiedSeats >= 1 ? "bg-red-500" : "bg-green-500"
              }`}
            >
              1
            </div>

          </div>

          {/* SECOND ROW */}

          <div className="grid grid-cols-3 gap-4 justify-items-center mb-4">

            {[2,3,4].map((seat) => (

              <div
                key={seat}
                className={`w-12 h-12 flex items-center justify-center rounded text-white ${
                  occupiedSeats >= seat ? "bg-red-500" : "bg-green-500"
                }`}
              >
                {seat}
              </div>

            ))}

          </div>

          {/* THIRD ROW */}

          <div className="grid grid-cols-3 gap-4 justify-items-center">

            {[5,6].map((seat) => (

              <div
                key={seat}
                className={`w-12 h-12 flex items-center justify-center rounded text-white ${
                  occupiedSeats >= seat ? "bg-red-500" : "bg-green-500"
                }`}
              >
                {seat}
              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

};

export default StudentDashboard;
