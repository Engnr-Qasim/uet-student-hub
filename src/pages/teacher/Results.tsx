import React, { useState } from 'react';
import { uetDB } from '../../data/mockData';
import { useProfile } from '../../hooks/useProfile';
import { EmptyState } from '../../components/shared/EmptyState';
import { CheckCircle2, TrendingUp, Search, Save, Edit2 } from 'lucide-react';

export default function TeacherResults() {
  const { profile } = useProfile();
  const [results, setResults] = useState(uetDB.results);
  const [selectedCourse, setSelectedCourse] = useState(uetDB.courses[0]?.id || 'course-se');
  const [searchTerm, setSearchTerm] = useState('');
  const [success, setSuccess] = useState(false);

  // Edit modal / inputs State
  const [editingResultId, setEditingResultId] = useState<string | null>(null);
  const [editQuiz, setEditQuiz] = useState<number>(0);
  const [editAsg, setEditAsg] = useState<number>(0);
  const [editMid, setEditMid] = useState<number>(0);
  const [editFinal, setEditFinal] = useState<number>(0);

  if (!profile) return null;

  // Filter students results records matching course and search keyword
  const filteredResults = results.filter((item) => {
    const matchesCourse = item.course_id === selectedCourse;
    const matchesSearch = item.student_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  const launchEdit = (res: typeof uetDB.results[0]) => {
    setEditingResultId(res.id);
    setEditQuiz(res.quiz_marks);
    setEditAsg(res.assignment_marks);
    setEditMid(res.mid_marks);
    setEditFinal(res.final_marks);
  };

  const saveEditedResults = (resId: string) => {
    const total = editQuiz + editAsg + editMid + editFinal;
    
    // Simple UET Grade calculation
    let grade = 'F';
    let gpa = 0.0;

    if (total >= 85) { grade = 'A'; gpa = 4.0; }
    else if (total >= 80) { grade = 'A-'; gpa = 3.7; }
    else if (total >= 75) { grade = 'B+'; gpa = 3.3; }
    else if (total >= 70) { grade = 'B'; gpa = 3.0; }
    else if (total >= 65) { grade = 'B-'; gpa = 2.7; }
    else if (total >= 60) { grade = 'C+'; gpa = 2.3; }
    else if (total >= 50) { grade = 'C'; gpa = 2.0; }

    const isUpdated = uetDB.updateStudentResult(resId, editQuiz, editAsg, editMid, editFinal, total, grade, gpa);
    if (isUpdated) {
      setResults([...uetDB.results]);
      setEditingResultId(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2700);
    }
  };

  return (
    <div className="space-y-6" id="teacher-results-panel">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">University Controller Gradebook</h2>
        <p className="text-xs text-slate-400">Input quiz totals, midterms weights, and final exam papers scores to update student credentials dynamic transcript maps.</p>
      </div>

      {success && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl flex items-center space-x-2">
          <CheckCircle2 className="w-4.5 h-4.5" />
          <span className="font-bold font-sans">Grade ledger saved persistently in memory. Students can view newest credentials.</span>
        </div>
      )}

      {/* Select course & Search */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-4 rounded-xl shadow-xs">
        {/* Course Select */}
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
        <div className="flex-grow flex items-center space-x-2 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 px-3 py-1.5 rounded-lg text-slate-450 text-xs text-slate-500">
          <Search className="w-4 h-4" />
          <input
            type="text"
            placeholder="Search students in gradebook..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none w-full dark:text-white"
          />
        </div>
      </div>

      {/* Grade Ledger list sheet */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-800 dark:text-white mb-4">Undergraduate Grade Sheets</h3>

        {filteredResults.length === 0 ? (
          <EmptyState 
            title="Empty Grade Sheets" 
            description="Our database does not contain grade metrics mirroring your queries." 
          />
        ) : (
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left font-sans border-collapse">
              <thead>
                <tr className="border-b border-slate-105 dark:border-slate-805 text-slate-400 uppercase text-[9px] font-black tracking-wide select-none">
                  <th className="py-2.5 px-2">Student Scholar Class Roll</th>
                  <th className="py-2.5 px-2 text-center">Quizzes (20)</th>
                  <th className="py-2.5 px-2 text-center">Asg (20)</th>
                  <th className="py-2.5 px-2 text-center">Mid (30)</th>
                  <th className="py-2.5 px-2 text-center">Final (30)</th>
                  <th className="py-2.5 px-2 text-center">Total (100)</th>
                  <th className="py-2.5 px-2 text-center">Grade</th>
                  <th className="py-2.5 px-2 text-right">Edit Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-850 text-slate-705 dark:text-slate-350 font-semibold">
                {filteredResults.map((item) => {
                  const isEditing = editingResultId === item.id;
                  return (
                    <tr key={item.id} className="hover:bg-slate-55/30 transition-colors">
                      <td className="py-3 px-2 font-bold text-slate-850 dark:text-white">
                        {item.student_name}
                      </td>
                      
                      {/* Quizzes */}
                      <td className="py-3 px-2 text-center">
                        {isEditing ? (
                          <input
                            type="number"
                            max={20}
                            value={editQuiz}
                            onChange={(e) => setEditQuiz(parseInt(e.target.value) || 0)}
                            className="w-12 text-center px-1 py-0.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded font-mono text-slate-800 dark:text-white"
                          />
                        ) : item.quiz_marks}
                      </td>

                      {/* Assignments */}
                      <td className="py-3 px-2 text-center">
                        {isEditing ? (
                          <input
                            type="number"
                            max={20}
                            value={editAsg}
                            onChange={(e) => setEditAsg(parseInt(e.target.value) || 0)}
                            className="w-12 text-center px-1 py-0.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded font-mono text-slate-800 dark:text-white"
                          />
                        ) : item.assignment_marks}
                      </td>

                      {/* Midterm */}
                      <td className="py-3 px-2 text-center font-mono">
                        {isEditing ? (
                          <input
                            type="number"
                            max={30}
                            value={editMid}
                            onChange={(e) => setEditMid(parseInt(e.target.value) || 0)}
                            className="w-12 text-center px-1 py-0.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded font-mono text-slate-800 dark:text-white"
                          />
                        ) : item.mid_marks}
                      </td>

                      {/* Finals */}
                      <td className="py-3 px-2 text-center font-mono">
                        {isEditing ? (
                          <input
                            type="number"
                            max={30}
                            value={editFinal}
                            onChange={(e) => setEditFinal(parseInt(e.target.value) || 0)}
                            className="w-12 text-center px-1 py-0.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded font-mono text-slate-800 dark:text-white"
                          />
                        ) : item.final_marks}
                      </td>

                      {/* Calculated total */}
                      <td className="py-3 px-2 text-center font-mono font-bold text-indigo-500">
                        {isEditing ? (editQuiz + editAsg + editMid + editFinal) : item.total_marks}
                      </td>

                      {/* Grade */}
                      <td className="py-3 px-2 text-center">
                        <span className="inline-block px-2.5 py-0.5 rounded text-[10px] bg-indigo-500/10 text-indigo-500 font-extrabold font-mono">
                          {item.grade}
                        </span>
                      </td>

                      {/* Edit actions button */}
                      <td className="py-3 px-2 text-right">
                        {isEditing ? (
                          <button
                            onClick={() => saveEditedResults(item.id)}
                            className="p-1 text-emerald-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded font-black text-[10px] uppercase cursor-pointer"
                          >
                            <Save className="w-4 h-4 shrink-0 mx-auto" />
                          </button>
                        ) : (
                          <button
                            onClick={() => launchEdit(item)}
                            className="p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-indigo-500 cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5 shrink-0 mx-auto" />
                          </button>
                        )}
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
