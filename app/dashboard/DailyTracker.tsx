"use client";
import React, { useState, useEffect } from 'react';

// --- MASTER PROTOCOL IMPORTS ---
import DailyCommand from './DailyCommand';
import WarRoom from './WarRoom';
import FighterNetwork from './FighterNetwork';
import Finance from './Finance';
import ProductDivision from './ProductDivision';
import ContentCalendar from './ContentCalendar';
import IdeasVault from './IdeasVault';
import SOPLibrary from './SOPLibrary';
import Analytics from './Analytics';
import Team from './Team';
import Settings from './Settings';
import Partnerships from './Partnerships';
import Streaming from './Streaming';

export default function UncutOS() {
  const [activePage, setActivePage] = useState('DASHBOARD');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="bg-[#050505] min-h-screen" />;

  const EliteHeader = () => (
    <div className="space-y-6 animate-in fade-in duration-1000 mb-10">
      <div className="relative h-[300px] rounded-[3rem] overflow-hidden border border-zinc-800 shadow-2xl">
          <img src="https://unsplash.com" className="absolute inset-0 w-full h-full object-cover grayscale opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
             <h1 className="text-8xl font-black italic tracking-tighter leading-none mb-2 text-white uppercase">UNCUT OS</h1>
             <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em] italic tracking-widest">V1.0 MASTER // Standard of Excellence</p>
          </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
         <StatBox label="Execution" val="87%" sub="Daily Score" color="text-white" />
         <StatBox label="Roster" val="14" sub="Fighters" color="text-blue-500" />
         <StatBox label="Reach" val="1.2M" sub="Combined" color="text-purple-500" />
         <StatBox label="Sales" val="$8.4K" sub="Shopify" color="text-green-500" />
         <StatBox label="Kick" val="Live" sub="Streaming" color="text-green-400" />
         <StatBox label="Net Profit" val="$4,200" sub="Weekly Yield" color="text-amber-500" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex overflow-x-hidden selection:bg-blue-500">
      <aside className="w-72 border-r border-zinc-900 p-10 flex flex-col gap-10 hidden xl:flex shrink-0">
        <h1 className="text-3xl font-black italic tracking-tighter text-white">UNCUT OS</h1>
        <nav className="flex flex-col gap-3 text-[9px] font-black tracking-widest uppercase text-zinc-600 overflow-y-auto pr-2 scrollbar-hide">
          {[
            'DASHBOARD', 'DAILY COMMAND', 'CONTENT WAR ROOM', 'FIGHTER NETWORK', 
            'PARTNERSHIPS', 'PRODUCT DIVISION', 'STREAMING (KICK)', 'CONTENT CALENDAR', 
            'IDEAS VAULT', 'SOP LIBRARY', 'ANALYTICS', 'FINANCE', 'TEAM', 'SETTINGS'
          ].map((page) => (
            <button key={page} onClick={() => setActivePage(page)} 
              className={`text-left p-2.5 rounded-xl border transition-all ${activePage === page ? 'bg-zinc-900 text-blue-500 border-zinc-800 font-black translate-x-2' : 'border-transparent hover:text-white'}`}>
              {page}
            </button>
          ))}
        </nav>
        <div className="mt-auto border-t border-zinc-900 pt-6">
            <p className="text-[8px] font-black text-zinc-700 mb-4 tracking-widest uppercase">Leadership</p>
            <div className="space-y-2 font-black uppercase">
               <div className="text-[10px] text-white italic">JESUS CHRIST // KING</div>
               <div className="text-[10px] text-zinc-400">Reginald Langley</div>
               <div className="text-[10px] text-zinc-400">Juan Grey</div>
            </div>
        </div>
      </aside>

      <main className="flex-1 p-10 space-y-10 overflow-y-auto">
        <EliteHeader />
        <div className="pt-10 border-t border-zinc-900">
           {activePage === 'DASHBOARD' && (
              <div className="p-20 bg-zinc-900/10 rounded-[3rem] border border-dashed border-zinc-800 text-center italic">
                <h2 className="text-5xl mb-4 text-white font-black uppercase italic">UNCUT CONVERSATIONS</h2>
                Monitoring System Nodes // Operational
              </div>
           )}
           {activePage === 'DAILY COMMAND' && <DailyCommand />}
           {activePage === 'FIGHTER NETWORK' && <FighterNetwork />}
           {activePage === 'CONTENT WAR ROOM' && <WarRoom />}
           {activePage === 'FINANCE' && <Finance />}
           {activePage === 'PRODUCT DIVISION' && <ProductDivision />}
           {activePage === 'CONTENT CALENDAR' && <ContentCalendar />}
           {activePage === 'IDEAS VAULT' && <IdeasVault />}
           {activePage === 'SOP LIBRARY' && <SOPLibrary />}
           {activePage === 'ANALYTICS' && <Analytics />}
           {activePage === 'TEAM' && <Team />}
           {activePage === 'SETTINGS' && <Settings />}
           {activePage === 'PARTNERSHIPS' && <Partnerships />}
           {activePage === 'STREAMING (KICK)' && <Streaming />}
        </div>
      </main>
    </div>
  );
}

const StatBox = ({ label, val, sub, color }: any) => (
  <div className="bg-[#0f0f0f] border border-zinc-800 p-5 rounded-2xl">
    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1 italic">{label}</p>
    <div className={`text-2xl font-black tracking-tighter ${color}`}>{val}</div>
    <p className="text-[8px] font-bold text-zinc-800 uppercase mt-1 italic">{sub}</p>
  </div>
);
