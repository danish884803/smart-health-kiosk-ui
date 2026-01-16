"use client";

import { useState, useMemo } from "react";

export default function HealthForm({ onSaved }) {
  const [form, setForm] = useState({
    height: "",
    weight: "",
    temperature: "",
    heartRate: "",
    systolic: "",
    diastolic: "",
    oxygen: "",
    glucose: "",
    age: "",
    gender: "",
    notes: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  /* ================= BMI LOGIC (LIVE) ================= */
  const { bmi, bmiStatus, bmiColor } = useMemo(() => {
    const h = parseFloat(form.height);
    const w = parseFloat(form.weight);

    if (!h || !w) {
      return { bmi: "--", bmiStatus: "", bmiColor: "bg-gray-100" };
    }

    const heightM = h / 100;
    const value = (w / (heightM * heightM)).toFixed(1);

    if (value < 18.5)
      return { bmi: value, bmiStatus: "Underweight", bmiColor: "bg-yellow-100" };
    if (value < 25)
      return { bmi: value, bmiStatus: "Normal", bmiColor: "bg-green-100" };
    if (value < 30)
      return { bmi: value, bmiStatus: "Overweight", bmiColor: "bg-orange-100" };

    return { bmi: value, bmiStatus: "Obese", bmiColor: "bg-red-100" };
  }, [form.height, form.weight]);

  async function submit(e) {
    e.preventDefault();

    await fetch("/api/health/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        bmi,
        bmiStatus,
      }),
    });

    onSaved();
  }

  return (
    <form onSubmit={submit} className="p-8 space-y-10">

      {/* HEADER */}
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Add Health Record
        </h2>
      </div>

      {/* BASIC VITALS */}
      <Section title="Basic Vitals">
        <Input
          label="Height (cm)"
          name="height"
          type="number"
          value={form.height}
          onChange={handleChange}
        />
        <Input
          label="Weight (kg)"
          name="weight"
          type="number"
          value={form.weight}
          onChange={handleChange}
        />
        <Input
          label="Temperature (°C)"
          name="temperature"
          value={form.temperature}
          onChange={handleChange}
        />
        <Input
          label="Heart Rate (BPM)"
          name="heartRate"
          value={form.heartRate}
          onChange={handleChange}
        />

        {/* BMI BOX */}
        <div
          className={`md:col-span-2 rounded-lg px-5 py-4 flex justify-between items-center ${bmiColor}`}
        >
          <span className="text-sm font-medium text-gray-700">
            Calculated BMI
          </span>
          <span className="text-lg font-semibold text-[#0f769e]">
            {bmi} {bmi !== "--" && `(${bmiStatus})`}
          </span>
        </div>
      </Section>

      {/* EXTENDED VITALS */}
      <Section title="Extended Vitals">
        <Input
          label="Blood Pressure Systolic (mmHg)"
          name="systolic"
          value={form.systolic}
          onChange={handleChange}
        />
        <Input
          label="Blood Pressure Diastolic (mmHg)"
          name="diastolic"
          value={form.diastolic}
          onChange={handleChange}
        />
        <Input
          label="Blood Oxygen Level (%)"
          name="oxygen"
          value={form.oxygen}
          onChange={handleChange}
        />
        <Input
          label="Blood Glucose (mg/dL)"
          name="glucose"
          value={form.glucose}
          onChange={handleChange}
        />
      </Section>

      {/* PROFILE */}
      <Section title="Profile Information">
        <Input
          label="Age"
          name="age"
          value={form.age}
          onChange={handleChange}
        />

        <div>
          <label className="text-sm font-medium text-gray-600">
            Gender
          </label>
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
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-600">
            Medical Notes
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Any additional health notes or medical history..."
            className="input mt-1 min-h-[100px]"
          />
        </div>
      </Section>

      {/* FOOTER */}
      <div className="pt-4 border-t">
        <button
          type="submit"
          className="
            w-full
            bg-[#0f769e]
            hover:bg-[#0c6787]
            text-white
            py-3
            rounded-lg
            font-medium
            transition
          "
        >
          Save Health Record
        </button>
      </div>
    </form>
  );
}

/* ================= HELPERS ================= */

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-[16px] font-semibold text-[#0f769e] mb-5">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {children}
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-600">
        {label}
      </label>
      <input
        {...props}
        className="input mt-1"
      />
    </div>
  );
}
