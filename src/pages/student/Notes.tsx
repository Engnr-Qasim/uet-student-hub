import React, { useState } from 'react';
import { uetDB } from '../../data/mockData';
import { BookOpen, Download, User2, Calendar, FileText, Search } from 'lucide-react';
import { EmptyState } from '../../components/shared/EmptyState';

export default function StudentNotes() {
  const [notes, setNotes] = useState(uetDB.notes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');

  const filteredNotes = notes.filter((n) => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (n.description && n.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCourse = selectedCourse === 'all' || n.course_id === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  const getCourses = () => {
    const activeSemester = 5; // Simulating local study semester
    return uetDB.courses.filter(c => c.semester === activeSemester);
  };

  return (
    <div className="space-y-6" id="student-notes-view">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Course Notes & Materials</h2>
          <p className="text-xs text-slate-400">Download syllabus guidelines, lab worksheets, and slides published by professors.</p>
        </div>
      </div>

      {/* Filters strip */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-4 rounded-xl shadow-xs">
        {/* Search */}
        <div className="flex-1 flex items-center space-x-2 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 px-3 py-1.5 rounded-lg text-slate-450">
          <Search className="w-3.5 h-3.5" />
          <input
            type="text"
            placeholder="Search notes, slide titles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-xs outline-none border-none w-full text-slate-800 dark:text-white"
          />
        </div>

        {/* Course select */}
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 px-3 py-1.5 rounded-lg text-xs font-bold focus:outline-none dark:text-white cursor-pointer"
        >
          <option value="all">All Sem 5 Courses</option>
          {getCourses().map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Grid listing */}
      {filteredNotes.length === 0 ? (
        <EmptyState 
          title="No Course Notes Listed" 
          description="Try broadening your filters, or check back later once teachers publish classroom slides." 
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-5 rounded-2xl flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
              id={`note-card-${note.id}`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl text-[rgb(var(--university-primary))] dark:text-indigo-400">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[8px] font-black uppercase text-[rgb(var(--university-accent))] tracking-wider">{note.course_name || 'DCSE MATERIALS'}</span>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white">{note.title}</h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-450 dark:text-slate-500 leading-relaxed pl-1">
                  {note.description || 'No description summary provided.'}
                </p>
              </div>

              {/* Bottom footer bar */}
              <div className="border-t border-slate-100 dark:border-slate-850 pt-4 mt-6 flex justify-between items-center text-[10px] font-bold text-slate-400 pl-1">
                <div className="space-y-0.5">
                  <span className="flex items-center space-x-1">
                    <User2 className="w-3.5 h-3.5" />
                    <span>{note.uploaded_by_name || 'Dr. Saad Malik'}</span>
                  </span>
                  <span className="flex items-center space-x-1 mt-1 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Published: {note.created_at ? new Date(note.created_at).toLocaleDateString() : 'June 2026'}</span>
                  </span>
                </div>

                <button
                  onClick={() => window.open(note.file_url, '_blank')}
                  className="flex items-center space-x-1.5 px-3.5 py-2 bg-slate-50 hover:bg-[rgb(var(--university-primary))] dark:bg-slate-850 dark:hover:bg-amber-500 text-slate-500 hover:text-white dark:text-slate-400 dark:hover:text-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download file</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
