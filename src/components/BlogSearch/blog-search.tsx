"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface BlogSearchProps {
  initialQuery?: string;
}

export default function BlogSearch({ initialQuery = "" }: BlogSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  // Debounce the search query to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Update URL when debounced query changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    
    if (debouncedQuery.trim()) {
      params.set('q', debouncedQuery);
    } else {
      params.delete('q');
    }

    const newUrl = params.toString() ? `?${params.toString()}` : '/blog';
    router.push(newUrl);
  }, [debouncedQuery, router, searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDebouncedQuery(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts, authors, tags..."
        className="w-56 sm:w-72 md:w-96 bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm outline-none focus:border-zinc-600"
      />
      <button type="submit" className="px-4 py-2 rounded border border-zinc-700 hover:bg-zinc-800 text-sm">
        Search
      </button>
    </form>
  );
}
