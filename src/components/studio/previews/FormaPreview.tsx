import React, { useState } from 'react';
import { Calendar, Clock, User, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export const FormaPreview: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('Wed');
  const [selectedDiscipline, setSelectedDiscipline] = useState('All');
  const [bookedClass, setBookedClass] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const schedule = [
    { id: 'c1', time: '07:30', name: 'Reformer Sculpt & Tone', instructor: 'Chloe Zhao', level: 'Intermediate', duration: '50 min', spots: 2, discipline: 'Reformer' },
    { id: 'c2', time: '09:00', name: 'Dynamic Core Flow', instructor: 'Marcus Reed', level: 'All Levels', duration: '50 min', spots: 5, discipline: 'Core Flow' },
    { id: 'c3', time: '12:15', name: 'Athletic Reformer HIIT', instructor: 'Chloe Zhao', level: 'Advanced', duration: '45 min', spots: 1, discipline: 'Reformer' },
    { id: 'c4', time: '17:45', name: 'Cadillac & Reformer Alignment', instructor: 'Elena Rostova', level: 'Open', duration: '55 min', spots: 4, discipline: 'Reformer' },
    { id: 'c5', time: '19:00', name: 'Deep Restorative Stretch', instructor: 'Elena Rostova', level: 'Gentle', duration: '50 min', spots: 6, discipline: 'Stretch' },
  ];

  const filteredSchedule = schedule.filter((c) => {
    if (selectedDiscipline === 'All') return true;
    return c.discipline === selectedDiscipline;
  });

  const tiers = [
    { name: 'Drop-In Single Class', price: '£26', desc: 'Valid for all Reformer & Cadillac classes. 30-day expiry.', popular: false },
    { name: '10-Class Package', price: '£220', desc: 'Save £40. Priority 14-day booking window & guest passes.', popular: true },
    { name: 'Unlimited Studio Club', price: '£190 / mo', desc: 'Unlimited classes, reformer towel service, and open studio access.', popular: false },
  ];

  return (
    <div className="w-full bg-[#fafaf9] text-[#1c1917] font-sans antialiased text-xs sm:text-sm">
      {/* Mini Studio Header */}
      <header className="px-6 py-4 border-b border-[#e7e5e4] bg-white sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-heading font-bold text-base tracking-tight text-[#1c1917]">Forma Studio</span>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#f5f5f4] text-[#78716c]">
            Reformer Club
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#schedule"
            className="px-3 py-1.5 rounded-full bg-[#1c1917] text-white font-medium text-xs hover:bg-[#44403c] transition-colors"
          >
            Book a Class
          </a>
        </div>
      </header>

      {/* Hero Strip */}
      <div className="py-10 px-6 bg-white border-b border-[#e7e5e4] text-center">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#78716c] mb-1 block">
          Maple Reformers · Natural Daylight · Intimate 8-Person Cap
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1c1917] mb-2 max-w-lg mx-auto">
          Precise movement. Grounded strength.
        </h2>
        <p className="text-xs text-[#78716c] max-w-md mx-auto mb-4">
          Marylebone, London · Studio open 7 days a week.
        </p>
      </div>

      {/* Interactive Class Timetable */}
      <section className="p-6 sm:p-8 max-w-3xl mx-auto" id="schedule">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-lg font-bold text-[#1c1917]">Weekly Schedule</h3>
          {/* Discipline Filter */}
          <div className="flex gap-1">
            {['All', 'Reformer', 'Core Flow', 'Stretch'].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDiscipline(d)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  selectedDiscipline === d ? 'bg-[#1c1917] text-white' : 'bg-[#f5f5f4] text-[#78716c]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Day Selector Bar */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4 border-b border-[#e7e5e4]">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-1 min-w-[48px] py-2 rounded-xl text-center transition-all ${
                selectedDay === day
                  ? 'bg-[#1c1917] text-white shadow-xs font-bold'
                  : 'bg-white border border-[#e7e5e4] text-[#78716c] hover:text-[#1c1917]'
              }`}
            >
              <div className="text-[10px] uppercase font-mono">{day}</div>
              <div className="text-xs font-semibold">{day === 'Wed' ? '15' : '16'}</div>
            </button>
          ))}
        </div>

        {/* Booking Notification */}
        {bookedClass && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between text-xs animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                Spot confirmed for <strong>{bookedClass}</strong> on {selectedDay}!
              </span>
            </div>
            <button
              onClick={() => setBookedClass(null)}
              className="text-[11px] underline font-medium"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Classes List */}
        <div className="space-y-2.5">
          {filteredSchedule.map((c) => (
            <div
              key={c.id}
              className="p-3.5 rounded-xl bg-white border border-[#e7e5e4] flex items-center justify-between gap-4 shadow-xs"
            >
              <div className="flex items-center gap-4">
                <div className="font-mono font-bold text-sm text-[#1c1917] w-12 text-center">
                  {c.time}
                </div>
                <div>
                  <div className="font-heading font-semibold text-xs text-[#1c1917]">{c.name}</div>
                  <div className="text-[11px] text-[#78716c] flex items-center gap-2 mt-0.5">
                    <span>{c.instructor}</span>
                    <span>·</span>
                    <span>{c.duration}</span>
                    <span>·</span>
                    <span className="text-amber-700 font-medium">{c.spots} spots left</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setBookedClass(c.name)}
                className="px-3.5 py-1.5 rounded-lg bg-[#f5f5f4] hover:bg-[#1c1917] hover:text-white text-[#1c1917] text-xs font-semibold transition-all border border-[#e7e5e4]"
              >
                Book Spot
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="p-6 sm:p-8 bg-[#f5f5f4] border-t border-[#e7e5e4]">
        <div className="max-w-3xl mx-auto">
          <h3 className="font-heading text-lg font-bold text-[#1c1917] text-center mb-6">
            Membership &amp; Class Packs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {tiers.map((t, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl bg-white border flex flex-col justify-between ${
                  t.popular ? 'border-[#1c1917] shadow-md relative' : 'border-[#e7e5e4]'
                }`}
              >
                {t.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#1c1917] text-white text-[9px] uppercase font-bold tracking-wider">
                    Most Popular
                  </span>
                )}
                <div>
                  <h4 className="font-heading font-semibold text-xs text-[#1c1917] mb-1">{t.name}</h4>
                  <div className="font-heading font-bold text-2xl text-[#1c1917] mb-2">{t.price}</div>
                  <p className="text-[11px] text-[#78716c] leading-relaxed mb-4">{t.desc}</p>
                </div>
                <button
                  onClick={() => setSelectedTier(t.name)}
                  className={`w-full py-2 rounded-lg text-xs font-semibold transition-all ${
                    selectedTier === t.name
                      ? 'bg-emerald-600 text-white'
                      : t.popular
                      ? 'bg-[#1c1917] text-white hover:bg-[#44403c]'
                      : 'bg-[#f5f5f4] text-[#1c1917] hover:bg-[#e7e5e4]'
                  }`}
                >
                  {selectedTier === t.name ? 'Tier Selected' : 'Select Plan'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
