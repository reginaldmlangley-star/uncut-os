"use client";
import React, { useState } from 'react';

const FinanceProtocol = () => {
  const [revenue] = useState(12450);
  const [goal] = useState(100000);
  
  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-700 pb-20">
      {/* 1. MASTER REVENUE MONITOR */}
      <section className="bg-zinc-900/40 p-12 rounded-[3.5rem] border border-zinc-800 text-center shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] mb-6 italic">Protocol: Finance // Capital Flux</p>
          <h2 className="text-8xl font-black text-white tracking-tighter leading-none mb-4">${revenue.toLocaleString()}</h2>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Current Monthly Revenue (UNCUT)</p>
          
          {/* REVENUE GOAL BAR */}
          <div className="mt-12 max-w-md mx-auto">
            <div className="flex justify-between text-[8px] font-black text-zinc-600 uppercase mb-2 tracking-widest">
              <span>Progress</span>
              <span>Goal: ${goal.toLocaleString()}</span>
            </div>
            <div className="w-full bg-black h-2 rounded-full overflow-hidden border border-zinc-800">
               <div className="bg-amber-500 h-full shadow-[0_0_15px_rgba(245,158,11,0.5)]" style={{ width: `${(revenue/goal)*100}%` }} />
            </div>
            <p className="text-[8px] text-zinc-700 mt-2 font-bold uppercase italic">Road to $100K Monthly Milestone</p>
          </div>
        </div>
      </section>

      {/* 2. PROFIT & CAPITAL BREAKDOWN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-black italic">
         <FinanceCard label="Current Profit" val="$7,200" sub="Gross" color="text-green-500" />
         <FinanceCard label="Net Profit" val="$4,200" sub="After Spend" color="text-green-400" />
         <FinanceCard label="Capital Injected" val="$25,000" sub="UNCUT Initial" color="text-white" />
      </div>

      {/* 3. INVESTMENT ROUNDS & BANKING */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* INVESTMENT STATUS */}
        <div className="bg-[#0f0f0f] border border-zinc-800 p-10 rounded-[3rem]">
          <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-8 italic">Investment & Rounds</h3>
          <div className="space-y-6">
             <RoundItem round="Seed Round" status="ACTIVE" val="$50,000 Target" active />
             <RoundItem round="Series A" status="LOCKED" val="TBD" />
             <RoundItem round="Series B" status="LOCKED" val="TBD" />
          </div>
        </div>

        {/* BANKING & INVESTORS */}
        <div className="bg-[#0f0f0f] border border-zinc-800 p-10 rounded-[3rem]">
          <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-8 italic">Banks & Investors</h3>
          <div className="space-y-6">
             <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                <span className="text-xs font-bold uppercase">Operating Bank</span>
                <span className="text-[10px] font-mono text-blue-500">SECURE_CONNECTED</span>
             </div>
             <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                <span className="text-xs font-bold uppercase">Main Investor Pool</span>
                <span className="text-[10px] font-bold text-zinc-700 italic">TEAM JESUS ONLY</span>
             </div>
             <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                <span className="text-xs font-bold uppercase">Series A Leads</span>
                <span className="text-[10px] font-bold text-zinc-800">PENDING ROUND</span>
             </div>
             <div className="flex justify-between items-center pt-2">
                <span className="text-xs font-bold uppercase">Burn Rate</span>
                <span className="text-[10px] font-bold text-red-500">-$2,100 / MO</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// SUB-COMPONENTS
const FinanceCard = ({ label, val, sub, color }: any) => (
  <div className="bg-[#0f0f0f] border border-zinc-800 p-8 rounded-3xl">
    <p className="text-[8px] text-zinc-600 uppercase mb-2 tracking-widest italic">{label}</p>
    <div className={`text-4xl font-black italic tracking-tighter ${color}`}>{val}</div>
    <p className="text-[9px] text-zinc-800 uppercase mt-2 italic font-bold">{sub}</p>
  </div>
);

const RoundItem = ({ round, status, val, active = false }: any) => (
  <div className={`flex justify-between items-center p-4 rounded-2xl border ${active ? 'bg-amber-500/5 border-amber-500/20' : 'border-zinc-900'}`}>
     <div>
        <p className={`text-xs font-black uppercase ${active ? 'text-white' : 'text-zinc-600'}`}>{round}</p>
        <p className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">{val}</p>
     </div>
     <span className={`text-[8px] font-black px-2 py-1 rounded ${active ? 'bg-amber-500 text-black shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'bg-zinc-900 text-zinc-700'}`}>{status}</span>
  </div>
);

export default FinanceProtocol;
