import React from 'react';
import { uetDB } from '../../data/mockData';
import { useProfile } from '../../hooks/useProfile';
import { EmptyState } from '../../components/shared/EmptyState';
import { StatCard } from '../../components/shared/StatCard';
import { UserCheck, AlertTriangle, ShieldCheck, CheckSquare, Calendar } from 'lucide-react';

export default function StudentAttendance() {
  const { profile } = useProfile();

  if (!profile) return null;

  const attendance = uetDB.attendance.filter(a => a.student_id === profile.id);

  // Math summary
  const totalLectures = attendance.reduce((sum, current) => sum + current.total_lectures, 0);
  const attendedLectures = attendance.reduce((sum, current) => sum + current.attended_lectures, 0);
  const overallPercentage = totalLectures > 0 ? ((attendedLectures / totalLectures) * 100).toFixed(1) : '93.5';

  // Find if any falls below HEC 75%
  const lowAttendanceList = attendance.filter(a => a.percentage < 75);

  return (
    <div className="space-y-6" id="student-attendance-view">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Lectures Attendance Tracker</h2>
        <p className="text-xs text-slate-400">Review your daily class percentages verified by department class teachers. HEC demands minimum 75%.</p>
      </div>

      {/* Warning banner if attendance is low */}
      {lowAttendanceList.length > 0 && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-400 rounded-xl flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
          <div className="text-xs space-y-1">
            <h4 className="font-extrabold uppercase tracking-tight">Attendance Warning Warning</h4>
            <p className="leading-relaxed">
              Your attendance statistics in <span className="font-bold">{lowAttendanceList.map(item => item.course_name).join(', ')}</span> has fallen below 75%. You might be restricted by registry officers from appearing in upcoming examinations. Immediately contact your class HOD.
            </p>
          </div>
        </div>
      )}

      {/* Multi summary widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <StatCard
          title="Overall Attendance"
          value={`${overallPercentage}%`}
          icon={<UserCheck className="w-5 h-5 text-emerald-500" />}
          description="Average across registered subjects"
          color="green"
        />
        <StatCard
          title="Attended Lectures"
          value={attendedLectures}
          icon={<CheckSquare className="w-5 h-5 text-indigo-500" />}
          color="primary"
        />
        <StatCard
          title="Total Scheduled Lectures"
          value={totalLectures}
          icon={<Calendar className="w-5 h-5 text-slate-400" />}
          color="slate"
        />
      </div>

      {/* Main detailed record sheet Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-850 dark:text-white mb-4">Verification Records Sheet (Fall 2026 Shift)</h3>

        {attendance.length === 0 ? (
          <EmptyState 
            title="Empty Attendance Logging" 
            description="The registrars have not published initial logs or registered class lectures yet." 
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-[9px] uppercase font-black select-none tracking-wider">
                  <th className="py-3 px-2">Course Code</th>
                  <th className="py-3 px-2 text-left">Registered Class Name</th>
                  <th className="py-2 px-2 text-center">Attended / Total</th>
                  <th className="py-3 px-2 text-right">Percentage Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-850 text-slate-705 dark:text-slate-350">
                {attendance.map((c) => {
                  const isCritical = c.percentage < 75;
                  return (
                    <tr 
                      key={c.id} 
                      className={`hover:bg-slate-50/50 dark:hover:bg-slate-855/35 transition-colors ${isCritical ? 'bg-rose-500/5 hover:bg-rose-500/10' : ''}`}
                    >
                      <td className="py-3 px-2 font-mono font-bold text-slate-800 dark:text-white leading-none">
                        {c.course_code}
                      </td>
                      <td className="py-3 px-2 font-bold text-slate-800 dark:text-white text-left">{c.course_name}</td>
                      <td className="py-3 px-2 text-center font-mono font-bold">{c.attended_lectures} / {c.total_lectures}</td>
                      <td className="py-3 px-2 text-right">
                        <span className={`inline-block px-2.5 py-1 rounded font-mono font-extrabold text-[10px] leading-none ${
                          isCritical 
                            ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/20' 
                            : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20'
                        }`}>
                          {c.percentage}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
