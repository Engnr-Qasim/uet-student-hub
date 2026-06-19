import React from 'react';
import { GraduationCap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-850 text-slate-400 py-12" id="public-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-yellow-500 rounded-lg text-slate-950 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 font-bold" />
              </div>
              <span className="text-white font-extrabold text-base tracking-tight">UET Student Hub</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              The premium management portal for University of Engineering & Technology. Empowers undergraduate academics, assignments, digital records, grading, and careers through state-of-the-art interactive portals.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Academics</h4>
            <ul className="text-xs space-y-2">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Computer Systems Engineering (CSE)</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Electrical Engineering</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Mechanical Engineering</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Civil Engineering</a></li>
            </ul>
          </div>

          {/* Guidelines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Support Channels</h4>
            <ul className="text-xs space-y-2">
              <li><a href="#contact" className="hover:text-amber-400 transition-colors">DCSE Admin Office</a></li>
              <li><a href="#feedback" className="hover:text-amber-400 transition-colors">Student Grievances Feedback</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">UET Main Website</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} University of Engineering and Technology (UET). All rights reserved.</p>
          <div className="mt-4 md:mt-0 text-center md:text-right space-y-0.5">
            <p className="font-extrabold text-slate-400">Developed By <span className="text-yellow-500 font-bold">Muhammad Qasim Usman</span></p>
            <p className="text-[10px] text-slate-500">Computer Systems Engineering</p>
            <p className="text-[10px] text-slate-500">UET Peshawar</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
