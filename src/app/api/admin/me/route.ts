import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change";

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/(?:^|; )admin_token=([^;]+)/);
    const token = match ? decodeURIComponent(match[1]) : null;
    if (!token) return NextResponse.json({ admin: null }, { status: 200 });
    const payload = jwt.verify(token, JWT_SECRET) as { role: string };
    if (payload.role !== "admin") return NextResponse.json({ admin: null }, { status: 200 });
    return NextResponse.json({ admin: { role: "admin" } }, { status: 200 });
  } catch {
    return NextResponse.json({ admin: null }, { status: 200 });
  }
}


