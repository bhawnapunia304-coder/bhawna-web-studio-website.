import React, { useState } from 'react';
import { Sliders, Building2, Check, ArrowRight, Eye } from 'lucide-react';

export const NorthOakPreview: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100

  const projects = [
    { title: 'The Fjord Residence', location: 'Bergen, Norway', area: '4,200 sq ft', year: '2025' },
    { title: 'Monolithic Concrete Pavilion', location: 'Stockholm, Sweden', area: '6,800 sq ft', year: '2024' },
    { title: 'Alpine Meadow Retreat', location: 'Innsbruck, Austria', area: '3,400 sq ft', year: '2025' },
  ];

  return (
    <div className="w-full bg-[#faf9f6] text-[#1c1917] font-sans antialiased text-xs sm:text-sm">
      {/* Mini Architecture Header */}
      <header className="px-6 py-4 border-b border-[#e7e5e0] bg-[#faf9f6] sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-serif tracking-widest text-base uppercase font-bold text-[#1c1917]">
            North &amp; Oak
          </span>
          <span className="text-[10px] text-[#78716c] font-mono">Architecture &amp; Spatial Design</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="px-3.5 py-1.5 rounded-full bg-[#1c1917] text-white font-medium text-xs hover:bg-[#44403c] transition-colors"
          >
            Consultation
          </a>
        </div>
      </header>

      {/* Hero Strip */}
      <div className="py-8 px-6 text-center border-b border-[#e7e5e0] bg-white">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#78716c] block mb-1">
          Spatial Clarity · Environmental Resonance
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#1c1917] font-normal max-w-xl mx-auto">
          Architecture conceived for permanence, light, and landscape.
        </h2>
      </div>

      {/* Interactive Before / After Image Slider */}
      <section className="p-6 sm:p-8 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#1c1917]" />
              <h3 className="font-serif text-lg font-bold text-[#1c1917]">Interactive Redesign Comparison</h3>
            </div>
            <p className="text-xs text-[#78716c] mt-0.5">Drag the slider left or right to compare the legacy 2015 site with the new spatial portfolio.</p>
          </div>
          <div className="text-xs font-mono font-semibold text-[#1c1917] bg-white px-3 py-1 rounded-full border border-[#e7e5e0]">
            Position: {sliderPosition}% Modernized
          </div>
        </div>

        {/* Visual Slider Box */}
        <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-[#e7e5e0] select-none bg-stone-100 shadow-sm">
          {/* Base: Legacy 2015 site */}
          <div className="absolute inset-0 bg-[#f4f2ee] p-6 flex flex-col justify-between border-2 border-dashed border-[#d6d3cc]">
            <div className="bg-white p-3 rounded-lg border border-[#e7e5e0] text-center shadow-xs">
              <span className="text-xs font-mono font-bold text-amber-700 uppercase">
                [ Legacy 2015 Template Site ]
              </span>
              <p className="text-xs text-[#78716c] mt-1">
                6.4s load time, uncompressed 18MB images, broken mobile view, cluttered menu links.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-28 bg-white rounded border border-[#e7e5e0] flex items-center justify-center text-xs text-[#78716c] font-mono">
                Dated Hero
              </div>
              <div className="h-28 bg-white rounded border border-[#e7e5e0] flex items-center justify-center text-xs text-[#78716c] font-mono">
                Slow Gallery
              </div>
              <div className="h-28 bg-white rounded border border-[#e7e5e0] flex items-center justify-center text-xs text-[#78716c] font-mono">
                Cramped Font
              </div>
            </div>
            <span className="font-mono text-[10px] text-[#78716c] text-center">
              84% mobile bounce rate prior to restructuring.
            </span>
          </div>

          {/* Overlay: Modernized 2026 site clipped by sliderPosition */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="relative w-full h-full min-w-[650px] bg-stone-900">
              <img
                src="/src/assets/images/architectural_interior_lounge_1790934434073.jpg"
                alt="Modernized North and Oak spatial architecture"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-6">
                <div className="text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-stone-300">
                    Post-Redesign
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-normal text-white mt-1">
                    Spatial Calm, High Contrast &amp; 0.8s Sub-Second Load
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Draggable vertical divider line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-md"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-[#1c1917] border border-[#e7e5e0] shadow-lg flex items-center justify-center font-mono text-xs font-bold">
              ↔
            </div>
          </div>
        </div>

        {/* Range control input */}
        <div className="mt-3 flex items-center gap-3">
          <span className="text-xs font-mono text-[#78716c]">Legacy</span>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="flex-1 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#1c1917]"
          />
          <span className="text-xs font-mono text-[#1c1917] font-semibold">Modernized</span>
        </div>
      </section>

      {/* Project Selected Highlights */}
      <section className="p-6 sm:p-8 bg-white border-t border-[#e7e5e0]">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-serif text-lg font-bold text-[#1c1917] mb-4">Featured Spatial Works</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {projects.map((p, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#faf9f6] border border-[#e7e5e0] shadow-xs">
                <div className="font-serif font-medium text-sm text-[#1c1917] mb-1">{p.title}</div>
                <div className="text-xs text-[#78716c] mb-2">{p.location}</div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#78716c] pt-2 border-t border-[#e7e5e0]">
                  <span>{p.area}</span>
                  <span>{p.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
