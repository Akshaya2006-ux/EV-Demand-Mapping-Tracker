import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DemandProvider } from "./context/DemandContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <DemandProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboards */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/driver" element={<DriverDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </DemandProvider>
  );
}

export default App;