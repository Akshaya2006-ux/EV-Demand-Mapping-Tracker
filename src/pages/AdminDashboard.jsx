import { useDemand } from "../context/DemandContext";
import LiveMap from "../components/LiveMap";

export default function AdminDashboard() {
  const { routes } = useDemand();

  const totalRoutes = Object.keys(routes).length;

  const totalVotes = Object.values(routes).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <div className="bg-charcoal min-h-screen text-white p-8">
      <h2 className="text-electric text-xl mb-6">
        Global Analytics
      </h2>

      {/* Analytics Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-glass p-6 rounded">
          <h3>Total Routes</h3>
          <p className="text-electric text-2xl">
            {totalRoutes}
          </p>
        </div>

        <div className="bg-glass p-6 rounded">
          <h3>Active EVs</h3>
          <p className="text-electric text-2xl">
            1
          </p>
        </div>

        <div className="bg-glass p-6 rounded">
          <h3>Total Votes</h3>
          <p className="text-electric text-2xl">
            {totalVotes}
          </p>
        </div>
      </div>

      {/* Live Fleet Tracking */}
      <h3 className="text-electric text-lg mb-4">
        Live Fleet Tracking
      </h3>

      <LiveMap />
    </div>
  );
}