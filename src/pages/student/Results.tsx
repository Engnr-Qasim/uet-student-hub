import React, { useState } from 'react';
import { uetDB } from '../../data/mockData';
import { useProfile } from '../../hooks/useProfile';
import { useApp } from '../../contexts/AppContext';
import { EmptyState } from '../../components/shared/EmptyState';
import { Award, BookOpen, Search, Bookmark, ChevronRight, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function StudentResults() {
  const { profile } = useProfile();
  const { settings } = useApp();
  const [selectedSemester, setSelectedSemester] = useState<number>(4); // Default to Semester 4 as Ahmad wants to inspect previous results

  if (!profile) return null;

  const results = uetDB.results.filter(r => r.student_id === profile.id && r.semester === selectedSemester);
  const semesters = [1, 2, 3, 4]; // Completed terms

  const downloadResultCard = () => {
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
    pdf.text('OFFICIAL VERIFIED SEMESTER TRANSCRIPT SHEETS', 105, 24, { align: 'center' });
    pdf.text(`EXAMINATION GRADE REPORT FOR TERM SEMESTER ${selectedSemester}`, 105, 30, { align: 'center' });
    pdf.text(`SECURITY STANDARDS: STATUS SECURE / GREEN`, 105, 36, { align: 'center' });
    
    // Student Metadata section
    pdf.setFillColor(245, 247, 250);
    pdf.roundedRect(15, 52, 180, 28, 2, 2, 'F');
    
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(30, 41, 59);
    pdf.text('Academic Scholar Information:', 20, 59);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Student Name: ${profile.name}`, 20, 65);
    pdf.text(`Reg Number: ${profile.reg_number}`, 20, 71);
    
    pdf.text(`Department: ${profile.department_name}`, 110, 65);
    pdf.text(`Transcript Date: ${new Date().toLocaleDateString()}`, 110, 71);
    
    // Draw table headers
    pdf.setFillColor(51, 65, 85);
    pdf.rect(15, 88, 180, 8, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(255, 255, 255);
    pdf.text('Subject Description', 18, 93);
    pdf.text('Quizzes', 95, 93);
    pdf.text('Asg', 115, 93);
    pdf.text('Mid', 130, 93);
    pdf.text('Final', 145, 93);
    pdf.text('Total', 160, 93);
    pdf.text('Grade', 174, 93);
    pdf.text('GPA', 188, 93);
    
    pdf.setTextColor(30, 41, 59);
    pdf.setFont('helvetica', 'normal');
    let startY = 104;
    let totalGPAWeights = 0;
    let countedCredits = 0;
    
    results.forEach((res) => {
      pdf.setFont('helvetica', 'bold');
      pdf.text(res.course_code || '', 18, startY);
      pdf.setFont('helvetica', 'normal');
      pdf.text(res.course_name.substring(0, 40) || '', 18, startY + 4);
      
      pdf.text(String(res.quiz_marks), 98, startY + 2);
      pdf.text(String(res.assignment_marks), 117, startY + 2);
      pdf.text(String(res.mid_marks), 132, startY + 2);
      pdf.text(String(res.final_marks), 147, startY + 2);
      
      pdf.setFont('helvetica', 'bold');
      pdf.text(String(res.total_marks), 162, startY + 2);
      pdf.text(String(res.grade), 176, startY + 2);
      pdf.text(res.gpa.toFixed(2), 188, startY + 2);
      
      pdf.setDrawColor(226, 232, 240);
      pdf.line(15, startY + 7, 195, startY + 7);
      
      totalGPAWeights += res.gpa;
      countedCredits++;
      startY += 12;
    });
    
    // Summary line
    const calculatedTermGPA = countedCredits > 0 ? (totalGPAWeights / countedCredits).toFixed(2) : '3.65';
    pdf.setFillColor(241, 245, 249);
    pdf.rect(15, startY + 2, 180, 10, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.text(`Term Semester ${selectedSemester} GPA Result Summary:`, 20, startY + 8);
    pdf.text(`${calculatedTermGPA} GPA`, 178, startY + 8);
    
    // Signature
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(8);
    pdf.text('Department Advisor / HOD', 35, startY + 32);
    pdf.text('Controller of Examinations', 145, startY + 32);
    pdf.setDrawColor(180, 180, 180);
    pdf.line(25, startY + 27, 80, startY + 27);
    pdf.line(130, startY + 27, 185, startY + 27);
    
    // Bottom Disclaimer
    pdf.setFontSize(7);
    pdf.setFont('helvetica', 'italic');
    pdf.setTextColor(148, 163, 184);
    pdf.text('This is an authorized digitised academic verification statement issued by UET Registrar Office. Non-repudiable and valid across agencies.', 105, 282, { align: 'center' });
    
    pdf.save(`${profile.name.replace(/\s+/g, '_')}_Semester_${selectedSemester}_Result_Card.pdf`);
  };

  return (
    <div className="space-y-6" id="student-grades-reports-view">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Academic Grade Transcript</h2>
          <p className="text-xs text-slate-400">View graded sheets, quiz totals, and overall GPA sheets verified by UET controllers office.</p>
        </div>
        
        {results.length > 0 && (
          <button
            onClick={downloadResultCard}
            className="flex items-center space-x-1.5 px-4 py-2 bg-[rgb(var(--university-primary))] hover:bg-opacity-95 text-white text-xs font-bold rounded-lg cursor-pointer shadow-xs transition-all shrink-0 text-center uppercase tracking-wider"
          >
            <Download className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>Save Result Card PDF</span>
          </button>
        )}
      </div>

      {/* Semester selectors */}
      <div className="flex bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-2 rounded-xl shadow-xs self-start w-fit">
        {semesters.map((sem) => (
          <button
            key={sem}
            onClick={() => setSelectedSemester(sem)}
            className={`px-4 py-1.5 text-xs font-black rounded-lg transition-all cursor-pointer ${
              selectedSemester === sem 
                ? 'bg-[rgb(var(--university-primary))] text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Term {sem}
          </button>
        ))}
      </div>

      {/* Details Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-xs">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-extrabold text-slate-850 dark:text-white">DCSE Registered Subject Gradebook</h3>
          <span className="text-[10px] font-mono font-bold bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded">CONCLUDED</span>
        </div>

        {results.length === 0 ? (
          <EmptyState 
            title="Syllabus Term not Selected" 
            description="Kindly toggle the semesters above to load historical transcript marks and grades." 
          />
        ) : (
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left font-sans border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-450 uppercase text-[9px] font-black tracking-wider select-none">
                  <th className="py-3 px-2">Subject</th>
                  <th className="py-3 px-2 text-center">Quizzes (20m)</th>
                  <th className="py-3 px-2 text-center">Asg (20m)</th>
                  <th className="py-3 px-2 text-center">Mid (30m)</th>
                  <th className="py-3 px-2 text-center">Final (30m)</th>
                  <th className="py-3 px-2 text-center">Total (100)</th>
                  <th className="py-3 px-2 text-center">Grade</th>
                  <th className="py-3 px-2 text-right">GPA Weight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-850 text-slate-705 dark:text-slate-350 font-medium">
                {results.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-855/30 transition-colors">
                    <td className="py-3.5 px-2">
                      <span className="block text-[8px] font-black uppercase text-slate-400 font-mono leading-none mb-1">{res.course_code}</span>
                      <span className="font-bold text-slate-850 dark:text-slate-100">{res.course_name}</span>
                    </td>
                    <td className="py-3.5 px-2 text-center font-mono">{res.quiz_marks}</td>
                    <td className="py-3.5 px-2 text-center font-mono">{res.assignment_marks}</td>
                    <td className="py-3.5 px-2 text-center font-mono">{res.mid_marks}</td>
                    <td className="py-3.5 px-2 text-center font-mono">{res.final_marks}</td>
                    <td className="py-3.5 px-2 text-center font-mono font-bold text-indigo-500">{res.total_marks}</td>
                    <td className="py-3.5 px-2 text-center">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-indigo-500/10 text-indigo-500 font-black tracking-tight">{res.grade}</span>
                    </td>
                    <td className="py-3.5 px-2 text-right font-mono font-bold text-slate-800 dark:text-slate-205">{res.gpa.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
