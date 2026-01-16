"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function loadUser() {
    const res = await fetch("/api/auth/me");
    if (res.ok) setUser(await res.json());
  }

  async function login(email, password) {
    await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    loadUser();
  }

  function logout() {
    document.cookie = "token=; Max-Age=0";
    setUser(null);
  }

  useEffect(() => { loadUser(); }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
