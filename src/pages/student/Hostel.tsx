import React, { useState } from 'react';
import { Home, ShieldAlert, CheckCircle2, BedDouble } from 'lucide-react';

export default function StudentHostel() {
  const [formData, setFormData] = useState({ hall: 'liaquat', roomPreference: 'triple', diet: 'regular' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3100);
  };

  return (
    <div className="space-y-6" id="student-hostels-desk">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Hostel Hall Allotments</h2>
        <p className="text-xs text-slate-400">Request residential hall placements, manage mess menus, or apply for room maintenance tickets.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left info */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 dark:text-white">Active Residential Placement</h3>
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl flex items-center space-x-4">
              <div className="p-3 bg-indigo-500/15 text-indigo-500 rounded-xl shrink-0">
                <Home className="w-6 h-6" />
              </div>
              <div className="text-xs">
                <span className="block text-[8px] uppercase tracking-wider font-extrabold text-slate-400 leading-none">Registered Room</span>
                <span className="text-sm font-black text-slate-900 dark:text-white mt-1 block">Liaquat Hall Block A, Room 101</span>
                <span className="text-slate-400 font-bold block mt-0.5">Dining mess token number: #22930</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form request right */}
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-xs">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center space-y-2 py-10 h-full">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 animate-bounce" />
              <h3 className="font-bold text-base text-slate-800 dark:text-white">Maintenance Ticket Filed</h3>
              <p className="text-xs text-slate-500 max-w-sm">
                Your residential complaint/allotment ticket has been successfully generated inside UET treasury registry catalogs.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-slate-600 dark:text-slate-350">
              <h3 className="text-sm font-black text-slate-800 dark:text-white">Room Maintenance & Service Ticket</h3>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400 font-mono">Service Category</label>
                <select
                  value={formData.roomPreference}
                  onChange={(e) => setFormData({ ...formData, roomPreference: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none"
                >
                  <option value="triple">Electrical issue (wiring, bulb, fan)</option>
                  <option value="double">Plumbing issue (leakage, tap)</option>
                  <option value="single">Carpentry issue (door, desk latch)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400 font-mono">Detailed issue description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Specify help request like fan not operating..."
                  className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[rgb(var(--university-primary))] hover:bg-opacity-95 text-white font-bold rounded-lg cursor-pointer transform transition-all active:scale-97"
              >
                Transmit Maintenance Ticket
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
