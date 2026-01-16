import { connectDB } from "@/lib/db";
import HealthRecord from "@/models/HealthRecord";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { calculateBMI } from "@/lib/bmi";

export async function POST(req) {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return new Response("Unauthorized", { status: 401 });

  const { id } = verifyToken(token);
  const data = await req.json();

  const bmiData = calculateBMI(data.height, data.weight);

  await HealthRecord.create({
    userId: id,
    ...data,
    bmi: bmiData.bmi,
    bmiStatus: bmiData.status,
  });

  return Response.json({ success: true });
}
