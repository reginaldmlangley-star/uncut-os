"use client";
import React, { useState } from 'react';

const IdeasVault = () => {
  const [idea, setIdea] = useState("");

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex justify-between items-end border-b border-zinc-900 pb-8">
        <div>
          <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none text-white">Ideas Vault</h2>
          <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mt-3 italic">[ Protocol: Google Drive // UNCUT Cloud Sync ]</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-zinc-800 border border-zinc-700 px-6 py-2 rounded-xl text-[9px] font-black uppercase hover:text-white transition-all italic">Access Uncut Drive</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* IDEA CAPTURE TERMINAL */}
        <div className="lg:col-span-7 bg-[#0f0f0f] border border-zinc-800 p-10 rounded-[3rem] shadow-2xl">
           <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-6 italic">Capture New Concept</h3>
           <textarea 
             value={idea}
             onChange={(e) => setIdea(e.target.value)}
             placeholder="Type your next viral hook, fighter story, or product idea here..." 
             className="w-full h-64 bg-black border border-zinc-900 rounded-3xl p-8 text-sm text-zinc-300 outline-none focus:border-blue-500 transition-all resize-none font-medium leading-relaxed" 
           />
           <button className="w-full mt-6 bg-blue-600 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
             Lock into Vault
           </button>
        </div>

        {/* DOCUMENT UPLOAD HUB */}
        <div className="lg:col-span-5 space-y-6 italic">
           <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-[3rem]">
              <h3 className="text-[10px] font-black text-zinc-500 uppercase italic mb-8">Document Hub // Upload Protocols</h3>
              <div className="grid grid-cols-1 gap-4">
                 <UploadSlot type="PDF" label="Strategy Scripts" color="border-red-900/30" />
                 <UploadSlot type="EXCEL" label="Metric Spreadsheets" color="border-green-900/30" />
                 <UploadSlot type="WORD" label="SOP Documents" color="border-blue-900/30" />
              </div>
           </div>
           
           <div className="bg-zinc-900/10 border border-zinc-900 p-8 rounded-[2.5rem] text-center border-dashed">
              <p className="text-[9px] font-black text-zinc-700 uppercase tracking-widest italic">Drop any file here to sync with Team Jesus</p>
           </div>
        </div>
      </div>
    </div>
  );
};

// SUB-COMPONENT: UPLOAD SLOT
const UploadSlot = ({ type, label, color }: any) => (
  <div className={`flex items-center justify-between p-5 bg-black border ${color} rounded-2xl group cursor-pointer hover:border-white/20 transition-all`}>
     <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-black group-hover:text-white transition-all">＋</div>
        <div>
           <p className="text-xs font-black text-white italic tracking-tighter uppercase">{type}</p>
           <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">{label}</p>
        </div>
     </div>
     <div className="text-[8px] font-black text-zinc-800 group-hover:text-zinc-500 transition-all uppercase italic">Click to Upload</div>
  </div>
);

export default IdeasVault;
