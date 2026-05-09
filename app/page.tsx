export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-12 shadow-[0_0_120px_rgba(255,255,255,0.06)] backdrop-blur-md">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
          <div className="relative z-10">
            <p className="mb-6 text-sm uppercase tracking-[0.35em] text-slate-400">Welcome to the future</p>
            <h1 className="text-6xl font-black tracking-tight text-white sm:text-7xl">
              UNCUT OS
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-300 sm:text-2xl">
              The Operating System of the Future
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/login"
                className="inline-flex rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition hover:bg-slate-200"
              >
                Login
              </a>
              <a
                href="/files"
                className="inline-flex rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Files
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
