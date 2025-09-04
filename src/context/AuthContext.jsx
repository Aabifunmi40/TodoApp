import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signUp = async (userData) => {
    try {
      const res = await axios.post(
        "https://backend-todoapp-4.onrender.com/api/user/signup",
        userData
      );
      setUser(res.data);
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
    }
  };

  const signIn = async (userData) => {
    try {
      const res = await axios.post(
        "https://backend-todoapp-4.onrender.com/api/user/signin",
        userData
      );
      setUser(res.data);
    } catch (err) {
      console.error("Signin error:", err.response?.data || err.message);
    }
  };

  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
