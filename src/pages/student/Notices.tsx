import React, { useState } from 'react';
import { uetDB } from '../../data/mockData';
import { Bell, Calendar, Mail, Tag, Search } from 'lucide-react';
import { EmptyState } from '../../components/shared/EmptyState';

export default function StudentNotices() {
  const [notices, setNotices] = useState(uetDB.notices);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredNotices = notices.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          n.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || n.type === filterType;
    return matchesSearch && matchesType;
  });

  const getNoticeTheme = (type: string) => {
    switch (type) {
      case 'exam':
        return 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-450 border border-rose-100 dark:border-rose-900/50';
      case 'academic':
        return 'bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-450 border border-blue-100 dark:border-blue-900/50';
      case 'event':
        return 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-450 border border-amber-100 dark:border-amber-900/50';
      default:
        return 'bg-slate-50 text-slate-500 dark:bg-slate-850 dark:text-slate-400 border border-slate-100 dark:border-slate-800';
    }
  };

  return (
    <div className="space-y-6" id="student-notices-view">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Board Bulletin Notices</h2>
        <p className="text-xs text-slate-400">Read institutional circulars, registrar notifications, and term exam directives.</p>
      </div>

      {/* Filter panel */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-4 rounded-xl shadow-xs">
        <div className="flex-grow flex items-center space-x-2 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 px-3 py-1.5 rounded-lg text-slate-450 text-xs text-slate-500">
          <Search className="w-4 h-4" />
          <input
            type="text"
            placeholder="Search circulars contents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none w-full dark:text-white"
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 px-3 py-1.5 rounded-lg text-xs font-bold focus:outline-none dark:text-white"
        >
          <option value="all">All Bulletins</option>
          <option value="exam">Exam Notices</option>
          <option value="academic">Academic Board</option>
          <option value="event">Campus Happenings</option>
        </select>
      </div>

      {/* Grid listing */}
      {filteredNotices.length === 0 ? (
        <EmptyState 
          title="No Notices Located" 
          description="Bulletin logs are currently empty. Check back later once boards publish announcements." 
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotices.map((n) => (
            <div
              key={n.id}
              className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl flex flex-col justify-between shadow-xs hover:shadow-md transition-all h-full"
              id={`notice-card-${n.id}`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className={`px-2.5 py-0.5 rounded font-black uppercase ${getNoticeTheme(n.type)}`}>
                    {n.type} circular
                  </span>
                  <span className="flex items-center space-x-1 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(n.created_at).toLocaleDateString()}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-850 dark:text-white leading-tight">{n.title}</h3>
                  <p className="text-xs text-slate-450 dark:text-slate-500 mt-2.5 leading-relaxed">{n.content}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-850 mt-6 flex items-center space-x-2 text-slate-400 text-[10px] font-bold">
                <div className="p-1.5 bg-slate-50 dark:bg-slate-850 rounded text-slate-400 border border-slate-100 dark:border-slate-800">
                  <Mail className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400 leading-none">Authority author</span>
                  <span className="text-slate-500 dark:text-slate-400 font-semibold">{n.created_by_name || 'DCSE Secretariat'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
