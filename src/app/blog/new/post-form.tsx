"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload/image-upload";

export default function NewPostForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagsInput, setTagsInput] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date, author, content, imageUrl, category, tags })
    });
    setLoading(false);
    if (res.ok) {
      router.push("/blog");
    } else if (res.status === 401) {
      setError("Unauthorized. Please login as admin.");
      router.push("/login");
    } else {
      const j = await res.json().catch(() => ({} as any));
      setError(j?.error || "Failed to create post");
    }
  }

  return (
    <form onSubmit={onSubmit} className="border border-zinc-800 rounded p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required className="h-12 text-lg" />
        </div>
        <div>
          <label className="block mb-2">Date</label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="h-12 text-lg" />
        </div>
        <div>
          <label className="block mb-2">Author</label>
          <Input value={author} onChange={(e) => setAuthor(e.target.value)} required className="h-12 text-lg" />
        </div>
        <div>
          <label className="block mb-2">Image URL (optional)</label>
          <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Or upload image below" className="h-12 text-lg" />
        </div>
        <div className="md:col-span-2">
          <ImageUpload 
            onImageUpload={setImageUrl}
            currentImageUrl={imageUrl}
            disabled={loading}
          />
        </div>
        <div>
          <label className="block mb-2">Category</label>
          <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Style, News" className="h-12 text-lg" />
        </div>
        <div>
          <label className="block mb-2">Tags</label>
          <Input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="Comma separated (e.g. y2k, denim, thrift)" onBlur={() => setTags(tagsInput.split(",").map(t => t.trim()).filter(Boolean))} className="h-12 text-lg" />
          {tags.length ? (
            <div className="mt-2 text-xs text-gray-400">{tags.join(", ")}</div>
          ) : null}
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2">Content (HTML supported)</label>
          <textarea className="w-full h-48 bg-zinc-900 border border-zinc-800 rounded p-4 text-lg" value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
      </div>
      {error ? <p className="text-red-400 text-sm">{error}</p> : null}
      <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Post"}</Button>
    </form>
  );
}


