import { connectDB } from "@/lib/db";
import HealthRecord from "@/models/HealthRecord";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function GET() {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return new Response("Unauthorized", { status: 401 });

  const { id } = verifyToken(token);

  const records = await HealthRecord.find({ userId: id }).sort({ createdAt: -1 });
  return Response.json(records);
}
