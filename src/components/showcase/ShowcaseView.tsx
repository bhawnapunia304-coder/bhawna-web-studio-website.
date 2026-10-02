import React from 'react';
import { Navbar } from '../studio/Navbar';
import { HeroSection } from '../studio/HeroSection';
import { TrustAndServices } from '../studio/TrustAndServices';
import { SelectedWork } from '../studio/SelectedWork';
import { MethodologyAndToolkit } from '../studio/MethodologyAndToolkit';
import { PricingAndProcess } from '../studio/PricingAndProcess';
import { AboutAndFAQ } from '../studio/AboutAndFAQ';
import { ContactAndFooter } from '../studio/ContactAndFooter';

interface ShowcaseViewProps {
  onOpenDashboard: () => void;
  onOpenSetupGuide?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const ShowcaseView: React.FC<ShowcaseViewProps> = ({ onOpenDashboard }) => {
  const [selectedService, setSelectedService] = React.useState<string | undefined>(undefined);

  return (
    <div className="w-full min-h-screen bg-[#faf8ff] text-[#131b2e] font-sans antialiased selection:bg-[#4338ca]/20 selection:text-[#4338ca]">
      {/* Sticky Navbar */}
      <Navbar onOpenDashboard={onOpenDashboard} />

      <main>
        {/* 1. HERO */}
        <HeroSection />

        {/* 2. TRUST STRIP & 3. SERVICES */}
        <TrustAndServices />

        {/* 4. SELECTED WORK (5 concepts with interactive live modal) */}
        <SelectedWork onSelectService={setSelectedService} />

        {/* 5. HOW I BUILD & 6. TOOLKIT */}
        <MethodologyAndToolkit />

        {/* 7. PRICING, 8. PROCESS & 9. CLIENT PROMISE */}
        <PricingAndProcess />

        {/* 10. ABOUT & 11. FAQ */}
        <AboutAndFAQ />

        {/* 12. CONTACT, 13. FINAL CTA BANNER & 14. FOOTER */}
        <ContactAndFooter preselectedService={selectedService} />
      </main>
    </div>
  );
};
