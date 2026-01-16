import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function GET() {
  const cookieStore = await cookies();   // ✅ FIX
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return new Response(null, { status: 401 });
  }

  const data = verifyToken(token);

  return Response.json({ userId: data.id });
}
