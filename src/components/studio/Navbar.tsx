import React, { useState } from 'react';
import { Menu, X, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  onOpenDashboard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDashboard }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#faf8ff]/90 backdrop-blur-md border-b border-[#e2e8f0]">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between gap-4">
        {/* Logo / Wordmark */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xl text-[#131b2e] tracking-tight group-hover:text-[#4338ca] transition-colors">
              Bhawna Punia
            </span>
            <span className="text-[11px] font-medium text-[#64748b] tracking-wider uppercase">
              AI Web Developer &amp; Studio
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#464554]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#131b2e] transition-colors py-1 hover:underline underline-offset-4 decoration-[#4338ca]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          {onOpenDashboard && (
            <button
              onClick={onOpenDashboard}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-xs font-semibold text-[#4338ca] bg-[#f2f3ff] hover:bg-[#eaedff] border border-[#e2e8f0] transition-colors"
              title="View Real-Time Dashboard Portal"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
          )}

          <a
            href="https://calendly.com/bhawnawebstudio/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center h-[44px] px-5 rounded-[10px] bg-[#4338ca] hover:bg-[#4f46e5] text-white text-sm font-semibold tracking-wide transition-all shadow-[0_10px_20px_-8px_rgba(67,56,202,0.3)]"
          >
            Book a Free Call
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#131b2e] hover:bg-[#f2f3ff]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#faf8ff] border-t border-[#e2e8f0] px-6 py-5 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#464554] hover:text-[#131b2e] py-1.5"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[#e2e8f0] flex flex-col gap-2">
            <a
              href="https://calendly.com/bhawnawebstudio/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center h-[44px] w-full rounded-[10px] bg-[#4338ca] text-white text-sm font-semibold"
            >
              Book a Free Call
            </a>
            {onOpenDashboard && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDashboard();
                }}
                className="flex items-center justify-center h-[44px] w-full rounded-[10px] bg-white border border-[#e2e8f0] text-xs font-semibold text-[#131b2e]"
              >
                Open Analytics Dashboard
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
