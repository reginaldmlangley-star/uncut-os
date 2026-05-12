"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; // Linking to your secure database

const FighterNetwork = () => {
  const [fighters, setFighters] = useState([]);
  const [fName, setFName] = useState("");
  const [fRole, setFRole] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. LOAD FIGHTERS FROM SUPABASE ON START
  useEffect(() => {
    fetchFighters();
  }, []);

  const fetchFighters = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('fighters')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setFighters(data);
    setLoading(false);
  };

  // 2. RECRUIT NEW WARRIOR (Saves to Cloud)
  const addFighter = async () => {
    if (!fName || !fRole) return;
    
    const { data, error } = await supabase
      .from('fighters')
      .insert([{ 
        name: fName, 
        role: fRole, 
        tier: "A", 
        status: "Contacted" 
      }])
      .select();

    if (error) {
      console.error('Error recruiting warrior:', error.message);
    } else if (data) {
      setFighters([data[0], ...fighters]);
      setFName(""); 
      setFRole("");
    }
  };

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
      <div className="flex justify-between items-end">
        <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-none text-white">Fighter Network</h2>
        <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest italic">
          [ Protocol: Supabase Cloud Active ]
        </div>
      </div>

      {/* RECRUITMENT SECTION */}
      <section className="bg-[#0f0f0f] border border-zinc-800 p-10 rounded-[3rem] shadow-2xl">
        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-8 italic">Recruitment Protocol // Deploying New Assets</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black text-zinc-700 uppercase ml-2 tracking-widest">Fighter Identity</label>
            <input 
              value={fName} 
              onChange={(e) => setFName(e.target.value)} 
              placeholder="Warrior Name" 
              className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-xs font-bold text-white outline-none focus:border-blue-500" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-zinc-700 uppercase ml-2 tracking-widest">Specialization</label>
            <input 
              value={fRole} 
              onChange={(e) => setFRole(e.target.value)} 
              placeholder="MMA / Muay Thai / Mindset" 
              className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-xs font-bold text-white outline-none focus:border-blue-500" 
            />
          </div>
          <div className="flex items-end">
            <button 
              onClick={addFighter} 
              className="w-full bg-blue-600 h-[52px] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              Recruit Warrior
            </button>
          </div>
        </div>
      </section>

      {/* ACTIVE ROSTER */}
      <section className="bg-zinc-950 border border-zinc-800 rounded-[3.5rem] overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-zinc-800 text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">
              <th className="p-10">Scheduled Sessions</th>
              <th className="p-10">Role / Strategy</th>
              <th className="p-10 text-right">Power Tier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {loading ? (
              <tr><td className="p-10 text-zinc-800 font-black italic uppercase">Syncing with Cloud...</td></tr>
            ) : fighters.map(f => (
              <tr key={f.id} className="group hover:bg-blue-500/5 transition-all">
                <td className="p-10">
                  <div className="text-2xl font-black italic tracking-tighter uppercase group-hover:text-blue-500 transition-colors leading-none">{f.name}</div>
                  <p className="text-[8px] text-zinc-700 font-mono mt-2 uppercase tracking-widest">{f.status} // Mission Active</p>
                </td>
                <td className="p-10 text-[11px] font-bold text-zinc-500 uppercase tracking-widest italic">{f.role}</td>
                <td className="p-10 text-right font-mono text-blue-500 font-black text-xl italic">{f.tier}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {fighters.length === 0 && !loading && (
          <div className="p-20 text-center text-zinc-800 font-black italic uppercase tracking-tighter">No Warriors Recruited // Awaiting Deployment</div>
        )}
      </section>
    </div>
  );
};

export default FighterNetwork;
