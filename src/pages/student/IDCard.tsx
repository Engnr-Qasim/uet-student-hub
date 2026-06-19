import React, { useRef } from 'react';
import { useProfile } from '../../hooks/useProfile';
import { QRCodeSVG } from 'qrcode.react';
import { Printer, Download, GraduationCap, ShieldCheck } from 'lucide-react';

export default function StudentIDCard() {
  const { profile } = useProfile();
  const cardRef = useRef<HTMLDivElement>(null);

  if (!profile) return null;

  const handlePrint = () => {
    const printContent = cardRef.current?.innerHTML;
    const originalBody = document.body.innerHTML;

    if (printContent) {
      const win = window.open('', '', 'height=600,width=800');
      if (win) {
        win.document.write('<html><head><title>UET ID Card Print</title>');
        // inject tailwind CSS for beautiful layout inside printable frame
        win.document.write('<script src="https://cdn.tailwindcss.com"></script>');
        win.document.write('</head><body class="flex items-center justify-center min-h-screen bg-slate-100 font-sans">');
        win.document.write('<div class="w-96 p-6 border-l-8 border-l-indigo-900 bg-white shadow-xl rounded-2xl flex flex-col justify-between relative overflow-hidden">');
        win.document.write(printContent);
        win.document.write('</div></body></html>');
        win.document.close();
        setTimeout(() => {
          win.print();
        }, 500);
      }
    }
  };

  const qrData = JSON.stringify({
    name: profile.name,
    reg: profile.reg_number || '2021-CSE-001',
    dept: profile.department_name || 'CSE',
    semester: profile.semester || 5
  });

  return (
    <div className="space-y-6" id="student-digital-id-card">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Verified Digital ID Card</h2>
          <p className="text-xs text-slate-400">Generate high-resolution printable ID cards containing security QR tokens to bypass gates.</p>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center space-x-1.5 px-4 py-2 bg-[rgb(var(--university-primary))] hover:bg-opacity-95 text-white text-xs font-bold rounded-lg cursor-pointer shadow-sm transition-all text-center shrink-0"
        >
          <Printer className="w-4 h-4 text-amber-400" />
          <span>Print Physical Card</span>
        </button>
      </div>

      <div className="flex items-center justify-center p-4 sm:p-12 bg-slate-100 dark:bg-slate-950 rounded-3xl border border-slate-150 dark:border-slate-850">
        
        {/* PVC Front-styled Card representation */}
        <div 
          ref={cardRef}
          className="w-full max-w-[360px] bg-white border-l-8 border-l-[rgb(var(--university-primary))] p-6 sm:p-7 shadow-xl rounded-2xl space-y-6 relative overflow-hidden text-slate-800"
          id="id-card-view-pvc"
        >
          {/* Top Header Card branding */}
          <div className="flex justify-between items-start border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-[rgb(var(--university-primary))] rounded-lg text-white">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-black tracking-tight text-slate-900">UET PORTAL</span>
                <span className="block text-[8px] tracking-wider uppercase font-extrabold text-[rgb(var(--university-accent))] leading-none">Security system</span>
              </div>
            </div>
            <span className="text-[9px] font-black tracking-widest text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded uppercase leading-none border border-emerald-100">
              verified
            </span>
          </div>

          {/* Center Details core */}
          <div className="flex justify-between gap-4 items-center">
            <div className="space-y-3 flex-1 overflow-hidden">
              <div>
                <span className="block text-[8px] uppercase tracking-wider font-extrabold text-slate-400">Full Scholar Name</span>
                <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-tight truncate">{profile.name}</h3>
              </div>
              
              <div>
                <span className="block text-[8px] uppercase tracking-wider font-extrabold text-slate-400">Registration #</span>
                <span className="block text-xs font-mono font-bold text-slate-705 leading-none">{profile.reg_number || '2021-CSE-001'}</span>
              </div>

              <div>
                <span className="block text-[8px] uppercase tracking-wider font-extrabold text-slate-400">Academic Department</span>
                <span className="block text-[10px] font-bold text-slate-650 leading-tight truncate">{profile.department_name || 'DCSE Computer Systems'}</span>
              </div>
            </div>

            {/* Photo */}
            <div className="shrink-0 relative">
              <img 
                src={profile.avatar_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6'} 
                alt={profile.name} 
                className="w-20 h-20 bg-slate-50 border-2 border-[rgb(var(--university-accent))] rounded-xl object-cover shadow-xs"
              />
            </div>
          </div>

          {/* Bottom QR Validation */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="block text-[8px] uppercase tracking-wider font-black text-slate-400 leading-none">Academic Roll Shift</span>
              <span className="block text-xs font-black tracking-tight text-slate-800">Semester {profile.semester || 5} (Regular)</span>
              <span className="inline-flex items-center space-x-1 mt-1 text-[8px] text-slate-450 font-semibold leading-none">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>HEC Approved Student</span>
              </span>
            </div>

            {/* QR SVG wrapper */}
            <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-xs shrink-0 select-none">
              <QRCodeSVG 
                value={qrData} 
                size={54}
                level="P"
                bgColor="#ffffff"
                fgColor="#1e1b4b"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
