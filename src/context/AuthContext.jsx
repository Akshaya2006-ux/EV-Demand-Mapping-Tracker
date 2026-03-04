import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  // LOGIN
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
      return true;
    } catch (error) {
      console.error("LOGIN ERROR:", error.code, error.message);
      alert(error.message);
      return false;
    }
  };

  // REGISTER
  const register = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful");
      return true;
    } catch (error) {
      console.error("REGISTER ERROR:", error.code, error.message);
      alert(error.message);
      return false;
    }
  };

  // LOGOUT
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}