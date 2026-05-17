"use client";
import React from 'react';

const ProductDivision = () => {
  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex justify-between items-center border-b border-zinc-900 pb-8">
        <div>
          <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none text-white">Product Intelligence</h2>
          <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-2 italic">Active Node: uncutnaturals.shop</p>
        </div>
        <a href="https://uncutnaturals.shop" target="_blank" rel="noopener noreferrer" className="bg-blue-600 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_25px_rgba(37,99,235,0.4)]">Open Shopify Admin</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <MetricCard label="Best Seller" val="Crown System" sub="142 Units Sold" color="text-blue-500" />
         <MetricCard label="Top Region" val="USA (75%)" sub="Primary Sales Node" color="text-purple-500" />
         <MetricCard label="System Status" val="SECURE" sub="Inventory Sync Active" color="text-white" />
      </div>

      <div className="p-20 bg-[#0f0f0f] border border-dashed border-zinc-800 rounded-[4rem] text-center group cursor-pointer hover:bg-zinc-900/10 transition-all duration-500">
         <p className="text-[10px] font-black text-zinc-700 uppercase italic mb-4 tracking-[0.5em]">Inventory Analytics Protocol</p>
         <h3 className="text-3xl font-black italic text-zinc-600 uppercase italic tracking-tighter">Ready for Live API Handshake</h3>
      </div>
    </div>
  );
};

const MetricCard = ({ label, val, sub, color }: any) => (
  <div className="bg-[#0f0f0f] border border-zinc-800 p-8 rounded-[2.5rem] hover:border-zinc-700 transition-all shadow-xl">
    <p className="text-[8px] font-black text-zinc-600 uppercase mb-2 tracking-widest italic">{label}</p>
    <p className={`text-4xl font-black italic tracking-tighter uppercase ${color}`}>{val}</p>
    <p className="text-[10px] text-zinc-500 mt-2 italic font-bold uppercase tracking-tight">{sub}</p>
  </div>
);

export default ProductDivision;
