import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@admin.com";
const ADMIN_PASS = process.env.ADMIN_PASS || "admin";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ sub: user._id.toString(), email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    const res = NextResponse.json({ id: user._id.toString(), email: user.email });
    res.cookies.set("auth_token", token, { httpOnly: true, path: "/", sameSite: "lax", maxAge: 60 * 60 * 24 * 7, secure: process.env.NODE_ENV === "production" });

    // Clear any stale admin token first
    res.cookies.set("admin_token", "", { httpOnly: true, path: "/", maxAge: 0 });
    // If admin logs in through normal login, also set admin session
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      const adminToken = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1d" });
      res.cookies.set("admin_token", adminToken, { httpOnly: true, path: "/", sameSite: "lax", maxAge: 60 * 60 * 24, secure: process.env.NODE_ENV === "production" });
    }
    return res;
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


