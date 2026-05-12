"use client";
import React, { useState } from 'react';

const ProductDivision = () => {
  const [sales] = useState([
    { id: 1, item: "Natural Performance Pre-Workout", price: "$45.00", status: "In Stock" },
    { id: 2, item: "Recovery Minerals", price: "$32.00", status: "Low Stock" },
    { id: 3, item: "UNCUT Standard Tee", price: "$28.00", status: "In Stock" },
  ]);

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-[10px] font-black text-green-500 uppercase tracking-[0.5em] mb-3 italic">Protocol: Product // Shopify Sync</h3>
          <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none">Product Division</h2>
        </div>
        <a 
          href="https://uncutnaturals.shop" 
          target="_blank" 
          className="bg-green-600 text-black px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-400 transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)]"
        >
          Open Shopify Admin
        </a>
      </div>

      {/* 1. SHOPIFY LIVE MONITOR */}
      <section className="bg-zinc-900/40 p-1 rounded-[3rem] border border-zinc-800 overflow-hidden shadow-2xl">
         <div className="bg-zinc-900 p-4 border-b border-zinc-800 flex justify-between items-center">
            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest italic italic">Live Terminal: uncutnaturals.shop</span>
            <div className="flex gap-2">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
               <span className="text-[8px] font-bold text-green-500 uppercase italic">Store Online</span>
            </div>
         </div>
         {/* Use an iframe for your actual store preview */}
         <iframe 
           src="https://uncutnaturals.shop" 
           className="w-full h-[600px] grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
         />
      </section>

      {/* 2. INVENTORY & PRODUCT PIPELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0f0f0f] border border-zinc-800 p-10 rounded-[3rem]">
          <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-8 italic">Active Inventory</h3>
          <div className="space-y-6">
             {sales.map(item => (
               <div key={item.id} className="flex justify-between items-center border-b border-zinc-900 pb-4 group">
                  <div>
                     <p className="text-sm font-black italic tracking-tighter uppercase group-hover:text-green-500 transition-colors">{item.item}</p>
                     <p className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest mt-1">{item.price}</p>
                  </div>
                  <span className={`text-[8px] font-black px-3 py-1 rounded ${item.status === 'In Stock' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                     {item.status}
                  </span>
               </div>
             ))}
          </div>
        </div>

        {/* SHIPMENT & LOGISTICS */}
        <div className="bg-[#0f0f0f] border border-zinc-800 p-10 rounded-[3rem] flex flex-col justify-center text-center space-y-6">
           <p className="text-[10px] font-black text-zinc-700 uppercase tracking-widest italic italic">Logistics Command</p>
           <h4 className="text-3xl font-black italic tracking-tighter text-white uppercase italic">32 Orders Pending</h4>
           <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Average fulfillment time: 24.2 HRS</p>
           <button className="w-full bg-zinc-800 border border-zinc-700 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:text-white transition-all">Generate Shipping Manifest</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDivision;
