import React, { useState } from 'react';
import { useProfile } from '../../hooks/useProfile';
import { useApp } from '../../contexts/AppContext';
import { User, Mail, Phone, Calendar, Landmark, MapPin, Edit, Save, CheckCircle2 } from 'lucide-react';

export default function StudentProfile() {
  const { profile } = useProfile();
  const { isMockMode, currentUser, setCurrentUser } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || 'Ahmad Hassan',
    phone: profile?.phone || '+92-333-5551212',
    avatar_url: profile?.avatar_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
  });
  const [success, setSuccess] = useState(false);

  if (!profile) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isMockMode && currentUser) {
      const updated = { ...currentUser, ...formData };
      setCurrentUser(updated);
      setSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6" id="student-profile-view">
      {/* Header title */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Academic Student Profile</h2>
        <p className="text-xs text-slate-400">Manage your contact records, view registration metrics, and verify department enrollments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Card Column Left */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-xs text-center space-y-4">
            <div className="relative inline-block">
              <img 
                src={formData.avatar_url} 
                alt={formData.name} 
                className="w-24 h-24 rounded-full object-cover border-4 border-[rgb(var(--university-accent))] mx-auto shadow-sm"
              />
            </div>

            <div>
              <h3 className="text-base font-extrabold text-slate-800 dark:text-white">{formData.name}</h3>
              <span className="inline-block mt-1 px-3 py-0.5 bg-[rgb(var(--university-accent))]/10 border border-[rgb(var(--university-accent))]/30 rounded-full text-[10px] font-black text-[rgb(var(--university-accent))] uppercase leading-none">
                {profile.role} Scholar
              </span>
            </div>

            <div className="text-xs text-slate-400 font-mono space-y-1 bg-slate-50 dark:bg-slate-950 py-3 rounded-xl border border-slate-100 dark:border-slate-850">
              <div className="flex justify-between px-4">
                <span>Reg Number:</span>
                <span className="font-bold text-slate-700 dark:text-slate-350">{profile.reg_number || '2021-CSE-001'}</span>
              </div>
              <div className="flex justify-between px-4">
                <span>Semester:</span>
                <span className="font-bold text-slate-700 dark:text-slate-350">Semester {profile.semester || 5}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Form Column Right */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xs">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-extrabold text-slate-850 dark:text-white">Profile Particulars</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-800 hover:border-slate-300 rounded-lg text-slate-500 dark:text-slate-400 text-xs font-bold transition-all cursor-pointer"
              >
                <Edit className="w-4 h-4" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Contacts'}</span>
              </button>
            </div>

            {success && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl flex items-center space-x-2 mb-4">
                <CheckCircle2 className="w-4.5 h-4.5" />
                <span className="font-bold">Contact records successfully updated locally!</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Full Name</label>
                  <div className="flex items-center space-x-2 text-xs text-slate-800 dark:text-slate-250">
                    <User className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 disabled:bg-transparent dark:bg-slate-950 disabled:dark:bg-transparent text-xs px-3 py-2 border disabled:border-transparent border-slate-200 dark:border-slate-850 dark:text-white rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Helpline Contact Phone</label>
                  <div className="flex items-center space-x-2 text-xs text-slate-800 dark:text-slate-250">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 disabled:bg-transparent dark:bg-slate-950 disabled:dark:bg-transparent text-xs px-3 py-2 border disabled:border-transparent border-slate-200 dark:border-slate-850 dark:text-white rounded-lg focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Academics Enrolled Division</label>
                  <div className="flex items-center space-x-2 text-xs text-slate-500 py-2">
                    <Landmark className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{profile.department_name || 'DCSE Computer Systems Eng.'}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Campus Residence Address</label>
                  <div className="flex items-center space-x-2 text-xs text-slate-505 py-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Liaquat Hall (Room 101), Main Campus Lahore</span>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-850 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center space-x-1.5 px-4 py-2 bg-[rgb(var(--university-primary))] hover:bg-opacity-95 text-white text-xs font-bold rounded-lg cursor-pointer transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Contact Card</span>
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
