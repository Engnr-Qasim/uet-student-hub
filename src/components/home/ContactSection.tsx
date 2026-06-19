import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export const ContactSection: React.FC = () => {
  const { settings } = useApp();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-slate-55 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Have Questions? Contact Us
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Reach out to the admissions office, DCSE HOD block, or submit web registration system concerns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Institutional Contact Cards */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">
                UET DCSE Registry Block
              </h3>
              <p className="text-xs text-slate-450 leading-relaxed">
                Our main offices are located inside the main Department of Computer Systems Engineering campus. For immediate queries, feel free to visit or drop us an email message.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-xl flex items-center space-x-3.5">
                <div className="p-2 bg-[rgb(var(--university-primary))]/10 text-[rgb(var(--university-primary))] dark:text-amber-400 rounded-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[8px] uppercase font-black text-slate-400">Campus Address</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-350">{settings.address || 'G.T. Road, Lahore, Pakistan'}</span>
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-xl flex items-center space-x-3.5">
                <div className="p-2 bg-[rgb(var(--university-primary))]/10 text-[rgb(var(--university-primary))] dark:text-amber-400 rounded-lg">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[8px] uppercase font-black text-slate-400">Official Helpdesk Email</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-350">{settings.contact_email || 'portal.admin@uet.edu.pk'}</span>
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-xl flex items-center space-x-3.5">
                <div className="p-2 bg-[rgb(var(--university-primary))]/10 text-[rgb(var(--university-primary))] dark:text-amber-400 rounded-lg">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[8px] uppercase font-black text-slate-400">Helpline Contact Phone</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-350">{settings.contact_phone || '+92-42-99029000'}</span>
                </div>
              </div>
            </div>

            {/* Simulated Live status */}
            <div className="p-4 bg-emerald-500/10 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 rounded-2xl border border-emerald-500/20 text-xs flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
              <span className="font-bold">Administrative Server status: Operational & Accepting Inquiries</span>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 sm:p-8 rounded-2xl shadow-sm">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-10">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                <h3 className="font-extrabold text-base text-slate-800 dark:text-white">Inquiry Transmitted</h3>
                <p className="text-xs text-slate-500 max-w-sm">
                  Thank you! Your academic helpdesk ticket has been generated successfully. Our administration team will respond to your specified email.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-all cursor-pointer"
                >
                  Post another ticket
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-base font-extrabold text-slate-800 dark:text-white tracking-tight">
                  Student Helpdesk Dispatcher
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase text-slate-400">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ahmad Hassan"
                      className="w-full text-xs px-3.5 py-2 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none focus:border-[rgb(var(--university-primary))]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase text-slate-400">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. dynamic@student.com"
                      className="w-full text-xs px-3.5 py-2 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none focus:border-[rgb(var(--university-primary))]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase text-slate-400">Inquiry Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Course Registration Issue, Roll Number Slip query"
                    className="w-full text-xs px-3.5 py-2 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none focus:border-[rgb(var(--university-primary))]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase text-slate-400">Message Content</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide description of your issue..."
                    className="w-full text-xs px-3.5 py-2 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none focus:border-[rgb(var(--university-primary))]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-1.5 py-2.5 bg-[rgb(var(--university-primary))] hover:bg-opacity-95 text-white text-xs font-bold rounded-lg cursor-pointer transform transition-all active:scale-98"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Ticket</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
