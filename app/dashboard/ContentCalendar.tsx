"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; // Cloud Connection

const ContentCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. LOAD SCHEDULE FROM CLOUD
  useEffect(() => {
    const fetchSchedule = async () => {
      const { data, error } = await supabase
        .from('content_calendar')
        .select('*')
        .order('time', { ascending: true });

      if (!error && data) setEvents(data);
      setLoading(false);
    };
    fetchSchedule();
  }, []);

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex justify-between items-end border-b border-zinc-900 pb-8">
        <div>
          <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none">Content Calendar</h2>
          <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mt-3 italic">[ Protocol: Supabase Live Sync Active ]</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-zinc-800 border border-zinc-700 px-6 py-2 rounded-xl text-[9px] font-black uppercase hover:text-white transition-all">Connect Calendly</button>
           <button className="bg-blue-600 px-6 py-2 rounded-xl text-[9px] font-black uppercase">Schedule Post</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* DAILY POSTING TIMELINE */}
        <div className="lg:col-span-8 bg-[#0f0f0f] border border-zinc-800 p-10 rounded-[3rem] shadow-2xl">
          <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-8 italic">Verified Posting Slots // YouTube • IG • TT • Spotify</h3>
          <div className="space-y-4">
            {loading ? (
              <p className="text-zinc-800 font-black italic uppercase">Syncing Schedule...</p>
            ) : events.length > 0 ? (
              events.map((event, i) => (
                <div key={i} className="flex justify-between items-center p-5 bg-black rounded-2xl border border-zinc-900 hover:border-zinc-700 transition-all">
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-mono text-blue-500">{event.time}</span>
                    <div>
                      <p className="text-lg font-black italic uppercase tracking-tighter">{event.platform}</p>
                      <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{event.type}</p>
                    </div>
                  </div>
                  <span className="text-[8px] font-black px-3 py-1 rounded bg-zinc-900 text-zinc-500 uppercase">{event.status}</span>
                </div>
              ))
            ) : (
              <div className="p-10 border-2 border-dashed border-zinc-900 rounded-2xl text-center text-zinc-800 font-black uppercase italic">No items scheduled for today</div>
            )}
          </div>
        </div>

        {/* EXTERNAL LINKS & SUPABASE FEED */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-zinc-900/20 border border-zinc-800 p-8 rounded-[2.5rem]">
              <h3 className="text-[10px] font-black text-zinc-500 uppercase italic mb-4">Meeting Protocol</h3>
              <p className="text-[11px] font-bold text-zinc-400 uppercase leading-relaxed">Connect your **Zoom** and **Calendly** here to auto-sync fighter interviews.</p>
              <button className="w-full mt-6 bg-zinc-800 py-3 rounded-xl text-[9px] font-black uppercase hover:bg-zinc-700 transition-all">Link External Tools</button>
           </div>
           
           <div className="bg-amber-600/5 border border-amber-600/10 p-8 rounded-[2.5rem]">
              <h3 className="text-[10px] font-black text-amber-500 uppercase italic mb-4">Fighter Signup Feed</h3>
              <p className="text-[9px] text-zinc-600 font-bold uppercase italic">Real-time data stream from Supabase Landing Page...</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCalendar;
