"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    console.log("Login attempt started with email:", email);

    if (!email || !password) {
      const errorMsg = "Please enter both email and password.";
      console.error(errorMsg);
      alert(errorMsg);
      return;
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const missing = [];
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) missing.push("NEXT_PUBLIC_SUPABASE_URL");
      if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
      const message = `Missing Supabase env vars: ${missing.join(", ")}`;
      console.error(message);
      alert(message);
      return;
    }

    console.log("Supabase client initialized with URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

    try {
      console.log("Calling supabase.auth.signInWithPassword...");
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Supabase login error:", error);
        alert(`Login failed: ${error.message}`);
        return;
      }

      console.log("Login successful:", data);
      alert("Success!");
      router.push("/files");
    } catch (err) {
      console.error("Unexpected login error:", err);
      alert("An unexpected error occurred. Check the console.");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-10 shadow-[0_0_120px_rgba(255,255,255,0.05)] backdrop-blur-md">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-slate-400">Secure access</p>
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">Login</h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Sign in to continue to the Operating System of the Future.
          </p>

          <div className="mt-10 space-y-5 text-left">
            <label className="block text-sm font-semibold text-slate-200">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-200">
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10"
              />
            </label>
            <button
              type="button"
              onClick={handleLogin}
              className="w-full rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-slate-200"
            >
              Login
            </button>
          </div>

          <div className="mt-8 text-sm text-slate-500">
            <Link href="/" className="font-semibold text-slate-100 hover:text-white">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
