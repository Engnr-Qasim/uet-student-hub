import React, { useState } from 'react';
import { useProfile } from '../../hooks/useProfile';
import { 
  BookOpen, 
  Upload, 
  FileText, 
  Plus, 
  Search, 
  BookMarked,
  Layers,
  ExternalLink,
  Trash2
} from 'lucide-react';
import { uetDB } from '../../data/mockData';
import { Note } from '../../types';
import { useApp } from '../../contexts/AppContext';
import { triggerDevNotification } from '../../lib/notifications';

export default function TeacherMaterials() {
  const { profile } = useProfile();
  const { settings } = useApp();
  const [activeTab, setActiveTab ] = useState<'list' | 'add'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');

  // Form states
  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!profile) return null;

  // Saad Malik teaches first 2 courses (c-se, c-micro)
  const teacherCourses = uetDB.courses.slice(0, 2);

  const filteredNotes = uetDB.notes.filter(note => {
    const isTeacherCourse = teacherCourses.some(c => c.id === note.course_id);
    const matchesCourse = selectedCourse === 'All' || note.course_id === selectedCourse;
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (note.description && note.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return isTeacherCourse && matchesCourse && matchesSearch;
  });

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !courseId || !fileUrl) return;

    uetDB.addNote(
      courseId,
      profile.id,
      title,
      description,
      fileUrl
    );

    const matchedCourse = teacherCourses.find(c => c.id === courseId)?.name || 'Course Elective';
    const emailToUse = settings.dev_email || 'info.qasimusman.cse@gmail.com';

    triggerDevNotification(
      'Course Handout Upload',
      `${profile.name} (Teacher Dashboard)`,
      `Uploaded study handouts: "${title}" for context "${matchedCourse}". Desc: ${description}`,
      emailToUse
    );

    setSuccessMsg('Academic document and lecture notes published successfully!');
    setTitle('');
    setDescription('');
    setFileUrl('');
    setTimeout(() => {
      setSuccessMsg('');
      setActiveTab('list');
    }, 2000);
  };

  const handleDeleteNote = (noteId: string) => {
    // Delete local draft note
    const index = uetDB.notes.findIndex(n => n.id === noteId);
    if (index > -1) {
      uetDB.notes.splice(index, 1);
      // Trigger simple state redraw
      setSearchQuery(q => q + ' ');
      setTimeout(() => setSearchQuery(q => q.trim()), 50);
    }
  };

  return (
    <div className="space-y-6" id="teacher-materials-module">
      {/* Welcome header */}
      <div className="p-6 bg-slate-900 border-b-4 border-emerald-500 text-white rounded-2xl relative overflow-hidden">
        <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
          <BookMarked className="w-6 h-6 text-emerald-400" />
          Academic Course Materials Registry
        </h1>
        <p className="text-xs text-slate-350 max-w-lg mt-1">
          Publish handouts, textbooks checklists, reference slides, and lecture guide documents for enrolled student terms.
        </p>
      </div>

      {/* Toolbar actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-150 dark:border-slate-800">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'list' ? 'bg-[#0A1D37] text-white dark:bg-[#D4AF37] dark:text-[#0A1D37]' : 'bg-slate-50 dark:bg-slate-805 text-slate-600 hover:bg-slate-100'}`}
          >
            <Layers className="w-3.5 h-3.5" />
            Active Handouts Registry
          </button>
          <button
            onClick={() => {
              setActiveTab('add');
              if (teacherCourses.length > 0 && !courseId) {
                setCourseId(teacherCourses[0].id);
              }
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${activeTab === 'add' ? 'bg-[#0A1D37] text-white dark:bg-[#D4AF37] dark:text-[#0A1D37]' : 'bg-slate-50 dark:bg-slate-805 text-slate-600 hover:bg-slate-100'}`}
          >
            <Plus className="w-3.5 h-3.5" />
            Upload Lesson Material
          </button>
        </div>

        {activeTab === 'list' && (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search handouts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-48 text-xs pl-8 pr-3.5 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 dark:text-white rounded-lg focus:outline-none"
              />
            </div>

            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 dark:text-white rounded-lg focus:outline-none text-xs font-bold"
            >
              <option value="All">All Curriculums</option>
              {teacherCourses.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Tab contents panel */}
      <div className="space-y-6">
        {activeTab === 'list' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredNotes.map((note) => {
              const cName = uetDB.courses.find(c => c.id === note.course_id)?.name || note.course_name;
              return (
                <div key={note.id} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 hover:shadow-xs transition-shadow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="text-[8px] font-mono font-black uppercase tracking-wider px-2 py-0.5 bg-slate-100 dark:bg-slate-950 rounded text-slate-400 border border-slate-200/40">
                        DOC-REF
                      </span>
                    </div>

                    <div className="mt-4 space-y-1">
                      <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wide block">{cName}</span>
                      <h4 className="text-xs sm:text-sm font-black text-slate-850 dark:text-white leading-tight">{note.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-3">
                        {note.description || 'No summary overview provided.'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
                    <a
                      href={note.file_url}
                      target="_blank"
                      rel="referrer"
                      className="text-indigo-600 hover:underline font-bold flex items-center gap-1 text-[9px] uppercase tracking-wide cursor-pointer"
                    >
                      <span>Retrieve Handout</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    
                    <button
                      onClick={() => {
                        if (confirm('Delete this published handout material permanently?')) {
                          handleDeleteNote(note.id);
                        }
                      }}
                      className="text-rose-500 hover:text-rose-600 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredNotes.length === 0 && (
              <div className="col-span-full text-center py-12 bg-white dark:bg-slate-900 border rounded-2xl text-slate-400 p-6">
                <BookOpen className="w-12 h-12 mx-auto text-slate-350 mb-2 animate-bounce" />
                <p className="text-xs">No study handouts registry notes found matching selection.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'add' && (
          <form onSubmit={handleAddMaterial} className="max-w-xl mx-auto bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Publish Handout Document Form</h3>
              <p className="text-xs text-slate-400">Register a public downloadable URL link or local PDF file onto student indexes.</p>
            </div>

            {successMsg && (
              <div className="p-3 bg-emerald-50 text-emerald-750 text-xs font-semibold border border-emerald-100 rounded-xl">
                {successMsg}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-450 block">Handout Document Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Lecture 5: Assembly Registers & Micro-Operations"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-205 dark:bg-slate-950 dark:border-slate-800 dark:text-white rounded-lg focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-450 block">Target Syllabus Class</label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-205 dark:bg-slate-950 dark:border-slate-800 dark:text-white rounded-lg focus:outline-none"
              >
                {teacherCourses.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-450 block">Document Download URL</label>
              <input
                type="url"
                required
                placeholder="e.g. https://files.uet.edu.pk/lecture_5_assembly_registers.pdf"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-205 dark:bg-slate-950 dark:border-slate-800 dark:text-white rounded-lg focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-450 block">Syllabus Context Brief Description</label>
              <textarea
                rows={4}
                required
                placeholder="Include reference readings checklists, book page numbers, or prerequisites tasks before class lecture..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-205 dark:bg-slate-950 dark:border-slate-800 dark:text-white rounded-lg focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#0A1D37] hover:bg-opacity-95 text-white text-xs font-bold rounded-lg cursor-pointer transition-all uppercase tracking-wider"
            >
              Verify & Broadcast Handout
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
