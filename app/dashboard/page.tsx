"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function DashboardPage() {
const [fighters, setFighters] = useState<any[]>([]);
const [interviews, setInterviews] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
async function fetchData() {
const { data: fightersData } = await supabase.from('fighters').select('*');
const { data: interviewsData } = await supabase.from('interviews').select('*, fighters(name)');
if (fightersData) setFighters(fightersData);
if (interviewsData) setInterviews(interviewsData);
setLoading(false);
}
fetchData();
}, []);

return (
<div className="flex min-h-screen bg-[#0A0A0A] text-white font-sans">
{/* LEFT SIDEBAR */}
<aside className="w-64 border-r border-[#7f6d33]/20 bg-[#111111] p-6 flex flex-col gap-8">
<h1 className="text-2xl font-bold tracking-tighter text-amber-500">UNCUT OS</h1>
<nav className="flex flex-col gap-4 text-slate-400">
<div className="text-amber-300 font-semibold border-b border-amber-500/20 pb-2 uppercase tracking-widest text-[0.6rem]">Command Center</div>
<div className="hover:text-white cursor-pointer transition text-sm">CONTENT WAR ROOM</div>
<div className="hover:text-white cursor-pointer transition text-sm">FIGHTER NETWORK</div>
<div className="hover:text-white cursor-pointer transition text-sm">FINANCE</div>
</nav>
</aside>

{/* MAIN VIEWPORT */}
<main className="flex-1 p-8 overflow-y-auto">
{/* TOP METRIC CARDS */}
<div className="grid grid-cols-4 gap-6 mb-12">
{[
{ label: "EXECUTION SCORE", val: "87%", color: "text-amber-500" },
{ label: "TASKS DONE", val: "12/15", color: "text-white" },
{ label: "STREAM TIME", val: "4.2h", color: "text-white" },
{ label: "REVENUE", val: "$2,450", color: "text-green-500" }
].map((stat, i) => (
<div key={i} className="bg-[#111111] border border-[#7f6d33]/20 p-6 rounded-2xl shadow-2xl">
<p className="text-[0.35rem] tracking-[0.35em] text-slate-500 uppercase">{stat.label}</p>
<p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.val}</p>
</div>
))}
</div>

{/* CINEMATIC HERO SECTION */}
<div className="relative h-64 bg-slate-900 rounded-3xl mb-12 overflow-hidden border border-amber-500/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
<div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
<div className="absolute bottom-10 left-10 z-20">
<h2 className="text-5xl font-black italic tracking-tighter mb-2 uppercase">UNCUT CONVERSATIONS</h2>
<p className="text-amber-500 tracking-[0.4em] font-bold text-[0.6rem] uppercase">The Media Empire Operating System</p>
</div>
</div>

{/* DATA FEED GRID */}
<div className="grid grid-cols-2 gap-8">
{/* SCHEDULE PANEL */}
<div className="bg-[#111111] border border-[#7f6d33]/20 rounded-3xl p-8 shadow-xl">
<p className="text-[0.35rem] uppercase tracking-[0.35em] text-amber-500 mb-6">Upcoming Schedule</p>
<div className="space-y-4">
{interviews.length > 0 ? (
interviews.map((int) => (
<div key={int.id} className="flex items-center justify-between p-5 bg-black/40 rounded-2xl border border-white/5 hover:border-amber-500/30 transition group">
<div>
<p className="font-bold text-lg group-hover:text-amber-500 transition">{int.fighters?.name || 'Guest Fighter'}</p>
<p className="text-[0.6rem] text-slate-500 uppercase tracking-widest mt-1">
{new Date(int.scheduled_at).toLocaleDateString()} @ {new Date(int.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
</p>
</div>
<button className="bg-amber-600 hover:bg-amber-500 px-5 py-2 rounded-xl text-[0.6rem] font-black uppercase tracking-widest transition shadow-lg shadow-amber-900/20">JOIN SESSION</button>
</div>
))
) : (
<div className="text-center py-10 border-2 border-dashed border-white/5 rounded-2xl">
<p className="text-slate-600 text-xs uppercase tracking-widest italic">No sessions currently booked</p>
</div>
)}
</div>
</div>

{/* RECRUITMENT PANEL */}
<div className="bg-[#111111] border border-[#7f6d33]/20 rounded-3xl p-8 shadow-xl flex flex-col justify-center text-center">
<p className="text-[0.35rem] uppercase tracking-[0.35em] text-amber-500 mb-6">Recruitment Pulse</p>
<p className="text-7xl font-black text-white mb-2">{fighters.length}</p>
<p className="text-[0.6rem] text-slate-500 uppercase tracking-[0.4em]">Fighters Synced & Ready</p>
<div className="mt-8 pt-8 border-t border-white/5">
<button className="text-amber-500 text-[0.6rem] font-bold tracking-[0.3em] uppercase hover:text-white transition">Manage Roster →</button>
</div>
</div>
</div>
</main>
</div>
);
}
