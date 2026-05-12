"use client";
import React, { useState, useEffect } from 'react';

export default function UncutOS() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="bg-black min-h-screen" />;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans p-6 flex gap-6 selection:bg-amber-500">
      
      {/* 1. LEFT NAVIGATION SIDEBAR */}
      <aside className="w-64 flex flex-col gap-8 hidden xl:flex">
        <div className="mb-4">
          <h1 className="text-3xl font-black italic tracking-tighter">UNCUT</h1>
          <p className="text-[8px] tracking-[0.4em] text-zinc-600 font-bold uppercase">Operating System</p>
        </div>
        
        <nav className="flex flex-col gap-5 text-[10px] font-bold text-zinc-500 tracking-widest uppercase">
          <div className="bg-zinc-900/50 text-white p-3 rounded-xl border border-zinc-800 flex items-center gap-3 cursor-pointer">
            <div className="w-1.5 h-1.5 bg-amber-500 rotate-45" /> Dashboard
          </div>
          {['Daily Command', 'Content War Room', 'Fighter Network', 'Partnerships', 'Product Division', 'Streaming (Kick)', 'Content Calendar'].map(item => (
            <div key={item} className="px-3 hover:text-white cursor-pointer transition-all">{item}</div>
          ))}
        </nav>

        <div className="mt-auto p-6 bg-zinc-900/30 rounded-3xl border border-zinc-800 text-center">
            <h2 className="text-4xl font-black italic tracking-tighter text-zinc-800">UNCUT</h2>
            <p className="text-[8px] text-zinc-600 font-bold mt-2 uppercase">The Daily Standard For Men Who Train.</p>
        </div>
      </aside>

      {/* 2. MAIN DASHBOARD AREA */}
      <main className="flex-1 space-y-6 overflow-y-auto">
        
        {/* HEADER AREA */}
        <header className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Welcome Back, Juan 👑</h2>
            <p className="text-zinc-400 text-xs italic">"Discipline creates freedom. Execution creates empires."</p>
          </div>
          <div className="text-right text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-loose">
            Tuesday, May 6, 2026 // Bali, Indonesia // 28°C
          </div>
        </header>

        {/* TOP STATS BAR (MATCHES IMAGE EXACTLY) */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <StatBox label="Today's Score" val="87%" sub="Execution" color="text-white" />
          <StatBox label="Tasks Completed" val="14/16" sub="On Track" color="text-green-500" />
          <StatBox label="Content Published" val="3/5" sub="Today" color="text-purple-500" />
          <StatBox label="Interviews Done" val="1/2" sub="Today" color="text-white" />
          <StatBox label="Stream Time" val="2.4 hrs" sub="Kick" color="text-green-400" />
          <StatBox label="Monthly Revenue" val="$12,450" sub="+18% vs Last Month" color="text-amber-500" />
        </div>

        {/* MIDDLE SECTION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* DAILY COMMAND CENTER */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-[#0f0f0f] border border-zinc-800 p-6 rounded-[2rem]">
              <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-6">Daily Command Center</h3>
              <div className="space-y-4">
                <TaskItem text="Morning Routine / Training" time="DONE" checked />
                <TaskItem text="Podcast Interview" time="2:00 PM" checked />
                <TaskItem text="Film Lifestyle Content" time="4:00 PM" checked />
                <TaskItem text="Edit + Clip 3 Videos" time="5:00 PM" />
                <TaskItem text="Outreach - 15 Fighters" time="7:00 PM" />
              </div>
            </div>
            {/* WEEKLY PROGRESS CHART PLACEHOLDER */}
            <div className="bg-[#0f0f0f] border border-zinc-800 p-6 rounded-[2rem] h-32">
               <h3 className="text-[10px] font-black text-zinc-500 uppercase">Weekly Progress</h3>
               <div className="mt-4 h-12 flex items-end gap-1">
                  {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                    <div key={i} className="flex-1 bg-amber-500/20 rounded-t-sm" style={{ height: `${h}%` }} />
                  ))}
               </div>
            </div>
          </div>

          {/* MAIN HERO BANNER */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative h-[380px] rounded-[3rem] overflow-hidden border border-zinc-800">
               <img src="https://unsplash.com" className="absolute inset-0 w-full h-full object-cover grayscale opacity-50" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
               <div className="absolute bottom-10 left-10 space-y-4">
                  <h2 className="text-7xl font-black italic tracking-tighter leading-[0.8] uppercase">UNCUT<br/><span className="text-3xl text-zinc-400 not-italic font-bold tracking-[0.2em]">CONVERSATIONS</span></h2>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Real Fighters. Real Stories. Uncut.</p>
                  <button className="bg-white text-black px-8 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 transition-all">Watch Latest Episode</button>
               </div>
            </div>
            {/* LATEST INTERVIEWS ROW */}
            <div className="grid grid-cols-4 gap-4">
               {['Verdy', 'Fahri', 'G. Tornado', 'Martin'].map((name, i) => (
                 <div key={i} className="text-center space-y-2">
                    <div className="aspect-square bg-zinc-900 rounded-full border-2 border-zinc-800 overflow-hidden grayscale">
                       <img src={`https://pravatar.cc{name}`} alt={name} />
                    </div>
                    <p className="text-[9px] font-black uppercase tracking-tighter">{name}</p>
                 </div>
               ))}
            </div>
          </div>

          {/* UPCOMING & CALENDAR */}
          <div className="lg:col-span-3 space-y-6">
             <div className="bg-[#0f0f0f] border border-zinc-800 p-6 rounded-[2rem]">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-[10px] font-black text-zinc-500 uppercase">Upcoming Tasks</h3>
                   <span className="text-[8px] text-zinc-700 font-bold">VIEW ALL</span>
                </div>
                <div className="space-y-4 text-[10px] font-bold">
                   <div className="flex justify-between text-amber-500"><span>3:00 PM</span><span>Podcast Interview</span></div>
                   <div className="flex justify-between text-zinc-400"><span>5:00 PM</span><span>Edit Podcast + 3 Clips</span></div>
                   <div className="flex justify-between text-zinc-400"><span>7:00 PM</span><span>Outreach - 15 Fighters</span></div>
                </div>
             </div>
             <div className="bg-[#0f0f0f] border border-zinc-800 p-6 rounded-[2rem] flex-1">
                <h3 className="text-[10px] font-black text-zinc-500 uppercase mb-4 italic italic">Mindset</h3>
                <p className="text-lg font-black italic tracking-tighter uppercase leading-tight">"The standard you walk past is the standard you accept."</p>
             </div>
          </div>

        </div>

        {/* BOTTOM QUICK ACTIONS BAR */}
        <div className="grid grid-cols-4 gap-6 pt-6 border-t border-zinc-900">
           <div className="bg-zinc-900/30 p-6 rounded-3xl border border-zinc-800 flex items-center justify-between col-span-1">
              <span className="text-[10px] font-black uppercase text-zinc-500">Quick Actions</span>
              <div className="flex gap-2">
                 <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-xs">+</div>
              </div>
           </div>
           <div className="col-span-2 bg-zinc-900/30 p-6 rounded-3xl border border-zinc-800 italic italic">
              <p className="text-[9px] text-zinc-600 font-bold uppercase mb-2 italic">Strategy Capture</p>
              <p className="text-xs text-zinc-400 font-medium">Big things come from daily consistency. Film gym content tomorrow morning...</p>
           </div>
           <div className="bg-amber-600/10 border border-amber-600/20 p-6 rounded-3xl flex items-center justify-center">
              <p className="text-xs font-black italic uppercase tracking-widest text-amber-500 text-center italic">We don't follow the game. We build it.</p>
           </div>
        </div>
      </main>
    </div>
  );
}

// HELPERS
const StatBox = ({ label, val, sub, color }: any) => (
  <div className="bg-[#0f0f0f] border border-zinc-800 p-5 rounded-2xl">
    <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1 italic italic">{label}</p>
    <div className={`text-2xl font-black tracking-tighter ${color}`}>{val}</div>
    <p className="text-[8px] font-bold text-zinc-700 uppercase mt-1 italic italic">{sub}</p>
  </div>
);

const TaskItem = ({ text, time, checked = false }: any) => (
  <div className="flex justify-between items-center text-[10px] font-bold">
    <div className="flex items-center gap-3">
      <div className={`w-3.5 h-3.5 rounded-full border-2 ${checked ? 'bg-green-500 border-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'border-zinc-800'}`} />
      <span className={checked ? 'text-zinc-600 line-through' : 'text-zinc-300 uppercase'}>{text}</span>
    </div>
    <span className="text-[9px] font-mono text-zinc-700">{time}</span>
  </div>
);
