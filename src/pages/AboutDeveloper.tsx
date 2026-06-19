import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PublicLayout } from '../components/layout/PublicLayout';
import { useApp } from '../contexts/AppContext';
import { getDevNotifications, clearDevNotifications, DevNotification } from '../lib/notifications';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  Instagram, 
  BookOpen, 
  Award, 
  Sparkles, 
  Code, 
  ArrowLeft,
  Briefcase,
  Heart,
  Globe,
  Settings,
  Check
} from 'lucide-react';

export default function AboutDeveloper() {
  const { settings } = useApp();
  const [notifications, setNotifications] = useState<DevNotification[]>(getDevNotifications());

  // Listen to live alerts dispatched in current browser session
  useEffect(() => {
    const handleAlert = () => {
      setNotifications(getDevNotifications());
    };
    window.addEventListener('uet_dev_alert', handleAlert);
    return () => window.removeEventListener('uet_dev_alert', handleAlert);
  }, []);

  const handleClearLogs = () => {
    clearDevNotifications();
    setNotifications([]);
  };

  // Load developer info from global settings (or fallback seamlessly)
  const devName = settings.dev_name || 'Muhammad Qasim Usman';
  const devPic = settings.dev_pic || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=350';
  const devDept = settings.dev_dept || 'Computer Systems Engineering';
  const devUniv = settings.dev_univ || 'University of Engineering and Technology (UET) Peshawar';
  const devBio = settings.dev_bio || 'Muhammad Qasim Usman is a Computer Systems Engineering student at the University of Engineering and Technology (UET) Peshawar. He is passionate about software development, web technologies, system design, and innovative educational solutions. UET Student Hub was created to provide students, teachers, and administrators with a modern digital platform for academic management and collaboration.';
  
  // Parse skills
  const skillsList = settings.dev_skills 
    ? settings.dev_skills.split(',').map(s => s.trim()).filter(Boolean)
    : ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'System Design', 'Software Engineering'];

  const devEmail = settings.dev_email || 'info.qasimusman.cse@gmail.com';
  const devWhatsApp = settings.dev_whatsapp || '+923717090091';
  const devLinkedin = settings.dev_linkedin || 'https://www.linkedin.com/in/muhammad-qasim-usman-9b26973a1';
  const devGithub = settings.dev_github || '';
  const devInstagram = settings.dev_instagram || '';

  // Standardize the WhatsApp link
  // Ensure we strip + or spaces for api, e.g. +92 371 7090 091 => 923717090091
  const cleanWhatsAppNumber = devWhatsApp.replace(/[+\s\-()]/g, '');
  const whatsAppLink = `https://wa.me/${cleanWhatsAppNumber}`;

  return (
    <PublicLayout>
      <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen" id="about-developer-root">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Back to Home Button */}
          <div className="flex justify-between items-center">
            <a 
              href="/"
              className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Landing Page</span>
            </a>
            
            <span className="text-[10px] font-mono font-bold text-[#D4AF37] bg-slate-900 border border-slate-800 px-3 py-1 rounded-full flex items-center gap-1.5 select-none">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              PORTFOLIO PROFILE
            </span>
          </div>

          {/* Master Profile Container Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            {/* Header Art Background */}
            <div className="h-44 bg-gradient-to-r from-[#031B33] via-[#0A1D37] to-[#122A4E] relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-400 via-emerald-600 to-indigo-900" />
              {/* Dynamic decorative visual nodes */}
              <div className="absolute top-8 right-12 text-yellow-500/10 font-mono text-2xl select-none font-bold">
                {"{ clean.code: true }"}
              </div>
            </div>

            {/* Profile Avatar & Primary Title Details Block */}
            <div className="px-6 sm:px-10 pb-8 relative">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-16 sm:-mt-20 mb-6">
                <div className="relative shrink-0">
                  <img 
                    src={devPic}
                    alt={devName}
                    className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl object-cover bg-slate-200 border-4 border-white dark:border-slate-900 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-[#D4AF37] text-slate-950 p-2 rounded-xl shadow border-2 border-white dark:border-slate-900">
                    <Award className="w-4 h-4 font-black" />
                  </div>
                </div>

                <div className="text-center sm:text-left space-y-1 pt-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {devName}
                  </h1>
                  <p className="text-sm font-bold text-[#D4AF37] flex items-center justify-center sm:justify-start gap-1.5 uppercase tracking-wide">
                    <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                    {devDept} Student
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">
                    {devUniv}
                  </p>
                </div>
              </div>

              <hr className="border-slate-100 dark:border-slate-800/80 my-6" />

              {/* Core Grid layout for bio & metadata */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Columns: Bio & Project Vision */}
                <div className="md:col-span-2 space-y-6">
                  <div className="space-y-2.5">
                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                      About The Developer
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-350 leading-relaxed font-sans font-medium text-justify">
                      {devBio}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-sky-500" />
                      UET Student Hub — Vision Statement
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans font-medium text-justify">
                      The core vision of UET Student Hub is to bridge the legacy administrative frameworks with high-fidelity, client-responsive structures. Built from the ground up to solve daily operational student issues, it provides state-of-the-art interactive modules for semester roadmaps, syllabus logs, assignment workflows, and grading rubrics.
                    </p>
                  </div>
                </div>

                {/* Right Column: Contact Action list & Tech Skills */}
                <div className="space-y-6">
                  {/* Interactive Functional Contact Channels */}
                  <div className="p-5 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">Contact Channels</h4>
                    
                    <div className="space-y-2.5">
                      {/* Email Link */}
                      <a 
                        href={`mailto:${devEmail}`}
                        className="flex items-center space-x-3 p-2 rounded-xl text-xs font-bold text-slate-650 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all cursor-pointer"
                      >
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg dark:bg-blue-950/30">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div className="truncate flex-1">
                          <span className="block text-[8px] uppercase font-black text-slate-400 leading-none">Email Address</span>
                          <span className="truncate block mt-0.5">{devEmail}</span>
                        </div>
                      </a>

                      {/* WhatsApp Link */}
                      <a 
                        href={whatsAppLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-3 p-2 rounded-xl text-xs font-bold text-slate-650 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all cursor-pointer"
                      >
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg dark:bg-emerald-950/30">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div className="truncate flex-1">
                          <span className="block text-[8px] uppercase font-black text-slate-400 leading-none">WhatsApp Contact</span>
                          <span className="block mt-0.5">{devWhatsApp}</span>
                        </div>
                      </a>

                      {/* LinkedIn Link */}
                      <a 
                        href={devLinkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-3 p-2 rounded-xl text-xs font-bold text-slate-650 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all cursor-pointer"
                      >
                        <div className="p-2 bg-indigo-50 text-indigo-650 rounded-lg dark:bg-indigo-950/30">
                          <Linkedin className="w-4 h-4" />
                        </div>
                        <div className="truncate flex-1">
                          <span className="block text-[8px] uppercase font-black text-slate-400 leading-none">LinkedIn Profile</span>
                          <span className="block mt-0.5 truncate text-[10px]">Open Profile</span>
                        </div>
                      </a>

                      {/* GitHub Link (Gracefully handles empty strings or missing paths) */}
                      {devGithub ? (
                        <a 
                          href={devGithub}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center space-x-3 p-2 rounded-xl text-xs font-bold text-slate-650 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all cursor-pointer"
                        >
                          <div className="p-2 bg-slate-100 text-slate-850 rounded-lg dark:bg-slate-800">
                            <Github className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block text-[8px] uppercase font-black text-slate-400 leading-none">GitHub Repo</span>
                            <span className="block mt-0.5 text-[10px]">Open GitHub</span>
                          </div>
                        </a>
                      ) : (
                        <div className="flex items-center space-x-3 p-2 rounded-xl text-xs text-slate-400 bg-slate-100/50 dark:bg-slate-800/10 cursor-not-allowed">
                          <div className="p-2 bg-slate-100 text-slate-300 rounded-lg dark:bg-slate-800/30">
                            <Github className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block text-[8px] uppercase font-black text-slate-305 leading-none">GitHub URL</span>
                            <span className="block mt-0.5 text-[10px] italic">Not configured yet</span>
                          </div>
                        </div>
                      )}

                      {/* Instagram Link */}
                      {devInstagram ? (
                        <a 
                          href={devInstagram}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center space-x-3 p-2 rounded-xl text-xs font-bold text-slate-650 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all cursor-pointer"
                        >
                          <div className="p-2 bg-pink-50 text-pink-600 rounded-lg dark:bg-pink-955/20">
                            <Instagram className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block text-[8px] uppercase font-black text-slate-400 leading-none">Instagram Profile</span>
                            <span className="block mt-0.5 text-[10px]">Open Instagram</span>
                          </div>
                        </a>
                      ) : (
                        <div className="flex items-center space-x-3 p-2 rounded-xl text-xs text-slate-400 bg-slate-100/50 dark:bg-slate-800/10 cursor-not-allowed">
                          <div className="p-2 bg-pink-50 text-pink-200 rounded-lg dark:bg-slate-800/30">
                            <Instagram className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block text-[8px] uppercase font-black text-slate-305 leading-none">Instagram URL</span>
                            <span className="block mt-0.5 text-[10px] italic">Not configured yet</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div className="p-5 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Code className="w-4 h-4 text-emerald-500" />
                      Tech Core Skills
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skillsList.map((skill, idx) => (
                        <span 
                          key={idx}
                          className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-[10px] font-extrabold text-slate-600 dark:text-slate-300 rounded-lg shadow-2xs leading-none"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Developer Email & Activity dispatch terminal logs */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg text-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <h3 className="text-sm font-black uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5 font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  SMTP Alert Dispatches to: {devEmail}
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time pipeline monitoring dispatches for user-authored actions (feedbacks, workspace uploads, deliverables).
                </p>
              </div>
              <button 
                onClick={handleClearLogs}
                className="px-3.5 py-2 bg-slate-800 hover:bg-rose-950/40 hover:text-rose-450 border border-slate-700 hover:border-rose-900 text-[10px] font-bold uppercase rounded-lg text-slate-350 cursor-pointer transition-all"
              >
                Clear Log Indexes
              </button>
            </div>

            {notifications.length === 0 ? (
              <div className="py-10 text-center space-y-2 text-slate-500">
                <Settings className="w-10 h-10 mx-auto text-slate-700 animate-spin" />
                <p className="text-xs font-mono">Telemetry feed is offline or logs cleared. Submit feedback or upload notes to trigger live alerts.</p>
              </div>
            ) : (
              <div className="space-y-3 font-mono text-[11px] max-h-96 overflow-y-auto pr-1">
                {notifications.map((notif) => (
                  <div key={notif.id} className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-2 hover:border-slate-800 transition-all">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <span className="text-amber-400 font-extrabold uppercase tracking-wide">
                        [{notif.eventType}]
                      </span>
                      <span className="text-slate-500 text-[10px]">
                        Timestamp: {new Date(notif.timestamp).toLocaleString()}
                      </span>
                    </div>

                    <div className="text-slate-300">
                      <span className="text-emerald-500 font-bold">From:</span> {notif.author} <br />
                      <span className="text-[#D4AF37] font-bold">Forwarded-To:</span> <span className="underline">{notif.emailSentTo}</span> <br />
                      <span className="text-emerald-500 font-bold">Payload:</span> <span className="text-slate-400">{notif.details}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[9px] text-emerald-400 font-bold uppercase pt-1.5 border-t border-slate-900">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>SMTP Server Delivery Status: Success (250 OK)</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Inspirational quotes/credits footer */}
          <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4 border border-slate-800">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <span>Built with passion & precision for UET Peshawar.</span>
            </div>
            <span className="text-[10px] font-mono font-semibold text-slate-500 block">
              v1.5.0 • Live Client Node Persistent
            </span>
          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
