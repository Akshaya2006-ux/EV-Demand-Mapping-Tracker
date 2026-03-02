import { useState } from "react";
import { useDemand } from "../context/DemandContext";
import LiveMap from "../components/LiveMap";

// ✅ ADD THESE TWO IMPORTS
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const DriverDashboard = () => {
  const { routes, setEvLocation } = useDemand();
  const [watchId, setWatchId] = useState(null);

  // Sort routes by highest demand
  const sortedRoutes = Object.entries(routes).sort(
    (a, b) => b[1] - a[1]
  );

  // Ranking colors
  const getColorClass = (index) => {
    if (index === 0) return "bg-red-500";
    if (index === 1) return "bg-orange-500";
    if (index === 2) return "bg-yellow-400 text-black";
    return "bg-gray-700";
  };

  // ✅ START LIVE TRACKING (Continuous)
  const handleGoLive = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported in this browser");
      return;
    }

    const id = navigator.geolocation.watchPosition(
      async (position) => {
        const locationData = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // ✅ Keep your existing context update
        setEvLocation(locationData);

        // 🔥 NEW: Save to Firebase (for cross-device sync)
        try {
          await setDoc(doc(db, "live", "ev1"), locationData);
        } catch (err) {
          console.error("Error updating Firebase:", err);
        }
      },
      (error) => {
        alert("Unable to fetch location");
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );

    setWatchId(id);
    alert("EV is now live ⚡");
  };

  // ✅ STOP LIVE TRACKING
  const handleStopLive = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      alert("EV tracking stopped");
    }
  };

  return (
    <div className="min-h-screen bg-charcoal text-white p-8">
      <h1 className="text-2xl font-bold mb-6 text-electric">
        Driver Dashboard – Demand Heatmap
      </h1>

      {/* GO LIVE BUTTON */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleGoLive}
          className="bg-electric text-black px-4 py-2 rounded-lg font-semibold hover:opacity-80 transition"
        >
          Go Live
        </button>

        <button
          onClick={handleStopLive}
          className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-80 transition"
        >
          Stop
        </button>
      </div>

      {/* DEMAND LIST */}
      <div className="grid gap-4 max-w-2xl">
        {sortedRoutes.length === 0 && (
          <p className="text-gray-400">No demand yet...</p>
        )}

        {sortedRoutes.map(([route, count], index) => (
          <div
            key={route}
            className={`p-4 rounded-xl shadow-lg flex justify-between items-center ${getColorClass(
              index
            )}`}
          >
            <span className="font-medium">{route}</span>
            <span className="text-lg font-bold">{count} votes</span>
          </div>
        ))}
      </div>

      {/* LIVE MAP */}
      <div className="mt-8">
        <LiveMap />
      </div>
    </div>
  );
};

export default DriverDashboard;