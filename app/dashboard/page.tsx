"use client";

import { useState, useEffect, FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

type Interview = {
  id: string;
  fighter_id?: string;
  interviewee_id?: string;
  date?: string;
  scheduled_at?: string;
  notes?: string;
  fighter_name?: string;
};

export default function DashboardPage() {
  const [fighterName, setFighterName] = useState("");
  const [fighterRole, setFighterRole] = useState("");
  const [fighterPower, setFighterPower] = useState("");
  const [interviews, setInterviews] = useState<Interview[]>([]);

  useEffect(() => {
    loadInterviews();
  }, []);

  async function loadInterviews() {
    console.log("Loading interviews...");
    try {
      const { data, error } = await supabase
        .from("interviews")
        .select(`
          *,
          fighters (
            name
          )
        `);

      if (error) {
        console.error("Error loading interviews:", error);
        window.alert(`Fetch failed: ${error.message}`);
        return;
      }

      console.log("Raw interviews data:", data);

      if (data) {
        const interviewsWithNames = data.map((interview: any) => {
          let fighterName = `ID: ${interview.interviewee_id || interview.id}`;
          if (interview.fighters?.name) {
            fighterName = interview.fighters.name;
          } else if (interview.fighters?.[0]?.name) {
            fighterName = interview.fighters[0].name;
          }
          return {
            ...interview,
            fighter_name: fighterName,
          };
        });
        console.log("Processed interviews:", interviewsWithNames);
        setInterviews(interviewsWithNames);
      } else {
        console.log("No interviews data returned");
      }
    } catch (err) {
      console.error("Unexpected error loading interviews:", err);
      window.alert("Unexpected error loading interviews. Check console.");
    }
  }

  async function handleAddFighter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!fighterName || !fighterRole) {
      const errorMsg = "Enter fighter name and role to add.";
      console.error(errorMsg);
      window.alert(errorMsg);
      return;
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const missing = [];
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) missing.push("NEXT_PUBLIC_SUPABASE_URL");
      if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
      const errorMsg = `Missing Supabase env vars: ${missing.join(", ")}`;
      console.error(errorMsg);
      window.alert(errorMsg);
      return;
    }

    console.log("INSERT_REQUEST:", { name: fighterName, role: fighterRole, power: fighterPower });

    try {
      const { data, error } = await supabase.from("fighters").insert([
        {
          name: fighterName,
          role: fighterRole,
          power: fighterPower || null,
        },
      ]);

      if (error) {
        console.error("Supabase insert error:", error);
        window.alert(`Add fighter failed: ${error.message}`);
        return;
      }

      console.log("Supabase insert success:", data);
      window.alert(`Added fighter: ${fighterName} (${fighterRole})`);
      setFighterName("");
      setFighterRole("");
      setFighterPower("");
    } catch (err) {
      console.error("Unexpected Supabase insert error:", err);
      window.alert("Unexpected error adding fighter. Check console.");
    }
  }

  const statusItems = [
    { label: "Campaign Momentum", value: "92%", bronze: true },
    { label: "Active Threads", value: "8", bronze: false },
    { label: "NPC Heat", value: "74%", bronze: true },
    { label: "Session Readiness", value: "Ready", bronze: false },
  ];

  const contentIdeas = [
    "Immersive fight club broadcast with hidden lore reveals",
    "Bronze alliance fighter showcase video series",
    "Daily battle debrief podcast clip for premium members",
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <header className="mb-10 overflow-hidden rounded-[2rem] border border-[#b07b2e] bg-[#0c0c0c]/95 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">Media Empire</p>
              <h1 className="mt-4 text-5xl font-black tracking-tight text-amber-100">UNCUT OS V1</h1>
              <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-300">
                Command center for your crew, content, and live execution.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-[#b07b2e]/40 bg-[#111111] px-6 py-5 text-right">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Daily Execution Score</p>
              <div className="mt-4 h-4 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-300" style={{ width: "78%" }} />
              </div>
              <p className="mt-4 text-3xl font-semibold text-amber-100">78%</p>
              <p className="text-sm text-slate-400">Keep the momentum high and deliver every mission.</p>
            </div>
          </div>
        </header>

        <div className="grid gap-8 xl:grid-cols-[1.4fr_0.95fr]">
          <section className="space-y-8">
            <div className="rounded-[2rem] border border-[#b07b2e]/30 bg-[#0b0b0b]/95 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.4)]">
              <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">Add Fighter</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Recruit a new warrior</h2>
              <p className="mt-3 text-slate-400">
                Use the V1 fighter roster to keep your squad sharp and battle-ready.
              </p>
              <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleAddFighter}>
                <label className="block text-sm text-slate-300">
                  Name
                  <input
                    value={fighterName}
                    onChange={(event) => setFighterName(event.target.value)}
                    placeholder="Rogue Titan"
                    className="mt-3 w-full rounded-2xl border border-[#b07b2e]/40 bg-[#121212] px-4 py-3 text-white outline-none transition focus:border-amber-300/80 focus:ring-2 focus:ring-amber-300/20"
                  />
                </label>
                <label className="block text-sm text-slate-300">
                  Role
                  <input
                    value={fighterRole}
                    onChange={(event) => setFighterRole(event.target.value)}
                    placeholder="Storm Caller"
                    className="mt-3 w-full rounded-2xl border border-[#b07b2e]/40 bg-[#121212] px-4 py-3 text-white outline-none transition focus:border-amber-300/80 focus:ring-2 focus:ring-amber-300/20"
                  />
                </label>
                <label className="block text-sm text-slate-300 sm:col-span-2">
                  Power Tier
                  <input
                    value={fighterPower}
                    onChange={(event) => setFighterPower(event.target.value)}
                    placeholder="Bronze, Silver, Gold"
                    className="mt-3 w-full rounded-2xl border border-[#b07b2e]/40 bg-[#121212] px-4 py-3 text-white outline-none transition focus:border-amber-300/80 focus:ring-2 focus:ring-amber-300/20"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-amber-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-300 sm:col-span-2"
                >
                  Add Fighter
                </button>
              </form>
            </div>

            <div className="rounded-[2rem] border border-[#b07b2e]/30 bg-[#0b0b0b]/95 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">DM Status</p>
                  <h2 className="mt-4 text-3xl font-semibold text-white">Live campaign pulse</h2>
                </div>
                <span className="rounded-full bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-amber-200">
                  V1 Mock</span>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {statusItems.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-[#b07b2e]/20 bg-[#111111] p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{item.label}</p>
                    <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-8">
            <div className="rounded-[2rem] border border-[#b07b2e]/30 bg-[#0b0b0b]/95 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.4)]">
              <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">Content Idea</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Pipeline inspiration</h2>
              <p className="mt-3 text-slate-400">
                Fresh concepts for your Media Empire, ready to deploy in the next session.
              </p>
              <div className="mt-6 space-y-4">
                {contentIdeas.map((idea) => (
                  <div key={idea} className="rounded-3xl border border-[#b07b2e]/20 bg-[#121212] p-5">
                    <p className="text-sm text-amber-100">{idea}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#b07b2e]/30 bg-[#0b0b0b]/95 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">Upcoming Interviews</p>
                  <h2 className="mt-4 text-3xl font-semibold text-white">Scheduled sessions</h2>
                </div>
                <button
                  onClick={loadInterviews}
                  className="rounded-full bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-amber-200 hover:bg-amber-300/20"
                >
                  Refresh
                </button>
              </div>
              <p className="mt-3 text-slate-400">
                Fighter interviews lined up for your Media Empire content.
              </p>
              <div className="mt-6 space-y-4">
                {interviews.length === 0 ? (
                  <div className="rounded-3xl border border-[#b07b2e]/20 bg-[#121212] p-5">
                    <p className="text-sm text-slate-400">No upcoming interviews scheduled.</p>
                  </div>
                ) : (
                  interviews.map((interview) => (
                    <div key={interview.id} className="rounded-3xl border border-[#b07b2e]/20 bg-[#121212] p-5">
                      <p className="text-sm font-semibold text-amber-100">
                        {interview.fighter_name || interview.interviewee_id || interview.fighter_id || `ID: ${interview.id}`}
                      </p>
                      <p className="mt-2 text-xs text-slate-400">
                        {new Date(interview.scheduled_at || interview.date || new Date().toISOString()).toLocaleDateString()}
                      </p>
                      {interview.notes && <p className="mt-2 text-sm text-slate-300">{interview.notes}</p>}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#b07b2e]/30 bg-[#0b0b0b]/95 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.4)]">
              <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">Quick win</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Daily update</h2>
              <div className="mt-6 space-y-4 rounded-3xl border border-[#b07b2e]/20 bg-[#111111] p-5">
                <p className="text-sm text-slate-400">Today's focus: lock in fighter recruitment, finalize the next battle stream, and confirm DM pacing.</p>
                <div className="grid gap-3 text-sm sm:grid-cols-2">
                  <div className="rounded-3xl bg-[#121212] p-4">
                    <p className="text-amber-200 font-semibold">Next Stream</p>
                    <p className="mt-2 text-slate-300">Tomorrow 8 PM</p>
                  </div>
                  <div className="rounded-3xl bg-[#121212] p-4">
                    <p className="text-amber-200 font-semibold">Active Goals</p>
                    <p className="mt-2 text-slate-300">3 targets</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
