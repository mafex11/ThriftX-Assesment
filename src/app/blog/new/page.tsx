import React from "react";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import NavigationBar from "@/components/NavigationBar/navigation";
import Footer from "@/components/Footer/footer";
import NewPostForm from "@/app/blog/new/post-form";

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

export default async function NewBlogPostPage() {
  await ensureAdminOrRedirect();
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <NavigationBar />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-semibold mb-6">New Post</h1>
        <NewPostForm />
      </main>
      <Footer />
    </div>
  );
}


