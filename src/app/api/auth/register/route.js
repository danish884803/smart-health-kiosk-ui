// import { connectDB } from "@/lib/db";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   await connectDB();
//   const { email, password } = await req.json();

//   const hashed = await bcrypt.hash(password, 10);
//   await User.create({ email, password: hashed });

//   return NextResponse.json({ message: "Registered" });
// }
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const { email, password } = await req.json();

  const exists = await User.findOne({ email });
  if (exists) {
    return NextResponse.json(
      { error: "User already exists" },
      { status: 400 }
    );
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed });

  // ✅ AUTO LOGIN
  const token = signToken(user);

  const res = NextResponse.json({
    email: user.email,
  });

  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
  });

  return res;
}
