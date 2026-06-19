import React from 'react';
import { uetDB } from '../../data/mockData';
import { useProfile } from '../../hooks/useProfile';
import { useApp } from '../../contexts/AppContext';
import { EmptyState } from '../../components/shared/EmptyState';
import { StatCard } from '../../components/shared/StatCard';
import { UserCheck, AlertTriangle, ShieldCheck, CheckSquare, Calendar, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function StudentAttendance() {
  const { profile } = useProfile();
  const { settings } = useApp();

  if (!profile) return null;

  const attendance = uetDB.attendance.filter(a => a.student_id === profile.id);

  // Math summary
  const totalLectures = attendance.reduce((sum, current) => sum + current.total_lectures, 0);
  const attendedLectures = attendance.reduce((sum, current) => sum + current.attended_lectures, 0);
  const overallPercentage = totalLectures > 0 ? ((attendedLectures / totalLectures) * 100).toFixed(1) : '93.5';

  // Find if any falls below HEC 75%
  const lowAttendanceList = attendance.filter(a => a.percentage < 75);

  const downloadAttendancePDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Header
    const universityTitle = settings?.name?.toUpperCase() || 'UNIVERSITY OF ENGINEERING & TECHNOLOGY';
    pdf.setFillColor(10, 29, 55); // Primary color (Slate/Navy)
    pdf.rect(0, 0, 210, 42, 'F');
    
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(15);
    pdf.setTextColor(255, 255, 255);
    pdf.text(universityTitle, 105, 16, { align: 'center' });
    
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(230, 235, 245);
    pdf.text('OFFICIAL STUDENT ATTENDANCE REPORT TRANSCRIPT', 105, 24, { align: 'center' });
    pdf.text(`ACADEMIC TERM LOG SHEETS - FALL 2026 SESSION`, 105, 30, { align: 'center' });
    pdf.text(`VERIFICATION SECURITY CLEARANCE: VERIFIED`, 105, 36, { align: 'center' });
    
    // Student Metadata section
    pdf.setFillColor(245, 247, 250);
    pdf.roundedRect(15, 52, 180, 28, 2, 2, 'F');
    
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(30, 41, 59);
    pdf.text('Active Scholar Credentials:', 20, 59);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Scholar Name: ${profile.name}`, 20, 65);
    pdf.text(`Reg Number: ${profile.reg_number}`, 20, 71);
    
    pdf.text(`Department: ${profile.department_name}`, 110, 65);
    pdf.text(`Log Generated On: ${new Date().toLocaleDateString()}`, 110, 71);
    
    // Overall Stats Box
    pdf.setFillColor(241, 245, 249);
    pdf.rect(15, 86, 180, 16, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.setTextColor(20, 30, 55);
    pdf.text(`Overall Verified Attendance Ratio:`, 22, 96);
    pdf.text(`${overallPercentage}%`, 85, 96);
    
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100, 110, 130);
    pdf.text(`Class Lectures Attended: ${attendedLectures} / ${totalLectures} Coordinated Sessions`, 115, 96);
    
    // Table Headers
    pdf.setFillColor(51, 65, 85);
    pdf.rect(15, 110, 180, 8, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(255, 255, 255);
    pdf.text('Course Catalog Code', 18, 115);
    pdf.text('Registered Subject Name', 55, 115);
    pdf.text('Attended Lectures', 125, 115);
    pdf.text('Total Lectures', 155, 115);
    pdf.text('Ratio (%)', 180, 115);
    
    pdf.setTextColor(30, 41, 59);
    pdf.setFont('helvetica', 'normal');
    let startY = 126;
    
    attendance.forEach((c) => {
      const isCritical = c.percentage < 75;
      pdf.setFont('helvetica', 'bold');
      if (isCritical) {
        pdf.setTextColor(220, 38, 38); // Highlight red
      } else {
        pdf.setTextColor(30, 41, 59);
      }
      pdf.text(c.course_code || '', 18, startY);
      pdf.setFont('helvetica', 'normal');
      pdf.text(c.course_name.substring(0, 36) || '', 55, startY);
      
      pdf.text(String(c.attended_lectures), 133, startY, { align: 'center' });
      pdf.text(String(c.total_lectures), 162, startY, { align: 'center' });
      
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${c.percentage}%`, 180, startY);
      pdf.setTextColor(30, 41, 59); // Reset
      
      pdf.setDrawColor(226, 232, 240);
      pdf.line(15, startY + 4, 195, startY + 4);
      
      startY += 10;
    });
    
    // Status warning if below 75%
    if (lowAttendanceList.length > 0) {
      pdf.setFillColor(254, 242, 242);
      pdf.rect(15, startY + 1, 180, 14, 'F');
      pdf.setDrawColor(248, 113, 113);
      pdf.roundedRect(15, startY + 1, 180, 14, 1, 1, 'D');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor(220, 38, 38);
      pdf.text('HEC COMPLIANCE WARNING: MINIMUM 75% ATTENDANCE REQUIRED FOR EXAMINATIONS STATUS.', 20, startY + 7);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Attendance is low in: ${lowAttendanceList.map(i => i.course_name).join(', ')}.`, 20, startY + 11);
    }
    
    // Signature
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(8);
    pdf.setTextColor(100, 116, 139);
    pdf.text('Class Coordinator / Advisor', 35, startY + 36);
    pdf.text('Academic Registrar Office', 145, startY + 36);
    pdf.setDrawColor(180, 180, 180);
    pdf.line(25, startY + 31, 80, startY + 31);
    pdf.line(130, startY + 31, 185, startY + 31);
    
    // Bottom Disclaimer
    pdf.setFontSize(7);
    pdf.setFont('helvetica', 'italic');
    pdf.setTextColor(148, 163, 184);
    pdf.text('This is an automatic digitised academic verification statement issued by UET Registrar Office. Non-repudiable and valid across agencies.', 105, 282, { align: 'center' });
    
    pdf.save(`${profile.name.replace(/\s+/g, '_')}_Attendance_Report.pdf`);
  };

  return (
    <div className="space-y-6" id="student-attendance-view">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Lectures Attendance Tracker</h2>
          <p className="text-xs text-slate-400">Review your daily class percentages verified by department class teachers. HEC demands minimum 75%.</p>
        </div>

        {attendance.length > 0 && (
          <button
            onClick={downloadAttendancePDF}
            className="flex items-center space-x-1.5 px-4 py-2 bg-[rgb(var(--university-primary))] hover:bg-opacity-95 text-white text-xs font-bold rounded-lg cursor-pointer shadow-xs transition-all shrink-0 text-center uppercase tracking-wider"
          >
            <Download className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>Save Attendance Report PDF</span>
          </button>
        )}
      </div>

      {/* Warning banner if attendance is low */}
      {lowAttendanceList.length > 0 && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-400 rounded-xl flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
          <div className="text-xs space-y-1">
            <h4 className="font-extrabold uppercase tracking-tight">Attendance Warning</h4>
            <p className="leading-relaxed">
              Your attendance statistics in <span className="font-bold">{lowAttendanceList.map(item => item.course_name).join(', ')}</span> has fallen below 75%. You might be restricted by registry officers from appearing in upcoming examinations. Immediately contact your class HOD.
            </p>
          </div>
        </div>
      )}

      {/* Multi summary widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <StatCard
          title="Overall Attendance"
          value={`${overallPercentage}%`}
          icon={<UserCheck className="w-5 h-5 text-emerald-500" />}
          description="Average across registered subjects"
          color="green"
        />
        <StatCard
          title="Attended Lectures"
          value={attendedLectures}
          icon={<CheckSquare className="w-5 h-5 text-indigo-500" />}
          color="primary"
        />
        <StatCard
          title="Total Scheduled Lectures"
          value={totalLectures}
          icon={<Calendar className="w-5 h-5 text-slate-400" />}
          color="slate"
        />
      </div>

      {/* Main detailed record sheet Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-850 dark:text-white mb-4">Verification Records Sheet (Fall 2026 Shift)</h3>

        {attendance.length === 0 ? (
          <EmptyState 
            title="Empty Attendance Logging" 
            description="The registrars have not published initial logs or registered class lectures yet." 
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-440 text-[9px] uppercase font-black select-none tracking-wider">
                  <th className="py-3 px-2">Course Code</th>
                  <th className="py-3 px-2 text-left">Registered Class Name</th>
                  <th className="py-2 px-2 text-center">Attended / Total</th>
                  <th className="py-3 px-2 text-right">Percentage Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-850 text-slate-705 dark:text-slate-350">
                {attendance.map((c) => {
                  const isCritical = c.percentage < 75;
                  return (
                    <tr 
                      key={c.id} 
                      className={`hover:bg-slate-50/50 dark:hover:bg-slate-855/35 transition-colors ${isCritical ? 'bg-rose-500/5 hover:bg-rose-500/10' : ''}`}
                    >
                      <td className="py-3 px-2 font-mono font-bold text-slate-800 dark:text-white leading-none">
                        {c.course_code}
                      </td>
                      <td className="py-3 px-2 font-bold text-slate-800 dark:text-white text-left">{c.course_name}</td>
                      <td className="py-3 px-2 text-center font-mono font-bold">{c.attended_lectures} / {c.total_lectures}</td>
                      <td className="py-3 px-2 text-right">
                        <span className={`inline-block px-2.5 py-1 rounded font-mono font-extrabold text-[10px] leading-none ${
                          isCritical 
                            ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/20' 
                            : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20'
                        }`}>
                          {c.percentage}%
                        </span>
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
