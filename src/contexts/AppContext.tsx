import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile, UniversitySettings } from '../types';
import { uetDB, mockUniversitySettings } from '../data/mockData';
import { IS_MOCK_AUTH } from '../lib/clerk-config';

interface AppContextType {
  settings: UniversitySettings;
  updateSettings: (newSettings: Partial<UniversitySettings>) => void;
  isLoading: boolean;
  
  // Auth state (Clerk or Mock bypass)
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  isMockMode: boolean;
  switchMockRole: (role: 'student' | 'teacher' | 'admin') => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<UniversitySettings>(mockUniversitySettings);
  const [currentUser, setCurrentUserRaw] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setCurrentUser = useCallback((user: UserProfile | null) => {
    setCurrentUserRaw(user);
    if (user) {
      localStorage.setItem(`uet_profile_override_${user.id}`, JSON.stringify(user));
    }
  }, []);

  // Load profile from database/localStorage on startup
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load university settings
        const storedSettings = localStorage.getItem('uet_settings');
        if (storedSettings) {
          const parsed = JSON.parse(storedSettings);
          // Auto migrate legacy dev pic unsplash url to high res headshot asset
          if (parsed.dev_pic === 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=350') {
            parsed.dev_pic = '/src/assets/images/dev_photo_1781959281322.jpg';
            localStorage.setItem('uet_settings', JSON.stringify(parsed));
          }
          setSettings(parsed);
        }

        // Setup default user for Mock Auth mode
        if (IS_MOCK_AUTH) {
          const lastProfileId = localStorage.getItem('uet_active_profile_id') || 'prof-student-1';
          const profile = uetDB.profiles.find(p => p.id === lastProfileId) || uetDB.profiles[0];
          const overridden = localStorage.getItem(`uet_profile_override_${lastProfileId}`);
          if (overridden) {
            setCurrentUserRaw(JSON.parse(overridden));
          } else {
            setCurrentUserRaw(profile);
          }
        } else {
          // If Clerk is used, ClerkProvider handles login, we will sync via custom hooks
        }
      } catch (err) {
        console.error('Error loading startup context:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const updateSettings = useCallback((newSettings: Partial<UniversitySettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('uet_settings', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const switchMockRole = useCallback((role: 'student' | 'teacher' | 'admin') => {
    let targetProfileId = 'prof-student-1';
    if (role === 'teacher') targetProfileId = 'prof-teacher-1';
    if (role === 'admin') targetProfileId = 'prof-admin-1';

    const profile = uetDB.profiles.find(p => p.id === targetProfileId);
    if (profile) {
      const overridden = localStorage.getItem(`uet_profile_override_${targetProfileId}`);
      if (overridden) {
        setCurrentUserRaw(JSON.parse(overridden));
      } else {
        setCurrentUserRaw(profile);
      }
      localStorage.setItem('uet_active_profile_id', targetProfileId);
    }
  }, []);

  const logout = useCallback(() => {
    setCurrentUserRaw(null);
    localStorage.removeItem('uet_active_profile_id');
    // Clear all profile overrides to guarantee clean state
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('uet_profile_override_') || key.startsWith('clerk-'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
  }, []);

  return (
    <AppContext.Provider
      value={{
        settings,
        updateSettings,
        isLoading,
        currentUser,
        setCurrentUser,
        isMockMode: IS_MOCK_AUTH,
        switchMockRole,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
