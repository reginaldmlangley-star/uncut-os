"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const FighterNetwork = () => {
  const [fighters, setFighters] = useState<any[]>([]);
  const [fName, setFName] = useState("");
  const [fRole, setFRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchFighters(); }, []);

  const fetchFighters = async () => {
    const { data } = await supabase.from('fighters').select('*').order('created_at', { ascending: false });
    if (data) setFighters(data);
    setLoading(false);
  };

  const addFighter = async () => {
    if (!fName || !fRole) return;
    const { data, error } = await supabase.from('fighters').insert([{ name: fName, role: fRole, tier: 'A', status: 'Contacted' }]).select();
    if (!error && data) {
      setFighters([data[0], ...fighters]);
      setFName(""); setFRole("");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black italic uppercase">Fighter Network</h2>
      <div className="bg-[#0f0f0f] border border-zinc-800 p-6 rounded-3xl space-y-4">
        <input value={fName} onChange={(e) => setFName(e.target.value)} placeholder="Warrior Name" className="w-full bg-black border border-zinc-800 p-4 rounded-xl text-white outline-none focus:border-blue-500" />
        <input value={fRole} onChange={(e) => setFRole(e.target.value)} placeholder="Specialization" className="w-full bg-black border border-zinc-800 p-4 rounded-xl text-white outline-none focus:border-blue-500" />
        <button onClick={addFighter} className="w-full bg-blue-600 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg active:scale-95 transition-all">Recruit Warrior</button>
      </div>
      <div className="space-y-4">
        {loading ? <p className="font-black italic uppercase text-zinc-800">Syncing...</p> : fighters.map(f => (
          <div key={f.id} className="p-6 bg-[#0f0f0f] border border-zinc-800 rounded-3xl flex justify-between items-center">
            <div className="font-black italic uppercase text-xl">{f.name}</div>
            <div className="text-blue-500 font-mono font-black italic">TIER {f.tier}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FighterNetwork;
