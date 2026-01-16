"use client";
import { useAuth } from "../context/AuthContext";
import { Activity } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-[#0f769e] h-[56px] px-6 flex items-center justify-between text-white">
      <div className="flex items-center gap-2 text-[16px] font-medium tracking-wide">
        <Activity size={18} strokeWidth={1.8} />
        Smart Health Kiosk
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm opacity-90">
            {user.email}
          </span>
          <button
            onClick={logout}
            className="bg-[#2ecc71] hover:bg-[#27ae60] transition px-4 py-1.5 rounded-md text-sm font-medium"
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}
