"use client";
import React from 'react';

const Streaming = () => {
  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
      <div className="flex justify-between items-end border-b border-zinc-900 pb-8">
        <div>
          <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none">Streaming</h2>
          <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.4em] mt-3 italic">[ Protocol: Kick.com Live Stream ]</p>
        </div>
        <button className="bg-green-600 text-black px-8 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Go Live on Kick</button>
      </div>

      <div className="bg-[#0f0f0f] border border-zinc-800 rounded-[3rem] overflow-hidden aspect-video relative flex items-center justify-center">
         <div className="absolute inset-0 bg-green-500/5" />
         <div className="text-center z-10">
            <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30 animate-pulse">
               <div className="w-4 h-4 bg-green-500 rounded-full" />
            </div>
            <h3 className="text-2xl font-black italic uppercase italic">Awaiting Stream Signal</h3>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-2">Link your OBS key in Settings to sync feed</p>
         </div>
      </div>
    </div>
  );
};

export default Streaming;
