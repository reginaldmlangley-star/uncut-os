"use client";
import React, { useState } from 'react';

const DailyCommand = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Morning Routine / Training", completed: true, time: "05:00" },
    { id: 2, text: "Podcast Interview", completed: true, time: "14:00" },
    { id: 3, text: "Film Lifestyle Content", completed: false, time: "16:00" },
    { id: 4, text: "Edit + Clip 3 Videos", completed: false, time: "17:00" },
    { id: 5, text: "Outreach to 15 Fighters", completed: false, time: "19:00" },
    { id: 6, text: "Kick Stream", completed: false, time: "21:00" },
    { id: 7, text: "Upload Content (YouTube, TT, IG, Spotify)", completed: false, time: "23:00" }
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-8">
      <h2 className="text-5xl font-black italic tracking-tighter uppercase">Daily Command Protocol</h2>
      <div className="bg-[#0f0f0f] border border-zinc-800 p-10 rounded-[3rem] shadow-2xl">
         <div className="space-y-6">
            {tasks.map(task => (
              <div key={task.id} className="flex justify-between items-center group cursor-pointer" onClick={() => toggleTask(task.id)}>
                 <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 transition-all ${task.completed ? 'bg-blue-500 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'border-zinc-800 group-hover:border-zinc-700'}`}>
                       {task.completed && <span className="flex items-center justify-center text-[10px] text-white">✓</span>}
                    </div>
                    <span className={`text-sm font-bold uppercase tracking-tight ${task.completed ? 'text-zinc-600 line-through' : 'text-zinc-300'}`}>{task.text}</span>
                 </div>
                 <span className="text-[10px] font-mono text-zinc-700 group-hover:text-blue-500">{task.time} HRS</span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default DailyCommand;
