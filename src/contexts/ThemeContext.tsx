import React, { createContext, useContext, useState, useEffect } from 'react';

export type UniversityTheme = 'light' | 'dark' | 'blue' | 'green';

interface ThemeContextType {
  theme: UniversityTheme;
  setTheme: (theme: UniversityTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<UniversityTheme>(() => {
    const saved = localStorage.getItem('uet_theme');
    return (saved as UniversityTheme) || 'light';
  });

  const setTheme = (newTheme: UniversityTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('uet_theme', newTheme);
  };

  useEffect(() => {
    const root = document.documentElement;
    // Remove existing themes
    root.classList.remove('theme-light', 'theme-dark', 'theme-blue', 'theme-green');
    // Add current theme class
    root.classList.add(`theme-${theme}`);
    
    // Also support dark mode media if using default dark
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
