"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Activity, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/"); // ⭐ GO BACK TO LOGIN PAGE
  }

  return (
    <nav className="bg-[#0f769e] h-[56px] px-6 flex items-center justify-between text-white shadow-md">
      <div className="flex items-center gap-2 font-semibold">
        <Activity size={18} />
        Smart Health Kiosk
      </div>

      {user?.email && (
        <div className="flex items-center gap-5">
          <span className="text-sm truncate max-w-[220px]">
            {user.email}
          </span>

          <button
            onClick={handleLogout}
            className="bg-[#2ecc71] hover:bg-[#27ae60] px-4 py-1.5 rounded-md text-sm flex items-center gap-1"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}
