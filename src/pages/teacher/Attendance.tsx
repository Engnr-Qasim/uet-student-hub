import React, { useState } from 'react';
import { uetDB } from '../../data/mockData';
import { useProfile } from '../../hooks/useProfile';
import { EmptyState } from '../../components/shared/EmptyState';
import { CheckCircle2, UserCheck, Plus, Minus, Search, Calendar } from 'lucide-react';

export default function TeacherAttendance() {
  const { profile } = useProfile();
  const [attendance, setAttendance] = useState(uetDB.attendance);
  const [selectedCourse, setSelectedCourse] = useState(uetDB.courses[0]?.id || 'course-se');
  const [searchTerm, setSearchTerm] = useState('');
  const [success, setSuccess] = useState(false);

  if (!profile) return null;

  // Filter attendance records by selected class course and student name search
  const filteredRecords = attendance.filter((item) => {
    const matchesCourse = item.course_id === selectedCourse;
    const matchesSearch = item.student_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.student_reg.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  const handleUpdateAttendance = (recordId: string, diffAttended: number, diffTotal: number) => {
    const modified = uetDB.updateAttendance(recordId, diffAttended, diffTotal);
    if (modified) {
      setAttendance([...uetDB.attendance]);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2600);
    }
  };

  return (
    <div className="space-y-6" id="teacher-attendance-panel">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Lectures Registry Desk</h2>
        <p className="text-xs text-slate-400">Instruct and register daily attendance, or modify lecture rates with persistent database backups.</p>
      </div>

      {success && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl flex items-center space-x-2">
          <CheckCircle2 className="w-4.5 h-4.5" />
          <span className="font-bold font-sans">Class roster synced successfully! Any student portals will immediately reflect changes.</span>
        </div>
      )}

      {/* Select course & Search Student */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-4 rounded-xl shadow-xs">
        {/* Course Selection */}
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 px-3 py-1.5 rounded-lg text-xs font-bold focus:outline-none dark:text-white cursor-pointer"
        >
          {uetDB.courses.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        {/* Search */}
        <div className="flex-grow flex items-center space-x-2 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 px-3 py-1.5 rounded-lg text-slate-450 text-xs">
          <Search className="w-3.5 h-3.5" />
          <input
            type="text"
            placeholder="Search students by roll number or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none w-full dark:text-white"
          />
        </div>
      </div>

      {/* Attendance Roster sheet list */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-800 dark:text-white mb-4">Roster Seat Sheets</h3>

        {filteredRecords.length === 0 ? (
          <EmptyState 
            title="Empty Seat Roster" 
            description="Our databases do not contain roll numbers matching your search filters." 
          />
        ) : (
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left font-sans border-collapse">
              <thead>
                <tr className="border-b border-slate-105 dark:border-slate-805 text-slate-400 uppercase text-[9px] font-black tracking-wide select-none">
                  <th className="py-2.5 px-2">Student Roll Number</th>
                  <th className="py-2.5 px-2 text-left">Full Name</th>
                  <th className="py-2.5 px-2 text-center">Attended Ratio</th>
                  <th className="py-2.5 px-2 text-center">Percentage Ratio</th>
                  <th className="py-2.5 px-2 text-right">Edit Logs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-850 text-slate-705 dark:text-slate-350 font-semibold">
                {filteredRecords.map((item) => {
                  const isCritical = item.percentage < 75;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-855/30 transition-colors">
                      <td className="py-3 px-2 font-mono font-bold text-slate-850 dark:text-white leading-none">
                        {item.student_reg}
                      </td>
                      <td className="py-3 px-2 text-left">{item.student_name}</td>
                      <td className="py-3 px-2 text-center font-mono font-bold text-indigo-550 dark:text-indigo-400">
                        {item.attended_lectures} / {item.total_lectures}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded font-mono font-bold text-[10px] ${
                          isCritical 
                            ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/20' 
                            : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20'
                        }`}>
                          {item.percentage}%
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          {/* edit attended count */}
                          <button
                            onClick={() => handleUpdateAttendance(item.id, 1, 1)}
                            className="p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-emerald-550 cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                            title="Add 1 Present Day Lecture"
                          >
                            <span className="text-[10px] font-black uppercase text-emerald-600">+ P</span>
                          </button>
                          
                          <button
                            onClick={() => handleUpdateAttendance(item.id, 0, 1)}
                            className="p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-rose-505 cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                            title="Add 1 Absent Day Lecture"
                          >
                            <span className="text-[10px] font-black uppercase text-rose-500">+ A</span>
                          </button>

                          <button
                            onClick={() => handleUpdateAttendance(item.id, -1, -1)}
                            className="p-1 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-405 hover:text-slate-800 rounded cursor-pointer leading-none"
                            title="Decrement 1 present day"
                          >
                            <Minus className="w-3.5 h-3.5 shrink-0" />
                          </button>
                        </div>
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
