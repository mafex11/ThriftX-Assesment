"use client"

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import NavigationBar from "@/components/NavigationBar/navigation";
import Footer from "@/components/Footer/footer";

export default function SignupPage() {
  const { signup } = useAuthContext();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*()_\-+={}\[\]|\\:;"'<>.,?/~`]/.test(password);
  const passwordValid = hasUppercase && hasNumber && hasSpecial;
  const passwordsMatch = password === confirmPassword || confirmPassword.length === 0;
  const criteriaMet = [hasUppercase, hasNumber, hasSpecial].filter(Boolean).length;
  const strengthPct = (criteriaMet / 3) * 100;
  const strengthLabel = criteriaMet === 0 ? "Very weak" : criteriaMet === 1 ? "Weak" : criteriaMet === 2 ? "Okay" : "Strong";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!passwordValid) {
      setError("Password must include 1 uppercase letter, 1 number, and 1 special character.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await signup(email, password);
      router.push("/");
    } catch (err) {
      setError("Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <NavigationBar />
      <main className="flex-1 px-6 sm:px-8 lg:px-10 flex items-center justify-center">
        <div className="w-full max-w-xl">
          <h1 className="text-4xl md:text-5xl font-semibold mb-8 text-center">Sign up</h1>
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
              placeholder="Create a password"
              required
              className={
                `h-12 text-base${
                  password.length > 0
                    ? passwordValid
                      ? " border-emerald-500"
                      : " border-zinc-800"
                    : ""
                }`
              }
            />
          </div>
          <div>
            <label className="block mb-2 text-base">Confirm password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
              className="h-12 text-base"
            />
            {confirmPassword.length > 0 && !passwordsMatch ? (
              <p className="mt-1 text-xs text-red-400">Passwords do not match</p>
            ) : null}
            <div className="mt-3">
              <Progress value={strengthPct} />
              <p className="mt-1 text-xs text-zinc-400">Password strength: {strengthLabel}</p>
            </div>
            <ul className="mt-2 text-xs space-y-1">
              <li className={hasUppercase ? "text-emerald-400" : "text-zinc-400"}>{hasUppercase ? "✓" : "✗"} At least 1 uppercase letter</li>
              <li className={hasNumber ? "text-emerald-400" : "text-zinc-400"}>{hasNumber ? "✓" : "✗"} At least 1 number</li>
              <li className={hasSpecial ? "text-emerald-400" : "text-zinc-400"}>{hasSpecial ? "✓" : "✗"} At least 1 special character</li>
            </ul>
          </div>
          {error ? (
            <p className="text-red-400 text-sm">{error}</p>
          ) : null}
          <Button type="submit" disabled={loading || !passwordValid || !passwordsMatch} className="w-full h-12 text-base">
            {loading ? "Creating account..." : "Create account"}
          </Button>
          </form>
          <p className="mt-6 text-sm text-gray-300 text-center">
            Already have an account? <Link href="/login" className="underline">Login</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}


