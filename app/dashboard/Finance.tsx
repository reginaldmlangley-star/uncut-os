"use client";
import React from 'react';

const Finance = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none text-white">Financial Nodes</h2>
      
      <div className="relative bg-[#0f0f0f] border border-zinc-800 p-12 rounded-[3.5rem] shadow-2xl overflow-hidden group">
         <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full group-hover:bg-green-500/20 transition-all duration-700" />
         
         <div className="relative z-10 flex justify-between items-start mb-12">
            <div>
               <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic mb-2">Net Profit Protocol</h3>
               <p className="text-7xl font-black italic tracking-tighter text-green-500 leading-none">$8,450</p>
            </div>
            <div className="text-right">
               <span className="text-[10px] font-black text-zinc-600 uppercase italic">Status: Stable Yield</span>
               <p className="text-xs font-black text-white italic mt-2 underline decoration-green-500 underline-offset-4">59% MARGIN</p>
            </div>
         </div>
         
         <div className="relative z-10 space-y-4">
            <div className="flex justify-between text-[10px] font-black uppercase text-zinc-400 italic"><span>Performance Threshold</span><span>59% Capacity</span></div>
            <div className="w-full bg-zinc-900/50 h-3 rounded-full overflow-hidden border border-zinc-800">
               <div className="h-full bg-green-500 w-[59%] shadow-[0_0_20px_rgba(34,197,94,0.6)]" />
            </div>
         </div>
      </div>
    </div>
  );
};

export default Finance;
