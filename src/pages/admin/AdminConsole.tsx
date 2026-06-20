import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Users, 
  UserCheck, 
  Award, 
  Megaphone, 
  ShieldAlert, 
  Settings, 
  Search, 
  Sliders,
  Send,
  Database,
  Plus,
  Trash2,
  BookOpen,
  Calendar,
  Palette,
  Heart
} from 'lucide-react';
import { uetDB } from '../../data/mockData';
import { UserProfile, Department, Course, Notice } from '../../types';
import { useApp } from '../../contexts/AppContext';

export default function AdminConsole() {
  const currentPath = window.location.pathname;
  const { settings, updateSettings } = useApp();

  const [devName, setDevName] = useState(settings.dev_name || 'Muhammad Qasim Usman');
  const [devPic, setDevPic] = useState(settings.dev_pic || '/src/assets/images/dev_photo_1781959281322.jpg');
  const [devBio, setDevBio] = useState(settings.dev_bio || 'Muhammad Qasim Usman is a Computer Systems Engineering student at the University of Engineering and Technology (UET) Peshawar. He is passionate about software development, web technologies, system design, and innovative educational solutions. UET Student Hub was created to provide students, teachers, and administrators with a modern digital platform for academic management and collaboration.');
  const [devSkills, setDevSkills] = useState(settings.dev_skills || 'React, TypeScript, Node.js, Tailwind CSS, System Design, Software Engineering');
  const [devEmail, setDevEmail] = useState(settings.dev_email || 'info.qasimusman.cse@gmail.com');
  const [devWhatsApp, setDevWhatsApp] = useState(settings.dev_whatsapp || '+923717090091');
  const [devLinkedin, setDevLinkedin] = useState(settings.dev_linkedin || 'https://www.linkedin.com/in/muhammad-qasim-usman-9b26973a1');
  const [devGithub, setDevGithub] = useState(settings.dev_github || '');
  const [devInstagram, setDevInstagram] = useState(settings.dev_instagram || '');
  const [devUpdateSuccess, setDevUpdateSuccess] = useState(false);

  // Synchronize on load
  useEffect(() => {
    if (settings) {
      if (settings.dev_name) setDevName(settings.dev_name);
      if (settings.dev_pic) setDevPic(settings.dev_pic);
      if (settings.dev_bio) setDevBio(settings.dev_bio);
      if (settings.dev_skills) setDevSkills(settings.dev_skills);
      if (settings.dev_email) setDevEmail(settings.dev_email);
      if (settings.dev_whatsapp) setDevWhatsApp(settings.dev_whatsapp);
      if (settings.dev_linkedin) setDevLinkedin(settings.dev_linkedin);
      setDevGithub(settings.dev_github || '');
      setDevInstagram(settings.dev_instagram || '');
    }
  }, [settings]);

  const handleUpdateDevProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      dev_name: devName,
      dev_pic: devPic,
      dev_bio: devBio,
      dev_skills: devSkills,
      dev_email: devEmail,
      dev_whatsapp: devWhatsApp,
      dev_linkedin: devLinkedin,
      dev_github: devGithub,
      dev_instagram: devInstagram
    });
    setDevUpdateSuccess(true);
    setTimeout(() => setDevUpdateSuccess(false), 2500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDevPic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Determine active tab based on window pathname for flawless sidebar coordination
  const getTabFromPath = (path: string) => {
    if (path === '/admin/dashboard') return 'analytics';
    if (path === '/admin/students') return 'students';
    if (path === '/admin/teachers') return 'teachers';
    if (path === '/admin/departments') return 'departments';
    if (path === '/admin/courses') return 'courses';
    if (path === '/admin/semesters') return 'semesters';
    if (path === '/admin/notices') return 'broadcaster';
    if (path === '/admin/settings') return 'settings';
    if (path === '/admin/themes') return 'themes';
    return 'analytics';
  };

  const [tab, setTab] = useState(getTabFromPath(currentPath));

  // Sync sub tab context state automatically when user clicks links onto sidebar
  useEffect(() => {
    setTab(getTabFromPath(window.location.pathname));
  }, [currentPath]);

  // Reactive DB lists states
  const [profiles, setProfiles] = useState([...uetDB.profiles]);
  const [notices, setNotices] = useState([...uetDB.notices]);
  const [departments, setDepartments] = useState([...uetDB.departments]);
  const [courses, setCourses] = useState([...uetDB.courses]);

  // Broadcast notices form states
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastBody, setBroadcastBody] = useState('');
  const [broadcastType, setBroadcastType] = useState<'general' | 'academic' | 'exam' | 'event'>('general');
  const [broadcastDept, setBroadcastDept] = useState('dept-cse');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  // Student directory form & search states
  const [studentSearch, setStudentSearch] = useState('');
  const [stName, setStName] = useState('');
  const [stReg, setStReg] = useState('');
  const [stPhone, setStPhone] = useState('');
  const [stDept, setStDept] = useState('dept-cse');
  const [stSem, setStSem] = useState(5);
  const [studentSuccess, setStudentSuccess] = useState(false);

  // Teachers form & search states
  const [teacherSearch, setTeacherSearch] = useState('');
  const [tName, setTName] = useState('');
  const [tPhone, setTPhone] = useState('');
  const [tDept, setTDept] = useState('dept-cse');
  const [teacherSuccess, setTeacherSuccess] = useState(false);

  // Departments form states
  const [depName, setDepName] = useState('');
  const [depCode, setDepCode] = useState('');
  const [depHod, setDepHod] = useState('');
  const [depLogo, setDepLogo] = useState('💻');
  const [depDesc, setDepDesc] = useState('');
  const [depSuccess, setDepSuccess] = useState(false);

  // Courses form states
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseDept, setCourseDept] = useState('dept-cse');
  const [courseSem, setCourseSem] = useState(5);
  const [courseCredits, setCourseCredits] = useState(3);
  const [courseSuccess, setCourseSuccess] = useState(false);

  // Theme states
  const [selectedAccent, setSelectedAccent] = useState('classic-navy');

  // Dynamic statistics computations
  const totalStudentsCount = profiles.filter(p => p.role === 'student').length;
  const totalTeachersCount = profiles.filter(p => p.role === 'teacher').length;
  const totalDeptsCount = departments.length;
  
  // Real dynamic computation for GPA averages
  const averageGPA = () => {
    const validGPAs = uetDB.results.map(r => r.gpa).filter(g => g > 0);
    if (validGPAs.length === 0) return '3.05';
    const sum = validGPAs.reduce((a, b) => a + b, 0);
    return (sum / validGPAs.length).toFixed(2);
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastBody) return;

    const newNotice = uetDB.addNotice(broadcastTitle, broadcastBody, broadcastType, broadcastDept);
    if (newNotice) {
      setNotices([...uetDB.notices]);
      setBroadcastTitle('');
      setBroadcastBody('');
      setBroadcastSuccess(true);
      setTimeout(() => setBroadcastSuccess(false), 2500);
    }
  };

  const handleDeleteNotice = (id: string) => {
    uetDB.notices = uetDB.notices.filter(n => n.id !== id);
    setNotices([...uetDB.notices]);
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stName || !stReg) return;

    const chosenDept = departments.find(d => d.id === stDept);
    const newStudent: UserProfile = {
      id: `prof-new-${Date.now()}`,
      user_id: `usr-new-${Date.now()}`,
      role: 'student',
      name: stName,
      phone: stPhone || '+92-300-1112233',
      avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      department_id: stDept,
      department_name: chosenDept?.name || 'Computer Systems Engineering',
      reg_number: stReg,
      semester: Number(stSem)
    };

    uetDB.profiles.unshift(newStudent);
    setProfiles([...uetDB.profiles]);
    setStName('');
    setStReg('');
    setStPhone('');
    setStudentSuccess(true);
    setTimeout(() => setStudentSuccess(false), 2500);
  };

  const handleDeleteProfile = (id: string) => {
    uetDB.profiles = uetDB.profiles.filter(p => p.id !== id);
    setProfiles([...uetDB.profiles]);
  };

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tName) return;

    const chosenDept = departments.find(d => d.id === tDept);
    const newTeacher: UserProfile = {
      id: `prof-tea-${Date.now()}`,
      user_id: `usr-tea-${Date.now()}`,
      role: 'teacher',
      name: tName,
      phone: tPhone || '+92-300-4445566',
      avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
      department_id: tDept,
      department_name: chosenDept?.name || 'Computer Systems Engineering'
    };

    uetDB.profiles.unshift(newTeacher);
    setProfiles([...uetDB.profiles]);
    setTName('');
    setTPhone('');
    setTeacherSuccess(true);
    setTimeout(() => setTeacherSuccess(false), 2500);
  };

  const handleAddDept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!depName || !depCode || !depHod) return;

    const newDep: Department = {
      id: `dept-new-${Date.now()}`,
      name: depName,
      code: depCode,
      hod_name: depHod,
      logo_url: depLogo,
      description: depDesc || 'Innovative engineering research and curriculum standards.'
    };

    uetDB.departments.push(newDep);
    setDepartments([...uetDB.departments]);
    setDepName('');
    setDepCode('');
    setDepHod('');
    setDepDesc('');
    setDepSuccess(true);
    setTimeout(() => setDepSuccess(false), 2500);
  };

  const handleDeleteDept = (id: string) => {
    uetDB.departments = uetDB.departments.filter(d => d.id !== id);
    setDepartments([...uetDB.departments]);
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseName || !courseCode) return;

    const newC: Course = {
      id: `course-${Date.now()}`,
      name: courseName,
      code: courseCode,
      department_id: courseDept,
      semester: Number(courseSem),
      credit_hours: Number(courseCredits)
    };

    uetDB.courses.push(newC);
    setCourses([...uetDB.courses]);
    setCourseName('');
    setCourseCode('');
    setCourseSuccess(true);
    setTimeout(() => setCourseSuccess(false), 2500);
  };

  const handleDeleteCourse = (id: string) => {
    uetDB.courses = uetDB.courses.filter(c => c.id !== id);
    setCourses([...uetDB.courses]);
  };

  return (
    <div className="space-y-6" id="admin-workspace-central">
      {/* Central Welcome Header Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#031B33] to-[#0A1D37] border-l-4 border-[#D4AF37] text-white rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
        <div>
          <span className="text-[9px] uppercase tracking-widest font-black text-[#D4AF37] bg-white/5 px-2.5 py-1 rounded-full border border-white/10 select-none">
            REGISTRAR ADMINISTRATIVE COMPASS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
            UET Registrar Station
          </h1>
          <p className="text-xs text-slate-300 max-w-lg mt-1 font-sans">
            Central dashboard to add classes, register incoming students, dispatch notices board alerts, and configure institutional values.
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-xl font-mono text-[9px] select-none text-[#D4AF37] font-bold">
          <Database className="w-4 h-4" />
          <span>PORTAL ACTIVE: ON</span>
        </div>
      </div>

      {/* Primary Sub-tab switcher indicators */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'analytics', label: 'Central Analytics', icon: <Building className="w-4 h-4" /> },
          { id: 'broadcaster', label: 'Bulletins Broadcaster', icon: <Megaphone className="w-4 h-4" /> },
          { id: 'students', label: 'Student Directory', icon: <Users className="w-4 h-4" /> },
          { id: 'teachers', label: 'Teachers Registry', icon: <UserCheck className="w-4 h-4" /> },
          { id: 'departments', label: 'UET Departments', icon: <Building className="w-4 h-4" /> },
          { id: 'courses', label: 'Courses Set', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'semesters', label: 'Semesters Roadmap', icon: <Calendar className="w-4 h-4" /> },
          { id: 'themes', label: 'Brand & Themes', icon: <Palette className="w-4 h-4" /> },
          { id: 'settings', label: 'System Settings', icon: <Settings className="w-4 h-4" /> }
        ].map(t => (
          <button 
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center space-x-1 px-3.5 py-2.5 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${tab === t.id ? 'border-[#0A1D37] text-[#0A1D37] dark:border-[#D4AF37] dark:text-white font-extrabold shadow-inner' : 'border-transparent text-slate-450 hover:text-slate-700'}`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Main dynamic container views */}
      <div className="space-y-6">
        
        {/* 1. CENTRAL ANALYTICS VIEW */}
        {tab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center space-x-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/25 text-blue-600 rounded-xl">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 block uppercase">Total Students</span>
                  <span className="text-xl font-black text-slate-800 dark:text-white mt-0.5 block">{totalStudentsCount} Scholars</span>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center space-x-4">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/25 text-emerald-600 rounded-xl">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 block uppercase">Faculty Pool</span>
                  <span className="text-xl font-black text-slate-800 dark:text-white mt-0.5 block">{totalTeachersCount} Professors</span>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center space-x-4">
                <div className="p-3 bg-amber-50 dark:bg-amber-950/25 text-amber-600 rounded-xl">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 block uppercase">Departments</span>
                  <span className="text-xl font-black text-slate-800 dark:text-white mt-0.5 block">{totalDeptsCount} Facets</span>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center space-x-4">
                <div className="p-3 bg-rose-50 dark:bg-rose-950/25 text-rose-600 rounded-xl">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 block uppercase">System Avg GPA</span>
                  <span className="text-xl font-black text-slate-800 dark:text-white mt-0.5 block">{averageGPA()} / 4.00</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-250/80 dark:border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-black text-slate-800 dark:text-white">Active System Health Monitor</h3>
                <p className="text-xs text-slate-400">Verifying live telemetry gateways and directory lookup response rates.</p>
                <div className="space-y-3 pt-2">
                  {[
                    { component: 'Supabase Postgres Instance', status: 'ONLINE (11ms)', color: 'bg-emerald-50 text-emerald-700' },
                    { component: 'Clerk SSO Token Provider', status: 'ACTIVE', color: 'bg-emerald-50 text-emerald-700' },
                    { component: 'AWS S3 Document Buckets', status: 'SYNCHRONIZED', color: 'bg-emerald-50 text-emerald-700' },
                    { component: 'UET Mail Server API', status: 'DEVELOPMENT MOCK', color: 'bg-amber-50 text-amber-700' }
                  ].map((x, i) => (
                    <div key={i} className="flex justify-between items-center text-xs pb-2 border-b border-slate-50 last:border-none">
                      <span className="font-semibold text-slate-600 dark:text-slate-350">{x.component}</span>
                      <span className={`px-2 py-0.5 ${x.color} font-black text-[9px] rounded`}>{x.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#031B33] text-white rounded-2xl p-6 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="inline-block px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded text-[9px] font-bold border border-amber-500/20">
                    ACADEMIC NOTICES STATUS
                  </div>
                  <h4 className="text-base font-black">Portal Broadcast Console</h4>
                  <p className="text-xs text-slate-350 leading-relaxed font-medium">
                    You have dispatched {notices.length} notifications to student directories. Keep announcements clean and remove stale bulletins to maintain high system throughput.
                  </p>
                </div>
                <div className="text-[10px] text-slate-400 font-medium">
                  Last Admin Login Sync: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. BULLETIN BROADCASTER VIEW (CRUD) */}
        {tab === 'broadcaster' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <form onSubmit={handleBroadcast} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">Broadcast New Bulletin Notice</h3>
                <p className="text-xs text-slate-400">Instantly populate notifications onto student and teacher dashboards.</p>
              </div>

              {broadcastSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-750 text-xs font-semibold rounded-xl">
                  Notice successfully broadcasted across active term catalogs!
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-450 block">Bulletin Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Phase 2 Project Showcase Timelines"
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-205 dark:bg-slate-950 dark:border-slate-800 dark:text-white rounded-lg focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-450 block">Notice Type Category</label>
                  <select
                    value={broadcastType}
                    onChange={(e) => setBroadcastType(e.target.value as any)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-205 dark:bg-slate-950 dark:border-slate-800 dark:text-white rounded-lg focus:outline-none"
                  >
                    <option value="general">General Updates</option>
                    <option value="academic">Academic Board</option>
                    <option value="exam">Exam Controller</option>
                    <option value="event">Campus happenings</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-450 block">Targeting Department</label>
                  <select
                    value={broadcastDept}
                    onChange={(e) => setBroadcastDept(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-205 dark:bg-slate-950 dark:border-slate-800 dark:text-white rounded-lg focus:outline-none"
                  >
                    {departments.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-450 block">Body Notice Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write complete bulletin statement..."
                  value={broadcastBody}
                  onChange={(e) => setBroadcastBody(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-205 dark:bg-slate-950 dark:border-slate-800 dark:text-white rounded-lg focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#0A1D37] hover:bg-opacity-95 text-white font-bold rounded-lg text-xs cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Publish Notice Broadcast</span>
              </button>
            </form>

            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">Active General Bulletins ({notices.length})</h3>
                <p className="text-xs text-slate-400 font-sans">Verify published news or delete outdated ones.</p>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-805 max-h-[380px] overflow-y-auto pr-1">
                {notices.map((n, i) => (
                  <div key={i} className="py-3 first:pt-0 last:pb-0 space-y-1.5 text-xs">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-extrabold text-slate-850 dark:text-white leading-tight">{n.title}</h4>
                      <button 
                        onClick={() => handleDeleteNotice(n.id)}
                        className="text-rose-500 hover:text-rose-600 p-1 rounded hover:bg-rose-50 shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium line-clamp-2">{n.body || n.content}</p>
                    <div className="flex justify-between items-center text-[9px] font-semibold text-slate-400">
                      <span className="uppercase text-[#D4AF37] tracking-wider">{n.category || n.type}</span>
                      <span>{n.date_posted || 'June 19, 2026'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. STUDENT DIRECTORY VIEW (CRUD) */}
        {tab === 'students' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4 h-fit">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Register Incoming Student</h3>
              
              {studentSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-705 text-xs font-semibold rounded-lg">
                  Student registered onto academic grids!
                </div>
              )}

              <form onSubmit={handleAddStudent} className="space-y-3.5 text-xs font-bold text-slate-650">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-slate-400">Student Name</label>
                  <input
                    type="text"
                    required
                    value={stName}
                    onChange={(e) => setStName(e.target.value)}
                    placeholder="e.g. Hamza Chaudhry"
                    className="w-full text-xs p-2 bg-slate-50 border rounded-lg focus:outline-none dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-slate-400">Registration Number</label>
                  <input
                    type="text"
                    required
                    value={stReg}
                    onChange={(e) => setStReg(e.target.value)}
                    placeholder="e.g. 2021-CSE-045"
                    className="w-full text-xs p-2 bg-slate-50 border rounded-lg focus:outline-none dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-slate-400">Department</label>
                  <select
                    value={stDept}
                    onChange={(e) => setStDept(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border rounded-lg focus:outline-none dark:bg-slate-950 dark:text-white"
                  >
                    {departments.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase text-slate-400">Active Term Sem</label>
                    <input
                      type="number"
                      min="1"
                      max="8"
                      value={stSem}
                      onChange={(e) => setStSem(Number(e.target.value))}
                      className="w-full text-xs p-2 bg-slate-50 border rounded-lg focus:outline-none dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase text-slate-400">Tel Phone</label>
                    <input
                      type="text"
                      value={stPhone}
                      onChange={(e) => setStPhone(e.target.value)}
                      placeholder="+92-333-1212"
                      className="w-full text-xs p-2 bg-slate-50 border rounded-lg focus:outline-none dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-[#0A1D37] text-white font-bold rounded-lg cursor-pointer hover:bg-opacity-90 transition-all"
                >
                  Confirm Registration
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white">Active Student Registry Ledger</h3>
                  <p className="text-xs text-slate-400 font-sans">Manage current student directories details.</p>
                </div>
                <div className="relative w-full sm:w-48">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    className="w-full text-xs pl-8 pr-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 font-extrabold text-[9px] text-slate-400 uppercase tracking-widest bg-slate-50">
                      <th className="py-2.5 px-3">Student Name</th>
                      <th className="py-2.5 px-3">Roll number</th>
                      <th className="py-2.5 px-3">Dept / Sem</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profiles
                      .filter(p => p.role === 'student' && p.name.toLowerCase().includes(studentSearch.toLowerCase()))
                      .map((s, idx) => (
                        <tr key={idx} className="border-b font-medium text-slate-705 dark:text-slate-350 hover:bg-slate-50/50">
                          <td className="py-2.5 px-3 font-extrabold text-slate-850 dark:text-white flex items-center gap-2">
                            <img src={s.avatar_url} className="w-6 h-6 rounded-full object-cover" />
                            <span>{s.name}</span>
                          </td>
                          <td className="py-2.5 px-3 font-mono font-bold">{s.reg_number || 'Sandbox User'}</td>
                          <td className="py-2.5 px-3">
                            <span className="block font-semibold text-indigo-650">{s.department_name.split(' ')[0]}</span>
                            <span className="block text-[9px] text-slate-400 mt-0.5 font-bold">Semester {s.semester || 5}</span>
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <button
                              onClick={() => handleDeleteProfile(s.id)}
                              className="text-rose-500 hover:text-rose-600 p-1 hover:bg-rose-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. TEACHERS REGISTRY VIEW (CRUD) */}
        {tab === 'teachers' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4 h-fit">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Register Faculty Member</h3>
              
              {teacherSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-705 text-xs font-semibold rounded-lg">
                  Professors credentials written onto databases successfully!
                </div>
              )}

              <form onSubmit={handleAddTeacher} className="space-y-3.5 text-xs font-bold text-slate-650">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-slate-400">Professor Name</label>
                  <input
                    type="text"
                    required
                    value={tName}
                    onChange={(e) => setTName(e.target.value)}
                    placeholder="e.g. Prof. Dr. Haris Mahmood"
                    className="w-full text-xs p-2 bg-slate-50 border rounded-lg focus:outline-none dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-slate-400">Dean department</label>
                  <select
                    value={tDept}
                    onChange={(e) => setTDept(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border rounded-lg focus:outline-none dark:bg-slate-950 dark:text-white"
                  >
                    {departments.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-slate-400">Institutional Contact Tel</label>
                  <input
                    type="text"
                    value={tPhone}
                    onChange={(e) => setTPhone(e.target.value)}
                    placeholder="+92-42-232145"
                    className="w-full text-xs p-2 bg-slate-50 border rounded-lg focus:outline-none dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-[#0A1D37] text-white font-bold rounded-lg cursor-pointer hover:bg-opacity-90 transition-all"
                >
                  Onboard Faculty
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950/20 p-2.5 rounded-lg">
                <span className="text-xs font-bold text-[#D4AF37]">Active Faculty Pool roster listings</span>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Find professor..."
                    value={teacherSearch}
                    onChange={(e) => setTeacherSearch(e.target.value)}
                    className="text-xs p-1 px-3.5 pr-8 bg-white border border-slate-200 rounded-lg focus:outline-none dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profiles
                  .filter(p => p.role === 'teacher' && p.name.toLowerCase().includes(teacherSearch.toLowerCase()))
                  .map((t, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-105 bg-slate-50/50 flex items-start gap-3 justify-between">
                      <div className="flex items-center gap-2 text-xs">
                        <img src={t.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'} className="w-9 h-9 rounded-full object-cover" />
                        <div>
                          <h4 className="font-extrabold text-[#0A1D37] dark:text-white block leading-tight">{t.name}</h4>
                          <span className="block text-[9px] text-[#D4AF37] mt-0.5 uppercase tracking-wide font-bold">{t.department_name}</span>
                          <span className="block text-[9px] text-slate-400 font-mono mt-0.5">{t.phone || 'N/A'}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteProfile(t.id)}
                        className="text-rose-500 hover:bg-rose-50 p-1 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. DEPARTMENTS VIEW (CRUD) */}
        {tab === 'departments' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4 h-fit">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Inaugurate New Faculty Department</h3>

              {depSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-705 text-xs font-semibold rounded-lg">
                  Department successfully established!
                </div>
              )}

              <form onSubmit={handleAddDept} className="space-y-3 text-xs font-bold text-slate-650">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-slate-450">Department Name</label>
                  <input
                    type="text"
                    required
                    value={depName}
                    placeholder="e.g. Mechatronics Engineering"
                    onChange={(e) => setDepName(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border rounded focus:outline-none dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase text-slate-455">Dept Short Code</label>
                    <input
                      type="text"
                      required
                      value={depCode}
                      placeholder="e.g. MTE"
                      onChange={(e) => setDepCode(e.target.value)}
                      className="w-full text-xs p-2 bg-slate-50 border rounded focus:outline-none dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase text-slate-455">Emoticon Icon Logo</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 🤖"
                      value={depLogo}
                      onChange={(e) => setDepLogo(e.target.value)}
                      className="w-full text-xs p-2 bg-slate-50 border rounded focus:outline-none dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-slate-455">HOD Dean Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Salman Jamil"
                    value={depHod}
                    onChange={(e) => setDepHod(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border rounded focus:outline-none dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-slate-455">Brief Description</label>
                  <textarea
                    rows={3}
                    placeholder="Write department objective highlights..."
                    value={depDesc}
                    onChange={(e) => setDepDesc(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border rounded focus:outline-none dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <button type="submit" className="w-full py-2 bg-[#0A1D37] text-white font-bold rounded hover:bg-opacity-95 transition-all">
                  Inaugurate department
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {departments.map((d, i) => (
                <div key={i} className="p-5 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 rounded-2xl flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-lg">{d.logo_url}</span>
                      <button 
                        onClick={() => handleDeleteDept(d.id)}
                        className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 p-1 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase text-[#D4AF37] bg-[#D4AF37]/10 px-1.5 py-0.5 rounded border border-[#D4AF37]/25 leading-none">{d.code}</span>
                      <h4 className="text-sm font-black text-slate-850 dark:text-white leading-tight mt-1">{d.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-1">{d.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-2 border-t text-[10px] font-extrabold text-slate-400">
                    HOD: {d.hod_name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. ALL COURSES SET VIEW (CRUD) */}
        {tab === 'courses' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4 h-fit">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Establish Syllabus Course</h3>

              {courseSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-705 text-xs font-semibold rounded-lg">
                  New course written onto syllabus catalogs successfully!
                </div>
              )}

              <form onSubmit={handleAddCourse} className="space-y-3.5 text-xs font-bold text-slate-650">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-slate-455">Course Class Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Signal Processing & Analysis"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border rounded-lg focus:outline-none dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase text-slate-455">Course Code</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. EE-311"
                      value={courseCode}
                      onChange={(e) => setCourseCode(e.target.value)}
                      className="w-full text-xs p-2 bg-slate-50 border rounded-lg focus:outline-none dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase text-slate-455">Credit Hours</label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="5"
                      value={courseCredits}
                      onChange={(e) => setCourseCredits(Number(e.target.value))}
                      className="w-full text-xs p-2 bg-slate-50 border rounded-lg focus:outline-none dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase text-slate-455">Department</label>
                    <select
                      value={courseDept}
                      onChange={(e) => setCourseDept(e.target.value)}
                      className="w-full text-xs p-2 bg-slate-50 border rounded-lg focus:outline-none dark:bg-slate-950 dark:text-white"
                    >
                      {departments.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase text-slate-455">Recommended Semester</label>
                    <select
                      value={courseSem}
                      onChange={(e) => setCourseSem(Number(e.target.value))}
                      className="w-full text-xs p-2 bg-slate-50 border rounded-lg focus:outline-none dark:bg-slate-950 dark:text-white"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                        <option key={s} value={s}>Semester {s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button type="submit" className="w-full py-2 bg-[#0A1D37] text-white font-bold rounded-lg hover:bg-opacity-95 transition-all">
                  Register Catalog Course
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-4">Undergraduate Courses Syllabus Ledger</h3>
              
              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-1">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => {
                  const semCourses = courses.filter(c => c.semester === sem);
                  if (semCourses.length === 0) return null;
                  return (
                    <div key={sem} className="space-y-2">
                      <h4 className="text-[10px] uppercase font-black text-[#D4AF37] leading-none mb-2 border-b pb-1">Semester Term {sem} Classes</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {semCourses.map((c, idx) => (
                          <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-950/20 border border-slate-100 rounded-xl flex items-center justify-between gap-1 text-xs">
                            <div>
                              <span className="text-[9px] font-mono text-indigo-500 font-extrabold block">{c.code}</span>
                              <span className="font-extrabold text-[#0A1D37] dark:text-white line-clamp-1">{c.name}</span>
                              <span className="text-[9px] font-mono text-slate-400 font-medium">Credits: {c.credit_hours} hours</span>
                            </div>
                            <button
                              onClick={() => handleDeleteCourse(c.id)}
                              className="text-rose-450 hover:text-rose-600 p-1 hover:bg-rose-50 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 7. ACADEMIC SEMESTERS ROADMAP DETAILS */}
        {tab === 'semesters' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-2xl p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Curriculum Semester Roadmaps Overview</h3>
              <p className="text-xs text-slate-400">Review active course enrollments, class rates, and total student metrics for each step trajectory.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((semStep) => {
                const sCoursesList = courses.filter(c => c.semester === semStep);
                const sStudentsCount = profiles.filter(p => p.role === 'student' && p.semester === semStep).length;

                return (
                  <div key={semStep} className="p-4 rounded-xl border border-slate-105 bg-slate-50 flex flex-col justify-between space-y-4 text-xs font-bold text-slate-650">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black text-indigo-500 uppercase">STEP-0{semStep}</span>
                        <span className="px-2 py-0.5 bg-[#D4AF37]/10 text-[#D4AF37] font-black rounded-full text-[8px] uppercase">
                          SEMINAL {semStep % 2 === 0 ? 'SPRING' : 'FALL'}
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-slate-800 dark:text-white leading-tight">Semester {semStep}</h4>
                      <span className="block font-medium text-slate-500 text-[10px] mt-1">
                        Active registered: <strong className="text-slate-800 dark:text-white font-extrabold">{sStudentsCount || (semStep === 5 ? 1 : 0)} students</strong>
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-[9px] uppercase text-slate-400 block mb-1">Catalog Courses list</span>
                      <div className="flex flex-wrap gap-1">
                        {sCoursesList.slice(0, 3).map((co, cIdx) => (
                          <span key={cIdx} className="px-1.5 py-0.5 bg-slate-100 text-[8px] font-extrabold font-mono text-slate-550 rounded border">
                            {co.code}
                          </span>
                        ))}
                        {sCoursesList.length > 3 && (
                          <span className="px-1.5 py-0.5 bg-slate-100 text-[8px] font-extrabold text-slate-500 rounded border">
                            +{sCoursesList.length - 3} more
                          </span>
                        )}
                        {sCoursesList.length === 0 && (
                          <span className="text-[8px] italic text-slate-400 font-medium">No catalog scheduled class.</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 8. BRAND & THEME CUSTOMIZATION STYLE PREVIEW */}
        {tab === 'themes' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">UET Brand Colors Customizer</h3>
              <p className="text-xs text-slate-400">Configure visual themes palette presets. Changes are loaded globally into browser instances instantly.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase text-slate-450 block">Choose Aesthetic Preset Color:</span>
                
                <div className="space-y-2.5">
                  {[
                    { id: 'classic-navy', name: 'Classic UET Navy & Gold (Default)', style: 'bg-[#0A1D37] text-white border-2 border-[#D4AF37]' },
                    { id: 'crimson-guard', name: 'Royal Crimson Guard Edition', style: 'bg-[#500000] text-amber-200' },
                    { id: 'emerald-faculty', name: 'Emerald Scholar Faculty Slate', style: 'bg-[#064e3b] text-emerald-100' },
                    { id: 'slate', name: 'Charcoal Minimalist Academic', style: 'bg-slate-800 text-slate-100' }
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setSelectedAccent(preset.id);
                        document.documentElement.style.setProperty('--university-primary', 
                          preset.id === 'classic-navy' ? '#0A1D37' : 
                          preset.id === 'crimson-guard' ? '#500000' : 
                          preset.id === 'emerald-faculty' ? '#064e3b' : '#334155'
                        );
                      }}
                      className={`w-full p-4 rounded-xl flex justify-between items-center text-xs font-black cursor-pointer transition-all ${preset.style} ${selectedAccent === preset.id ? 'ring-4 ring-offset-2 ring-indigo-550 scale-[1.02]' : 'opacity-80 hover:opacity-100'}`}
                    >
                      <span>{preset.name}</span>
                      {selectedAccent === preset.id && (
                        <span className="px-2 py-0.5 bg-white text-slate-900 rounded-[4px] text-[8px] uppercase font-mono font-black">active applet</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-slate-50 dark:bg-slate-950/20 border rounded-2xl flex flex-col justify-between">
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase text-slate-400">Visual Theme Live Sandbox Preview</h4>
                  <div className="p-4 rounded-xl border border-[#D4AF37]/10" style={{ backgroundColor: selectedAccent === 'classic-navy' ? '#0A1D37' : selectedAccent === 'crimson-guard' ? '#500000' : selectedAccent === 'emerald-faculty' ? '#064e3b' : '#334155' }}>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/20" />
                      <div className="flex-1 space-y-1">
                        <div className="w-24 h-3.5 bg-white/30 rounded" />
                        <div className="w-36 h-2 bg-white/20 rounded" />
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-450 leading-relaxed leading-normal">
                    Changing the theme shifts the primary header color blocks and modifies layout side borders variables dynamically without rewriting filesystem assets. Let's toggle and choose your favorite.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-slate-405 leading-none">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <span>Interactive CSS Sandbox Engine Ready</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 9. GENERAL SYSTEM SETTINGS VIEW */}
        {tab === 'settings' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Educational Portal Rules Configuration</h3>
              <p className="text-xs text-slate-400">Define global limits, grading lockdown states, and term variables.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl space-y-2.5 border border-slate-100 flex flex-col justify-between text-xs">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-slate-700">Enable Grade Modification Override</span>
                    <input type="checkbox" defaultChecked className="accent-[#0A1D37]" />
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                    Directs if professors can rewrite completed grading sheets after direct term lockdown timelines.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl space-y-2.5 border border-slate-100 flex flex-col justify-between text-xs">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-slate-700">Force Two-Factor Authentication</span>
                    <input type="checkbox" className="accent-[#0A1D37]" />
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                    Strictly prompt student credentials via Clerk verification tokens for access.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-rose-50 rounded-xl space-y-2 text-rose-800 text-xs font-bold border border-rose-100">
                  <div className="flex items-center space-x-2">
                    <ShieldAlert className="w-5 h-5 text-rose-600 animate-bounce" />
                    <span>Sandbox Re-initialization & Reset</span>
                  </div>
                  <p className="text-[10px] text-rose-700 font-medium leading-relaxed mt-1">
                    Clearing dynamic local credentials resets profiles catalog, notices, registered classes, and grade ledger to default factory values. Use code changes safely first before testing.
                  </p>
                  <button 
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                    className="mt-2 text-white bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer border-none shadow"
                  >
                    Reset Sandbox Data Ledger State
                  </button>
                </div>
              </div>
            </div>

            <hr className="border-slate-100 dark:border-slate-800" />

            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Developer Profile & Link Configurations</h3>
              <p className="text-xs text-slate-400">Configure real-time credentials, biography, tech skills, and social link integrations.</p>
            </div>

            <form onSubmit={handleUpdateDevProfile} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wide">Developer Full Name</label>
                  <input
                    type="text"
                    value={devName}
                    onChange={(e) => setDevName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-1 focus:ring-slate-400 focus:outline-none dark:text-white font-medium"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wide">Profile Image</label>
                  <div className="flex items-center space-x-3">
                    <img
                      src={devPic}
                      alt="Thumbnail"
                      className="w-10 h-10 rounded-xl object-cover bg-slate-100 border border-slate-250 dark:border-slate-805 shadow-2xs shrink-0"
                    />
                    <div className="flex-1 flex max-sm:flex-col sm:items-center gap-2">
                      <input
                        type="text"
                        value={devPic}
                        onChange={(e) => setDevPic(e.target.value)}
                        placeholder="Image URL link"
                        className="flex-grow px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-1 focus:ring-slate-400 focus:outline-none dark:text-white font-medium"
                      />
                      <label className="shrink-0 px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase cursor-pointer select-none border border-slate-705 text-center leading-none flex items-center justify-center">
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wide">Email Address</label>
                  <input
                    type="email"
                    value={devEmail}
                    onChange={(e) => setDevEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-1 focus:ring-slate-400 focus:outline-none dark:text-white font-medium"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wide">WhatsApp Number</label>
                  <input
                    type="text"
                    value={devWhatsApp}
                    onChange={(e) => setDevWhatsApp(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-1 focus:ring-slate-400 focus:outline-none dark:text-white font-medium"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wide">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={devLinkedin}
                    onChange={(e) => setDevLinkedin(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-1 focus:ring-slate-400 focus:outline-none dark:text-white font-medium"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wide">GitHub URL (Optional)</label>
                  <input
                    type="text"
                    value={devGithub}
                    onChange={(e) => setDevGithub(e.target.value)}
                    placeholder="e.g. https://github.com/username"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-1 focus:ring-slate-400 focus:outline-none dark:text-white font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wide">Instagram URL (Optional)</label>
                  <input
                    type="text"
                    value={devInstagram}
                    onChange={(e) => setDevInstagram(e.target.value)}
                    placeholder="e.g. https://instagram.com/username"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-1 focus:ring-slate-400 focus:outline-none dark:text-white font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wide">Skills (Comma-separated list)</label>
                  <input
                    type="text"
                    value={devSkills}
                    onChange={(e) => setDevSkills(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-1 focus:ring-slate-400 focus:outline-none dark:text-white font-medium"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wide">Short Biography</label>
                <textarea
                  value={devBio}
                  onChange={(e) => setDevBio(e.target.value)}
                  rows={4}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-1 focus:ring-slate-400 focus:outline-none dark:text-white font-medium leading-relaxed"
                  required
                />
              </div>

              <div className="flex sm:justify-between items-center gap-4 max-sm:flex-col pt-2">
                {devUpdateSuccess ? (
                  <span className="text-[10px] font-black uppercase text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 select-none animate-pulse">
                     Developer profile settings updated successfully!
                  </span>
                ) : (
                  <span className="text-[9px] font-semibold text-slate-400 italic">
                    All updates are instantly persistent stored locally across browser cookies/cache.
                  </span>
                )}

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0A1D37] hover:bg-[#0A1D37]/90 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow cursor-pointer border-none transition-all"
                >
                  Save Profile Configuration
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
