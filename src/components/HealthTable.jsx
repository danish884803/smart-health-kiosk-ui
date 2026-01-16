"use client";

import { Pencil, Trash2 } from "lucide-react";

export default function HealthTable({ records, onEdit, onDelete }) {
  return (
    <div className="space-y-3">
      {records.map(record => (
        <div
          key={record._id}   // ✅ REQUIRED
          className="border rounded-lg p-4 flex justify-between items-center"
        >
          <div>
            <p className="font-medium">
              BMI: {record.bmi} ({record.bmiStatus})
            </p>
            <p className="text-sm text-gray-500">
              {new Date(record.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onEdit(record)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Pencil size={16} />
            </button>

            <button
              onClick={() => onDelete(record._id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
