import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change";

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/(?:^|; )auth_token=([^;]+)/);
    const token = match ? decodeURIComponent(match[1]) : null;
    if (!token) return NextResponse.json({ user: null }, { status: 200 });
    const payload = jwt.verify(token, JWT_SECRET) as { sub: string; email: string };
    return NextResponse.json({ user: { id: payload.sub, email: payload.email } }, { status: 200 });
  } catch {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}


