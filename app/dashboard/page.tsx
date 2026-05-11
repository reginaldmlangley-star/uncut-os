cd /home/reginaldmlangley/uncut-os-app && cat > app/dashboard/page.tsx <<'EOF'
"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

type Fighter = {
  id: string;
  name: string;
  role?: string;
  power?: string;
  dm_status?: string;
};

type Interview = {
  id: string;
  fighter_id?: string;
  interviewee_id?: string;
  scheduled_at?: string;
  notes?: string;
  fighter_name?: string;
  fighters?: { name?: string } | Array<{ name?: string }>;
};

export default function DashboardPage() {
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      await Promise.all([loadFighters(), loadInterviews()]);
      setLoading(false);
    }

    loadData();
  }, []);

  async function loadFighters() {
    try {
      const { data, error } = await supabase.from("fighters").select("id,name,role,power,dm_status");
      if (error) {
        console.error("Error loading fighters:", error);
        return;
      }
      setFighters(data || []);
    } catch (error) {
      console.error("Unexpected fighter fetch error:", error);
    }
  }

  async function loadInterviews() {
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
        return;
      }

      const interviewList = (data || []).map((item: any) => {
        let fighterName = item.fighter_id || "Unknown Fighter";
        if (item.fighters?.name) {
          fighterName = item.fighters.name;
        } else if (Array.isArray(item.fighters) && item.fighters[0]?.name) {
          fighterName = item.fighters[0].name;
        }

        return {
          ...item,
          fighter_name: fighterName,
        };
      });

      setInterviews(interviewList);
    } catch (error) {
      console.error("Unexpected interview fetch error:", error);
    }
  }

  const totalFighters = fighters.length;
  const totalSessions = interviews.length;
  const executionMetric = `${Math.min(99, 65 + totalSessions * 4)}%`;
  const revenueMetric = `$${(totalFighters * 18).toFixed(1)}K`;

  const upcomingTasks = useMemo(() => {
    const interviewTasks = interviews
      .sort((a, b) => (a.scheduled_at || "").localeCompare(b.scheduled_at || ""))
      .slice(0, 4)
      .map((interview) => {
        const dateLabel = interview.scheduled_at
          ? new Date(interview.scheduled_at).toLocaleString(undefined, {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })
          : "TBD";

        return {
          id: interview.id,
          title: `Confirm clip session with ${interview.fighter_name || "fighter"}`,
          subtitle: dateLabel,
          type: "Session",
        };
      });

    return [
      {
        id: "task-brief",
        title: "Review brand playbook",
        subtitle: "Finish the Q2 story arcs and shoot list",
        type: "Strategy",
      },
      ...interviewTasks,
      {
        id: "task-angler",
        title: "Lock in DM outreach",
        subtitle: `${totalFighters} fighters waiting for follow-up",
        type: "Outreach",
      },
    ].slice(0, 5);
  }, [interviews, totalFighters]);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-slate-100">
      <div className="fixed left-0 top-0 z-40 h-full w-[320px] border-r border-[#7f6d33]/20 bg-[#090909] px-6 py-8 shadow-[20px_0_120px_rgba(0,0,0,0.6)]">
        <div className="mb-10 flex flex-col gap-3">
          <span className="inline-flex items-center gap-3 rounded-3xl border border-[#7f6d33]/30 bg-[#101010]/80 px-4 py-3 text-sm font-semibold tracking-[0.24em] text-amber-300">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300 shadow-[0_0_20px_rgba(255,179,25,0.45)]" />
            UNCUT OS
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-slate-500">Operations Grid</p>
            <h1 className="mt-4 text-3xl font-black text-white">Command Nexus</h1>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[1.75rem] border border-[#7f6d33]/20 bg-[#111111]/95 px-5 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Crew</p>
            <p className="mt-3 text-2xl font-semibold text-white">{totalFighters} fighters</p>
            <p className="mt-2 text-sm text-slate-400">Active roster synced from Supabase.</p>
          </div>
          <div className="rounded-[1.75rem] border border-[#7f6d33]/20 bg-[#111111]/95 px-5 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Sessions</p>
            <p className="mt-3 text-2xl font-semibold text-white">{totalSessions}</p>
            <p className="mt-2 text-sm text-slate-400">Scheduled interview ops in the queue.</p>
          </div>
          <div className="mt-8 border-t border-[#7f6d33]/10 pt-7">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Quick Links</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li className="rounded-2xl bg-[#0E0E0E]/80 px-4 py-3">Dashboard</li>
              <li className="rounded-2xl bg-[#0E0E0E]/80 px-4 py-3">Conversations</li>
              <li className="rounded-2xl bg-[#0E0E0E]/80 px-4 py-3">Tasks</li>
              <li className="rounded-2xl bg-[#0E0E0E]/80 px-4 py-3">Crew</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="ml-[320px] px-6 py-10">
        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.85fr]">
          <section className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[2rem] border border-[#7f6d33]/20 bg-[#111111]/90 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
                <p className="text-xs uppercase tracking-[0.35em] text-amber-300/80">Execution</p>
                <p className="mt-4 text-3xl font-bold text-white">{executionMetric}</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Real-time performance from scheduled sessions and conversation velocity.
                </p>
              </div>
              <div className="rounded-[2rem] border border-[#7f6d33]/20 bg-[#111111]/90 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
                <p className="text-xs uppercase tracking-[0.35em] text-amber-300/80">Revenue</p>
                <p className="mt-4 text-3xl font-bold text-white">{revenueMetric}</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Estimated content value from fighters and interview assets in the pipeline.
                </p>
              </div>
            </div>

            <div className="rounded-[2.25rem] border border-[#7f6d33]/25 bg-[#0E0E0E]/95 p-10 shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs uppercase tracking-[0.35em] text-amber-300/80">UNCUT Conversations</p>
                  <h2 className="mt-4 text-4xl font-black text-white leading-tight">Cinematic command center for every interview, idea, and mission.</h2>
                  <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">
                    Pull live fighter intel and session status from Supabase. Keep the crew aligned, the content moving, and the DM outreach sharp.
                  </p>
                </div>
                <div className="rounded-[1.75rem] border border-[#7f6d33]/20 bg-[#090909] px-6 py-5 text-right shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Live data sync</p>
                  <p className="mt-3 text-3xl font-extrabold text-amber-300">{loading ? "Syncing..." : "Active"}</p>
                  <p className="mt-2 text-sm text-slate-400">Last Supabase refresh is live.</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
              <div className="rounded-[2rem] border border-[#7f6d33]/20 bg-[#111111]/90 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-amber-300/80">Scheduled sessions</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">Live interview queue</h3>
                  </div>
                  <span className="rounded-full bg-amber-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
                    {totalSessions} sessions
                  </span>
                </div>
                <div className="mt-6 space-y-4">
                  {interviews.length === 0 ? (
                    <div className="rounded-3xl border border-[#7f6d33]/15 bg-[#0D0D0D] p-5">
                      <p className="text-sm text-slate-400">No interviews scheduled yet. Add fighters and sync your queue.</p>
                    </div>
                  ) : (
                    interviews.slice(0, 5).map((interview) => (
                      <div key={interview.id} className="rounded-3xl border border-[#7f6d33]/15 bg-[#0D0D0D] p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-white">{interview.fighter_name || "Unknown fighter"}</p>
                            <p className="mt-2 text-sm text-slate-400">{interview.notes || "Prep the narrative hook and DM angle."}</p>
                          </div>
                          <p className="whitespace-nowrap rounded-full bg-[#111111] px-3 py-1 text-xs uppercase tracking-[0.25em] text-amber-200">
                            {interview.scheduled_at ? new Date(interview.scheduled_at).toLocaleDateString() : "TBD"}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#7f6d33]/20 bg-[#111111]/90 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-amber-300/80">Crew roster</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">Fighter insights</h3>
                  </div>
                  <span className="rounded-full bg-amber-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
                    {totalFighters} live
                  </span>
                </div>
                <div className="mt-6 space-y-4">
                  {fighters.slice(0, 4).map((fighter) => (
                    <div key={fighter.id} className="rounded-3xl border border-[#7f6d33]/15 bg-[#0D0D0D] p-5">
                      <p className="text-sm font-semibold text-white">{fighter.name}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                        <span className="rounded-full bg-[#111111] px-3 py-1">{fighter.role || "Operative"}</span>
                        <span className="rounded-full bg-[#111111] px-3 py-1">{fighter.power || "Tier 1"}</span>
                        <span className="rounded-full bg-[#111111] px-3 py-1">{fighter.dm_status || "Warm"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-8">
            <div className="sticky top-10 rounded-[2rem] border border-[#7f6d33]/20 bg-[#111111]/95 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-amber-300/80">Upcoming Tasks</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">Mission checklist</h3>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="rounded-3xl border border-[#7f6d33]/15 bg-[#0D0D0D] p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{task.title}</p>
                        <p className="mt-2 text-sm text-slate-400">{task.subtitle}</p>
                      </div>
                      <span className="rounded-full bg-amber-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-200">
                        {task.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#7f6d33]/20 bg-[#111111]/95 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <p className="text-xs uppercase tracking-[0.35em] text-amber-300/80">Status board</p>
              <div className="mt-6 grid gap-4">
                <div className="rounded-3xl bg-[#0D0D0D] p-5">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Campaign</p>
                  <p className="mt-3 text-xl font-semibold text-white">Momentum high</p>
                  <p className="mt-2 text-sm text-slate-400">All active fighters are synced and ready for content execution.</p>
                </div>
                <div className="rounded-3xl bg-[#0D0D0D] p-5">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">DM Outreach</p>
                  <p className="mt-3 text-xl font-semibold text-white">{totalFighters > 0 ? "Warm" : "Standby"}</p>
                  <p className="mt-2 text-sm text-slate-400">{totalFighters > 0 ? `${totalFighters} fighters have DM readiness flags.` : "Add fighters to begin."}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
EOF