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
  const posts = await Post.find({}, { title: 1, date: 1, author: 1, imageUrl: 1, content: 1, category: 1, tags: 1 }).sort({ date: -1 }).lean();
  const isAdmin = await isAdminFromCookies();
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <NavigationBar />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-12 space-y-10">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-semibold">Blogs</h1>
          {isAdmin ? (
            <Link href="/blog/new" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white text-black text-2xl leading-none">+</Link>
          ) : null}
        </div>
        <div className="space-y-8">
          {posts.map((p: any) => {
            const plain = (p.content || "").replace(/<[^>]*>/g, "");
            const preview = plain.length > 220 ? plain.slice(0, 220) + "…" : plain;
            return (
              <div key={p._id.toString()} className="relative border border-zinc-800 rounded-xl p-5 md:p-7 hover:bg-zinc-900">
                <Link href={`/blog/${p._id}`} className="absolute inset-0" aria-label={`Read ${p.title}`} />
                <div className="relative z-10 flex items-start gap-5 md:gap-7 pointer-events-none">
                  {p.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.imageUrl} alt="" className="w-48 h-32 md:w-64 md:h-40 lg:w-80 lg:h-48 object-cover rounded-lg" />
                  ) : null}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-2xl md:text-3xl font-medium mb-1">{p.title}</h2>
                      {isAdmin ? (
                        <Link href={`/blog/${p._id}/edit`} className="pointer-events-auto relative z-20 text-sm px-3 py-1 rounded border border-zinc-700 hover:bg-zinc-800">
                          Edit
                        </Link>
                      ) : null}
                    </div>
                    <p className="text-sm md:text-base text-gray-400 mb-2">{new Date(p.date).toLocaleDateString()} · {p.author}</p>
                    {p.category || (p.tags && p.tags.length) ? (
                      <div className="mb-3 flex flex-wrap gap-2 text-xs text-gray-300">
                        {p.category ? (
                          <span className="px-2 py-0.5 rounded-full border border-zinc-700">{p.category}</span>
                        ) : null}
                        {(p.tags || []).map((t: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 rounded-full border border-zinc-800">#{t}</span>
                        ))}
                      </div>
                    ) : null}
                    <p className="text-gray-300 leading-relaxed md:text-lg">{preview}</p>
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

