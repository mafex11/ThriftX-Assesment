import React from "react";
import NavigationBar from "@/components/NavigationBar/navigation";
import Footer from "@/components/Footer/footer";
import { connectToDatabase } from "@/lib/db";
import { Post } from "@/models/Post";
import Image from "next/image";
import { getOptimizedImageUrl } from "@/lib/cloudinary";

export default async function PostPage({ params }: { params: { id: string } }) {
  await connectToDatabase();
  const post = await Post.findById(params.id).lean<{ title: string; date: Date; author: string; content: string; imageUrl?: string; category?: string; tags?: string[] }>();
  if (!post) return <div className="min-h-screen bg-zinc-950 text-white"><NavigationBar /><main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">Not found</main><Footer /></div>;
  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      <NavigationBar />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <h1 className="text-3xl font-semibold break-words">{post.title}</h1>
        <p className="text-sm text-gray-400">{new Date(post.date).toLocaleDateString()} · {post.author}</p>
        {post.imageUrl ? (
          <div className="relative w-full h-[420px]">
            <Image
              src={getOptimizedImageUrl(post.imageUrl, { 
                width: 1200, 
                height: 420, 
                quality: 'auto' 
              })}
              alt={post.title}
              fill
              className="object-cover rounded"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
        ) : null}
        {(post.category || (post.tags && post.tags.length)) ? (
          <div className="flex flex-wrap gap-2 text-xs text-gray-300">
            {post.category ? (
              <span className="px-2 py-0.5 rounded-full border border-zinc-700">{post.category}</span>
            ) : null}
            {(post.tags || []).map((t, i) => (
              <span key={i} className="px-2 py-0.5 rounded-full border border-zinc-800">#{t}</span>
            ))}
          </div>
        ) : null}
        <article className="prose prose-invert max-w-none break-words overflow-wrap-anywhere">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
      <Footer />
    </div>
  );
}
