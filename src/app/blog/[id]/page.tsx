import React from "react";
import NavigationBar from "@/components/NavigationBar/navigation";
import Footer from "@/components/Footer/footer";
import { connectToDatabase } from "@/lib/db";
import { Post } from "@/models/Post";

export default async function PostPage({ params }: { params: { id: string } }) {
  await connectToDatabase();
  const post = await Post.findById(params.id).lean<{ title: string; date: Date; author: string; content: string; imageUrl?: string; category?: string; tags?: string[] }>();
  if (!post) return <div className="min-h-screen bg-zinc-950 text-white"><NavigationBar /><main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">Not found</main><Footer /></div>;
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <NavigationBar />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <h1 className="text-3xl font-semibold">{post.title}</h1>
        <p className="text-sm text-gray-400">{new Date(post.date).toLocaleDateString()} · {post.author}</p>
        {post.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.imageUrl} alt="" className="w-full max-h-[420px] object-cover rounded" />
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
        <article className="prose prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
      <Footer />
    </div>
  );
}
