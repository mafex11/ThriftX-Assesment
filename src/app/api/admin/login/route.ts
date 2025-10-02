import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "admin";
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1d" });
    const res = NextResponse.json({ ok: true });
    res.cookies.set("admin_token", token, { httpOnly: true, path: "/", sameSite: "lax", maxAge: 60 * 60 * 24 });
    return res;
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


