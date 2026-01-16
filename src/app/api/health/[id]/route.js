import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import HealthRecord from "@/models/HealthRecord";

/* ================= UPDATE RECORD ================= */
export async function PUT(req, context) {
  await connectDB();

  const { id } = await context.params; // ✅ FIX
  const body = await req.json();

  const updated = await HealthRecord.findByIdAndUpdate(
    id,
    body,
    { new: true }
  );

  return NextResponse.json(updated);
}

/* ================= DELETE RECORD ================= */
export async function DELETE(req, context) {
  await connectDB();

  const { id } = await context.params; // ✅ FIX

  await HealthRecord.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
