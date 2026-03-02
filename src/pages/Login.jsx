import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    const success = await login(email, password);

    setLoading(false);

    if (success) {
      // Navigate based on role
      if (role === "Student") navigate("/student");
      if (role === "Driver") navigate("/driver");
      if (role === "Admin") navigate("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center text-white">
      <div className="bg-glass backdrop-blur-lg p-8 rounded-xl w-96">
        <h2 className="text-electric text-2xl mb-6 text-center">
          EV Demand & Tracker
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded bg-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="p-2 rounded bg-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            className="p-2 rounded bg-black"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Student">Student</option>
            <option value="Driver">Driver</option>
            <option value="Admin">Admin</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-electric text-black py-2 rounded font-bold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-electric">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}