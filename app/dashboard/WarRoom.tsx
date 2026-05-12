"use client";
import React, { useState } from 'react';

const WarRoom = () => {
  const [missions, setMissions] = useState([
    { id: 1, title: "Podcast Interview Reel", type: "Short-form", status: "Editing", platform: "TT", link: "" },
    { id: 2, title: "Fighter Full Body Workout", type: "Full Body Content", status: "Ready", platform: "IG", link: "" },
    { id: 3, title: "Uncut Commercial #01", type: "Commercials", status: "Drafting", platform: "YT", link: "" }
  ]);

  const updateMission = (id: number, field: string, value: string) => {
    setMissions(missions.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-700">
      {/* 1. PIPELINE HEADER */}
      <section className="flex justify-between items-end border-b border-zinc-900 pb-8">
        <div>
          <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em] mb-3 italic">Protocol: War Room</h3>
          <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none">Content Pipeline</h2>
        </div>
        <div className="flex gap-4">
           <button className="bg-zinc-800 border border-zinc-700 px-6 py-2 rounded-xl text-[9px] font-black uppercase hover:text-white transition-all">Google Drive Sync</button>
           <button className="bg-blue-600 px-6 py-2 rounded-xl text-[9px] font-black uppercase shadow-[0_0_15px_rgba(59,130,246,0.4)]">New Asset</button>
        </div>
      </section>

      {/* 2. PLATFORM STRATEGY SECTORS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PlatformSector platform="YouTube" focus="Long Form / Paid Ads" color="border-red-600" />
        <PlatformSector platform="Instagram" focus="Body Content / Commercials" color="border-purple-600" />
        <PlatformSector platform="TikTok" focus="Short-form Content" color="border-blue-400" />
        <PlatformSector platform="Spotify" focus="Podcasts / Audio" color="border-green-500" />
      </div>

      {/* 3. LIVE ASSET TRACKING */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {missions.map((m) => (
          <div key={m.id} className="bg-[#0f0f0f] border border-zinc-800 p-8 rounded-[2.5rem] group hover:border-blue-500/50 transition-all duration-500">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">{m.platform} // ASSET</span>
              <div className="flex gap-2">
                <span className="bg-blue-500/10 text-blue-500 text-[8px] font-black px-2 py-1 rounded uppercase tracking-tighter">{m.status}</span>
              </div>
            </div>
            <h4 className="text-xl font-black italic tracking-tighter uppercase mb-2 group-hover:text-blue-500 transition-colors">{m.title}</h4>
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-6">{m.type}</p>
            <input 
              type="text" 
              placeholder="VERIFICATION LINK..." 
              value={m.link}
              onChange={(e) => updateMission(m.id, 'link', e.target.value)}
              className="w-full bg-black p-4 rounded-2xl text-[10px] border border-zinc-900 outline-none focus:border-blue-500 font-mono text-blue-400 placeholder:text-zinc-800"
            />
          </div>
        ))}
      </div>

      {/* 4. MASTER DOCUMENT HUB */}
      <section className="bg-zinc-900/20 p-10 rounded-[3rem] border border-zinc-800 border-dashed">
         <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-8 text-center italic">UNCUT Media Asset Library</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-black italic">
            <DocumentSlot type="PDF" label="Upload Scripts" />
            <DocumentSlot type="EXCEL" label="Data Spreadsheets" />
            <DocumentSlot type="WORD" label="Word Documents" />
         </div>
      </section>
    </div>
  );
};

// SUB-COMPONENTS
const PlatformSector = ({ platform, focus, color }: any) => (
  <div className={`p-6 bg-[#0f0f0f] border-t-4 ${color} rounded-2xl`}>
     <h4 className="text-lg font-black uppercase italic tracking-tighter mb-1">{platform}</h4>
     <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">{focus}</p>
  </div>
);

const DocumentSlot = ({ type, label }: any) => (
  <div className="bg-black/40 border border-zinc-900 p-6 rounded-2xl text-center flex flex-col items-center justify-center gap-3 hover:bg-zinc-900 transition-all cursor-pointer group">
     <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-[10px] text-zinc-500 group-hover:text-white group-hover:border-white transition-all">＋</div>
     <div className="space-y-1">
        <p className="text-[10px] text-white uppercase tracking-widest">{type}</p>
        <p className="text-[8px] text-zinc-600 uppercase italic font-bold">{label}</p>
     </div>
  </div>
);

export default WarRoom;
