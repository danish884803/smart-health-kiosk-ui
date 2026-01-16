// "use client";

// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   /* ================= LOAD USER ================= */
//   async function loadUser() {
//     try {
//       const res = await fetch("/api/auth/me", {
//         credentials: "include",
//       });

//       if (!res.ok) {
//         setUser(null);
//         return;
//       }

//       const data = await res.json();
//       setUser(data);
//     } catch (err) {
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   }

//   /* ================= LOGIN ================= */
// async function login(email, password) {
//   const res = await fetch("/api/auth/login", {
//     method: "POST",
//     body: JSON.stringify({ email, password }),
//   });

//   if (!res.ok) throw new Error("Login failed");

//   await loadUser();
// }

//   /* ================= LOGOUT ================= */
//   function logout() {
//     document.cookie = "token=; Path=/; Max-Age=0";
//     setUser(null);
//   }

//   /* ================= INIT ================= */
//   useEffect(() => {
//     loadUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// /* ================= HOOK ================= */
// export const useAuth = () => useContext(AuthContext);
"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

async function loadUser() {
  const res = await fetch("/api/auth/me", {
    credentials: "include", // ⭐ REQUIRED
  });

  if (res.ok) {
    const data = await res.json();
    setUser(data);
  } else {
    setUser(null);
  }
}

async function login(email, password) {
  await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // ⭐ REQUIRED
    body: JSON.stringify({ email, password }),
  });

  await loadUser(); // ⭐ ENSURE STATE UPDATES
}


  async function logout() {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  setUser(null);
}


  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
