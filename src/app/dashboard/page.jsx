"use client";

import { useEffect, useState } from "react";
import {
  Heart,
  Thermometer,
  Droplets,
  Wind,
  Scale,
  TrendingUp,
  Plus
} from "lucide-react";

import HealthForm from "@/components/HealthForm";
import HealthTable from "@/components/HealthTable";

export default function DashboardPage() {
  const [records, setRecords] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  /* ================= LOAD RECORDS ================= */
  useEffect(() => {
    fetch("/api/health/records")
      .then(res => res.json())
      .then(setRecords);
  }, []);

  const latest = records.length > 0 ? records[0] : null;

  /* ================= ADD / EDIT (OPTIMISTIC) ================= */
  function handleSaved(savedRecord) {
    setOpen(false);
    setEditing(null);

    setRecords(prev => {
      const exists = prev.find(r => r._id === savedRecord._id);

      if (exists) {
        // EDIT
        return prev.map(r =>
          r._id === savedRecord._id ? savedRecord : r
        );
      }

      // ADD (newest first)
      return [savedRecord, ...prev];
    });
  }

  /* ================= EDIT ================= */
  function handleEdit(record) {
    setEditing(record);
    setOpen(true);
  }

  /* ================= DELETE (OPTIMISTIC) ================= */
  async function handleDelete(id) {
    const previous = records;
    setRecords(records.filter(r => r._id !== id));

    try {
      await fetch(`/api/health/${id}`, { method: "DELETE" });
    } catch {
      setRecords(previous);
      alert("Delete failed");
    }
  }

  return (
    <div className="bg-[#f7f9fb] min-h-screen p-6 space-y-6">

      {/* ================= TOP STATS ================= */}
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

      {/* ================= LOWER GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* BMI STATUS */}
        <div className="bg-[#eef3f4] border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Scale size={18} />
            <h3 className="text-[16px] font-semibold">BMI Status</h3>
          </div>

          {latest ? (
            <>
              <div className="text-3xl font-semibold">{latest.bmi}</div>
              <p className="text-sm text-gray-600 mt-1">
                {latest.bmiStatus}
              </p>

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
              onClick={() => {
                setEditing(null);
                setOpen(true);
              }}
              className="bg-[#0f769e] hover:bg-[#0c6787] text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus size={14} /> Add Record
            </button>
          </div>

          {records.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-500">
              <TrendingUp size={36} className="mb-3" />
              <p>No health records yet.</p>
            </div>
          ) : (
            <HealthTable
              records={records}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white max-w-3xl w-full rounded-xl">
            <HealthForm
              initialData={editing}
              onSaved={handleSaved}
              onClose={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= STAT CARD ================= */
function StatCard({ title, value, unit, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-6 py-5 flex justify-between items-center shadow-sm">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-lg font-semibold">
          {value}{" "}
          <span className="text-sm text-gray-400">{unit}</span>
        </p>
      </div>
      {children}
    </div>
  );
}
