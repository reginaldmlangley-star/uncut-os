"use client";

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function DashboardPage() {
  const [fighters, setFighters] = useState<any[]>([]);
  const [interviews, setInterviews] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("DASHBOARD");

  useEffect(() => {
    async function fetchData() {
      const { data: f } = await supabase.from('fighters').select('*');
      const { data: i } = await supabase.from('interviews').select('*, fighters(name)');
      if (f) setFighters(f);
      if (i) setInterviews(i);
    }
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#060606] text-white font-sans antialiased selection:bg-amber-500/30">
      
      {/* SIDEBAR NAVIGATION PANEL */}
      <aside className="w-64 bg-[#0A0A0A] border-r border-white/5 flex flex-col p-6 fixed h-full z-30">
        <div className="mb-10">
          <h1 className="text-2xl font-black tracking-tighter text-white">UNCUT</h1>
          <p className="text-[0.45rem] tracking-[0.4em] text-amber-500 font-black uppercase mt-1">Operating System</p>
        </div>
        
        <nav className="flex flex-col gap-2 flex-1">
          <button onClick={() => setActiveTab("DASHBOARD")} className={`w-full text-left p-3 rounded-xl text-[0.65rem] font-bold tracking-widest uppercase transition-all ${activeTab === "DASHBOARD" ? "bg-amber-500/10 text-amber-500 border-l-2 border-amber-500 font-black" : "text-slate-500 hover:text-white hover:bg-white/5"}`}>DASHBOARD</button>
          <button onClick={() => setActiveTab("LAUNCH MACHINE")} className={`w-full text-left p-3 rounded-xl text-[0.65rem] font-bold tracking-widest uppercase transition-all ${activeTab === "LAUNCH MACHINE" ? "bg-amber-500/10 text-amber-500 border-l-2 border-amber-500 font-black" : "text-slate-500 hover:text-white hover:bg-white/5"}`}>LAUNCH MACHINE</button>
          <button onClick={() => setActiveTab("CONTENT PILLARS")} className={`w-full text-left p-3 rounded-xl text-[0.65rem] font-bold tracking-widest uppercase transition-all ${activeTab === "CONTENT PILLARS" ? "bg-amber-500/10 text-amber-500 border-l-2 border-amber-500 font-black" : "text-slate-500 hover:text-white hover:bg-white/5"}`}>CONTENT PILLARS</button>
          <button onClick={() => setActiveTab("TECH STACK")} className={`w-full text-left p-3 rounded-xl text-[0.65rem] font-bold tracking-widest uppercase transition-all ${activeTab === "TECH STACK" ? "bg-amber-500/10 text-amber-500 border-l-2 border-amber-500 font-black" : "text-slate-500 hover:text-white hover:bg-white/5"}`}>TECH STACK</button>
          <button onClick={() => setActiveTab("CUSTOMER JOURNEY")} className={`w-full text-left p-3 rounded-xl text-[0.65rem] font-bold tracking-widest uppercase transition-all ${activeTab === "CUSTOMER JOURNEY" ? "bg-amber-500/10 text-amber-500 border-l-2 border-amber-500 font-black" : "text-slate-500 hover:text-white hover:bg-white/5"}`}>CUSTOMER JOURNEY</button>
          <button onClick={() => setActiveTab("DISTRIBUTION")} className={`w-full text-left p-3 rounded-xl text-[0.65rem] font-bold tracking-widest uppercase transition-all ${activeTab === "DISTRIBUTION" ? "bg-amber-500/10 text-amber-500 border-l-2 border-amber-500 font-black" : "text-slate-500 hover:text-white hover:bg-white/5"}`}>DISTRIBUTION</button>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <p className="text-[0.45rem] tracking-[0.15em] text-slate-600 uppercase font-bold leading-relaxed">"NOT BEAUTY. NOT GROOMING.<br/>MAINTENANCE OF PRESENCE."</p>
        </div>
      </aside>

      {/* CORE WORKSPACE VIEWPORT */}
      <main className="ml-64 flex-1 p-10 bg-gradient-to-b from-[#0A0A0A] via-[#060606] to-[#060606]">
        
        <header className="flex justify-between items-center mb-12 border-b border-white/5 pb-6">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight">{activeTab} VIEWPORT</h2>
            <p className="text-slate-500 text-[0.6rem] tracking-widest uppercase mt-1">Built for men who train. Stay sharp. Age slow.</p>
          </div>
          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-center">
            <p className="text-[0.55rem] font-black text-amber-500 tracking-widest uppercase">Ecosystem Status</p>
            <p className="text-xs font-bold text-green-400 uppercase mt-0.5">ONLINE & POWERFUL</p>
          </div>
        </header>
        
        {activeTab === "DASHBOARD" && (
          <div className="space-y-12">
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl shadow-xl">
                <p className="text-[0.45rem] tracking-[0.3em] text-slate-500 uppercase font-bold">SYNCED ROSTER</p>
                <p className="text-3xl font-black mt-3 text-white tracking-tight">{fighters.length}</p>
                <p className="text-[0.45rem] tracking-widest text-slate-400 mt-2 uppercase font-medium">Fighters Logged</p>
              </div>
              <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl shadow-xl">
                <p className="text-[0.45rem] tracking-[0.3em] text-slate-500 uppercase font-bold">PIPELINE SESSIONS</p>
                <p className="text-3xl font-black mt-3 text-white tracking-tight">{interviews.length}</p>
                <p className="text-[0.45rem] tracking-widest text-slate-400 mt-2 uppercase font-medium">Interviews Booked</p>
              </div>
              <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl shadow-xl">
                <p className="text-[0.45rem] tracking-[0.3em] text-slate-500 uppercase font-bold">CORE PILOT</p>
                <p className="text-3xl font-black mt-3 text-white tracking-tight">ACTIVE</p>
                <p className="text-[0.45rem] tracking-widest text-slate-400 mt-2 uppercase font-medium">Ecosystem Online</p>
              </div>
              <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl shadow-xl">
                <p className="text-[0.45rem] tracking-[0.3em] text-slate-500 uppercase font-bold">BRAND ARR TARGET</p>
                <p className="text-3xl font-black mt-3 text-white tracking-tight">$100M</p>
                <p className="text-[0.45rem] tracking-widest text-slate-400 mt-2 uppercase font-medium">Built for the Long Game</p>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-xs font-black uppercase tracking-[0.25em] text-amber-500 mb-6">Active Operational Target Pipeline</h3>
              <div className="p-6 bg-black/30 border border-dashed border-white/5 rounded-2xl text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Database Cloud Channels Synced</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "LAUNCH MACHINE" && (
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-7 bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-xs font-black uppercase tracking-[0.25em] text-amber-500 mb-2">The Simple Sales Machine</h3>
              <p className="text-[0.55rem] text-slate-500 uppercase tracking-widest mb-6">Perfect execution to prepare for launch</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                  <div>
                    <p className="text-xs font-black text-white">1. CONTENT GENERATION</p>
                    <p className="text-[0.55rem] text-slate-500 mt-1">Higgsfield & real raw footage running side-by-side for pure emotion.</p>
                  </div>
                  <span className="text-[0.5rem] font-black tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded text-amber-500 uppercase">READY</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                  <div>
                    <p className="text-xs font-black text-white">2. LANDING PAGE SYSTEM</p>
                    <p className="text-[0.55rem] text-slate-500 mt-1">Sleek obsidian asset conversion portals staging parameters.</p>
                  </div>
                  <span className="text-[0.5rem] font-black tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded text-amber-500 uppercase">READY</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                  <div>
                    <p className="text-xs font-black text-white">3. EMAIL & SMS CAPTURE</p>
                    <p className="text-[0.55rem] text-slate-500 mt-1">Klaviyo workflows linked to compile elite pre-order signups.</p>
                  </div>
                  <span className="text-[0.5rem] font-black tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded text-amber-500 uppercase">ACTIVE</span>
                </div>
              </div>
            </div>
            <div className="col-span-5 bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 shadow-2xl flex flex-col justify-between">
              <div className="p-5 bg-black/60 rounded-2xl border border-amber-500/10 space-y-4">
                <p className="text-xs font-black text-white uppercase tracking-wider">Pre-Orders Goal</p>
                <p className="text-4xl font-black text-white tracking-tight">10,000+</p>
                <p className="text-[0.55rem] text-slate-400 uppercase tracking-widest leading-relaxed">"Get emails and pre-orders. Video playing on side for emotion. Proof. Cinematic feel."</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "CONTENT PILLARS" && (
          <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-amber-500 mb-6">Core Content Framework</h3>
            <div className="grid grid-cols-5 gap-4">
              <div className="p-5 bg-black/40 rounded-xl border border-white/5">
                <span className="text-xs font-black tracking-widest text-amber-500 uppercase">STANDARDS</span>
                <p className="text-[0.55rem] text-slate-400 mt-3 leading-relaxed">Most men neglect this. Establish the baseline behavior raw.</p>
              </div>
              <div className="p-5 bg-black/40 rounded-xl border border-white/5">
                <span className="text-xs font-black tracking-widest text-amber-500 uppercase">RITUALS</span>
                <p className="text-[0.55rem] text-slate-400 mt-3 leading-relaxed">Two minutes every day. The Daily Face Protocol mapped clean.</p>
              </div>
              <div className="p-5 bg-black/40 rounded-xl border border-white/5">
                <span className="text-xs font-black tracking-widest text-amber-500 uppercase">TRANSFORMATION</span>
                <p className="text-[0.55rem] text-slate-400 mt-3 leading-relaxed">The change is real. Absolute visible before/after proof loops.</p>
              </div>
              <div className="p-5 bg-black/40 rounded-xl border border-white/5">
                <span className="text-xs font-black tracking-widest text-amber-500 uppercase">MINDSET</span>
                <p className="text-[0.55rem] text-slate-400 mt-3 leading-relaxed">Discipline shows. Mental resilience and hard work metrics.</p>
              </div>
              <div className="p-5 bg-black/40 rounded-xl border border-white/5">
                <span className="text-xs font-black tracking-widest text-amber-500 uppercase">EDUCATION</span>
                <p className="text-[0.55rem] text-slate-400 mt-3 leading-relaxed">Built for men who train. High performance physiological guidance.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "TECH STACK" && (
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl shadow-xl">
              <p className="text-sm font-black tracking-tight text-white">Shopify</p>
              <p className="text-[0.55rem] text-amber-500 uppercase tracking-widest font-bold mb-4">E-Commerce Foundation</p>
              <p className="text-[0.6rem] text-slate-400 leading-relaxed">The Commerce Engine. Handles scales, sales, and massive store structure infrastructure.</p>
            </div>
            <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl shadow-xl">
              <p className="text-sm font-black tracking-tight text-white">Klaviyo</p>
              <p className="text-[0.55rem] text-amber-500 uppercase tracking-widest font-bold mb-4">Email & SMS Retention</p>
              <p className="text-[0.6rem] text-slate-400 leading-relaxed">Retention & Repeat Sales. Turns one-time lifestyle buyers into loyal lifelong customers.</p>
            </div>
            <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl shadow-xl">
              <p className="text-sm font-black tracking-tight text-white">Recharge</p>
              <p className="text-[0.55rem] text-amber-500 uppercase tracking-widest font-bold mb-4">Subscription System</p>
              <p className="text-[0.6rem] text-slate-400 leading-relaxed">Predictable Revenue. Face oil = repeat consumption. Subscriptions change everything.</p>
            </div>
          </div>
        )}

        {activeTab === "CUSTOMER JOURNEY" && (
          <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-amber-500 mb-2">Retention & Lifecycle Engine</h3>
            <p className="text-[0.55rem] text-slate-500 uppercase tracking-widest mb-8">Day 0 to Day 30 Critical Consumer Touchpoints</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-5 bg-black/40 border border-white/5 rounded-2xl">
                <p className="text-[0.6rem] font-black text-white uppercase tracking-wider mb-3">DAY 0 - WELCOME</p>
                <p className="text-[0.55rem] text-slate-400 leading-relaxed">Start the baseline standard configuration immediately.</p>
              </div>
              <div className="p-5 bg-black/40 border border-white/5 rounded-2xl">
                <p className="text-[0.6rem] font-black text-white uppercase tracking-wider mb-3">DAY 2 - RITUAL</p>
                <p className="text-[0.55rem] text-slate-400 leading-relaxed">Educate on correct face oil and training tool utilization.</p>
              </div>
              <div className="p-5 bg-black/40 border border-white/5 rounded-2xl">
                <p className="text-[0.6rem] font-black text-white uppercase tracking-wider mb-3">DAY 30 - REORDER</p>
                <p className="text-[0.55rem] text-slate-400 leading-relaxed">Lock down repeat consumption vectors. Maintain baseline armor.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "DISTRIBUTION" && (
          <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-amber-500 mb-6">Distribution Strategies Matrix</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="p-6 bg-black/30 border border-white/5 rounded-2xl">
                <h4 className="text-sm font-black text-white tracking-tight mb-4 uppercase border-b border-white/5 pb-2">PREMIUM GYMS</h4>
                <p className="text-[0.6rem] font-bold text-slate-400">Fight Gyms & Coaches Seeding, Custom Brand Displays.</p>
              </div>
              <div className="p-6 bg-black/30 border border-white/5 rounded-2xl">
                <h4 className="text-sm font-black text-white tracking-tight mb-4 uppercase border-b border-white/5 pb-2">COMBAT SPORTS</h4>
                <p className="text-[0.6rem] font-bold text-slate-400">Elite Athlete Sponsoring, Event Partnership Pipelines.</p>
              </div>
              <div className="p-6 bg-black/30 border border-white/5 rounded-2xl">
                <h4 className="text-sm font-black text-white tracking-tight mb-4 uppercase border-b border-white/5 pb-2">BARBERSHOPS</h4>
                <p className="text-[0.6rem] font-bold text-slate-400">Premium Concepts Retailers, High-Margin Packages.</p>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
