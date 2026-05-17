"use client";
import React, { useState, useEffect } from 'react';

// --- ALL PROTOCOL IMPORTS ---
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const EliteHeader = () => (
    <div className="space-y-6 animate-in fade-in duration-1000 mb-10">
      <div className="relative h-[250px] md:h-[300px] rounded-[3rem] overflow-hidden border border-zinc-800 shadow-2xl">
          <img src="https://unsplash.com" className="absolute inset-0 w-full h-full object-cover grayscale opacity-60" alt="UNCUT" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
             <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none mb-2 text-white uppercase">UNCUT OS</h1>
             <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em] italic underline decoration-blue-500 underline-offset-8">Empire Standard // V1.0 MASTER</p>
          </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <StatBox label="Total Impact" val="1.2M Reach" sub="Global Ecosystem" color="text-white" />
         <StatBox label="Execution" val="87%" sub="Daily Command Score" color="text-blue-500" />
         <StatBox label="System Node" val="Operational" sub="Team Jesus Active" color="text-zinc-500" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col xl:flex-row selection:bg-blue-500 overflow-x-hidden">
      
      {/* MOBILE NAV */}
      <div className="xl:hidden p-6 flex justify-between items-center border-b border-zinc-900 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <h1 className="text-2xl font-black italic tracking-tighter uppercase">UNCUT</h1>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-blue-600 px-6 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg">
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      <aside className={`${isMenuOpen ? 'flex' : 'hidden'} xl:flex w-full xl:w-72 border-r border-zinc-900 p-10 flex flex-col gap-10 shrink-0 bg-black xl:bg-transparent z-40 fixed xl:relative inset-0 overflow-y-auto`}>
        <h1 className="text-3xl font-black italic tracking-tighter text-white">UNCUT OS</h1>
        <nav className="flex flex-col gap-3 text-[9px] font-black tracking-widest uppercase text-zinc-600">
          {['DASHBOARD', 'DAILY COMMAND', 'CONTENT WAR ROOM', 'FIGHTER NETWORK', 'PARTNERSHIPS', 'PRODUCT DIVISION', 'STREAMING (KICK)', 'CONTENT CALENDAR', 'IDEAS VAULT', 'SOP LIBRARY', 'ANALYTICS', 'FINANCE', 'TEAM', 'SETTINGS'].map((page) => (
            <button key={page} onClick={() => { setActivePage(page); setIsMenuOpen(false); }} 
              className={`text-left p-3 rounded-xl border transition-all ${activePage === page ? 'bg-zinc-900 text-blue-500 border-zinc-800 xl:translate-x-2 font-black' : 'border-transparent hover:text-white'}`}>
              {page}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <EliteHeader />

        <div className="pt-10 border-t border-zinc-900">
           {activePage === 'DASHBOARD' && (
              <div className="space-y-10 animate-in slide-in-from-bottom-10 duration-1000">
                {/* CLICKABLE MEDIA HUB BANNER */}
                <button 
                  onClick={() => setActivePage('STREAMING (KICK)')}
                  className="w-full p-16 md:p-24 bg-zinc-900/10 rounded-[3rem] border border-dashed border-zinc-800 text-center group hover:border-blue-500/50 hover:bg-zinc-900/20 transition-all duration-500"
                >
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em] mb-4 group-hover:text-blue-500 transition-colors">Enter Media Portal</p>
                  <h2 className="text-5xl md:text-7xl text-white font-black uppercase italic tracking-tighter group-hover:scale-105 transition-transform duration-500">UNCUT CONVERSATIONS</h2>
                  <p className="text-[10px] font-bold text-zinc-800 mt-6 uppercase italic">Riverside.fm // Spotify // Live Feed</p>
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                   <div className="h-72 rounded-[2.5rem] bg-zinc-900 border border-zinc-800 overflow-hidden relative group cursor-pointer" onClick={() => setActivePage('FIGHTER NETWORK')}>
                      <img src="https://unsplash.com" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                      <div className="absolute bottom-8 left-8">
                         <p className="text-[8px] font-black uppercase text-blue-500 tracking-widest mb-1 italic">Empire Roster</p>
                         <h4 className="text-3xl font-black italic uppercase">The Warrior Class</h4>
                      </div>
                   </div>
                   <div className="h-72 rounded-[2.5rem] bg-zinc-900 border border-zinc-800 overflow-hidden relative group">
                      <img src="https://unsplash.com" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                      <div className="absolute bottom-8 left-8">
                         <p className="text-[8px] font-black uppercase text-amber-500 tracking-widest mb-1 italic">Brand Intelligence</p>
                         <h4 className="text-3xl font-black italic uppercase">The Crown Standard</h4>
                      </div>
                   </div>
                </div>
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
  <div className="bg-[#0f0f0f] border border-zinc-800 p-6 rounded-3xl flex flex-col justify-center min-h-[90px] shadow-xl">
    <p className="text-[8px] font-black text-zinc-600 uppercase mb-1 tracking-widest italic">{label}</p>
    <div className={`text-2xl font-black tracking-tighter ${color}`}>{val}</div>
    <p className="text-[7px] font-bold text-zinc-800 uppercase mt-1 italic tracking-tight">{sub}</p>
  </div>
);
