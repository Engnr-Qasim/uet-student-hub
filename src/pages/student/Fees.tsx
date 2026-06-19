import React, { useState } from 'react';
import { uetDB } from '../../data/mockData';
import { useProfile } from '../../hooks/useProfile';
import { EmptyState } from '../../components/shared/EmptyState';
import { Landmark, Download, CheckCircle2, Ticket } from 'lucide-react';

export default function StudentFees() {
  const { profile } = useProfile();
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
                  return (
                    <tr key={invoice.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-855/30 transition-colors">
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-lg">
                            <Ticket className="w-4 h-4 text-[rgb(var(--university-primary))]" />
                          </div>
                          <div>
                            <span className="block text-[8px] font-black uppercase text-slate-405 leading-none">Tuition invoice</span>
                            <span className="text-xs font-bold text-slate-900 dark:text-white">{invoice.challan_number}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-center">Semester {invoice.semester}</td>
                      <td className="py-4 px-2 text-center font-mono font-bold text-slate-900 dark:text-white">PKR {invoice.amount.toLocaleString()}</td>
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
                            onClick={() => alert(`Downloading Challan File: ${invoice.challan_number}.pdf`)}
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
