import React from 'react';
import { ArrowDown, CheckCircle2, Smartphone, Zap, Code2, Globe } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="w-full pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-[#e2e8f0]" id="hero">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#e2e8f0] text-xs text-[#131b2e] mb-6 shadow-[0_2px_8px_rgba(67,56,202,0.04)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0ea5e9] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0ea5e9]"></span>
              </span>
              <span className="font-medium tracking-wide">
                Available for new projects • AI + Web Development
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] text-[#131b2e] font-bold tracking-tight leading-[1.12] mb-6">
              Websites that make your business look as good as it is.
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-[#464554] max-w-2xl leading-relaxed mb-8 font-normal">
              I build modern, fast, conversion-focused websites for local businesses and founders, combining thoughtful design, clean development and AI-assisted speed.
            </p>

            {/* Buttons Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-4">
              <a
                href="https://calendly.com/bhawnawebstudio/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-[44px] px-6 rounded-[10px] bg-[#4338ca] hover:bg-[#4f46e5] text-white text-sm font-semibold tracking-wide transition-all shadow-[0_10px_20px_-8px_rgba(67,56,202,0.35)]"
              >
                Book a Free 30-min Call
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center h-[44px] px-6 rounded-[10px] bg-white border border-[#e2e8f0] hover:bg-[#f2f3ff] hover:border-[#cbd5e1] text-[#131b2e] text-sm font-semibold transition-all shadow-xs"
              >
                <span>See My Work</span>
                <ArrowDown className="w-4 h-4 ml-2 text-[#64748b]" />
              </a>
            </div>

            {/* Sub-button note */}
            <div className="flex items-center gap-2 text-xs text-[#64748b]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Free homepage mockup within 24 hours</span>
            </div>
          </div>

          {/* Right Column: Clean Browser Window Mockup of Sample Website */}
          <div className="lg:col-span-5 relative w-full">
            <div className="w-full rounded-[20px] bg-white border border-[#e2e8f0] shadow-[0_20px_50px_-15px_rgba(67,56,202,0.08)] overflow-hidden">
              {/* Browser Window Chrome */}
              <div className="h-10 bg-[#f2f3ff] px-4 border-b border-[#e2e8f0] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#cbd5e1]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#cbd5e1]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#cbd5e1]"></div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-[#e2e8f0] text-[11px] font-mono text-[#64748b] max-w-[220px] truncate shadow-xs">
                  <Globe className="w-3 h-3 text-[#0ea5e9]" />
                  <span>apex-dental.co.uk</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="hidden sm:inline">Live Preview</span>
                </div>
              </div>

              {/* Sample Website Viewport */}
              <div className="p-5 sm:p-6 bg-[#faf8ff] space-y-4">
                {/* Mock Website Internal Nav */}
                <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]/80">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-[#4338ca] text-white flex items-center justify-center font-bold text-[10px]">
                      A
                    </div>
                    <span className="font-heading font-bold text-xs text-[#131b2e]">
                      Apex Practice
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-[#64748b] font-medium">
                    <span className="text-[#131b2e]">Services</span>
                    <span className="hidden sm:inline">Treatments</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#4338ca] text-white text-[10px] font-semibold">
                      Book Visit
                    </span>
                  </div>
                </div>

                {/* Sample Website Hero Card */}
                <div className="p-5 rounded-xl bg-white border border-[#e2e8f0] shadow-xs space-y-2.5">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#eaedff] text-[#4338ca] text-[10px] font-semibold tracking-wide">
                    Private Dental Care · Central London
                  </div>
                  <h4 className="font-heading font-bold text-lg text-[#131b2e] leading-snug">
                    Gentle, contemporary dental care for your family.
                  </h4>
                  <p className="text-xs text-[#464554] leading-relaxed">
                    Same-day appointments, clear pricing, and tranquil clinic environments designed around your comfort.
                  </p>
                  <div className="flex items-center gap-2 pt-1.5">
                    <div className="h-7 px-3 rounded-[6px] bg-[#4338ca] text-white text-[11px] font-semibold flex items-center shadow-xs">
                      Schedule Consultation
                    </div>
                    <div className="h-7 px-3 rounded-[6px] bg-[#f2f3ff] text-[#131b2e] text-[11px] font-semibold flex items-center border border-[#e2e8f0]">
                      Our Fees
                    </div>
                  </div>
                </div>

                {/* Core Performance & Trust Strip */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 bg-white rounded-lg border border-[#e2e8f0]">
                    <span className="text-[9px] font-mono text-[#64748b] uppercase block">Load Time</span>
                    <span className="text-xs font-bold text-[#131b2e] font-mono">0.78s</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-[#e2e8f0]">
                    <span className="text-[9px] font-mono text-[#64748b] uppercase block">Google Vitals</span>
                    <span className="text-xs font-bold text-emerald-600 font-mono">100/100</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-[#e2e8f0]">
                    <span className="text-[9px] font-mono text-[#64748b] uppercase block">Responsive</span>
                    <span className="text-xs font-bold text-[#4338ca] font-mono">Fluid UI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Feature Cards Below Hero */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-10 border-t border-[#e2e8f0]">
          <div className="p-7 rounded-[20px] bg-white border border-[#e2e8f0] shadow-[0_10px_30px_-10px_rgba(67,56,202,0.05)] hover:-translate-y-0.5 hover:border-[#cbd5e1] hover:shadow-[0_16px_36px_-8px_rgba(67,56,202,0.09)] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] text-[#4338ca] flex items-center justify-center mb-4">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-[#131b2e] mb-2">100% Responsive</h3>
            <p className="text-sm text-[#464554] leading-relaxed">
              Every layout is meticulously designed and tested across mobile phones, tablets, and wide desktop screens for fluid reading.
            </p>
          </div>

          <div className="p-7 rounded-[20px] bg-white border border-[#e2e8f0] shadow-[0_10px_30px_-10px_rgba(67,56,202,0.05)] hover:-translate-y-0.5 hover:border-[#cbd5e1] hover:shadow-[0_16px_36px_-8px_rgba(67,56,202,0.09)] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] text-[#4338ca] flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-[#131b2e] mb-2">AI-Accelerated Speed</h3>
            <p className="text-sm text-[#464554] leading-relaxed">
              Modern AI scaffolds clean components in minutes so your website launches in days instead of dragging on for months.
            </p>
          </div>

          <div className="p-7 rounded-[20px] bg-white border border-[#e2e8f0] shadow-[0_10px_30px_-10px_rgba(67,56,202,0.05)] hover:-translate-y-0.5 hover:border-[#cbd5e1] hover:shadow-[0_16px_36px_-8px_rgba(67,56,202,0.09)] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] text-[#4338ca] flex items-center justify-center mb-4">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-[#131b2e] mb-2">Clean, SEO-ready Code</h3>
            <p className="text-sm text-[#464554] leading-relaxed">
              Semantic HTML, fast loading speeds and structured meta tags make it easy for Google and search engines to index your pages.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
