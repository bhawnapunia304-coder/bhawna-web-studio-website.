import React, { useState } from 'react';
import { ProjectDetail, PROJECTS_DATA } from '../../data/projectsData';
import { ProjectModal } from './ProjectModal';
import { Utensils, Calendar, ShoppingBag, Terminal, Building2, ArrowRight, Eye, Sliders } from 'lucide-react';

interface SelectedWorkProps {
  onSelectService: (serviceName: string) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectService }) => {
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);
  const [architectureView, setArchitectureView] = useState<'after' | 'before'>('after');

  const openProject = (id: string) => {
    const found = PROJECTS_DATA.find((p) => p.id === id);
    if (found) setActiveProject(found);
  };

  const handlePrev = () => {
    if (!activeProject) return;
    const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === activeProject.id);
    const prevIndex = (currentIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;
    setActiveProject(PROJECTS_DATA[prevIndex]);
  };

  const handleNext = () => {
    if (!activeProject) return;
    const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === activeProject.id);
    const nextIndex = (currentIndex + 1) % PROJECTS_DATA.length;
    setActiveProject(PROJECTS_DATA[nextIndex]);
  };

  return (
    <>
      <section className="w-full py-24 lg:py-28 border-b border-[#e2e8f0]" id="work">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col items-start mb-16 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4338ca] mb-2 block">
              Selected Concepts
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#131b2e] font-bold tracking-tight mb-4">
              Websites built to show what&apos;s possible.
            </h2>
            <p className="text-base text-[#464554] leading-relaxed">
              Click any project to explore the interactive live preview, architecture case study, and features built.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Project 1: Maison 27 */}
            <div
              onClick={() => openProject('maison-27')}
              className="rounded-[20px] bg-white border border-[#e2e8f0] shadow-[0_10px_30px_-10px_rgba(67,56,202,0.05)] hover:-translate-y-1 hover:border-[#cbd5e1] hover:shadow-[0_20px_40px_-10px_rgba(67,56,202,0.12)] transition-all overflow-hidden flex flex-col group cursor-pointer"
            >
              {/* Browser top */}
              <div className="h-10 bg-[#f2f3ff] px-4 border-b border-[#e2e8f0] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#cbd5e1]"></span>
                  <span className="font-mono text-xs text-[#64748b]">maison27.dev</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#4338ca] text-[10px] font-semibold uppercase tracking-wider font-mono">
                  Concept Demo
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="w-full h-64 rounded-xl overflow-hidden mb-5 bg-[#faf8ff] relative border border-[#e2e8f0]">
                    <img
                      src="/src/assets/images/bistro_maison_dining_1790934397043.jpg"
                      alt="Maison 27 restaurant interior and dining concept"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-3 left-3 bg-white/95 px-3 py-1 rounded-full text-xs text-[#131b2e] flex items-center gap-1.5 border border-[#e2e8f0] shadow-xs">
                      <Utensils className="w-3.5 h-3.5 text-[#4338ca]" />
                      <span className="font-medium">Table Reservation Flow</span>
                    </div>
                  </div>

                  <span className="text-[11px] uppercase tracking-wider text-[#4338ca] font-semibold block mb-1">
                    Hospitality &amp; Dining
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-[#131b2e] mb-2 group-hover:text-[#4338ca] transition-colors">
                    Maison 27
                  </h3>
                  <p className="text-sm text-[#464554] leading-relaxed mb-6">
                    A bistro website featuring an interactive table reservation workflow, seasonal menu displays, and quick mobile directions.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#e2e8f0]">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#464554] text-xs font-medium border border-[#e2e8f0]">Online Booking</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#464554] text-xs font-medium border border-[#e2e8f0]">Menu Showcase</span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#4338ca] group-hover:translate-x-1 transition-transform">
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2: Forma Studio */}
            <div
              onClick={() => openProject('forma-studio')}
              className="rounded-[20px] bg-white border border-[#e2e8f0] shadow-[0_10px_30px_-10px_rgba(67,56,202,0.05)] hover:-translate-y-1 hover:border-[#cbd5e1] hover:shadow-[0_20px_40px_-10px_rgba(67,56,202,0.12)] transition-all overflow-hidden flex flex-col group cursor-pointer"
            >
              <div className="h-10 bg-[#f2f3ff] px-4 border-b border-[#e2e8f0] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#cbd5e1]"></span>
                  <span className="font-mono text-xs text-[#64748b]">formastudio.club</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#4338ca] text-[10px] font-semibold uppercase tracking-wider font-mono">
                  Concept Demo
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="w-full h-64 rounded-xl overflow-hidden mb-5 bg-[#faf8ff] relative border border-[#e2e8f0]">
                    <img
                      src="/src/assets/images/pilates_forma_studio_1790934409995.jpg"
                      alt="Forma Pilates Studio reformer workout space"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-3 left-3 bg-white/95 px-3 py-1 rounded-full text-xs text-[#131b2e] flex items-center gap-1.5 border border-[#e2e8f0] shadow-xs">
                      <Calendar className="w-3.5 h-3.5 text-[#4338ca]" />
                      <span className="font-medium">Class Timetable &amp; Booking</span>
                    </div>
                  </div>

                  <span className="text-[11px] uppercase tracking-wider text-[#4338ca] font-semibold block mb-1">
                    Health &amp; Wellness
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-[#131b2e] mb-2 group-hover:text-[#4338ca] transition-colors">
                    Forma Studio
                  </h3>
                  <p className="text-sm text-[#464554] leading-relaxed mb-6">
                    A Pilates studio landing page with an interactive weekly schedule, instructor bios, and straightforward membership tiers.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#e2e8f0]">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#464554] text-xs font-medium border border-[#e2e8f0]">Weekly Schedule</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#464554] text-xs font-medium border border-[#e2e8f0]">Memberships</span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#4338ca] group-hover:translate-x-1 transition-transform">
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Project 3: Atelier */}
            <div
              onClick={() => openProject('atelier')}
              className="rounded-[20px] bg-white border border-[#e2e8f0] shadow-[0_10px_30px_-10px_rgba(67,56,202,0.05)] hover:-translate-y-1 hover:border-[#cbd5e1] hover:shadow-[0_20px_40px_-10px_rgba(67,56,202,0.12)] transition-all overflow-hidden flex flex-col group cursor-pointer"
            >
              <div className="h-10 bg-[#f2f3ff] px-4 border-b border-[#e2e8f0] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#cbd5e1]"></span>
                  <span className="font-mono text-xs text-[#64748b]">atelier-capsule.store</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#4338ca] text-[10px] font-semibold uppercase tracking-wider font-mono">
                  Concept Demo
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="w-full h-64 rounded-xl overflow-hidden mb-5 bg-[#faf8ff] relative border border-[#e2e8f0]">
                    <img
                      src="/src/assets/images/atelier_capsule_fashion_1790934421260.jpg"
                      alt="Atelier sustainable capsule wardrobe collection"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-3 left-3 bg-white/95 px-3 py-1 rounded-full text-xs text-[#131b2e] flex items-center gap-1.5 border border-[#e2e8f0] shadow-xs">
                      <ShoppingBag className="w-3.5 h-3.5 text-[#4338ca]" />
                      <span className="font-medium">Curated Capsule Cart</span>
                    </div>
                  </div>

                  <span className="text-[11px] uppercase tracking-wider text-[#4338ca] font-semibold block mb-1">
                    Retail &amp; Fashion
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-[#131b2e] mb-2 group-hover:text-[#4338ca] transition-colors">
                    Atelier
                  </h3>
                  <p className="text-sm text-[#464554] leading-relaxed mb-6">
                    A minimalist lookbook and boutique storefront featuring quick product preview drawers and clean typography.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#e2e8f0]">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#464554] text-xs font-medium border border-[#e2e8f0]">Editorial Lookbook</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#464554] text-xs font-medium border border-[#e2e8f0]">Fast Load</span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#4338ca] group-hover:translate-x-1 transition-transform">
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Project 4: NOVA AI */}
            <div
              onClick={() => openProject('nova-ai')}
              className="rounded-[20px] bg-white border border-[#e2e8f0] shadow-[0_10px_30px_-10px_rgba(67,56,202,0.05)] hover:-translate-y-1 hover:border-[#cbd5e1] hover:shadow-[0_20px_40px_-10px_rgba(67,56,202,0.12)] transition-all overflow-hidden flex flex-col group cursor-pointer"
            >
              <div className="h-10 bg-[#f2f3ff] px-4 border-b border-[#e2e8f0] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#cbd5e1]"></span>
                  <span className="font-mono text-xs text-[#64748b]">nova-inference.io</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#4338ca] text-[10px] font-semibold uppercase tracking-wider font-mono">
                  Concept Demo
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="w-full h-64 rounded-xl overflow-hidden mb-5 bg-[#131b2e] p-6 flex flex-col justify-between border border-[#e2e8f0] text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#0ea5e9] flex items-center gap-1.5 font-semibold">
                        <Terminal className="w-3.5 h-3.5" />
                        Interactive Inference Console
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg border border-white/10 font-mono text-xs text-stone-300">
                      <span className="text-[#0ea5e9]">&gt;</span> const response = await nova.stream(&#123; prompt: &apos;Summarize customer goals&apos; &#125;);
                    </div>
                    <div className="flex items-center justify-between font-mono text-[11px] text-stone-400">
                      <span>Edge Latency: 32ms</span>
                      <span>Tokens: 140/sec</span>
                    </div>
                  </div>

                  <span className="text-[11px] uppercase tracking-wider text-[#4338ca] font-semibold block mb-1">
                    Developer Tools &amp; SaaS
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-[#131b2e] mb-2 group-hover:text-[#4338ca] transition-colors">
                    NOVA AI
                  </h3>
                  <p className="text-sm text-[#464554] leading-relaxed mb-6">
                    A developer-focused product landing page with live prompt sandbox simulation, tier comparisons, and clear documentation.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#e2e8f0]">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#464554] text-xs font-medium border border-[#e2e8f0]">Interactive Demo</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#464554] text-xs font-medium border border-[#e2e8f0]">SaaS Pricing</span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#4338ca] group-hover:translate-x-1 transition-transform">
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Project 5: North & Oak (Before/After Redesign) */}
            <div
              onClick={() => openProject('north-and-oak')}
              className="lg:col-span-2 rounded-[20px] bg-white border border-[#e2e8f0] shadow-[0_10px_30px_-10px_rgba(67,56,202,0.05)] hover:-translate-y-1 hover:border-[#cbd5e1] hover:shadow-[0_20px_40px_-10px_rgba(67,56,202,0.12)] transition-all overflow-hidden flex flex-col group cursor-pointer"
            >
              <div className="h-10 bg-[#f2f3ff] px-4 border-b border-[#e2e8f0] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#cbd5e1]"></span>
                  <span className="font-mono text-xs text-[#64748b]">northandoak.archi · Redesign Case Study</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#4338ca] text-[10px] font-semibold uppercase tracking-wider font-mono">
                  Concept Demo
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#4338ca] font-semibold block mb-1">
                      Website Redesign
                    </span>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#131b2e] group-hover:text-[#4338ca] transition-colors">
                      North &amp; Oak Architecture
                    </h3>
                    <p className="text-sm text-[#464554] mt-1">
                      Toggle to compare an outdated, cluttered layout against a modern spatial design. Click anywhere to inspect the full interactive case study.
                    </p>
                  </div>

                  {/* Before / After Toggle Buttons */}
                  <div
                    className="flex items-center gap-1 bg-[#f2f3ff] p-1 rounded-full border border-[#e2e8f0] shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setArchitectureView('after')}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        architectureView === 'after'
                          ? 'bg-white text-[#131b2e] shadow-xs border border-[#e2e8f0]'
                          : 'text-[#64748b] hover:text-[#131b2e]'
                      }`}
                    >
                      Modernized Site
                    </button>
                    <button
                      onClick={() => setArchitectureView('before')}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        architectureView === 'before'
                          ? 'bg-white text-[#131b2e] shadow-xs border border-[#e2e8f0]'
                          : 'text-[#64748b] hover:text-[#131b2e]'
                      }`}
                    >
                      Old Cluttered Site
                    </button>
                  </div>
                </div>

                {/* Viewport */}
                {architectureView === 'after' ? (
                  <div className="w-full h-80 rounded-xl overflow-hidden bg-[#faf8ff] relative border border-[#e2e8f0]">
                    <img
                      src="/src/assets/images/architectural_interior_lounge_1790934434073.jpg"
                      alt="North and Oak modernized minimalist architecture portfolio"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-6">
                      <div className="text-white">
                        <span className="text-[11px] font-mono uppercase text-[#eaedff]">Post-Redesign</span>
                        <h4 className="font-heading text-xl sm:text-2xl font-bold text-white mt-1">
                          Fast Loading, Clean Typography &amp; Spacious Gallery
                        </h4>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-80 rounded-xl bg-[#f2f3ff] p-6 border-2 border-dashed border-[#cbd5e1] flex flex-col justify-between">
                    <div className="bg-white p-3 rounded-lg border border-[#e2e8f0] text-center">
                      <span className="text-xs font-mono font-bold text-amber-700 uppercase">
                        [ Legacy 2015 Template Site ]
                      </span>
                      <p className="text-xs text-[#64748b] mt-1">
                        Uncompressed 15MB hero images, cramped fonts, slow navigation, and poor mobile experience.
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-28 bg-white rounded border border-[#e2e8f0] flex items-center justify-center text-xs text-[#64748b] font-mono">
                        Cluttered Banner
                      </div>
                      <div className="h-28 bg-white rounded border border-[#e2e8f0] flex items-center justify-center text-xs text-[#64748b] font-mono">
                        Tiny Unreadable Font
                      </div>
                      <div className="h-28 bg-white rounded border border-[#e2e8f0] flex items-center justify-center text-xs text-[#64748b] font-mono">
                        Broken Mobile Grid
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-[#64748b] text-center">
                      High bounce rates prior to structural cleanup.
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-5 border-t border-[#e2e8f0] mt-5">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#464554] text-xs font-medium border border-[#e2e8f0]">Before / After Redesign</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#464554] text-xs font-medium border border-[#e2e8f0]">Architecture Studio</span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#4338ca] group-hover:translate-x-1 transition-transform">
                    <span>View Interactive Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal with Live Preview */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        onSelectService={onSelectService}
      />
    </>
  );
};
