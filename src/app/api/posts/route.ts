import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Post } from "@/models/Post";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change";

function isAdminFromRequest(req: Request): boolean {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/(?:^|; )admin_token=([^;]+)/);
    const token = match ? decodeURIComponent(match[1]) : null;
    if (!token) return false;
    const payload = jwt.verify(token, JWT_SECRET) as { role: string };
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function GET() {
  await connectToDatabase();
  const posts = await Post.find({}).sort({ date: -1 }).select("title date author imageUrl");
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  if (!isAdminFromRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();
  const body = await req.json();
  const { title, date, author, content, imageUrl } = body;
  if (!title || !author || !content) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const post = await Post.create({ title, date: date ? new Date(date) : new Date(), author, content, imageUrl });
  return NextResponse.json(post, { status: 201 });
}


