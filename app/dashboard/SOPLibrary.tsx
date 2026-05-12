"use client";
import React from 'react';

const SOPLibrary = () => {
  const sops = [
    { id: 1, title: "Fighter Outreach Protocol", type: "WORD", status: "Active", date: "05/2026" },
    { id: 2, title: "Podcast Editing Workflow", type: "PDF", status: "Review", date: "04/2026" },
    { id: 3, title: "Ad Spend Tracking Template", type: "EXCEL", status: "Active", date: "05/2026" },
  ];

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex justify-between items-end border-b border-zinc-900 pb-8">
        <div>
          <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none text-white">SOP Library</h2>
          <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mt-3 italic">[ Protocol: Standard Operating Procedures ]</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-zinc-800 border border-zinc-700 px-6 py-2 rounded-xl text-[9px] font-black uppercase hover:text-white transition-all italic">Create New SOP</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* MASTER SOP DIRECTORY */}
        <div className="lg:col-span-8 bg-[#0f0f0f] border border-zinc-800 rounded-[3rem] overflow-hidden shadow-2xl">
           <div className="p-8 border-b border-zinc-900 bg-zinc-900/20 flex justify-between items-center italic">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Global Operating Standards</p>
              <span className="text-[8px] font-bold text-zinc-700 uppercase">3 Active Files</span>
           </div>
           <div className="p-4">
              {sops.map(sop => (
                <div key={sop.id} className="flex justify-between items-center p-6 bg-black rounded-2xl border border-zinc-900 mb-4 group hover:border-blue-500 transition-all cursor-pointer">
                   <div className="flex items-center gap-6">
                      <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-[10px] font-black text-zinc-500 group-hover:text-blue-500 transition-all italic">
                         {sop.type}
                      </div>
                      <div>
                         <p className="text-lg font-black italic tracking-tighter uppercase group-hover:text-white transition-colors">{sop.title}</p>
                         <p className="text-[8px] text-zinc-700 font-bold uppercase tracking-widest mt-1">Last Update: {sop.date}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <span className={`text-[8px] font-black px-2 py-1 rounded ${sop.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'} uppercase mb-2 inline-block`}>{sop.status}</span>
                      <p className="text-[9px] font-black text-zinc-800 uppercase italic group-hover:text-zinc-400">Open Document</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* RESOURCE CATEGORIES */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-[2.5rem] italic">
              <h3 className="text-[10px] font-black text-zinc-500 uppercase italic mb-6">Internal Assets</h3>
              <div className="space-y-4">
                 <CategoryBtn label="Media Production" count="12 Files" />
                 <CategoryBtn label="Business Systems" count="08 Files" />
                 <CategoryBtn label="Legal / Contracts" count="05 Files" />
              </div>
           </div>
           
           <div className="bg-blue-600/5 border border-blue-500/10 p-8 rounded-[2.5rem] italic">
              <p className="text-[9px] font-black text-blue-500 uppercase italic mb-2 tracking-widest italic">Sync Status</p>
              <p className="text-xs font-bold text-zinc-400 uppercase leading-relaxed italic">All SOPs are currently synced to the UNCUT Google Drive Vault.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

const CategoryBtn = ({ label, count }: any) => (
  <div className="flex justify-between items-center p-4 bg-black rounded-xl border border-zinc-900 hover:border-zinc-700 transition-all cursor-pointer group">
     <span className="text-[10px] font-black text-zinc-400 uppercase group-hover:text-white italic">{label}</span>
     <span className="text-[8px] font-bold text-zinc-700 uppercase italic">{count}</span>
  </div>
);

export default SOPLibrary;
