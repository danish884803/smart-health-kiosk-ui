// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";
// import DashboardPage from "./DashboardContent"; // move your dashboard JSX here

// export default function DashboardWrapper() {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !user) {
//       router.replace("/login");
//     }
//   }, [user, loading, router]);

//   if (loading || !user) return null;

//   return <DashboardPage />;
// }
"use client";

import { useEffect, useState } from "react";
import {
  Heart,
  Thermometer,
  Droplets,
  Wind,
  Scale,
  TrendingUp,
  Plus,
  X
} from "lucide-react";

import HealthForm from "@/components/HealthForm";
import HealthTable from "@/components/HealthTable";

export default function DashboardPage() {
  const [records, setRecords] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/api/health/records")
      .then(res => res.json())
      .then(setRecords);
  }, []);

  const latest = records[0];

  return (
    <div className="bg-[#f7f9fb] min-h-screen p-6 space-y-6">

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Heart Rate" value={latest?.heartRate ?? "--"} unit="BPM">
          <Heart className="text-red-500" size={22} />
        </StatCard>

        <StatCard title="Temperature" value={latest?.temperature ?? "--"} unit="°C">
          <Thermometer className="text-orange-500" size={22} />
        </StatCard>

        <StatCard
          title="Blood Pressure"
          value={latest ? `${latest.systolic}/${latest.diastolic}` : "--/--"}
          unit="mmHg"
        >
          <Droplets className="text-blue-500" size={22} />
        </StatCard>

        <StatCard title="Blood Oxygen" value={latest?.oxygen ?? "--"} unit="%">
          <Wind className="text-cyan-500" size={22} />
        </StatCard>
      </div>

      {/* LOWER GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* BMI */}
        <div className="bg-[#eef3f4] border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Scale size={18} />
            <h3 className="text-[16px] font-semibold">BMI Status</h3>
          </div>

          {latest ? (
            <>
              <div className="text-3xl font-semibold">{latest.bmi}</div>
              <p className="text-sm text-gray-600 mt-1">{latest.bmiStatus}</p>

              <div className="mt-5 text-sm text-gray-700 space-y-1">
                <p>Height: {latest.height} cm</p>
                <p>Weight: {latest.weight} kg</p>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 mt-12">
              <div className="text-2xl">--</div>
              <p className="text-sm mt-1">N/A</p>
            </div>
          )}
        </div>

        {/* RECORDS */}
        <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Health Records</h3>
              <p className="text-sm text-gray-500">
                Track your health measurements over time
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="bg-[#0f769e] hover:bg-[#0c6787] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
            >
              <Plus size={14} /> Add Record
            </button>
          </div>

          {records.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-500">
              <TrendingUp size={36} className="mb-3" />
              <p className="text-sm text-center">
                No health records yet. Add your first record to start tracking!
              </p>
            </div>
          ) : (
            <HealthTable records={records} />
          )}
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="
            bg-white
            w-full max-w-3xl
            max-h-[90vh]
            overflow-y-auto
            rounded-2xl
            shadow-2xl
            relative
            animate-in
            fade-in
            zoom-in
            duration-200
          ">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X size={18} />
            </button>

            <HealthForm onSaved={() => {
              setOpen(false);
              location.reload();
            }} />
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, unit, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-6 py-5 flex justify-between items-center shadow-sm">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-lg font-semibold">
          {value} <span className="text-sm text-gray-400">{unit}</span>
        </p>
      </div>
      {children}
    </div>
  );
}
