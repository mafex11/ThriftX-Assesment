import React from "react";
import { unstable_cache, revalidateTag } from "next/cache";
import NavigationBar from "@/components/NavigationBar/navigation";
import Footer from "@/components/Footer/footer";
import BlogSearch from "@/components/BlogSearch/blog-search";
import { connectToDatabase } from "@/lib/db";
import { Post } from "@/models/Post";
import Link from "next/link";
import Image from "next/image";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getOptimizedImageUrl } from "@/lib/cloudinary";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change";

export const revalidate = 600;
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

const getPostsCached = unstable_cache(
  async (mongoQuery: any) => {
    await connectToDatabase();
    return Post.find(mongoQuery, { title: 1, date: 1, author: 1, imageUrl: 1, content: 1, category: 1, tags: 1 })
      .sort({ date: -1 })
      .lean();
  },
  ["posts-list"],
  { revalidate: 600, tags: ["posts"] }
);

export default async function BlogPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const qRaw = (searchParams?.q ?? "");
  const q = Array.isArray(qRaw) ? qRaw[0] : qRaw;
  const hasQuery = typeof q === "string" && q.trim().length > 0;
  const regex = hasQuery ? new RegExp(q!.trim(), "i") : null;
  const mongoQuery = hasQuery
    ? {
        $or: [
          { title: { $regex: regex } },
          { author: { $regex: regex } },
          { content: { $regex: regex } },
          { category: { $regex: regex } },
          { tags: { $elemMatch: { $regex: regex } } },
        ],
      }
    : {};
  const posts = await getPostsCached(mongoQuery);
  const isAdmin = await isAdminFromCookies();
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <NavigationBar />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-12 space-y-10">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-5xl font-semibold">Blogs</h1>
          <div className="flex items-center gap-3">
            <BlogSearch initialQuery={q || ""} />
            {isAdmin ? (
              <Link href="/blog/new" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white text-black text-2xl leading-none">+</Link>
            ) : null}
          </div>
        </div>
        <div className="space-y-8">
          {posts.map((p: any) => {
            const plain = (p.content || "").replace(/<[^>]*>/g, "");
            const preview = plain.length > 220 ? plain.slice(0, 220) + "…" : plain;
            return (
              <div key={p._id.toString()} className="relative border border-zinc-800 rounded-xl p-5 md:p-7 hover:bg-zinc-900 overflow-hidden">
                <Link href={`/blog/${p._id}`} className="absolute inset-0" aria-label={`Read ${p.title}`} />
                <div className="relative z-10 flex items-start gap-5 md:gap-7 pointer-events-none">
                  {p.imageUrl ? (
                    <div className="relative w-48 h-32 md:w-64 md:h-40 lg:w-80 lg:h-48 flex-shrink-0">
                      <Image
                        src={getOptimizedImageUrl(p.imageUrl, { 
                          width: 320, 
                          height: 192, 
                          quality: 'auto' 
                        })}
                        alt={p.title}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                    </div>
                  ) : null}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-2xl md:text-3xl font-medium mb-1 break-words">{p.title}</h2>
                      {isAdmin ? (
                        <Link href={`/blog/${p._id}/edit`} className="pointer-events-auto relative z-20 text-sm px-3 py-1 rounded border border-zinc-700 hover:bg-zinc-800 flex-shrink-0">
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
                    <p className="text-gray-300 leading-relaxed md:text-lg break-words overflow-wrap-anywhere">{preview}</p>
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

