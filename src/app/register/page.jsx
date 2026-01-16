"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Activity, Heart, Thermometer, Scale } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // 1️⃣ Register user
    await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // 2️⃣ Auto login after register
    await login(email, password);

    // 3️⃣ Go to dashboard
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef6f9] to-[#ffffff]">
      <div className="w-full max-w-[420px]">

        {/* TOP LOGO & TITLE */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#0f769e] flex items-center justify-center mb-4">
            <Activity className="text-white" size={28} strokeWidth={2} />
          </div>

          <h1 className="text-2xl font-semibold text-gray-900">
            Smart Health Kiosk
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Your personal health monitoring system
          </p>

          {/* ICON FEATURES */}
          <div className="flex gap-8 mt-5 text-sm">
            <div className="flex items-center gap-1 text-[#0f769e]">
              <Heart size={16} />
              <span>Heart Rate</span>
            </div>
            <div className="flex items-center gap-1 text-[#22c55e]">
              <Thermometer size={16} />
              <span>Temperature</span>
            </div>
            <div className="flex items-center gap-1 text-[#0f769e]">
              <Scale size={16} />
              <span>BMI</span>
            </div>
          </div>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-xl font-semibold text-center mb-1">
            Create Account
          </h2>
          <p className="text-sm text-center text-gray-500 mb-6">
            Sign up to start tracking your health
          </p>

          {/* TABS */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => router.push("/")}
              className="flex-1 text-sm text-gray-500"
            >
              Sign In
            </button>
            <button className="flex-1 bg-white rounded-md py-2 text-sm font-medium shadow">
              Sign Up
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f769e]"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f769e]"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0f769e] hover:bg-[#0c6787] text-white py-2.5 rounded-lg font-medium transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
