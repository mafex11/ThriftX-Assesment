import React from "react";
import NavigationBar from "@/components/NavigationBar/navigation";
import Footer from "@/components/Footer/footer";
import { connectToDatabase } from "@/lib/db";
import { Post } from "@/models/Post";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function isAdminFromCookies(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value || null;
    if (!authToken) return false;
    const payload = jwt.verify(authToken, JWT_SECRET) as { sub: string; email: string };
    const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@admin.com").toLowerCase();
    return payload.email?.toLowerCase() === ADMIN_EMAIL;
  } catch {
    return false;
  }
}

export default async function BlogPage({}: {}) {
  await connectToDatabase();
  const posts = await Post.find({}, { title: 1, date: 1, author: 1, imageUrl: 1, content: 1 }).sort({ date: -1 }).lean();
  const isAdmin = await isAdminFromCookies();
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <NavigationBar />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-semibold">Blogs</h1>
          {isAdmin ? (
            <Link href="/blog/new" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white text-black text-2xl leading-none">+</Link>
          ) : null}
        </div>
        <div className="space-y-6">
          {posts.map((p: any) => {
            const plain = (p.content || "").replace(/<[^>]*>/g, "");
            const preview = plain.length > 220 ? plain.slice(0, 220) + "…" : plain;
            return (
              <div key={p._id.toString()} className="border border-zinc-800 rounded-lg p-5 hover:bg-zinc-900">
                <div className="flex items-start gap-5">
                  {p.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.imageUrl} alt="" className="w-48 h-32 object-cover rounded" />
                  ) : null}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-2xl font-medium mb-1">
                        <Link href={`/blog/${p._id}`}>{p.title}</Link>
                      </h2>
                      {isAdmin ? (
                        <Link href={`/blog/${p._id}/edit`} className="text-sm px-3 py-1 rounded border border-zinc-700 hover:bg-zinc-800">
                          Edit
                        </Link>
                      ) : null}
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{new Date(p.date).toLocaleDateString()} · {p.author}</p>
                    <p className="text-gray-300 leading-relaxed">{preview}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}

