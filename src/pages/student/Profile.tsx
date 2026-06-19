import React, { useState, useEffect } from 'react';
import { useProfile } from '../../hooks/useProfile';
import { useApp } from '../../contexts/AppContext';
import { User, Phone, Landmark, MapPin, Edit, Save, CheckCircle2, Upload, GraduationCap } from 'lucide-react';

export default function StudentProfile() {
  const { profile } = useProfile();
  const { currentUser, setCurrentUser } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Ahmad Hassan',
    phone: '+92-333-5551212',
    avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    reg_number: '2021-CSE-001',
    department_name: 'Computer Systems Engineering',
    semester: 5
  });
  const [success, setSuccess] = useState(false);

  // Sync state with the actual active loaded profile
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        phone: profile.phone || '',
        avatar_url: profile.avatar_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
        reg_number: profile.reg_number || '2021-CSE-001',
        department_name: profile.department_name || 'Computer Systems Engineering',
        semester: profile.semester || 5
      });
    }
  }, [profile]);

  if (!profile) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      const updated = { ...currentUser, ...formData };
      setCurrentUser(updated);
      setSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar_url: reader.result as string }));
      };
      reader.readAsDataURL(file);
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
            <div className="relative inline-block group">
              <img 
                src={formData.avatar_url} 
                alt={formData.name} 
                className="w-24 h-24 rounded-full object-cover border-4 border-[rgb(var(--university-accent))] mx-auto shadow-sm"
              />
              {isEditing && (
                <label className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center text-white text-[9px] font-bold uppercase tracking-wider cursor-pointer transition-all">
                  <Upload className="w-4 h-4 mr-1 shrink-0" />
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </label>
              )}
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
                <span className="font-bold text-slate-700 dark:text-slate-350">{formData.reg_number}</span>
              </div>
              <div className="flex justify-between px-4">
                <span>Semester:</span>
                <span className="font-bold text-slate-700 dark:text-slate-350">Semester {formData.semester}</span>
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
                <span>{isEditing ? 'Cancel Edit' : 'Edit Credentials'}</span>
              </button>
            </div>

            {success && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl flex items-center space-x-2 mb-4">
                <CheckCircle2 className="w-4.5 h-4.5" />
                <span className="font-bold">Academic details updated successfully across dynamic ID portals!</span>
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
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 disabled:bg-transparent dark:bg-slate-950 disabled:dark:bg-transparent text-xs px-3 py-2 border disabled:border-transparent border-slate-200 dark:border-slate-850 dark:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-400 font-medium"
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
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 disabled:bg-transparent dark:bg-slate-950 disabled:dark:bg-transparent text-xs px-3 py-2 border disabled:border-transparent border-slate-200 dark:border-slate-850 dark:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-400 font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Registration Number</label>
                  <div className="flex items-center space-x-2 text-xs text-slate-800 dark:text-slate-250">
                    <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      disabled={!isEditing}
                      required
                      value={formData.reg_number}
                      placeholder="e.g. 2021-CSE-124"
                      onChange={(e) => setFormData({ ...formData, reg_number: e.target.value })}
                      className="w-full bg-slate-50 disabled:bg-transparent dark:bg-slate-950 disabled:dark:bg-transparent text-xs px-3 py-2 border disabled:border-transparent border-slate-200 dark:border-slate-850 dark:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-400 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Running Semester</label>
                  <div className="flex items-center space-x-2 text-xs text-slate-800 dark:text-slate-250">
                    <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                    <select
                      disabled={!isEditing}
                      value={formData.semester}
                      onChange={(e) => setFormData({ ...formData, semester: Number(e.target.value) })}
                      className="w-full bg-slate-50 disabled:bg-transparent dark:bg-slate-950 disabled:dark:bg-transparent text-xs px-3 py-2 border disabled:border-transparent border-slate-200 dark:border-slate-850 dark:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-400 font-medium"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                        <option key={s} value={s}>Semester {s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Academics Enrolled Division</label>
                  <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
                    <Landmark className="w-4 h-4 text-slate-400 shrink-0" />
                    {isEditing ? (
                      <select
                        value={formData.department_name}
                        onChange={(e) => setFormData({ ...formData, department_name: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 text-xs px-3 py-2 border border-slate-200 dark:border-slate-850 dark:text-white rounded-lg focus:ring-1 focus:ring-slate-400 font-medium"
                      >
                        <option value="Computer Systems Engineering">Computer Systems Engineering</option>
                        <option value="Electrical Engineering">Electrical Engineering</option>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                      </select>
                    ) : (
                      <span>{formData.department_name}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Campus Residence Address</label>
                  <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium py-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Liaquat Hall (Room 101), Main Campus Peshawar</span>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-850 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center space-x-1.5 px-5 py-2.5 bg-[rgb(var(--university-primary))] hover:bg-opacity-95 text-white text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer shadow-sm transition-all"
                  >
                    <Save className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span>Save Profiles & Cards</span>
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
