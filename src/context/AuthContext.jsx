import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // ✅ Load registered users from localStorage
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  // ✅ Persist logged-in user
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // =========================
  // ✅ REGISTER FUNCTION
  // =========================
  const register = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Check if user already exists
    const userExists = users.find(
      (u) => u.email === cleanEmail
    );

    if (userExists) {
      return false; // already registered
    }

    const updatedUsers = [
      ...users,
      { email: cleanEmail, password: cleanPassword }
    ];

    setUsers(updatedUsers);

    // Save permanently
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    return true;
  };

  // =========================
  // ✅ LOGIN FUNCTION
  // =========================
  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Always read fresh from localStorage
    const storedUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    const user = storedUsers.find(
      (u) =>
        u.email === cleanEmail &&
        u.password === cleanPassword
    );

    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return true;
    }

    return false;
  };

  // =========================
  // ✅ LOGOUT FUNCTION
  // =========================
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);