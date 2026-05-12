"use client";
import React, { useState } from 'react';

const Partnerships = () => {
  const [partners, setPartners] = useState([
    { id: 1, name: "Combat Sports Gear", type: "Affiliate", revenue: "$2,400", status: "Active" },
    { id: 2, name: "Elite Recovery", type: "Sponsorship", revenue: "$5,000", status: "Pending" }
  ]);

  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("Affiliate");

  const addPartner = () => {
    if (!newName) return;
    setPartners([...partners, { id: Date.now(), name: newName, type: newType, revenue: "$0", status: "Negotiating" }]);
    setNewName("");
  };

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex justify-between items-end border-b border-zinc-900 pb-8">
        <div>
          <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none text-white">Partnerships</h2>
          <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mt-3 italic">[ Protocol: Network Expansion & Sponsorships ]</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ADD PARTNER FORM */}
        <div className="lg:col-span-4 bg-[#0f0f0f] border border-zinc-800 p-8 rounded-[2.5rem] space-y-6">
           <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Register New Partner</h3>
           <div className="space-y-4">
              <input 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Partner Identity" 
                className="w-full bg-black border border-zinc-800 p-4 rounded-xl text-xs font-bold text-white outline-none focus:border-blue-500" 
              />
              <select 
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full bg-black border border-zinc-800 p-4 rounded-xl text-xs font-bold text-zinc-500 outline-none focus:border-blue-500"
              >
                <option value="Affiliate">Affiliate</option>
                <option value="Sponsorship">Sponsorship</option>
                <option value="Brand Deal">Brand Deal</option>
              </select>
              <button onClick={addPartner} className="w-full bg-blue-600 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all">Add Partnership</button>
           </div>
        </div>

        {/* ACTIVE PARTNERS TABLE */}
        <div className="lg:col-span-8 bg-zinc-950 border border-zinc-800 rounded-[3rem] overflow-hidden">
           <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-800 text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">
                  <th className="p-8">Partner</th>
                  <th className="p-8">Type</th>
                  <th className="p-8 text-right">Yield</th>
                </tr>
              </thead>
              <tbody>
                {partners.map(p => (
                  <tr key={p.id} className="border-b border-zinc-900 group hover:bg-blue-500/5 transition-all">
                    <td className="p-8">
                       <p className="text-xl font-black italic uppercase tracking-tighter group-hover:text-blue-500 transition-colors">{p.name}</p>
                       <p className={`text-[8px] font-black uppercase mt-1 ${p.status === 'Active' ? 'text-green-500' : 'text-amber-500'}`}>{p.status}</p>
                    </td>
                    <td className="p-8 text-[11px] font-bold text-zinc-500 uppercase tracking-widest italic">{p.type}</td>
                    <td className="p-8 text-right font-mono text-white font-black text-lg">{p.revenue}</td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

export default Partnerships;
