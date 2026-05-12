"use client";
import React from 'react';

const Settings = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none text-white">System Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0f0f0f] border border-zinc-800 p-10 rounded-[3rem] space-y-8">
          <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">External API Connections</h3>
          <div className="space-y-6">
             <SettingItem label="Supabase Cloud" status="CONNECTED" color="text-green-500" />
             <SettingItem label="Shopify Admin (uncutnaturals.shop)" status="SYNCING" color="text-blue-500" />
             <SettingItem label="Google Drive (Uncut Vault)" status="CONNECTED" color="text-green-500" />
             <SettingItem label="Kick Stream API" status="LOCKED" color="text-zinc-700" />
          </div>
        </div>

        <div className="bg-[#0f0f0f] border border-zinc-800 p-10 rounded-[3rem] flex flex-col justify-between">
           <div>
              <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic mb-6">Environment Status</h3>
              <p className="text-xs font-bold text-zinc-400 uppercase italic">Version: UNCUT OS v1.0.4-MASTER</p>
              <p className="text-xs font-bold text-zinc-400 uppercase italic mt-2 text-zinc-600">Secure Protocol: Active</p>
           </div>
           <button className="w-full bg-red-600/10 border border-red-900/20 text-red-500 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-red-600 hover:text-white transition-all">Emergency System Reboot</button>
        </div>
      </div>
    </div>
  );
};

const SettingItem = ({ label, status, color }: any) => (
  <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
     <span className="text-xs font-bold uppercase text-zinc-300">{label}</span>
     <span className={`text-[9px] font-black uppercase italic ${color}`}>{status}</span>
  </div>
);

export default Settings;
