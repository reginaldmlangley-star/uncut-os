"use client";
import React from 'react';

const Team = () => {
  const leadership = [
    { name: "JESUS CHRIST", role: "KING & FOUNDATION", bio: "The Cornerstone of the UNCUT Empire.", color: "text-blue-500", rank: "SUPREME" },
    { name: "REGINALD LANGLEY", role: "CO-FOUNDER // ARCHITECT", bio: "Engineering the infrastructure of the Operating System.", color: "text-white", rank: "ELITE" },
    { name: "JUAN GREY", role: "CO-FOUNDER // STRATEGIST", bio: "Directing the mission, branding, and global execution.", color: "text-white", rank: "ELITE" }
  ];

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-1000">
      <div className="flex justify-between items-end border-b border-zinc-900 pb-8">
        <div>
          <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none">TEAM JESUS</h2>
          <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mt-3 italic">One Mission // One Standard</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {leadership.map((member, i) => (
          <div key={i} className="bg-[#0f0f0f] border border-zinc-800 p-10 rounded-[3rem] text-center space-y-6 group hover:border-blue-500/50 transition-all duration-500">
             <div className="w-24 h-24 bg-zinc-900 rounded-full mx-auto border-2 border-zinc-800 flex items-center justify-center text-2xl font-black italic grayscale group-hover:grayscale-0 transition-all shadow-[0_0_30px_rgba(0,0,0,1)]">
                {member.name.charAt(0)}
             </div>
             <div>
                <h3 className={`text-3xl font-black italic tracking-tighter uppercase ${member.color}`}>{member.name}</h3>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-2">{member.role}</p>
             </div>
             <p className="text-xs text-zinc-600 italic leading-relaxed px-4 font-medium uppercase tracking-tight">"{member.bio}"</p>
             <div className="pt-4">
                <span className="bg-zinc-800 px-4 py-1.5 rounded-full text-[9px] font-black text-zinc-500 group-hover:text-blue-500 transition-colors uppercase tracking-widest">{member.rank}</span>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
