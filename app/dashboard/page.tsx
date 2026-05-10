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
  fighters?: { name?: string } | Array<{ name?: string }>;
};

type Fighter = {
  id: string;
  name: string;
  role?: string;
  power?: string;
  dm_status?: string;
};

type ContentItem = {
  id: string;
  title?: string;
  status?: string;
  fighter_id?: string;
  fighter_name?: string;
  notes?: string;
  fighters?: { name?: string } | Array<{ name?: string }>;
};

export default function DashboardPage() {
  const [fighterName, setFighterName] = useState("");
  const [fighterRole, setFighterRole] = useState("");
  const [fighterPower, setFighterPower] = useState("");
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [sessionFighterId, setSessionFighterId] = useState("");
  const [sessionDateTime, setSessionDateTime] = useState("");
  const [sessionNotes, setSessionNotes] = useState("");

  useEffect(() => {
    loadInterviews();
    loadFighters();
    loadContentItems();
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
          let fighterName = `ID: ${interview.interviewee_id || interview.fighter_id || interview.id}`;
          if (interview.fighters?.name) {
            fighterName = interview.fighters.name;
          } else if (Array.isArray(interview.fighters) && interview.fighters[0]?.name) {
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

  async function loadFighters() {
    try {
      const { data, error } = await supabase.from("fighters").select("id,name,role,power,dm_status");
      if (error) {
        console.error("Error loading fighters:", error);
        window.alert(`Fighter fetch failed: ${error.message}`);
        return;
      }
      setFighters(data || []);
    } catch (err) {
      console.error("Unexpected error loading fighters:", err);
      window.alert("Unexpected error loading fighters. Check console.");
    }
  }

  async function loadContentItems() {
    try {
      const { data, error } = await supabase
        .from("content")
        .select(`
          *,
          fighters (
            name
          )
        `);

      if (error) {
        console.error("Error loading content items:", error);
        window.alert(`Content fetch failed: ${error.message}`);
        return;
      }

      const contentWithNames = (data || []).map((item: any) => {
        let fighterName = item.fighter_id || "Unknown";
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

      setContentItems(contentWithNames);
    } catch (err) {
      console.error("Unexpected error loading content items:", err);
      window.alert("Unexpected error loading content items. Check console.");
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
      loadFighters();
    } catch (err) {
      console.error("Unexpected Supabase insert error:", err);
      window.alert("Unexpected error adding fighter. Check console.");
    }
  }

  async function handleCreateSession(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!sessionFighterId || !sessionDateTime) {
      window.alert("Choose a fighter and a date/time for the session.");
      return;
    }

    try {
      const { data, error } = await supabase.from("interviews").insert([
        {
          fighter_id: sessionFighterId,
          scheduled_at: sessionDateTime,
          notes: sessionNotes || null,
        },
      ]);

      if (error) {
        console.error("Session insert error:", error);
        window.alert(`Add session failed: ${error.message}`);
        return;
      }

      console.log("Session created:", data);
      window.alert("Session added successfully.");
      setShowSessionModal(false);
      setSessionFighterId("");
      setSessionDateTime("");
      setSessionNotes("");
      loadInterviews();
    } catch (err) {
      console.error("Unexpected session insert error:", err);
      window.alert("Unexpected error creating session. Check console.");
    }
  }

  const statusItems = [
    { label: "Campaign Momentum", value: "92%", bronze: true },
    { label: "Active Threads", value: "8", bronze: false },
    { label: "NPC Heat", value: "74%", bronze: true },
    { label: "Session Readiness", value: "Ready", bronze: false },
  ];

  const recruitmentItems = fighters.map((fighter) => {
    const status = fighter.dm_status || (fighter.power ? "Warm" : "Needs DM");
    return {
      ...fighter,
      recruitment_status: status,
    };
  });

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
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">Upcoming Interviews</p>
                  <h2 className="mt-4 text-3xl font-semibold text-white">Scheduled sessions</h2>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={loadInterviews}
                    className="rounded-full bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-amber-200 hover:bg-amber-300/20"
                  >
                    Refresh
                  </button>
                  <button
                    onClick={() => setShowSessionModal(true)}
                    className="rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-black hover:bg-amber-300"
                  >
                    Add Session
                  </button>
                </div>
              </div>
              <p className="mt-3 text-slate-400">Fighter interviews lined up for your Media Empire content.</p>
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
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">Content War Room</p>
                  <h2 className="mt-4 text-3xl font-semibold text-white">Viral clip pipeline</h2>
                </div>
                <button
                  onClick={loadContentItems}
                  className="rounded-full bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-amber-200 hover:bg-amber-300/20"
                >
                  Refresh
                </button>
              </div>
              <p className="mt-3 text-slate-400">Track clip ideas, editing status, and target fighters.</p>
              <div className="mt-6 space-y-4">
                {contentItems.length === 0 ? (
                  <div className="rounded-3xl border border-[#b07b2e]/20 bg-[#121212] p-5">
                    <p className="text-sm text-slate-400">No content items available yet.</p>
                  </div>
                ) : (
                  contentItems.map((item) => (
                    <div key={item.id} className="rounded-3xl border border-[#b07b2e]/20 bg-[#121212] p-5">
                      <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{item.status || "Idea"}</p>
                      <h3 className="mt-2 text-lg font-semibold text-white">{item.title || item.notes || "Untitled content"}</h3>
                      <p className="mt-2 text-sm text-slate-300">Fighter: {item.fighter_name || item.fighter_id || "Unknown"}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#b07b2e]/30 bg-[#0b0b0b]/95 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.4)]">
              <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">Recruitment Pulse</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">DM outreach tracker</h2>
              <p className="mt-3 text-slate-400">See who is warm and who still needs a DM match.</p>
              <div className="mt-6 grid gap-4">
                {recruitmentItems.length === 0 ? (
                  <div className="rounded-3xl border border-[#b07b2e]/20 bg-[#121212] p-5">
                    <p className="text-sm text-slate-400">No fighters in the system yet.</p>
                  </div>
                ) : (
                  recruitmentItems.map((fighter) => (
                    <div key={fighter.id} className="rounded-3xl border border-[#b07b2e]/20 bg-[#121212] p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm text-slate-400">{fighter.role || "Fighter"}</p>
                          <p className="mt-2 text-lg font-semibold text-white">{fighter.name || `ID: ${fighter.id}`}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${fighter.recruitment_status === "Warm" ? "bg-amber-300/15 text-amber-200" : "bg-amber-400/15 text-amber-100"}`}>
                          {fighter.recruitment_status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </aside>
        </div>

        {showSessionModal ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="w-full max-w-2xl rounded-[1.75rem] border border-[#b07b2e]/40 bg-[#0c0c0c]/95 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.85)]">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">Add Session</p>
                  <h2 className="mt-2 text-3xl font-semibold text-white">Schedule a new interview</h2>
                </div>
                <button
                  onClick={() => setShowSessionModal(false)}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
                >
                  Close
                </button>
              </div>
              <form className="space-y-5" onSubmit={handleCreateSession}>
                <label className="block text-sm text-slate-300">
                  Fighter
                  <select
                    value={sessionFighterId}
                    onChange={(event) => setSessionFighterId(event.target.value)}
                    className="mt-3 w-full rounded-2xl border border-[#b07b2e]/40 bg-[#121212] px-4 py-3 text-white outline-none transition focus:border-amber-300/80 focus:ring-2 focus:ring-amber-300/20"
                  >
                    <option value="">Select fighter</option>
                    {fighters.map((fighter) => (
                      <option key={fighter.id} value={fighter.id}>
                        {fighter.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm text-slate-300">
                  Date & Time
                  <input
                    type="datetime-local"
                    value={sessionDateTime}
                    onChange={(event) => setSessionDateTime(event.target.value)}
                    className="mt-3 w-full rounded-2xl border border-[#b07b2e]/40 bg-[#121212] px-4 py-3 text-white outline-none transition focus:border-amber-300/80 focus:ring-2 focus:ring-amber-300/20"
                  />
                </label>
                <label className="block text-sm text-slate-300">
                  Notes
                  <textarea
                    value={sessionNotes}
                    onChange={(event) => setSessionNotes(event.target.value)}
                    placeholder="Campaign angle, clip hook, DM follow-up"
                    className="mt-3 w-full rounded-2xl border border-[#b07b2e]/40 bg-[#121212] px-4 py-3 text-white outline-none transition focus:border-amber-300/80 focus:ring-2 focus:ring-amber-300/20"
                    rows={4}
                  />
                </label>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setShowSessionModal(false)}
                    className="inline-flex rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex rounded-2xl bg-amber-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-300"
                  >
                    Save Session
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
