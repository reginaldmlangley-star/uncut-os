"use client";
import Tracker from './DailyTracker';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <h1 className="text-white text-2xl font-bold mb-6 text-center">Project: Uncut OS</h1>
      <Tracker />
    </div>
  );
}
