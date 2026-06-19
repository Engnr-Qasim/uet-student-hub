import React from 'react';
import { Calendar, Compass, User, Tag } from 'lucide-react';

export default function StudentEvents() {
  const events = [
    { title: 'ICon-CSE 2026 International Conference', date: 'Oct 15, 2026', room: 'Chemical Aud Block', organizer: 'IEEE Student Branch' },
    { title: 'UET CSE Startup Pitch Competition', date: 'Nov 02, 2026', room: 'DCSE Hall 1', organizer: 'Tech Incubator Cell' },
  ];

  return (
    <div className="space-y-6" id="student-events-happenings">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">University Happenings</h2>
        <p className="text-xs text-slate-400">Join academic workshops, guest lectures, Hackathons, and national college design drives.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((ev, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-5 rounded-2xl shadow-xs space-y-4"
          >
            <div className="flex justify-between items-center text-[10px] font-bold">
              <span className="text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded leading-none uppercase tracking-tight">Tech society event</span>
              <span className="flex items-center space-x-1 text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{ev.date}</span>
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-850 dark:text-white leading-tight">{ev.title}</h3>
              <p className="text-[10px] text-slate-405 font-mono italic mt-1.5 font-bold">Venue: {ev.room}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-850 flex justify-between items-center text-[10px] font-bold text-slate-400">
              <span>Host Branch: {ev.organizer}</span>
              <button
                onClick={() => alert(`Simulating free seat reservation registry for: ${ev.title}`)}
                className="px-3 py-1 bg-indigo-650 hover:bg-indigo-700 text-white rounded font-bold cursor-pointer transition-all uppercase text-[9px] tracking-wider"
              >
                Reserve Seat slot
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
