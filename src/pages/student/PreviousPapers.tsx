import React, { useState } from 'react';
import { uetDB } from '../../data/mockData';
import { BookMarked, Download, Search, Tag, Calendar } from 'lucide-react';
import { EmptyState } from '../../components/shared/EmptyState';

export default function StudentPreviousPapers() {
  const [papers, setPapers] = useState(uetDB.previousPapers);
  const [searchTerm, setSearchTerm] = useState('');
  const [examType, setExamType] = useState<'all' | 'mid' | 'final'>('all');

  const filteredPapers = papers.filter(p => {
    const course = uetDB.courses.find(c => c.id === p.course_id);
    const courseName = course?.name || '';
    const matchesSearch = courseName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = examType === 'all' || p.exam_type === examType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6" id="student-past-papers-vault">
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Past Papers Archive</h2>
        <p className="text-xs text-slate-400">Review archive question sheets of midterms and finals from previous years inside DCSE channels.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-4 rounded-xl shadow-xs">
        {/* Search */}
        <div className="flex-grow flex items-center space-x-2 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 px-3 py-1.5 rounded-lg text-slate-450 text-xs">
          <Search className="w-4 h-4" />
          <input
            type="text"
            placeholder="Search papers by subject name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none w-full dark:text-white"
          />
        </div>

        {/* Paper type */}
        <div className="flex bg-slate-50 dark:bg-slate-950 p-1 rounded-lg border border-slate-150 dark:border-slate-850 self-start sm:self-center">
          <button
            onClick={() => setExamType('all')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${examType === 'all' ? 'bg-[rgb(var(--university-primary))] text-white' : 'text-slate-500'}`}
          >
            All Papers
          </button>
          <button
            onClick={() => setExamType('mid')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${examType === 'mid' ? 'bg-[rgb(var(--university-primary))] text-white' : 'text-slate-500'}`}
          >
            Mids
          </button>
          <button
            onClick={() => setExamType('final')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${examType === 'final' ? 'bg-[rgb(var(--university-primary))] text-white' : 'text-slate-500'}`}
          >
            Finals
          </button>
        </div>
      </div>

      {/* Grid rendering */}
      {filteredPapers.length === 0 ? (
        <EmptyState 
          title="No Past Papers Located" 
          description="We are updating our server files with past exams questions. Check back soon!" 
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((paper) => {
            const course = uetDB.courses.find(c => c.id === paper.course_id);
            return (
              <div
                key={paper.id}
                className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-5 rounded-2xl flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
                id={`paper-card-${paper.id}`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] uppercase font-black">
                    <span className={`px-2 py-0.5 rounded border ${
                      paper.exam_type === 'mid' 
                        ? 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/20' 
                        : 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/15'
                    }`}>
                      {paper.exam_type}term Exam
                    </span>
                    <span className="flex items-center space-x-1 text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Session {paper.year}</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] font-black text-slate-400 block tracking-wider leading-none uppercase">{course?.code || 'DCSE'}</span>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white mt-1 leading-tight">{course?.name || paper.course_name}</h3>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-850 mt-6 flex justify-end">
                  <button
                    onClick={() => alert(`Simulated download of previous paper for: ${course?.name || paper.course_name}`)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-50 hover:bg-[rgb(var(--university-primary))] dark:bg-slate-850 dark:hover:bg-amber-500 text-slate-500 hover:text-white dark:text-slate-400 dark:hover:text-slate-950 rounded-lg text-[11px] font-bold border border-slate-100 dark:border-slate-800 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Paper</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
