import React from "react";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import NavigationBar from "@/components/NavigationBar/navigation";
import Footer from "@/components/Footer/footer";
import { connectToDatabase } from "@/lib/db";
import { Post, IPost } from "@/models/Post";
import EditPostForm from "./post-form";
import { Types } from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change";

async function ensureAdminOrRedirect() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value || null;
    if (!token) redirect("/login");
    const payload = jwt.verify(token, JWT_SECRET) as { role: string };
    if (payload.role !== "admin") redirect("/login");
  } catch {
    redirect("/login");
  }
}

type ILeanPost = {
  _id: Types.ObjectId;
  title: string;
  date: Date;
  author: string;
  content: string;
  imageUrl?: string;
  category?: string;
  tags?: string[];
};

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  await ensureAdminOrRedirect();
  await connectToDatabase();
  const { id } = await params;
  const doc = await Post.findById(id).lean<ILeanPost>();
  if (!doc || Array.isArray(doc)) redirect("/blog");
  const post = doc as ILeanPost;
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <NavigationBar />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-semibold mb-6">Edit Post</h1>
        <EditPostForm post={{
          _id: post._id.toString(),
          title: post.title as any,
          date: new Date(post.date as any).toISOString().slice(0,10),
          author: post.author as any,
          imageUrl: (post as any).imageUrl || "",
          content: post.content as any,
          category: (post as any).category || "",
          tags: (post as any).tags || [],
        }} />
      </main>
      <Footer />
    </div>
  );
}


