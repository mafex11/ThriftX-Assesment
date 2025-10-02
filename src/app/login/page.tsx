"use client"

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NavigationBar from "@/components/NavigationBar/navigation";
import Footer from "@/components/Footer/footer";

export default function LoginPage() {
  const { login } = useAuthContext();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <NavigationBar />
      <main className="flex-1 px-6 sm:px-8 lg:px-10 flex items-center justify-center">
        <div className="w-full max-w-xl">
          <h1 className="text-4xl md:text-5xl font-semibold mb-8 text-center">Login</h1>
          <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-base">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
              className="h-12 text-base"
            />
          </div>
          <div>
            <label className="block mb-2 text-base">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="h-12 text-base"
            />
          </div>
          {error ? (
            <p className="text-red-400 text-sm">{error}</p>
          ) : null}
          <Button type="submit" disabled={loading} className="w-full h-12 text-base">
            {loading ? "Logging in..." : "Login"}
          </Button>
          </form>
          <p className="mt-6 text-sm text-gray-300 text-center">
            Don&apos;t have an account? <Link href="/signup" className="underline">Sign up</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}


