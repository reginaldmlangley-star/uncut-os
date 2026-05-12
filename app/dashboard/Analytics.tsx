"use client";
import React from 'react';

const Analytics = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      <div className="flex justify-between items-end border-b border-zinc-900 pb-8">
        <div>
          <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none text-white">Analytics Hub</h2>
          <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mt-3 italic">[ Protocol: Social Media Intelligence Sync ]</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-zinc-800 border border-zinc-700 px-6 py-2 rounded-xl text-[9px] font-black uppercase hover:text-white transition-all italic">Export Data Report</button>
        </div>
      </div>

      {/* 1. MASTER KPI GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
         <AnalyticCard label="Total Views" val="1.2M" sub="+18% Last 7D" color="text-white" />
         <AnalyticCard label="Subscribers" val="42.5K" sub="Across Platforms" color="text-blue-500" />
         <AnalyticCard label="Watch Time" val="8.4K HRS" sub="Total Retention" color="text-purple-500" />
         <AnalyticCard label="Conversion" val="4.2%" sub="Media to Shopify" color="text-green-500" />
      </div>

      {/* 2. AUDIENCE & POSTING INTELLIGENCE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Audience Split */}
        <div className="lg:col-span-5 bg-[#0f0f0f] border border-zinc-800 p-10 rounded-[3rem] space-y-8">
           <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Audience Protocol // Fighter Interest</h3>
           <div className="space-y-6">
              <InterestBar label="MMA Enthusiasts" percent={62} color="bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
              <InterestBar label="Muay Thai Loyalists" percent={38} color="bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]" />
           </div>
           <p className="text-[10px] text-zinc-600 font-bold uppercase leading-relaxed italic border-t border-zinc-900 pt-6">
              Primary growth detected in MMA content streams. Recommendation: Scale "Full Body" Commercials for Muay Thai to balance.
           </p>
        </div>

        {/* Posting Intensity & Peak Times */}
        <div className="lg:col-span-7 bg-[#0f0f0f] border border-zinc-800 p-10 rounded-[3rem]">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-[10px] font-black text-zinc-500 uppercase italic">Peak Performance Hours</h3>
              <span className="text-[9px] font-black text-green-500 uppercase italic">Live Data Feed</span>
           </div>
           <div className="grid grid-cols-4 gap-4 h-40 items-end px-4">
              {[40, 70, 100, 60, 30, 85].map((h, i) => (
                <div key={i} className="bg-zinc-900 w-full rounded-t-lg relative group overflow-hidden">
                   <div className="bg-blue-500 absolute bottom-0 w-full transition-all duration-1000" style={{ height: `${h}%` }} />
                </div>
              ))}
           </div>
           <div className="flex justify-between mt-6 text-[8px] font-black text-zinc-700 uppercase tracking-widest">
              <span>08:00</span><span>14:00</span><span>20:00 (PEAK)</span><span>02:00</span>
           </div>
        </div>

      </div>
    </div>
  );
};

// SUB-COMPONENTS
const AnalyticCard = ({ label, val, sub, color }: any) => (
  <div className="bg-[#0f0f0f] border border-zinc-800 p-8 rounded-3xl group hover:border-zinc-600 transition-all">
    <p className="text-[9px] font-black text-zinc-600 uppercase mb-3 tracking-widest italic">{label}</p>
    <div className={`text-4xl font-black italic tracking-tighter ${color}`}>{val}</div>
    <p className="text-[8px] font-bold text-zinc-800 uppercase mt-2 italic">{sub}</p>
  </div>
);

const InterestBar = ({ label, percent, color }: any) => (
  <div className="space-y-2">
     <div className="flex justify-between text-[10px] font-black uppercase italic">
        <span className="text-zinc-400">{label}</span>
        <span className="text-white">{percent}%</span>
     </div>
     <div className="w-full bg-black h-1.5 rounded-full overflow-hidden border border-zinc-900">
        <div className={`${color} h-full transition-all duration-1000`} style={{ width: `${percent}%` }} />
     </div>
  </div>
);

export default Analytics;
