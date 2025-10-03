import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change";
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@admin.com").toLowerCase();

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const authMatch = cookieHeader.match(/(?:^|; )auth_token=([^;]+)/);
    const adminMatch = cookieHeader.match(/(?:^|; )admin_token=([^;]+)/);
    const authToken = authMatch ? decodeURIComponent(authMatch[1]) : null;
    const adminToken = adminMatch ? decodeURIComponent(adminMatch[1]) : null;

    let user: { id: string; email: string } | null = null;
    if (authToken) {
      try {
        const payload = jwt.verify(authToken, JWT_SECRET) as { sub: string; email: string };
        user = { id: payload.sub, email: payload.email };
      } catch {}
    }
    let isAdmin = false;
    if (adminToken) {
      try {
        const ap = jwt.verify(adminToken, JWT_SECRET) as { role: string };
        isAdmin = ap.role === "admin";
      } catch {}
    }
    if (!isAdmin && user?.email) {
      isAdmin = user.email.toLowerCase() === ADMIN_EMAIL;
    }
    return NextResponse.json({ user, isAdmin }, { status: 200 });
  } catch {
    return NextResponse.json({ user: null, isAdmin: false }, { status: 200 });
  }
}


