import React from 'react';
import { Bot, UserCheck, CheckCircle2, Code2, Cpu, Palette, CloudUpload } from 'lucide-react';

export const MethodologyAndToolkit: React.FC = () => {
  const steps = [
    { num: '01', title: 'Discovery', desc: 'Understanding goals & audience' },
    { num: '02', title: 'Design', desc: 'Wireframes & typography' },
    { num: '03', title: 'Scaffolding', desc: 'AI-assisted baseline code' },
    { num: '04', title: 'Build', desc: 'Custom frontend execution' },
    { num: '05', title: 'Quality Review', desc: 'Cross-browser & mobile testing' },
    { num: '06', title: 'Deploy', desc: 'Domain, SSL & asset handover' },
  ];

  const toolkit = [
    {
      category: 'Core Development',
      icon: Code2,
      tools: ['HTML5 & Semantic Structure', 'CSS3 & Tailwind CSS', 'Modern JavaScript (ES6+)', 'React Component Architecture'],
    },
    {
      category: 'AI Partners',
      icon: Cpu,
      tools: ['Claude 3.7 Sonnet', 'ChatGPT & Codex', 'Google AI Studio & Gemini'],
    },
    {
      category: 'Design & Visuals',
      icon: Palette,
      tools: ['Stitch Studio', 'Figma Wireframing', 'SVG Vector Layouts'],
    },
    {
      category: 'Deployment & Edge',
      icon: CloudUpload,
      tools: ['Git & GitHub Versioning', 'Vercel Edge Platform', 'Netlify Edge CDN'],
    },
  ];

  return (
    <>
      {/* 5. HOW I BUILD */}
      <section className="w-full py-24 lg:py-28 border-b border-[#e2e8f0]" id="process-how">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col items-start mb-16 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4338ca] mb-2 block">
              How I Build
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#131b2e] font-bold tracking-tight mb-4">
              Modern tools. Human judgment. AI-assisted speed.
            </h2>
            <p className="text-base text-[#464554] leading-relaxed">
              AI provides rapid scaffolding and code generation; human discernment ensures visual polish, sensible hierarchy, and real conversion results.
            </p>
          </div>

          {/* Two-Column Comparison Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Column 1: AI */}
            <div className="p-8 rounded-[20px] bg-white border border-[#e2e8f0] shadow-[0_10px_30px_-10px_rgba(67,56,202,0.05)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] text-[#4338ca] flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#131b2e]">
                    What AI accelerates
                  </h3>
                </div>
                <ul className="space-y-4 text-sm text-[#464554]">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#0ea5e9] shrink-0 mt-0.5" />
                    <span><strong>Idea exploration:</strong> Rapid concept variations and layout brainstorming.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#0ea5e9] shrink-0 mt-0.5" />
                    <span><strong>Scaffolding:</strong> Drafting clean semantic boilerplate in seconds.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#0ea5e9] shrink-0 mt-0.5" />
                    <span><strong>Debugging:</strong> Spotting syntax edge cases and linting issues immediately.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#0ea5e9] shrink-0 mt-0.5" />
                    <span><strong>Rapid iteration:</strong> Quick prototyping of interactive states and responsive grids.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-[#e2e8f0]">
                <span className="text-xs font-semibold text-[#4338ca] tracking-wider uppercase font-mono">
                  Result: Delivery in days instead of months
                </span>
              </div>
            </div>

            {/* Column 2: Human */}
            <div className="p-8 rounded-[20px] bg-[#f2f3ff] border border-[#e2e8f0] shadow-[0_10px_30px_-10px_rgba(67,56,202,0.05)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#4338ca] flex items-center justify-center border border-[#e2e8f0]">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#131b2e]">
                    What I personally own
                  </h3>
                </div>
                <ul className="space-y-4 text-sm text-[#131b2e]">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" />
                    <span><strong>Design decisions:</strong> Typography, whitespace proportions and tasteful aesthetics.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" />
                    <span><strong>Structure:</strong> Page hierarchy tailored to convert your specific audience.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" />
                    <span><strong>Code review:</strong> Ensuring zero bloat, solid security and clean architecture.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" />
                    <span><strong>Responsive testing:</strong> Testing on actual phones and tablets, not just browser emulators.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#4338ca] shrink-0 mt-0.5" />
                    <span><strong>Final delivery:</strong> Domain connection, DNS routing, and complete file handover.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-[#e2e8f0]">
                <span className="text-xs font-semibold text-[#131b2e] tracking-wider uppercase font-mono">
                  Result: 100% human accountability &amp; care
                </span>
              </div>
            </div>
          </div>

          {/* 6-step workflow row */}
          <div>
            <h3 className="font-heading text-xl font-bold text-[#131b2e] mb-6">
              Studio Workflow Sequence
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {steps.map((st, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-[16px] bg-white border border-[#e2e8f0] shadow-xs flex flex-col justify-between"
                >
                  <span className="font-mono text-xs font-bold text-[#4338ca] mb-1">{st.num}</span>
                  <div>
                    <h4 className="font-heading font-semibold text-sm text-[#131b2e] mb-1">{st.title}</h4>
                    <p className="text-xs text-[#64748b] leading-tight">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. TOOLKIT */}
      <section className="w-full py-24 lg:py-28 bg-[#f2f3ff] border-b border-[#e2e8f0]" id="toolkit">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col items-start mb-16 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4338ca] mb-2 block">
              Technical Foundation
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#131b2e] font-bold tracking-tight mb-4">
              Built with durable, standard web technologies.
            </h2>
            <p className="text-base text-[#464554] leading-relaxed">
              No proprietary site-builder lock-in. Clean HTML, CSS, JavaScript and React that any developer can maintain.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {toolkit.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-[20px] bg-white border border-[#e2e8f0] shadow-[0_10px_30px_-10px_rgba(67,56,202,0.05)] hover:-translate-y-0.5 hover:border-[#cbd5e1] hover:shadow-[0_16px_36px_-8px_rgba(67,56,202,0.09)] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] text-[#4338ca] flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-[#131b2e] mb-4">
                      {cat.category}
                    </h3>
                    <ul className="space-y-2 text-xs text-[#464554]">
                      {cat.tools.map((t, tIdx) => (
                        <li key={tIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4338ca]"></span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
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
