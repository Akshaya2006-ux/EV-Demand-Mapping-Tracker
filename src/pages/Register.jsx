import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Student",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // ✅ FIX: Pass email and password properly
 const success = await register(formData.email, formData.password);

    if (!success) {
      alert("User already exists");
      return;
    }

    alert("Registered successfully! Please login.");
    navigate("/"); // go back to login page
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center text-white">
      <div className="bg-glass backdrop-blur-lg p-8 rounded-xl w-96">
        <h2 className="text-electric text-2xl mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="p-2 rounded bg-black"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-2 rounded bg-black"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-2 rounded bg-black"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="p-2 rounded bg-black"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            className="p-2 rounded bg-black"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Student">Student</option>
            <option value="Driver">Driver</option>
            <option value="Admin">Admin</option>
          </select>

          <button
            type="submit"
            className="bg-electric text-black py-2 rounded font-bold"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/" className="text-electric">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}