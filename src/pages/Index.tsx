import React from 'react';
import { PublicLayout } from '../components/layout/PublicLayout';
import { HeroSection } from '../components/home/HeroSection';
import { StatsSection } from '../components/home/StatsSection';
import { DepartmentsSection } from '../components/home/DepartmentsSection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { AnnouncementsSection } from '../components/home/AnnouncementsSection';
import { DeveloperSection } from '../components/home/DeveloperSection';
import { ContactSection } from '../components/home/ContactSection';

export default function Index() {
  return (
    <PublicLayout>
      <div className="space-y-0" id="main-landing-explorer">
        {/* Sections in strategic professional rhythm */}
        <HeroSection />
        <StatsSection />
        <DepartmentsSection />
        <FeaturesSection />
        <AnnouncementsSection />
        <DeveloperSection />
        <ContactSection />
      </div>
    </PublicLayout>
  );
}
