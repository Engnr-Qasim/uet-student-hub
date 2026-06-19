import React, { useState } from 'react';
import { 
  Building, 
  Users, 
  UserCheck, 
  Award, 
  Megaphone, 
  ShieldAlert, 
  Settings, 
  Search, 
  Info,
  Sliders,
  Send,
  Database
} from 'lucide-react';
import { uetDB } from '../../data/mockData';

export default function AdminConsole() {
  const [tab, setTab] = useState('analytics');
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastBody, setBroadcastBody] = useState('');
  const [broadcastDept, setBroadcastDept] = useState('All');
  const [broadcastDone, setBroadcastDone] = useState(false);
  const [studentSearch, setStudentSearch] = useState('');

  const [activeNotices, setActiveNotices] = useState(uetDB.notices);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastBody) return;

    const newNotice = {
      id: `notice-${Date.now()}`,
      title: broadcastTitle,
      body: broadcastBody,
      category: broadcastDept,
      date_posted: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: 'Office of the Registrar'
    };

    // Prepend to list
    setActiveNotices([newNotice, ...activeNotices]);
    setBroadcastTitle('');
    setBroadcastBody('');
    setBroadcastDone(true);
    setTimeout(() => setBroadcastDone(false), 3000);
  };

  const filteredStudents = uetDB.profiles.filter(p => 
    p.role === 'student' && 
    (p.name.toLowerCase().includes(studentSearch.toLowerCase()) || 
     (p.reg_number && p.reg_number.toLowerCase().includes(studentSearch.toLowerCase())))
  );

  return (
    <div className="space-y-6" id="admin-workspace-central">
      {/* Central Welcome Header */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#031B33] to-[#0A1D37] border-l-4 border-[#D4AF37] text-white rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#D4AF37] bg-white/5 px-3 py-1 rounded-full border border-white/10">
            SYSTEM CONTROL LEVEL 01
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
            UET Registrar Station
          </h1>
          <p className="text-xs text-slate-300 max-w-lg mt-1">
            Welcome back, admin. You are authorized to manage active catalogs, dispatch notice broadcasts, investigate student profiles, and modify configuration states.
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-xl font-mono text-[10px]">
          <Database className="w-4.5 h-4.5 text-[#D4AF37]" />
          <span>DB SYNC: ON</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setTab('analytics')}
          className={`flex items-center space-x-1.5 px-4 py-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${tab === 'analytics' ? 'border-[#0A1D37] text-[#0A1D37] dark:border-[#D4AF37] dark:text-white' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          <Building className="w-4 h-4" />
          <span>Central Analytics</span>
        </button>
        <button 
          onClick={() => setTab('broadcaster')}
          className={`flex items-center space-x-1.5 px-4 py-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${tab === 'broadcaster' ? 'border-[#0A1D37] text-[#0A1D37] dark:border-[#D4AF37] dark:text-white' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Notice Broadcaster</span>
        </button>
        <button 
          onClick={() => setTab('students')}
          className={`flex items-center space-x-1.5 px-4 py-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${tab === 'students' ? 'border-[#0A1D37] text-[#0A1D37] dark:border-[#D4AF37] dark:text-white' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          <Users className="w-4 h-4" />
          <span>Student Directory</span>
        </button>
        <button 
          onClick={() => setTab('settings')}
          className={`flex items-center space-x-1.5 px-4 py-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${tab === 'settings' ? 'border-[#0A1D37] text-[#0A1D37] dark:border-[#D4AF37] dark:text-white' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          <Settings className="w-4 h-4" />
          <span>System Settings</span>
        </button>
      </div>

      {/* Tabs Viewport */}
      <div className="space-y-6">
        {tab === 'analytics' && (
          <div className="space-y-6">
            {/* Core Counts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center space-x-4">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 rounded-xl">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Total Enributions</span>
                  <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white leading-none block mt-1">2,450 Athletes</span>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center space-x-4">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 rounded-xl">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Faculty Pool</span>
                  <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white leading-none block mt-1">82 Professors</span>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center space-x-4">
                <div className="p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-600 rounded-xl">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">DCSE Departments</span>
                  <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white leading-none block mt-1">5 Core Labs</span>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center space-x-4">
                <div className="p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 rounded-xl">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Average GGPA</span>
                  <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white leading-none block mt-1">3.05 Scale 4.0</span>
                </div>
              </div>
            </div>

            {/* System Status Table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Active System Health Services</h3>
              <p className="text-xs text-slate-400">Monitoring real-time telemetry nodes and cloud sync channels.</p>
              
              <div className="mt-4 space-y-3.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Supabase Host Engine</span>
                  <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-extrabold rounded-lg text-[9px]">ONLINE (12ms)</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Clerk Auth Sync Core</span>
                  <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-extrabold rounded-lg text-[9px]">ACTIVE</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Durable storage cache S3</span>
                  <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-extrabold rounded-lg text-[9px]">READY</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Institutional Mail API</span>
                  <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 font-extrabold rounded-lg text-[9px]">NOT CONFIGURED</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'broadcaster' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <form onSubmit={handleBroadcast} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">Dispatch New Announcement</h3>
                <p className="text-xs text-slate-400">Broadcast updates directly to the student notices panel.</p>
              </div>

              {broadcastDone && (
                <div className="p-3 bg-emerald-50 text-emerald-750 text-xs rounded-xl font-semibold border border-emerald-100">
                  Broadcast dispatched successfully and pre-seeded onto students' interfaces!
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-450 block">Announcement Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Midterm Exams Schedule Alterations"
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-205 dark:bg-slate-950 dark:border-slate-800 dark:text-white rounded-lg focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-450 block">Category Target</label>
                <select
                  value={broadcastDept}
                  onChange={(e) => setBroadcastDept(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-205 dark:bg-slate-950 dark:border-slate-800 dark:text-white rounded-lg focus:outline-none"
                >
                  <option value="All">All Students & Teachers</option>
                  <option value="Academic">Academic Affairs</option>
                  <option value="Exams">Exams Department</option>
                  <option value="Hostel">Hostel & Admin</option>
                  <option value="DCSE">DCSE Department ONLY</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-450 block">Notice Body Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe the detailed instructions or message clear for students..."
                  value={broadcastBody}
                  onChange={(e) => setBroadcastBody(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-205 dark:bg-slate-950 dark:border-slate-800 dark:text-white rounded-lg focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-1.5 py-2.5 bg-[#0A1D37] hover:bg-[#0A1D37]/90 text-white font-bold rounded-lg text-xs cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Publish Broadcast Notice</span>
              </button>
            </form>

            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">Active Notice Ledger ({activeNotices.length})</h3>
                <p className="text-xs text-slate-400">Current active announcements visible on home catalogs and consoles.</p>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[360px] overflow-y-auto pr-1">
                {activeNotices.map((n, idx) => (
                  <div key={idx} className="py-3 first:pt-0 last:pb-0 space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-white leading-none">{n.title}</h4>
                      <span className="text-[8px] font-extrabold uppercase bg-indigo-50 text-indigo-650 px-1.5 py-0.5 rounded shrink-0">{n.category}</span>
                    </div>
                    <p className="text-[10px] text-slate-450 line-clamp-2">{n.body}</p>
                    <span className="block text-[8px] font-mono text-slate-400 text-right">{n.date_posted} • {n.author}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'students' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">Enrolled Students Database</h3>
                <p className="text-xs text-slate-400">Review system attributes and active registration sheets.</p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search students or registration..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="w-full text-xs pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-205 dark:bg-slate-950 dark:border-slate-800 dark:text-white rounded-lg focus:outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-50/50 dark:bg-slate-950/30">
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Reg Number</th>
                    <th className="py-3 px-4">Session Role</th>
                    <th className="py-3 px-4">Active Term</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {filteredStudents.map((s, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-800 dark:text-white flex items-center space-x-2.5">
                        <img src={s.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'} className="w-7 h-7 rounded-full object-cover border border-slate-200" />
                        <span>{s.name}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[10px] text-slate-500">{s.reg_number || 'N/A'}</td>
                      <td className="py-3.5 px-4 font-semibold text-[#D4AF37] fill-[#D4AF37] uppercase text-[9px] tracking-wide">{s.role}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-700 dark:text-slate-300">Semester {s.semester || 5}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 font-extrabold rounded-full text-[9px] uppercase border border-emerald-100">Active</span>
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">No student matching records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'settings' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Educational Portal Rules Configuration</h3>
              <p className="text-xs text-slate-400">Define global limits and academic term parameters.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl space-y-2.5 border border-slate-100">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Enable Grade Modification Override</span>
                    <input type="checkbox" defaultChecked className="accent-[#0A1D37]" />
                  </div>
                  <p className="text-[10px] text-slate-450 leading-relaxed">Directs if professors can rewrite completed grading sheets after direct term lockdown timelines.</p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl space-y-2.5 border border-slate-100">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Force Two-Factor Authentication</span>
                    <input type="checkbox" className="accent-[#0A1D37]" />
                  </div>
                  <p className="text-[10px] text-slate-450 leading-relaxed">Strictly prompt student credentials via Clerk verification tokens for access.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl space-y-2.5 border border-slate-100 text-xs">
                  <div className="flex items-center space-x-2 text-rose-600 font-bold uppercase text-[10px]">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Critical System Safeguards</span>
                  </div>
                  <p className="text-[10px] text-slate-450 mt-1">Clearing dynamic LocalStorage settings returns mock dataset profiles to factory clean states.</p>
                  <button 
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                    className="mt-2 text-white bg-slate-800 hover:bg-slate-900 px-3.5 py-1.5 rounded-lg text-[10px] font-black tracking-wider uppercase cursor-pointer"
                  >
                    Reset Sandbox Mock Engines
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
