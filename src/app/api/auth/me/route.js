import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function GET() {
  const cookieStore = await cookies(); // ✅ await REQUIRED
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = verifyToken(token);

  return Response.json({
    email: user.email, // ⭐ MUST EXIST
  });
}
