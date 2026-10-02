import React, { useState } from 'react';
import {
  Check,
  Zap,
  MessageSquare,
  RefreshCw,
  Smartphone,
  TrendingUp,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { PricingModal } from './PricingModal';

export const PricingAndProcess: React.FC = () => {
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<'starter' | 'standard' | 'premium'>('standard');

  const handleOpenPricingModal = (pkg: 'starter' | 'standard' | 'premium') => {
    setSelectedPackage(pkg);
    setIsPricingModalOpen(true);
  };
  const steps = [
    {
      num: '01',
      title: 'Discover',
      desc: 'A focused 30-minute discovery call to map out your audience, core offerings, and key conversion goals.',
      check: 'Defined project roadmap',
    },
    {
      num: '02',
      title: 'Plan & Prototype',
      desc: 'A complimentary homepage concept delivered within 24 hours to validate layout, typography, and mood.',
      check: 'Free initial mockup',
    },
    {
      num: '03',
      title: 'Build & Test',
      desc: 'AI-assisted development followed by rigorous manual cross-device testing on actual iOS and Android hardware.',
      check: 'Mobile and speed verified',
    },
    {
      num: '04',
      title: 'Launch & Handover',
      desc: 'Domain DNS connection, SEO tags verification, and complete source code and asset transfer to you.',
      check: '100% code ownership',
    },
  ];

  const clientPromises = [
    {
      icon: MessageSquare,
      title: 'Clear Communication',
      desc: 'You work directly with the developer building your site. No account manager middlemen, no jargon, and transparent milestone updates.',
    },
    {
      icon: RefreshCw,
      title: 'Fast Iteration',
      desc: 'Quick turnaround on your feedback. Revisions are incorporated within hours so your launch momentum never stalls.',
    },
    {
      icon: Smartphone,
      title: 'Built for Real Users',
      desc: 'Clean typography, fast loading under 1 second, and thumb-friendly mobile navigation that treats visitors’ attention with respect.',
    },
    {
      icon: TrendingUp,
      title: 'Room to Grow',
      desc: 'Standard semantic code without proprietary lock-in. Easily add new pages, booking systems, or payment links as your business scales.',
    },
  ];

  return (
    <>
      {/* 7. PRICING */}
      <section className="w-full py-24 lg:py-28 border-b border-[#e2e8f0]" id="pricing">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col items-start mb-16 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4338ca] mb-2 block">
              Transparent Pricing
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#131b2e] font-bold tracking-tight mb-4">
              Predictable, fixed investment with guaranteed schedules.
            </h2>
            <p className="text-base text-[#464554] leading-relaxed">
              No hourly creep. No unexpected retainers. Clear deliverables from start to finish.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
            {/* Tier 1: Starter */}
            <div className="p-8 lg:p-10 rounded-[20px] bg-white border border-[#e2e8f0] shadow-[0_10px_30px_-10px_rgba(67,56,202,0.05)] hover:-translate-y-0.5 hover:border-[#cbd5e1] hover:shadow-[0_16px_36px_-8px_rgba(67,56,202,0.09)] transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#64748b] block mb-2">
                  Essential Presence
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#131b2e] mb-2">Starter</h3>
                <p className="text-xs text-[#464554] leading-relaxed mb-6 min-h-[36px]">
                  For local businesses seeking an authentic, credible web presence live in just 72 hours.
                </p>
                <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-[#e2e8f0]">
                  <span className="font-heading text-4xl lg:text-5xl font-bold text-[#131b2e]">$299</span>
                  <span className="font-mono text-xs text-[#64748b]">/ fixed quote</span>
                </div>
                <ul className="space-y-3 text-xs text-[#464554] mb-8">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" />
                    <span>1-page website</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" />
                    <span>Mobile-friendly design</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" />
                    <span>Contact form</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" />
                    <span>Google Maps embed</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" />
                    <span>Basic SEO setup</span>
                  </li>
                  <li className="flex items-start gap-2.5 font-semibold text-[#131b2e]">
                    <Zap className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" />
                    <span>Live in 3 days</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => handleOpenPricingModal('starter')}
                className="w-full h-[44px] rounded-[10px] bg-white hover:bg-[#f2f3ff] text-[#131b2e] border border-[#e2e8f0] text-xs font-semibold uppercase tracking-wider flex items-center justify-center transition-colors cursor-pointer"
              >
                Get Started
              </button>
            </div>

            {/* Tier 2: Standard (Most Popular) */}
            <div className="relative p-8 lg:p-10 rounded-[20px] bg-white border-2 border-[#4338ca] shadow-[0_15px_40px_-10px_rgba(67,56,202,0.18)] flex flex-col justify-between lg:-translate-y-3">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#4338ca] text-white font-sans text-[10px] tracking-widest uppercase font-semibold shadow-xs">
                Most Popular
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#4338ca] block mb-2">
                  Complete Studio Presence
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#131b2e] mb-2">Standard</h3>
                <p className="text-xs text-[#464554] leading-relaxed mb-6 min-h-[36px]">
                  For established businesses and practices requiring multi-page lead generation.
                </p>
                <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-[#e2e8f0]">
                  <span className="font-heading text-4xl lg:text-5xl font-bold text-[#131b2e]">$599</span>
                  <span className="font-mono text-xs text-[#64748b]">/ fixed quote</span>
                </div>
                <ul className="space-y-3 text-xs text-[#464554] mb-8">
                  <li className="flex items-start gap-2.5 font-medium text-[#131b2e]">
                    <Check className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" />
                    <span>4–5 pages</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" />
                    <span>Booking or enquiry form</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" />
                    <span>Google Business link</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" />
                    <span>Core Web Vitals tuning</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" />
                    <span>Social share preview cards</span>
                  </li>
                  <li className="flex items-start gap-2.5 font-semibold text-[#4338ca]">
                    <Zap className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" />
                    <span>Live in 5 days</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => handleOpenPricingModal('standard')}
                className="w-full h-[44px] rounded-[10px] bg-[#4338ca] hover:bg-[#4f46e5] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center shadow-md transition-all cursor-pointer"
              >
                Get Started
              </button>
            </div>

            {/* Tier 3: Premium */}
            <div className="p-8 lg:p-10 rounded-[20px] bg-white border border-[#e2e8f0] shadow-[0_10px_30px_-10px_rgba(67,56,202,0.05)] hover:-translate-y-0.5 hover:border-[#cbd5e1] hover:shadow-[0_16px_36px_-8px_rgba(67,56,202,0.09)] transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#64748b] block mb-2">
                  Comprehensive Build
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#131b2e] mb-2">Premium</h3>
                <p className="text-xs text-[#464554] leading-relaxed mb-6 min-h-[36px]">
                  Full-scale digital presence with custom AI workflows or automated systems.
                </p>
                <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-[#e2e8f0]">
                  <span className="font-heading text-4xl lg:text-5xl font-bold text-[#131b2e]">$1,199</span>
                  <span className="font-mono text-xs text-[#64748b]">/ fixed quote</span>
                </div>
                <ul className="space-y-3 text-xs text-[#464554] mb-8">
                  <li className="flex items-start gap-2.5 font-medium text-[#131b2e]">
                    <Check className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" />
                    <span>6–8 pages</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" />
                    <span>AI chatbot or booking/ordering system</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" />
                    <span>SEO setup</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" />
                    <span>1 month support</span>
                  </li>
                  <li className="flex items-start gap-2.5 font-semibold text-[#131b2e]">
                    <Zap className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" />
                    <span>Live in 7 days</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => handleOpenPricingModal('premium')}
                className="w-full h-[44px] rounded-[10px] bg-white hover:bg-[#f2f3ff] text-[#131b2e] border border-[#e2e8f0] text-xs font-semibold uppercase tracking-wider flex items-center justify-center transition-colors cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Comparison Helper Row */}
          <div className="flex items-center justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#e2e8f0] text-xs sm:text-sm text-[#464554] shadow-xs">
              <HelpCircle className="w-4 h-4 text-[#4338ca] shrink-0" />
              <span>Not sure which package?</span>
              <a
                href="https://calendly.com/bhawnawebstudio/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#4338ca] hover:text-[#3730a3] inline-flex items-center gap-1 hover:underline transition-colors"
              >
                <span>Book a free call</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Pricing Terms Strip */}
          <div className="p-6 rounded-[20px] bg-[#f2f3ff] border border-[#e2e8f0] flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[#131b2e]">
            <div>
              <strong className="font-semibold text-[#4338ca]">Optional care plan $39/month:</strong> hosting, updates and small changes.
            </div>
            <div className="text-xs text-[#64748b] text-center md:text-right">
              50% deposit to start, balance on launch. UK clients: £249 / £499 / £999.
            </div>
          </div>
        </div>

        {/* Pricing Enquiry Modal */}
        <PricingModal
          isOpen={isPricingModalOpen}
          onClose={() => setIsPricingModalOpen(false)}
          initialPackageId={selectedPackage}
        />
      </section>

      {/* 8. PROCESS */}
      <section className="w-full py-24 lg:py-28 border-b border-[#e2e8f0]" id="process">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col items-start mb-16 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4338ca] mb-2 block">
              Step-By-Step
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#131b2e] font-bold tracking-tight mb-4">
              Simple process. Clear progress.
            </h2>
            <p className="text-base text-[#464554] leading-relaxed">
              From our initial discovery call to public launch in under a single week.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st) => (
              <div
                key={st.num}
                className="p-8 rounded-[20px] bg-white border border-[#e2e8f0] shadow-[0_10px_30px_-10px_rgba(67,56,202,0.05)] flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#f2f3ff] text-[#4338ca] font-mono font-bold text-sm flex items-center justify-center mb-6">
                    {st.num}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#131b2e] mb-2">{st.title}</h3>
                  <p className="text-xs text-[#464554] leading-relaxed mb-6">{st.desc}</p>
                </div>
                <div className="flex items-center gap-2 pt-4 border-t border-[#e2e8f0] text-[#4338ca] text-xs font-medium">
                  <Check className="w-4 h-4" />
                  <span>{st.check}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CLIENT PROMISE / WHY WORK WITH ME */}
      <section className="w-full py-24 lg:py-28 bg-[#f2f3ff] border-b border-[#e2e8f0]" id="promise">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col items-start mb-16 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4338ca] mb-2 block">
              Client Promise
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#131b2e] font-bold tracking-tight mb-4">
              Why work with me
            </h2>
            <p className="text-base text-[#464554] leading-relaxed">
              Direct accountability, straightforward pricing, and a website built to perform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clientPromises.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-[20px] bg-white border border-[#e2e8f0] shadow-[0_10px_30px_-10px_rgba(67,56,202,0.05)] hover:-translate-y-0.5 hover:border-[#cbd5e1] hover:shadow-[0_16px_36px_-8px_rgba(67,56,202,0.09)] transition-all flex items-start gap-5"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#f2f3ff] text-[#4338ca] flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-[#131b2e] mb-2">{item.title}</h3>
                    <p className="text-sm text-[#464554] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
