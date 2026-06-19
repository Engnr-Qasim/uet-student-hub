import React from 'react';
import { Briefcase, Landmark, Calendar, User, Search } from 'lucide-react';

export default function StudentInternships() {
  const list = [
    { title: 'Fullstack React Engineer Intern', company: 'Systems Limited Lahore', duration: '8 Weeks (Summer)', stipend: 'PKR 25,000 / month' },
    { title: 'Embedded Firmware Engineering Trainee', company: 'MicroTech Industries', duration: '12 Weeks', stipend: 'PKR 30,000 / month' },
  ];

  return (
    <div className="space-y-6" id="student-internships-view">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">DCSE Career Support & Internships</h2>
        <p className="text-xs text-slate-400">Apply to vetted industrial training positions aligned with HEC Computer Systems requirements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-5 rounded-2xl flex flex-col justify-between shadow-xs hover:shadow-sm"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] uppercase font-black">
                <span className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 px-2 py-0.5 rounded leading-none">HEC Approved</span>
                <span className="text-slate-400">{item.duration}</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-850 dark:text-white leading-tight">{item.title}</h3>
                <p className="text-xs text-[rgb(var(--university-primary))] dark:text-amber-400 font-bold mt-1">{item.company}</p>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-850 pt-4 mt-6 flex justify-between items-center text-[10px] font-black text-slate-400">
              <span>Stipend: {item.stipend}</span>
              <button
                onClick={() => alert(`Simulated resume compilation dispatched to ${item.company} HR portals!`)}
                className="px-3.5 py-1.5 bg-indigo-650 hover:bg-indigo-700 text-white rounded font-bold cursor-pointer transition-all uppercase text-[9px] tracking-wider"
              >
                Apply with Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
