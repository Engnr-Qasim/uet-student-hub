import React from 'react';
import { useProfile } from '../../hooks/useProfile';
import { StatCard } from '../../components/shared/StatCard';
import { EmptyState } from '../../components/shared/EmptyState';
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  Award, 
  ClipboardList, 
  AlertCircle, 
  Flame, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  School,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';
import { uetDB } from '../../data/mockData';

export default function StudentDashboard() {
  const { profile } = useProfile();

  if (!profile) return null;

  // Compute stats for Ahmad
  const activeSemester = profile.semester || 5;
  const enrolledCourses = uetDB.courses.filter(c => c.semester === activeSemester);
  const pendingAssignmentsCount = uetDB.assignments.length; // Mock count
  const notices = [...uetDB.notices].slice(0, 2);

  // Compute attendance average
  const attendanceSum = uetDB.attendance.reduce((sum, item) => sum + item.percentage, 0);
  const attendanceAvg = uetDB.attendance.length > 0 ? (attendanceSum / uetDB.attendance.length).toFixed(1) : '91.2';

  // Compute CGPA
  const finishedResults = uetDB.results;
  const cgpa = 3.45; // Ahmed's pre-seeded CGPA

  // Compute Achievement Badges dynamically or based on rules
  const badges = [
    { title: 'Perfect Attendance', desc: 'Maintained attendance ≥ 95% in key classes', active: parseFloat(attendanceAvg) >= 92, icon: '🔥', color: 'bg-orange-50 text-orange-600 border border-orange-200' },
    { title: 'Assignment Champion', desc: 'All recent assignments submitted before due date', active: true, icon: '🏆', color: 'bg-indigo-50 text-indigo-600 border border-indigo-200' },
    { title: 'Top Performer', desc: 'Earned grade points ≥ 3.50 last term', active: cgpa >= 3.4, icon: '⭐', color: 'bg-amber-50 text-amber-600 border border-amber-200' },
    { title: 'Active Contributor', desc: 'Participated inside course forum questions', active: uetDB.forumPosts.length >= 1, icon: '💡', color: 'bg-emerald-50 text-emerald-600 border border-emerald-200' },
  ];

  return (
    <div className="space-y-6" id="student-overview-dashboard-container">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-[rgb(var(--university-primary))] to-indigo-950 text-white rounded-2xl relative overflow-hidden">
        {/* Absolute decorative spot */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400')] bg-cover opacity-15 hidden md:block select-none" />
        <div className="space-y-2 relative z-10">
          <span className="text-xs uppercase tracking-widest font-extrabold text-[rgb(var(--university-accent))] bg-white/10 px-3 py-1 rounded-full">
            Active Session: Fall 2026
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-none">
            Assalam-o-Alaikum, {profile.name}!
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 max-w-xl">
            You are currently registered in <span className="font-bold underline decoration-yellow-400">Semester {activeSemester}</span> (Computer Systems Engineering division). Maintain high attendance metrics for upcoming midterms!
          </p>
        </div>
      </div>

      {/* Numerical Stat Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Current Term"
          value={`Semester ${activeSemester}`}
          icon={<School className="w-5 h-5 text-indigo-500" />}
          description="Fall 2026 Academic Term"
          color="primary"
        />
        <StatCard
          title="Cumulative CGPA"
          value={cgpa}
          icon={<TrendingUp className="w-5 h-5 text-amber-500" />}
          description="Scale 4.0 (Exemplary)"
          color="gold"
        />
        <StatCard
          title="Attendance average"
          value={`${attendanceAvg}%`}
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
          description="Minimum 75% required"
          color="green"
        />
        <StatCard
          title="Pending Assignments"
          value={pendingAssignmentsCount}
          icon={<ClipboardList className="w-5 h-5 text-rose-500" />}
          description="Submit before deadlines"
          color="rose"
        />
      </div>

      {/* Double Column Master Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column Left: Registered Courses list */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 rounded-2xl shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <div className="space-y-0.5">
                <h3 className="text-base font-black tracking-tight text-slate-800 dark:text-white">Registered Term Subjects</h3>
                <p className="text-xs text-slate-400">Subjects carrying active lecture blocks and labs this semester.</p>
              </div>
              <span className="text-[10px] font-bold text-[rgb(var(--university-primary))] dark:text-amber-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded">
                Active Courses: {enrolledCourses.length}
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {enrolledCourses.map((c) => (
                <div key={c.id} className="py-3 flex sm:items-center justify-between gap-3 text-slate-700 dark:text-slate-350">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 sm:p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-550 border border-slate-100 dark:border-slate-800 shrink-0">
                      <BookOpen className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white leading-tight">{c.name}</h4>
                      <span className="text-[10px] text-slate-450 font-mono italic">{c.code} • {c.credit_hours} CH</span>
                    </div>
                  </div>
                  <a
                    href={`/student/forum`}
                    className="flex items-center space-x-1 px-2.5 py-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-[rgb(var(--university-primary))] text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>Forum</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Badges catalog */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 rounded-2xl shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-black tracking-tight text-slate-800 dark:text-white">Undergraduate Honors & Badges</h3>
              <p className="text-xs text-slate-400">Achieved automatically based on portal database records.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {badges.map((badge, bIdx) => (
                <div 
                  key={bIdx}
                  className={`p-4 rounded-xl flex items-start space-x-3 border ${
                    badge.active 
                      ? badge.color 
                      : 'bg-slate-50/50 text-slate-400 dark:bg-slate-900/50 border-slate-200 dark:border-slate-850 opacity-55'
                  }`}
                  id={`badge-block-${bIdx}`}
                >
                  <span className="text-2xl pt-0.5">{badge.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold leading-tight">{badge.title}</h4>
                    <p className="text-[10px] leading-tight mt-0.5 opacity-90">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column Right: Board notices & schedules */}
        <div className="space-y-6">
          {/* Latest notices board */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 rounded-2xl shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-black tracking-tight text-slate-800 dark:text-white">Board Notifications</h3>
              <p className="text-xs text-slate-400">Directives from DCSE boards.</p>
            </div>

            <div className="space-y-3">
              {notices.map((n) => (
                <div key={n.id} className="p-3.5 bg-slate-50 dark:bg-slate-850 rounded-xl space-y-2 border border-slate-100 dark:border-slate-800/60">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                    <span className="uppercase text-[9px] px-1.5 py-0.5 bg-amber-500/10 text-amber-500 rounded border border-amber-500/10">{n.type}</span>
                    <span>{new Date(n.created_at).toLocaleDateString()}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-850 dark:text-white line-clamp-1">{n.title}</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-2">{n.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Schedule summary */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 rounded-2xl shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-black tracking-tight text-slate-800 dark:text-white">Today's Lectures</h3>
                <p className="text-xs text-slate-400">Classes scheduled for Monday.</p>
              </div>
              <Clock className="w-4.5 h-4.5 text-slate-400" />
            </div>

            <div className="space-y-3 text-slate-705 dark:text-slate-300 text-xs">
              <div className="p-3 bg-indigo-50/20 hover:bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl flex items-center justify-between border border-indigo-100/10">
                <div>
                  <h4 className="font-bold">Software Engineering</h4>
                  <span className="text-[10px] text-slate-400 block mt-0.5">08:30 - 10:00 • Hall 1</span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded">Active</span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-850/50 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold">Microprocessors & Interfacing</h4>
                  <span className="text-[10px] text-slate-400 block mt-0.5">10:15 - 11:45 • Processor Lab 2</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400">Upcoming</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
