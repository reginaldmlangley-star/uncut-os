import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-10 shadow-[0_0_120px_rgba(255,255,255,0.05)] backdrop-blur-md">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-slate-400">Secure access</p>
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">Login</h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Sign in to continue to the Operating System of the Future.
          </p>

          <form className="mt-10 space-y-5 text-left">
            <label className="block text-sm font-semibold text-slate-200">
              Email
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-200">
              Password
              <input
                type="password"
                placeholder="••••••••"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10"
              />
            </label>
            <button
              type="button"
              className="w-full rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-slate-200"
            >
              Login
            </button>
          </form>

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
