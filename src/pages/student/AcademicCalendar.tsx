import React from 'react';
import { uetDB } from '../../data/mockData';
import { Calendar, AlertCircle } from 'lucide-react';

export default function StudentAcademicCalendar() {
  const events = uetDB.calendarEvents;

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'holiday': return 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-450';
      case 'exam': return 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-450';
      case 'social': return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-450';
      default: return 'bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-450';
    }
  };

  return (
    <div className="space-y-6" id="student-academic-calendar-view">
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Academic Session Calendar</h2>
        <p className="text-xs text-slate-400">View upcoming term phases, midterm exams schedules, and national holidays.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold text-slate-800 dark:text-white">Scheduled Session Milestones</h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-850">
          {events.map((ev) => (
            <div key={ev.id} className="py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-xs font-semibold">
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 bg-slate-55 dark:bg-slate-850 rounded-lg text-slate-400 mt-1">
                  <Calendar className="w-5 h-5 text-[rgb(var(--university-primary))]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-850 dark:text-white">{ev.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 font-medium">{ev.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[10px] font-black">
                <span className={`px-2.5 py-1 rounded uppercase tracking-wide border border-transparent ${getTypeStyle(ev.event_type)}`}>
                  {ev.event_type}
                </span>
                <span className="text-slate-450 font-mono text-center sm:text-right shrink-0">
                  {new Date(ev.start_date).toLocaleDateString([], { month: 'short', day: 'numeric' })} - {new Date(ev.end_date).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
