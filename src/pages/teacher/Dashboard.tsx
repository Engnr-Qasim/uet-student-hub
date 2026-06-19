import React from 'react';
import { useProfile } from '../../hooks/useProfile';
import { StatCard } from '../../components/shared/StatCard';
import { Users, GraduationCap, ClipboardCheck, BookOpen, Clock, ChevronRight } from 'lucide-react';
import { uetDB } from '../../data/mockData';

export default function TeacherDashboard() {
  const { profile } = useProfile();

  if (!profile) return null;

  // Let's compute teacher statistics
  const handledCourses = uetDB.courses.slice(0, 2); // Simulating Saad Malik teaches first 2 courses
  const studentsCount = 55; // Traditional class size
  const pendingSubmissionsCount = uetDB.submissions.filter(s => s.status === 'pending').length;

  return (
    <div className="space-y-6" id="teacher-overview-dashboard-container">
      {/* Welcome banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-teal-900 to-indigo-950 text-white rounded-2xl relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <span className="text-xs uppercase tracking-widest font-extrabold text-amber-400 bg-white/10 px-3 py-1 rounded-full">
            Faculty Portal Shift
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-none">
            Welcome back, {profile.name}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            You are managing active undergraduate classes this session. Verify attendance logs and submit grades sheets before institutional term-ends.
          </p>
        </div>
      </div>

      {/* Numerical Stats columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Students Coordinated"
          value={studentsCount}
          icon={<Users className="w-5 h-5 text-indigo-500" />}
          description="Total active roll numbers"
          color="primary"
        />
        <StatCard
          title="Handled Lecture Classes"
          value={handledCourses.length}
          icon={<BookOpen className="w-5 h-5 text-amber-500" />}
          description="Fall 2026 course curriculum"
          color="gold"
        />
        <StatCard
          title="Pending Submissions"
          value={pendingSubmissionsCount}
          icon={<ClipboardCheck className="w-5 h-5 text-teal-500" />}
          description="Awaiting marks & feedback"
          color="green"
        />
        <StatCard
          title="Current Exam Shift"
          value="Midterms"
          icon={<GraduationCap className="w-5 h-5 text-rose-500" />}
          description="Submit marks in portal"
          color="rose"
        />
      </div>

      {/* Main Dual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column Handled Classes lists */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-xs">
            <h3 className="text-base font-black tracking-tight text-slate-800 dark:text-white mb-4">Coordinate Registered Classes</h3>
            <div className="space-y-3">
              {handledCourses.map((c) => (
                <div key={c.id} className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl flex items-center justify-between gap-3 text-slate-707">
                  <div className="flex items-center space-x-3.5">
                    <div className="p-2.5 bg-indigo-500/10 text-indigo-500 rounded-xl">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase text-slate-400">{c.code} • {c.credit_hours} CH</span>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-850 dark:text-white leading-tight mt-0.5">{c.name}</h4>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <a
                      href="/teacher/attendance"
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-755 text-slate-700 dark:text-slate-200 rounded text-[10px] font-bold uppercase transition-all"
                    >
                      Attendance
                    </a>
                    <a
                      href="/teacher/results"
                      className="px-3 py-1.5 bg-[rgb(var(--university-primary))] hover:bg-opacity-95 text-white rounded text-[10px] font-bold uppercase transition-all"
                    >
                      Gradebook
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column timetable */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-black tracking-tight text-slate-800 dark:text-white">Active Classroom Duties</h3>
                <p className="text-xs text-slate-400">Monday scheduled sessions.</p>
              </div>
              <Clock className="w-5 h-5 text-slate-400" />
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-705 dark:text-slate-300">
              <div className="p-3 bg-teal-500/10 border border-teal-500/10 rounded-xl">
                <span className="block text-[8px] font-black uppercase text-teal-605">08:30 - 10:00</span>
                <span className="font-extrabold text-slate-850 dark:text-white mt-1 block">Software Engineering (Hall 1)</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-850/40 rounded-xl">
                <span className="block text-[8px] font-black uppercase text-slate-400">10:15 - 11:45</span>
                <span className="font-bold text-slate-700 mt-1 block">Microprocessor & Interfacing (Lab 2)</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
