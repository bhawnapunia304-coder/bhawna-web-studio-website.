import React from 'react';
import { Store, MousePointerClick, Bot, Sparkles } from 'lucide-react';

export const TrustAndServices: React.FC = () => {
  const trustPoints = [
    { label: 'Live in days', sub: 'Fast turnaround' },
    { label: 'Mobile-first', sub: 'Responsive design' },
    { label: 'SEO-ready', sub: 'Clean structure' },
    { label: 'You own your website', sub: 'Zero lock-in' },
    { label: 'Free mockup first', sub: 'Within 24 hours' },
  ];

  const services = [
    {
      icon: Store,
      title: 'Business Websites',
      description: 'Credible, modern websites designed to showcase your offerings and turn local visitors into paying customers.',
      tags: ['Local Establishments', 'Professional Practices', 'Service Businesses'],
    },
    {
      icon: MousePointerClick,
      title: 'Landing Pages',
      description: 'Focused single-page designs crafted around a single clear goal: capturing qualified leads or launching an offer.',
      tags: ['Lead Capture', 'Product Launches', 'Campaign Funnels'],
    },
    {
      icon: Bot,
      title: 'AI-Enhanced Websites',
      description: 'Websites equipped with custom AI chat assistants, automated calendar bookings, and smart intake questionnaires.',
      tags: ['Bespoke Chatbots', 'Smart Intake', 'Automated Scheduling'],
    },
    {
      icon: Sparkles,
      title: 'Website Redesigns',
      description: 'Upgrading slow, cluttered, or outdated websites into fast, modern experiences that match where your business is today.',
      tags: ['Speed Re-engineering', 'Modern UI Overhaul', 'Content Restructuring'],
    },
  ];

  return (
    <>
      {/* 2. TRUST STRIP */}
      <section className="w-full bg-[#f2f3ff] border-b border-[#e2e8f0] py-8" id="trust">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center divide-y md:divide-y-0 md:divide-x divide-[#e2e8f0] text-center">
            {trustPoints.map((pt, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-2">
                <span className="font-heading text-lg font-bold text-[#131b2e]">{pt.label}</span>
                <span className="text-xs uppercase tracking-wider text-[#64748b] mt-0.5">{pt.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES */}
      <section className="w-full py-24 lg:py-28 border-b border-[#e2e8f0]" id="services">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col items-start mb-16 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4338ca] mb-2 block">
              Core Disciplines
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#131b2e] font-bold tracking-tight mb-4">
              Modern web development tailored to your business goals.
            </h2>
            <p className="text-base text-[#464554] leading-relaxed">
              Every site is built with deliberate structure, fast page load speeds, and intuitive navigation that guides visitors to take action.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-[20px] bg-white border border-[#e2e8f0] shadow-[0_10px_30px_-10px_rgba(67,56,202,0.05)] hover:-translate-y-0.5 hover:border-[#cbd5e1] hover:shadow-[0_16px_36px_-8px_rgba(67,56,202,0.09)] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#f2f3ff] text-[#4338ca] flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-[#131b2e] mb-3">
                      {srv.title}
                    </h3>
                    <p className="text-sm text-[#464554] leading-relaxed mb-6">
                      {srv.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-[#e2e8f0]">
                    {srv.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-full bg-[#f2f3ff] text-[#464554] text-xs font-medium border border-[#e2e8f0]"
                      >
                        {tag}
                      </span>
                    ))}
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
