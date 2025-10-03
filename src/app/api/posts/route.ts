import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { Post } from "@/models/Post";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change";

export const runtime = "nodejs";

function isAdminFromRequest(req: NextRequest | Request): boolean {
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

export const dynamic = "force-dynamic";

export async function GET() {
  await connectToDatabase();
  const posts = await Post.find({}).sort({ date: -1 }).select("title date author imageUrl");
  return NextResponse.json(posts, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}

export async function POST(req: NextRequest | Request) {
  if (!isAdminFromRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();
  const body = await req.json();
  const { title, date, author, content, imageUrl, category, tags } = body;
  if (!title || !author || !content) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const normalizedTags = Array.isArray(tags)
    ? tags.filter((t: unknown) => typeof t === "string").map((t: string) => t.trim()).filter(Boolean)
    : typeof tags === "string"
      ? tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];
  const post = await Post.create({
    title,
    date: date ? new Date(date) : new Date(),
    author,
    content,
    imageUrl,
    category: typeof category === "string" ? category.trim() : undefined,
    tags: normalizedTags,
  });
  try { revalidateTag("posts"); } catch {}
  return NextResponse.json(post, { status: 201 });
}


