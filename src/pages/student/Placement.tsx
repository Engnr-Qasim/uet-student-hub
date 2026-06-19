import React from 'react';
import { Landmark, Compass, Award, Calendar } from 'lucide-react';

export default function StudentPlacement() {
  const drives = [
    { title: 'Annual IT Sector Recruitment Drive 2026', date: 'Dec 05, 2026', partners: 'NetSol, Systems Ltd, DevSinc' },
  ];

  return (
    <div className="space-y-6" id="student-placements-drive-view">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Active Graduation Placement Drives</h2>
        <p className="text-xs text-slate-400">Review placement calendars, pre-register for partner written tests, or request coordinator resume reviews.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold text-slate-800 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-850">
          UET DCSE Placement Catalogs
        </h3>

        {drives.map((drv, idx) => (
          <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl space-y-3 font-semibold text-xs text-slate-600 dark:text-slate-350">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-400 select-none">
              <span className="text-yellow-600">PLACEMENT DRIVE</span>
              <span>On-Campus Recruitment</span>
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-850 dark:text-white leading-tight">{drv.title}</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Partner Companies: {drv.partners}</p>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-850 text-[10px] font-bold text-slate-400">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-505" />
                <span>Scheduled: {drv.date}</span>
              </span>
              <button
                onClick={() => alert(`Simulating registration for written tests at: ${drv.title}`)}
                className="px-3 py-1 bg-[rgb(var(--university-primary))] hover:bg-opacity-95 text-white rounded font-bold cursor-pointer transition-all uppercase text-[9px] tracking-wider"
              >
                Register slot
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
