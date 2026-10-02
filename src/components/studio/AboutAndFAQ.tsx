import React, { useState } from 'react';
import { ChevronDown, Palette, Cpu, Target, Globe } from 'lucide-react';

export const AboutAndFAQ: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const principles = [
    {
      icon: Palette,
      title: 'Design-minded craftsmanship',
      desc: 'Balanced proportions, clean typography and ample whitespace that respects your visitors’ attention.',
    },
    {
      icon: Cpu,
      title: 'AI-assisted execution',
      desc: 'Using modern AI models as pair-programmers to eliminate repetitive scaffolding and ship faster.',
    },
    {
      icon: Target,
      title: 'Business-focused clarity',
      desc: 'Every layout, button, and headline is structured to guide visitors toward booking or inquiring.',
    },
  ];

  const faqs = [
    {
      q: 'How fast can I go live?',
      a: 'Most single-page starter websites go live in 3 days. Multi-page projects typically take 5 to 7 days once your content and direction are confirmed.',
    },
    {
      q: 'Do I own my website?',
      a: 'Yes, 100%. You receive all clean source code, assets and hosting accounts with zero platform lock-in or licensing fees.',
    },
    {
      q: 'What if I need changes after launch?',
      a: 'Every project includes 14 days of post-launch adjustments. For ongoing help, an optional $39/month care plan covers hosting, updates and minor changes.',
    },
    {
      q: 'Do you work with businesses outside India?',
      a: 'Yes. Most of my clients are based in the United States, United Kingdom and Canada. We communicate via email, scheduled Zoom calls and WhatsApp.',
    },
    {
      q: 'How does payment work?',
      a: '50% upfront deposit to begin, and the remaining 50% upon final approval before DNS connection and launch. No surprise fees.',
    },
    {
      q: 'What do I need to provide?',
      a: 'Just your logo, a brief description of what your business offers, and any photos you already have. If you need help with text or structuring your copy, I’ll guide you through it.',
    },
  ];

  return (
    <>
      {/* 10. ABOUT */}
      <section className="w-full py-24 lg:py-28 border-b border-[#e2e8f0]" id="about">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col items-start mb-16 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4338ca] mb-2 block">
              About The Studio
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#131b2e] font-bold tracking-tight mb-4">
              Building for the web, learning by building.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Bio Card without Portrait */}
            <div className="lg:col-span-5 p-8 rounded-[20px] bg-white border border-[#e2e8f0] shadow-[0_10px_30px_-10px_rgba(67,56,202,0.05)] flex flex-col justify-between">
              <div>
                <div className="pb-6 mb-6 border-b border-[#e2e8f0]">
                  <h3 className="font-heading text-2xl font-bold text-[#131b2e] tracking-tight">
                    Bhawna Punia
                  </h3>
                  <div className="text-xs font-semibold text-[#4338ca] uppercase tracking-wider mt-1">
                    AI Web Developer &amp; Digital Studio
                  </div>
                  {/* 3 small skill chips */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-2.5 py-1 rounded-full bg-[#f2f3ff] text-[#4338ca] text-xs font-medium border border-[#e2e8f0]">
                      Web Development
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#f2f3ff] text-[#4338ca] text-xs font-medium border border-[#e2e8f0]">
                      AI-Assisted Speed
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#f2f3ff] text-[#4338ca] text-xs font-medium border border-[#e2e8f0]">
                      Conversion Design
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#464554] leading-relaxed mb-6 font-normal">
                  I&apos;m Bhawna Punia, a web developer building clean, purposeful websites for small and independent businesses. I combine solid web fundamentals — semantic HTML, modern CSS and responsive design — with AI tools to deliver high-quality work faster, without cutting corners on polish or reliability.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#f2f3ff] border border-[#e2e8f0] flex items-center gap-3 text-xs text-[#131b2e] mt-auto">
                <Globe className="w-4 h-4 text-[#4338ca] shrink-0" />
                <span>Working with clients across the US, UK, Canada &amp; beyond.</span>
              </div>
            </div>

            {/* 3 Principles */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              {principles.map((pr, idx) => {
                const Icon = pr.icon;
                return (
                  <div
                    key={idx}
                    className="p-7 rounded-[20px] bg-white border border-[#e2e8f0] shadow-[0_10px_30px_-10px_rgba(67,56,202,0.05)] hover:-translate-y-0.5 hover:border-[#cbd5e1] hover:shadow-[0_16px_36px_-8px_rgba(67,56,202,0.09)] transition-all flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] text-[#4338ca] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg font-bold text-[#131b2e] mb-1.5">
                        {pr.title}
                      </h4>
                      <p className="text-sm text-[#464554] leading-relaxed">
                        {pr.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="w-full py-24 lg:py-28 bg-[#faf8ff] border-b border-[#e2e8f0]" id="faq">
        <div className="max-w-[880px] mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4338ca] mb-2 block">
              Common Inquiries
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#131b2e] font-bold tracking-tight mb-4">
              Frequently asked questions
            </h2>
            <p className="text-base text-[#464554]">
              Direct, honest answers regarding turnaround, ownership, and our collaboration.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-[20px] bg-white border border-[#e2e8f0] shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading text-base sm:text-lg font-bold text-[#131b2e]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#64748b] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-sm text-[#464554] leading-relaxed border-t border-[#f2f3ff] mt-2 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
