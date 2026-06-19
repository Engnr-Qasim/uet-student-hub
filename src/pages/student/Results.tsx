import React, { useState } from 'react';
import { uetDB } from '../../data/mockData';
import { useProfile } from '../../hooks/useProfile';
import { EmptyState } from '../../components/shared/EmptyState';
import { Award, BookOpen, Search, Bookmark, ChevronRight } from 'lucide-react';

export default function StudentResults() {
  const { profile } = useProfile();
  const [selectedSemester, setSelectedSemester] = useState<number>(4); // Default to Semester 4 as Ahmad wants to inspect previous results

  if (!profile) return null;

  const results = uetDB.results.filter(r => r.student_id === profile.id && r.semester === selectedSemester);

  const semesters = [1, 2, 3, 4]; // Completed terms

  return (
    <div className="space-y-6" id="student-grades-reports-view">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Academic Grade Transcript</h2>
        <p className="text-xs text-slate-400">View graded sheets, quiz totals, and overall GPA sheets verified by UET controllers office.</p>
      </div>

      {/* Semester selectors */}
      <div className="flex bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-2 rounded-xl shadow-xs self-start w-fit">
        {semesters.map((sem) => (
          <button
            key={sem}
            onClick={() => setSelectedSemester(sem)}
            className={`px-4 py-1.5 text-xs font-black rounded-lg transition-all cursor-pointer ${
              selectedSemester === sem 
                ? 'bg-[rgb(var(--university-primary))] text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Term {sem}
          </button>
        ))}
      </div>

      {/* Details Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-xs">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-extrabold text-slate-800 dark:text-white">DCSE Registered Subject Gradebook</h3>
          <span className="text-[10px] font-mono font-bold bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded">CONCLUDED</span>
        </div>

        {results.length === 0 ? (
          <EmptyState 
            title="Syllabus Term not Selected" 
            description="Kindly toggle the semesters above to load historical transcript marks and grades." 
          />
        ) : (
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left font-sans border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-450 uppercase text-[9px] font-black tracking-wider select-none">
                  <th className="py-3 px-2">Subject</th>
                  <th className="py-3 px-2 text-center">Quizzes (20m)</th>
                  <th className="py-3 px-2 text-center">Asg (20m)</th>
                  <th className="py-3 px-2 text-center">Mid (30m)</th>
                  <th className="py-3 px-2 text-center">Final (30m)</th>
                  <th className="py-3 px-2 text-center">Total (100)</th>
                  <th className="py-3 px-2 text-center">Grade</th>
                  <th className="py-3 px-2 text-right">GPA Weight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-850 text-slate-705 dark:text-slate-350 font-medium">
                {results.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-855/30 transition-colors">
                    <td className="py-3.5 px-2">
                      <span className="block text-[8px] font-black uppercase text-slate-400 font-mono leading-none mb-1">{res.course_code}</span>
                      <span className="font-bold text-slate-850 dark:text-slate-100">{res.course_name}</span>
                    </td>
                    <td className="py-3.5 px-2 text-center font-mono">{res.quiz_marks}</td>
                    <td className="py-3.5 px-2 text-center font-mono">{res.assignment_marks}</td>
                    <td className="py-3.5 px-2 text-center font-mono">{res.mid_marks}</td>
                    <td className="py-3.5 px-2 text-center font-mono">{res.final_marks}</td>
                    <td className="py-3.5 px-2 text-center font-mono font-bold text-indigo-500">{res.total_marks}</td>
                    <td className="py-3.5 px-2 text-center">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-indigo-500/10 text-indigo-500 font-black tracking-tight">{res.grade}</span>
                    </td>
                    <td className="py-3.5 px-2 text-right font-mono font-bold text-slate-800 dark:text-slate-205">{res.gpa.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
