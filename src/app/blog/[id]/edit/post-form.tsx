"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload/image-upload";

type Post = {
  _id: string;
  title: string;
  date: string;
  author: string;
  content: string;
  imageUrl?: string;
  category?: string;
  tags?: string[];
}

export default function EditPostForm({ post }: { post: Post }) {
  const router = useRouter();
  const [title, setTitle] = useState(post.title);
  const [date, setDate] = useState(post.date);
  const [author, setAuthor] = useState(post.author);
  const [imageUrl, setImageUrl] = useState(post.imageUrl || "");
  const [category, setCategory] = useState(post.category || "");
  const [tagsInput, setTagsInput] = useState((post.tags || []).join(", "));
  const [tags, setTags] = useState<string[]>(post.tags || []);
  const [content, setContent] = useState(post.content);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch(`/api/posts/${post._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date, author, content, imageUrl, category, tags })
    });
    setLoading(false);
    if (res.ok) {
      router.push(`/blog/${post._id}`);
    } else if (res.status === 401) {
      setError("Unauthorized. Please login as admin.");
      router.push("/login");
    } else {
      const j = await res.json().catch(() => ({} as any));
      setError(j?.error || "Failed to update post");
    }
  }

  async function onDelete() {
    setShowDeleteConfirm(true);
  }

  async function confirmDelete() {
    setLoading(true);
    const res = await fetch(`/api/posts/${post._id}`, { method: "DELETE" });
    if (res.ok) router.push("/blog");
    setLoading(false);
  }

  function cancelDelete() {
    setShowDeleteConfirm(false);
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
      <div className="flex gap-3">
        <Button type="submit" disabled={loading || showDeleteConfirm} className="h-8">{loading && !showDeleteConfirm ? "Saving..." : "Save Changes"}</Button>
        {!showDeleteConfirm ? (
          <Button type="button" variant="secondary" onClick={onDelete} disabled={loading} className="h-8">
            Delete
          </Button>
        ) : (
          <>
            <Button type="button" variant="destructive" onClick={confirmDelete} disabled={loading} className="h-8">
              {loading ? "Deleting..." : "Confirm Delete"}
            </Button>
            <Button type="button" variant="secondary" onClick={cancelDelete} disabled={loading} className="h-8">
              Cancel
            </Button>
          </>
        )}
      </div>
    </form>
  );
}


