"use client";

import { useState, useMemo } from "react";
import { X } from "lucide-react";

export default function HealthForm({ onSaved, onClose, initialData }) {
  const [form, setForm] = useState({
    height: initialData?.height ?? "",
    weight: initialData?.weight ?? "",
    temperature: initialData?.temperature ?? "",
    heartRate: initialData?.heartRate ?? "",
    systolic: initialData?.systolic ?? "",
    diastolic: initialData?.diastolic ?? "",
    oxygen: initialData?.oxygen ?? "",
    glucose: initialData?.glucose ?? "",
    age: initialData?.age ?? "",
    gender: initialData?.gender ?? "",
    notes: initialData?.notes ?? "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  /* ================= LIVE BMI ================= */
  const { bmi, bmiStatus, bmiColor } = useMemo(() => {
    const h = parseFloat(form.height);
    const w = parseFloat(form.weight);

    if (!h || !w) return { bmi: "--", bmiStatus: "", bmiColor: "bg-gray-100" };

    const value = (w / ((h / 100) ** 2)).toFixed(1);

    if (value < 18.5) return { bmi: value, bmiStatus: "Underweight", bmiColor: "bg-yellow-100" };
    if (value < 25) return { bmi: value, bmiStatus: "Normal", bmiColor: "bg-green-100" };
    if (value < 30) return { bmi: value, bmiStatus: "Overweight", bmiColor: "bg-orange-100" };

    return { bmi: value, bmiStatus: "Obese", bmiColor: "bg-red-100" };
  }, [form.height, form.weight]);

  async function submit(e) {
    e.preventDefault();

    const url = initialData
      ? `/api/health/${initialData._id}`
      : "/api/health/add";

    const method = initialData ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, bmi, bmiStatus }),
    });

    const saved = await res.json();
    onSaved(saved);
  }

  return (
    <form
      onSubmit={submit}
      className="relative max-h-[90vh] overflow-y-auto p-8 space-y-10"
    >

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-semibold">
          {initialData ? "Edit Health Record" : "Add Health Record"}
        </h2>

        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>

      {/* ================= BASIC VITALS ================= */}
      <Section title="Basic Vitals">
        <Input label="Height (cm)" name="height" value={form.height} onChange={handleChange} placeholder="170" />
        <Input label="Weight (kg)" name="weight" value={form.weight} onChange={handleChange} placeholder="70" />
        <Input label="Temperature (°C)" name="temperature" value={form.temperature} onChange={handleChange} placeholder="36.5" />
        <Input label="Heart Rate (BPM)" name="heartRate" value={form.heartRate} onChange={handleChange} placeholder="72" />

        <div className={`md:col-span-2 rounded-lg px-5 py-4 flex justify-between ${bmiColor}`}>
          <span className="text-sm font-medium">Calculated BMI</span>
          <span className="font-semibold">
            {bmi} {bmi !== "--" && `(${bmiStatus})`}
          </span>
        </div>
      </Section>

      {/* ================= EXTENDED ================= */}
      <Section title="Extended Vitals">
        <Input label="BP Systolic (mmHg)" name="systolic" value={form.systolic} onChange={handleChange} placeholder="120" />
        <Input label="BP Diastolic (mmHg)" name="diastolic" value={form.diastolic} onChange={handleChange} placeholder="80" />
        <Input label="Blood Oxygen (%)" name="oxygen" value={form.oxygen} onChange={handleChange} placeholder="98" />
        <Input label="Glucose (mg/dL)" name="glucose" value={form.glucose} onChange={handleChange} placeholder="100" />
      </Section>

      {/* ================= PROFILE ================= */}
      <Section title="Profile Information">
        <Input label="Age" name="age" value={form.age} onChange={handleChange} placeholder="25" />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="input mt-1"
        >
          <option value="">Select gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Medical notes..."
          className="input md:col-span-2 min-h-[100px]"
        />
      </Section>

      {/* ================= FOOTER ================= */}
      <div className="sticky bottom-0 bg-white pt-4 border-t">
        <button
          type="submit"
          className="w-full bg-[#0f769e] hover:bg-[#0c6787] text-white py-3 rounded-lg font-medium"
        >
          {initialData ? "Update Health Record" : "Save Health Record"}
        </button>
      </div>
    </form>
  );
}

/* ================= HELPERS ================= */

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-[#0f769e] font-semibold mb-4">{title}</h3>
      <div className="grid md:grid-cols-2 gap-5">{children}</div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input {...props} className="input mt-1" />
    </div>
  );
}
