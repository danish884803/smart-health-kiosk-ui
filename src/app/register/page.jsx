"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

async function handleSubmit(e) {
  e.preventDefault();

  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (res.ok) {
    router.replace("/dashboard");
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef6f9] to-[#ffffff]">
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-xl font-semibold text-center mb-1">
          Create Account
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Sign up to start tracking your health
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              className="w-full mt-1 px-4 py-2 border rounded-lg"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border rounded-lg"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="w-full bg-[#0f769e] text-white py-2.5 rounded-lg">
            Sign Up
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/")}
              className="text-[#0f769e] font-medium"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
