import React, { useRef, useState, useEffect } from 'react';
import { useProfile } from '../../hooks/useProfile';
import { useApp } from '../../contexts/AppContext';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Printer, GraduationCap, ShieldCheck, CheckCircle2, User, Landmark, HelpCircle, Download, FileImage, Mail, ShieldAlert } from 'lucide-react';

export default function StudentIDCard() {
  const { profile } = useProfile();
  const { currentUser, setCurrentUser, settings } = useApp();
  const cardRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    reg_number: '',
    department_name: '',
    semester: 5,
    avatar_url: '',
    phone: '',
    email: ''
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Sync state initially from the active login context
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || 'Student Name',
        reg_number: profile.reg_number || '2021-CSE-001',
        department_name: profile.department_name || 'Computer Systems Engineering',
        semester: profile.semester || 5,
        avatar_url: profile.avatar_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
        phone: profile.phone || '+92-333-5551212',
        email: profile.email || 'info.qasimusman.cse@gmail.com'
      });
    }
  }, [profile]);

  if (!profile) return null;

  const handlePrint = () => {
    const printContent = cardRef.current?.innerHTML;
    if (printContent) {
      const win = window.open('', '', 'height=600,width=800');
      if (win) {
        win.document.write('<html><head><title>UET ID Card Print</title>');
        win.document.write('<script src="https://cdn.tailwindcss.com"></script>');
        win.document.write('</head><body class="flex items-center justify-center min-h-screen bg-slate-100 font-sans">');
        win.document.write('<div class="w-[340px] p-6 border-l-8 border-l-[rgb(10,29,55)] bg-white shadow-xl rounded-2xl flex flex-col justify-between relative overflow-hidden">');
        win.document.write(printContent);
        win.document.write('</div></body></html>');
        win.document.close();
        setTimeout(() => {
          win.print();
        }, 500);
      }
    }
  };

  const handleDownloadPNG = async () => {
    const element = cardRef.current;
    if (!element) return;
    setIsExporting(true);
    try {
      // Temporarily remove shadow for clean capture
      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: 3,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${formData.name.replace(/\s+/g, '_')}_ID_Card.png`;
      link.click();
    } catch (error) {
      console.error('PNG generation failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPDF = async () => {
    const element = cardRef.current;
    if (!element) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: 3,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Page Background
      pdf.setFillColor(248, 250, 252); // light slate bg
      pdf.rect(0, 0, 210, 297, 'F');
      
      // Header Text
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(10, 29, 55);
      pdf.text(settings?.name || 'UNIVERSITY OF ENGINEERING & TECHNOLOGY', 105, 30, { align: 'center' });
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 116, 139);
      pdf.text('Official student digital verification registration document', 105, 36, { align: 'center' });
      
      // Add ID Card Image
      const imgWidth = 90; // mm sizing
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const x = (210 - imgWidth) / 2;
      const y = 50;
      
      // Draw a subtle border around card spot
      pdf.setDrawColor(226, 232, 240);
      pdf.setFillColor(255, 255, 255);
      pdf.roundedRect(x - 5, y - 5, imgWidth + 10, imgHeight + 10, 3, 3, 'FD');
      
      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      
      // Footer metadata
      pdf.setFontSize(8);
      pdf.setTextColor(148, 163, 184);
      pdf.text(`Generated on ${new Date().toLocaleDateString()} | System Clearance: SECURE`, 105, y + imgHeight + 15, { align: 'center' });
      
      pdf.save(`${formData.name.replace(/\s+/g, '_')}_ID_Card.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar_url: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      const updated = { ...currentUser, ...formData };
      setCurrentUser(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // QR code links dynamically to student profile page
  const qrData = `${window.location.origin}/student/profile?id=${profile.id || 'default'}`;

  // Use values from global settings
  const universityName = settings?.name || 'UET PESHAWAR';
  const universityLogo = settings?.logo_url || 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=100';

  return (
    <div className="space-y-6" id="student-digital-id-card">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Verified Digital ID Card</h2>
          <p className="text-xs text-slate-400">Generate, customize, and print high-resolution secure ID cards to bypass campus security systems.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            onClick={handleDownloadPNG}
            disabled={isExporting}
            className="flex items-center space-x-1 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg cursor-pointer transition-all border border-slate-250 disabled:opacity-50"
          >
            <FileImage className="w-3.5 h-3.5 text-blue-600" />
            <span>Save PNG</span>
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={isExporting}
            className="flex items-center space-x-1 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg cursor-pointer transition-all border border-slate-250 disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>Save PDF</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-4 py-2 bg-[rgb(var(--university-primary))] hover:bg-opacity-95 text-white text-xs font-bold rounded-lg cursor-pointer shadow-sm transition-all text-center"
          >
            <Printer className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Print Physical Card</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* PVC Front-styled Card representation */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-100 dark:bg-slate-950 rounded-3xl border border-slate-150 dark:border-slate-850">
          <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 mb-4 select-none">
            Live Preview (Front side)
          </span>

          <div 
            ref={cardRef}
            className="w-full max-w-[340px] bg-white border-l-8 border-l-[rgb(var(--university-primary))] p-6 shadow-xl rounded-2xl space-y-6 relative overflow-hidden text-slate-800 select-none"
            id="id-card-view-pvc"
          >
            {/* Top Header Card branding */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <img 
                  src={universityLogo}
                  alt="Uni Logo"
                  className="w-6 h-6 object-cover rounded-md"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="block text-xs font-black tracking-tight text-slate-900 truncate max-w-[150px] uppercase leading-none">{universityName}</span>
                  <span className="block text-[7px] tracking-wider uppercase font-extrabold text-[rgb(var(--university-accent))] leading-none mt-1">Institutional Student</span>
                </div>
              </div>
              <span className="text-[8px] font-black tracking-widest text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded uppercase leading-none border border-emerald-100 flex items-center gap-0.5">
                <ShieldCheck className="w-2.5 h-2.5" />
                <span>verified</span>
              </span>
            </div>

            {/* Center Details core */}
            <div className="flex justify-between gap-4 items-center">
              <div className="space-y-2.5 flex-1 overflow-hidden">
                <div>
                  <span className="block text-[8px] uppercase tracking-wider font-extrabold text-slate-400">Full Scholar Name</span>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-tight truncate">{formData.name}</h3>
                </div>
                
                <div>
                  <span className="block text-[8px] uppercase tracking-wider font-extrabold text-slate-400">Registration #</span>
                  <span className="block text-xs font-mono font-bold text-slate-750 leading-none">{formData.reg_number}</span>
                </div>

                <div>
                  <span className="block text-[8px] uppercase tracking-wider font-extrabold text-slate-400">Academic Department</span>
                  <span className="block text-[10px] font-bold text-slate-600 leading-tight truncate">{formData.department_name}</span>
                </div>
              </div>

              {/* Photo */}
              <div className="shrink-0 relative">
                <img 
                  src={formData.avatar_url} 
                  alt={formData.name} 
                  className="w-20 h-20 bg-slate-50 border-2 border-[rgb(var(--university-accent))] rounded-xl object-cover shadow-xs"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Bottom QR Validation */}
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between gap-4">
              <div className="space-y-1 overflow-hidden flex-1">
                <span className="block text-[8px] uppercase tracking-wider font-black text-slate-400 leading-none">Running Classification</span>
                <span className="block text-xs font-black tracking-tight text-slate-800">Semester {formData.semester} (Regular)</span>
                
                {/* Email Address & Clerk UID displayed dynamically */}
                <div className="pt-1 space-y-0.5">
                  <span className="block text-[7px] text-slate-500 truncate leading-none">Email: {formData.email}</span>
                  <span className="block text-[7px] text-slate-450 font-mono truncate leading-none">ID: {profile.user_id || `clerk-${profile.id}`}</span>
                </div>
              </div>

              {/* QR SVG wrapper */}
              <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-xs shrink-0 select-none">
                <QRCodeSVG 
                  value={qrData} 
                  size={48}
                  level="Q"
                  bgColor="#ffffff"
                  fgColor="#1e1b4b"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Live customization panel */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 sm:p-8 rounded-3xl space-y-4 shadow-2xs">
            <div>
              <h3 className="text-base font-black text-slate-800 dark:text-white">Configure & Generate Automatic Card</h3>
              <p className="text-xs text-slate-400">Input your authentic credentials below. Our instant generator syncs with the UET registrar framework.</p>
            </div>

            {saveSuccess && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl flex items-center space-x-2 font-semibold animate-fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>UET digital credentials synchronized successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveCard} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Scholar Full Name</label>
                  <div className="flex items-center space-x-2 text-xs bg-slate-50 dark:bg-slate-950 px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl">
                    <User className="w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-none text-xs focus:outline-none dark:text-white font-medium" 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Registration Number</label>
                  <div className="flex items-center space-x-2 text-xs bg-slate-50 dark:bg-slate-950 px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl">
                    <Landmark className="w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 2021-CSE-001"
                      value={formData.reg_number}
                      onChange={(e) => setFormData({ ...formData, reg_number: e.target.value })}
                      className="w-full bg-transparent border-none text-xs focus:outline-none dark:text-white font-mono font-bold" 
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Academic Department</label>
                  <select
                    value={formData.department_name}
                    onChange={(e) => setFormData({ ...formData, department_name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-xs px-3.5 py-2.5 border border-slate-200 dark:border-slate-850 dark:text-white rounded-xl focus:outline-none font-medium"
                  >
                    <option value="Computer Systems Engineering">Computer Systems Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Running Semester</label>
                  <select
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-xs px-3.5 py-2.5 border border-slate-200 dark:border-slate-850 dark:text-white rounded-xl focus:outline-none font-medium"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Contact Email Address</label>
                  <div className="flex items-center space-x-2 text-xs bg-slate-50 dark:bg-slate-950 px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-none text-xs focus:outline-none dark:text-white font-medium" 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Helpline Contact Phone</label>
                  <div className="flex items-center space-x-2 text-xs bg-slate-50 dark:bg-slate-950 px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl">
                    <User className="w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-transparent border-none text-xs focus:outline-none dark:text-white font-medium" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">ID Scholar Photo</label>
                <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-850">
                  <img
                    src={formData.avatar_url}
                    alt="Thumbnail Preview"
                    className="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-200 shadow-2xs shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 flex max-sm:flex-col sm:items-center gap-2">
                    <input
                      type="text"
                      value={formData.avatar_url}
                      onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                      placeholder="Image URL link"
                      className="flex-grow px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none dark:text-white font-medium"
                    />
                    <label className="shrink-0 px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase cursor-pointer select-none leading-none flex items-center justify-center">
                      Upload Photo
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

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0a1d37] hover:bg-[#0a1d37]/90 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow cursor-pointer transition-all border-none"
                >
                  Save ID Card Credentials
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
