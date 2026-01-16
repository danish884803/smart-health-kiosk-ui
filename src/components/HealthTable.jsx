import { Pencil, Trash2 } from "lucide-react";

export default function HealthTable({ records, onEdit, onDelete }) {
  return (
    <div className="space-y-3">
      {records.map(r => (
        <div
          key={r._id}
          className="
            bg-white
            border border-gray-200
            rounded-lg
            px-4 py-3
            flex justify-between items-center
            text-sm
          "
        >
          <div>
            <div className="font-medium text-gray-800">
              BMI: {r.bmi} ({r.bmiStatus})
            </div>
            <div className="text-gray-400 text-xs">
              {new Date(r.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onEdit(r)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Pencil size={16} />
            </button>

            <button
              onClick={() => onDelete(r._id)}
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
