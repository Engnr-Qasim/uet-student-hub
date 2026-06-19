import React, { useState } from 'react';
import { uetDB } from '../../data/mockData';
import { useProfile } from '../../hooks/useProfile';
import { Clock, MapPin, Calendar, HelpCircle } from 'lucide-react';
import { EmptyState } from '../../components/shared/EmptyState';

export default function StudentTimetable() {
  const { profile } = useProfile();
  const [selectedDay, setSelectedDay] = useState<'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'>('monday');

  if (!profile) return null;

  const timetableEntries = uetDB.timetable.filter(
    t => t.semester === (profile.semester || 5) && t.day_of_week === selectedDay
  );

  const days: { id: typeof selectedDay; label: string }[] = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
  ];

  return (
    <div className="space-y-6" id="student-timetable-calendar">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Active Lecture Timetable</h2>
        <p className="text-xs text-slate-400">Track scheduled classes, lecture shifts, laboratory grids, and assigned supervisor tutors.</p>
      </div>

      {/* Days buttons tab */}
      <div className="flex bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-2 rounded-xl shadow-xs self-start w-fit flex-wrap gap-1">
        {days.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedDay(item.id)}
            className={`px-4 py-1.5 text-xs font-black rounded-lg transition-all cursor-pointer ${
              selectedDay === item.id 
                ? 'bg-[rgb(var(--university-primary))] text-white shadow-sm font-bold' 
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-205'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Grid listing daily schedule */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-800 dark:text-white capitalize mb-4">
          Day Schedule Summary: {selectedDay}
        </h3>

        {timetableEntries.length === 0 ? (
          <EmptyState 
            title="No Lectures Scheduled" 
            description="Enjoy your day! No active undergraduate lectures or laboratory shifts scheduled for today." 
          />
        ) : (
          <div className="space-y-4">
            {timetableEntries.map((item) => (
              <div 
                key={item.id}
                className="p-4 bg-slate-55/40 hover:bg-slate-50 dark:bg-slate-850/40 dark:hover:bg-slate-850 border border-slate-100 dark:border-slate-800/80 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-all"
                id={`timetable-row-${item.id}`}
              >
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-[rgb(var(--university-primary))]/10 dark:bg-amber-500/10 text-[rgb(var(--university-primary))] dark:text-amber-400 rounded-lg shrink-0 mt-1">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[9px] font-black text-indigo-500 font-mono tracking-wider">{item.course_code}</span>
                      <span className="text-[10px] text-slate-400 font-bold">{item.teacher_name || 'DCSE Supervisor'}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-850 dark:text-white mt-1 leading-tight">{item.course_name}</h4>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="font-mono text-slate-700 dark:text-slate-350">{item.time_start} - {item.time_end}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 py-1 px-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg max-w-[120px]">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span className="text-[10px] text-slate-800 dark:text-slate-300 font-extrabold truncate">{item.room}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
