import React, { useState } from 'react';
import { uetDB } from '../../data/mockData';
import { useProfile } from '../../hooks/useProfile';
import { useApp } from '../../contexts/AppContext';
import { EmptyState } from '../../components/shared/EmptyState';
import { Landmark, Download, CheckCircle2, Ticket } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function StudentFees() {
  const { profile } = useProfile();
  const { settings } = useApp();
  const [fees, setFees] = useState(uetDB.fees);
  const [success, setSuccess] = useState(false);

  if (!profile) return null;

  const handlePayFee = (feeId: string) => {
    const isPaid = uetDB.payFee(feeId);
    if (isPaid) {
      setSuccess(true);
      setFees([...uetDB.fees]);
      setTimeout(() => setSuccess(false), 3100);
    }
  };

  const handleDownloadChallan = (invoice: any) => {
    const isPaid = invoice.status === 'paid';
    const amount = invoice.total_fee ?? 65000;
    const challanNumber = invoice.challan_number ?? `UET-CH-2026-${invoice.semester}-0` + (invoice.id.split('-')[1] || invoice.id);
    
    // Create landscape A4 pdf: 297mm x 210mm
    const pdf = new jsPDF('l', 'mm', 'a4');
    
    const colors = {
      primary: [10, 29, 55],       // Navy
      secondary: [51, 65, 85],     // Slate
      accent: [220, 38, 38],       // Red/Rose danger warning
      success: [16, 185, 129],     // Emerald seal green
      bg: [248, 250, 252],         // Ice / soft slate bg
      text: [30, 41, 59]           // Charcoal body text
    };
    
    // Divide page into 3 sections:
    // Copy 1: x = 8 to 96
    // Copy 2: x = 104 to 192
    // Copy 3: x = 200 to 288
    // Between copies: vertical dashed lines at x = 100, x = 196
    
    const copies = [
      { name: 'BANK COPY', startX: 8 },
      { name: 'UNIVERSITY COPY', startX: 104 },
      { name: 'STUDENT COPY', startX: 200 }
    ];
    
    copies.forEach(({ name: copyName, startX }) => {
      // Background outline or decorative top bar for branding
      pdf.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      pdf.rect(startX, 6, 88, 4, 'F');
      
      // Copy Indicator Title
      pdf.setFillColor(241, 245, 249);
      pdf.rect(startX, 10, 88, 6, 'F');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
      pdf.text(copyName, startX + 44, 14.5, { align: 'center' });
      
      // University Logo & Heading
      const universityHeading = settings?.name || 'UET PESHAWAR';
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7.5);
      pdf.setTextColor(15, 23, 42);
      pdf.text(universityHeading.toUpperCase(), startX + 44, 21.5, { align: 'center' });
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(6);
      pdf.setTextColor(100, 116, 139);
      pdf.text('HABIB BANK LIMITED [A/C: 1485-7901-2300-11]', startX + 44, 25, { align: 'center' });
      
      // Invoice Info row
      pdf.setFillColor(248, 250, 252);
      pdf.roundedRect(startX, 28, 88, 14, 1.5, 1.5, 'F');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(6.5);
      pdf.setTextColor(51, 65, 85);
      pdf.text(`Challan No: ${challanNumber}`, startX + 4, 33);
      pdf.text(`Due Date: ${new Date(invoice.due_date).toLocaleDateString()}`, startX + 4, 38);
      
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Semester: ${invoice.semester}`, startX + 54, 33);
      pdf.text(`Status: ${invoice.status.toUpperCase()}`, startX + 54, 38);
      
      // Student details
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7);
      pdf.setTextColor(15, 23, 42);
      pdf.text('Scholar Information:', startX + 2, 48);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(6.5);
      pdf.setTextColor(71, 85, 105);
      pdf.text(`Name: ${profile.name}`, startX + 2, 53);
      pdf.text(`Reg No: ${profile.reg_number}`, startX + 2, 57.5);
      pdf.text(`Dept: ${profile.department_name.substring(0, 26)}`, startX + 2, 62);
      
      // Draw fees breakdown table inside each copy column
      pdf.setDrawColor(226, 232, 240);
      pdf.line(startX, 66, startX + 88, 66);
      
      // Table Header row
      pdf.setFillColor(241, 245, 249);
      pdf.rect(startX, 67, 88, 5, 'F');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(6);
      pdf.setTextColor(71, 85, 105);
      pdf.text('Particular Description', startX + 2, 70.5);
      pdf.text('Amount (PKR)', startX + 86, 70.5, { align: 'right' });
      
      // Let's break down the total_fee dynamically:
      const tuitionAmt = amount - 10000;
      const examAmt = 3000;
      const libAmt = 2000;
      const miscAmt = 5000;
      
      const rows = [
        { desc: 'Undergraduate Tuition Fee', value: tuitionAmt },
        { desc: 'University Examination Fee', value: examAmt },
        { desc: 'Library & E-Resources Fund', value: libAmt },
        { desc: 'Laboratory Development Charges', value: miscAmt }
      ];
      
      let currY = 77;
      rows.forEach((r) => {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(6);
        pdf.setTextColor(71, 85, 105);
        pdf.text(r.desc, startX + 2, currY);
        pdf.text(r.value.toLocaleString(), startX + 86, currY, { align: 'right' });
        
        pdf.setDrawColor(241, 245, 249);
        pdf.line(startX, currY + 2, startX + 88, currY + 2);
        currY += 5.5;
      });
      
      // Total row
      pdf.setFillColor(236, 253, 245); // soft success green highlight
      pdf.rect(startX, currY - 1, 88, 6, 'F');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(6.5);
      pdf.setTextColor(6, 95, 70); // deep green text
      pdf.text('GRAND NET TOTAL PAYABLE:', startX + 2, currY + 3);
      pdf.text(`PKR ${amount.toLocaleString()}`, startX + 86, currY + 3, { align: 'right' });
      
      // Signature blocks
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(5.5);
      pdf.setTextColor(148, 163, 184);
      pdf.line(startX + 4, currY + 19, startX + 32, currY + 19);
      pdf.text('Depositor Signature', startX + 18, currY + 22, { align: 'center' });
      
      pdf.line(startX + 56, currY + 19, startX + 84, currY + 19);
      pdf.text('Bank Cashier & Seal', startX + 70, currY + 22, { align: 'center' });
      
      // Adding verification or authenticity note
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(5);
      pdf.setTextColor(156, 163, 175);
      pdf.text('Generated via secure UET Digital Core and validated online.', startX + 44, currY + 28, { align: 'center' });
      
      // State overlay stickers/stamps
      if (isPaid) {
        pdf.setDrawColor(16, 185, 129);
        pdf.setFillColor(240, 253, 250);
        pdf.roundedRect(startX + 50, 44, 34, 10, 1, 1, 'FD');
        
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(7.5);
        pdf.setTextColor(5, 150, 105);
        pdf.text('PAID RECEIPT', startX + 67, 49.5, { align: 'center' });
        
        pdf.setFontSize(4.5);
        pdf.setFont('helvetica', 'normal');
        pdf.text('UET INTRA-GATE SECURE', startX + 67, 52.5, { align: 'center' });
      } else {
        pdf.setDrawColor(239, 68, 68);
        pdf.setFillColor(254, 242, 242);
        pdf.roundedRect(startX + 50, 44, 34, 10, 1, 1, 'FD');
        
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(7.5);
        pdf.setTextColor(220, 38, 38);
        pdf.text('UNPAID VOUCHER', startX + 67, 49.5, { align: 'center' });
        
        pdf.setFontSize(4.5);
        pdf.setFont('helvetica', 'normal');
        pdf.text('DEPOSIT BEFORE DUE DATE', startX + 67, 52.5, { align: 'center' });
      }
    });
    
    // Draw horizontal/vertical cut dashes between slips
    pdf.setDrawColor(203, 213, 225);
    pdf.setLineDashPattern([2, 2], 0);
    pdf.line(97, 6, 97, 204);
    pdf.line(196, 6, 196, 204);
    
    pdf.save(`${profile.name.replace(/\s+/g, '_')}_Semester_${invoice.semester}_Fee_Challan.pdf`);
  };

  return (
    <div className="space-y-6" id="student-fees-view">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Fee Challans Ledger</h2>
        <p className="text-xs text-slate-400">View semester tuition dues, download official bank challan drafts, or trigger mock transaction gateways.</p>
      </div>

      {success && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl flex items-center space-x-2">
          <CheckCircle2 className="w-4.5 h-4.5" />
          <span className="font-bold">Transaction Confirmed: Fee invoice updated to PAID status successfully!</span>
        </div>
      )}

      {/* Invoice list table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-800 dark:text-white mb-4">Undergraduate Fee Invoices</h3>

        {fees.length === 0 ? (
          <EmptyState 
            title="All Ledgers Balanced" 
            description="Our database shows no pending challans. Enjoy clean registration status!" 
          />
        ) : (
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left font-sans border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase text-[9px] font-black tracking-wider select-none">
                  <th className="py-3 px-2">Invoice Details</th>
                  <th className="py-3 px-2 text-center">Semester / Term</th>
                  <th className="py-3 px-2 text-center">Amount Due</th>
                  <th className="py-3 px-2 text-center">Valid Until</th>
                  <th className="py-3 px-2 text-center">Payment Status</th>
                  <th className="py-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-850 text-slate-705 dark:text-slate-350 font-semibold">
                {fees.map((invoice) => {
                  const isPaid = invoice.status === 'paid';
                  const amount = invoice.total_fee ?? 65000;
                  const challanNumber = invoice.challan_number ?? `UET-CH-2026-${invoice.semester}-0` + (invoice.id.split('-')[1] || invoice.id);
                  
                  return (
                    <tr key={invoice.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-855/30 transition-colors">
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-lg">
                            <Ticket className="w-4 h-4 text-[rgb(var(--university-primary))]" />
                          </div>
                          <div>
                            <span className="block text-[8px] font-black uppercase text-slate-405 leading-none">Tuition invoice</span>
                            <span className="text-xs font-bold text-slate-900 dark:text-white">{challanNumber}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-center">Semester {invoice.semester}</td>
                      <td className="py-4 px-2 text-center font-mono font-bold text-slate-900 dark:text-white">PKR {amount.toLocaleString()}</td>
                      <td className="py-4 px-2 text-center font-mono text-slate-450">{new Date(invoice.due_date).toLocaleDateString()}</td>
                      <td className="py-4 px-2 text-center">
                        <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-tight ${
                          isPaid 
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20' 
                            : 'bg-rose-50 text-rose-500 dark:bg-rose-950/10 animate-pulse'
                        }`}>
                          {isPaid ? 'Paid' : 'Unpaid'}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-any-right text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleDownloadChallan(invoice)}
                            className="p-1 px-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-slate-700 dark:hover:text-amber-400 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all cursor-pointer"
                            title="Download Invoice PDF Copy"
                          >
                            <Download className="w-4.5 h-4.5" />
                          </button>
                          
                          {!isPaid && (
                            <button
                              onClick={() => handlePayFee(invoice.id)}
                              className="px-3 py-1 bg-emerald-650 hover:bg-emerald-700 text-white rounded font-black text-[10px] uppercase cursor-pointer transition-all shrink-0 shadow-xs"
                            >
                              Mock Pay Bill
                            </button>
                          )}
                        </div>
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

