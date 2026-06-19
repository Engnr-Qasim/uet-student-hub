import React from 'react';
import { PublicNavbar } from './PublicNavbar';
import { Footer } from './Footer';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-55 dark:bg-slate-950" id="public-main-root">
      <PublicNavbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
