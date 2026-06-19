import React, { useState } from 'react';
import { Search, BookMarked, Layers, AlertCircle, Clock } from 'lucide-react';
import { EmptyState } from '../../components/shared/EmptyState';

export default function StudentLibrary() {
  const [issuedBooks] = useState([
    { title: 'Computer Networks (5th Edition)', author: 'Andrew S. Tanenbaum', issueDate: '2026-06-01', dueDate: '2026-07-01', fine: 0 },
    { title: 'Microprocessors and Interfacing', author: 'Douglas V. Hall', issueDate: '2026-06-05', dueDate: '2026-06-20', fine: 50 }, // Overdue
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = issuedBooks.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6" id="student-library-panel">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">University Library Desk</h2>
        <p className="text-xs text-slate-400">Review issued research texts, check catalog return deadlines, and monitor library dues.</p>
      </div>

      {/* Warning if overdue book */}
      <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 rounded-xl flex items-start space-x-3 text-xs leading-relaxed">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <div>
          <span className="font-extrabold uppercase tracking-tight">Library Return Notice</span>
          <p className="mt-1">
            "Microprocessors and Interfacing" is overdue since June 20th, carrying a PKR 50 daily penalty. Return it to the treasury counter.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-800 dark:text-white mb-4">Issued Textbooks logs</h3>

        {filteredBooks.length === 0 ? (
          <EmptyState 
            title="Empty Library Log" 
            description="You do not have any active books issued on this register card." 
          />
        ) : (
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left font-sans border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-440 uppercase text-[9px] font-black tracking-wider select-none">
                  <th className="py-2.5 px-2">Book Title / Scholar Author</th>
                  <th className="py-2.5 px-2 text-center">Issue Date</th>
                  <th className="py-2.5 px-2 text-center">Due Return Date</th>
                  <th className="py-2.5 px-2 text-center">Overdue Fine</th>
                  <th className="py-2.5 px-2 text-right">Gate Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-850 text-slate-705 dark:text-slate-350 font-semibold">
                {filteredBooks.map((book, idx) => {
                  const isLate = book.fine > 0;
                  return (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-855/35 transition-colors">
                      <td className="py-3 px-2">
                        <span className="block font-bold text-slate-850 dark:text-white">{book.title}</span>
                        <span className="text-[10px] text-slate-400 font-medium leading-none mt-1">{book.author}</span>
                      </td>
                      <td className="py-3 px-2 text-center font-mono">{book.issueDate}</td>
                      <td className="py-3 px-2 text-center font-mono text-slate-450">{book.dueDate}</td>
                      <td className="py-3 px-2 text-center text-rose-500 font-mono">PKR {book.fine}</td>
                      <td className="py-3 px-2 text-right">
                        <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-black uppercase ${
                          isLate 
                            ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 animate-pulse' 
                            : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20'
                        }`}>
                          {isLate ? 'Overdue Return' : 'Issued Out'}
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
