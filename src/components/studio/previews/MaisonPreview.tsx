import React, { useState } from 'react';
import { Calendar, Clock, Users, CheckCircle2, Utensils, Phone, ArrowRight } from 'lucide-react';

export const MaisonPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'starters' | 'mains' | 'desserts' | 'wines'>('mains');
  const [partySize, setPartySize] = useState('2 Guests');
  const [date, setDate] = useState('2026-10-15');
  const [time, setTime] = useState('19:30');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const menuItems = {
    starters: [
      { name: 'Heirloom Tomato Tartare', price: '£14', desc: 'Shallot vinaigrette, grilled sourdough, basil emulsion', tag: 'Vegan' },
      { name: 'Hand-Dived Scallops', price: '£18', desc: 'Cauliflower purée, brown butter caper glaze, sea herbs', tag: 'GF' },
      { name: 'French Onion Velouté', price: '£12', desc: 'Aged Comté croûton, caramelized thyme broth', tag: 'Classic' },
    ],
    mains: [
      { name: 'Pan-Roasted Halibut', price: '£32', desc: 'Braised leeks, saffron mussel broth, samphire', tag: 'GF' },
      { name: 'Dry-Aged Duck Breast', price: '£29', desc: 'Heritage beetroot, pickled blackberries, port reduction', tag: 'Signature' },
      { name: 'Wild Mushroom Pithivier', price: '£24', desc: 'Truffled potato mousseline, charred baby onions, thyme jus', tag: 'Vegetarian' },
    ],
    desserts: [
      { name: 'Dark Chocolate Fondant', price: '£11', desc: 'Salted caramel core, Madagascan vanilla bean gelato', tag: 'Popular' },
      { name: 'Tarte Tatin for Two', price: '£16', desc: 'Caramelized Braeburn apples, Normandy crème fraîche', tag: 'Classic' },
      { name: 'Citrus Pavlova', price: '£10', desc: 'Yuzu curd, blood orange segments, mint crisp', tag: 'GF' },
    ],
    wines: [
      { name: '2022 Domaine Chablis Premier Cru', price: '£14 / glass', desc: 'Crisp minerality, green apple, flint', tag: 'White' },
      { name: '2019 Château Margaux Bordeaux', price: '£18 / glass', desc: 'Dark cherries, cedar spice, structured tannins', tag: 'Red' },
      { name: 'NV Billecart-Salmon Brut Rosé', price: '£22 / glass', desc: 'Wild strawberry, fine effervescence, brioche', tag: 'Champagne' },
    ],
  };

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) return;
    setBookingConfirmed(true);
  };

  return (
    <div className="w-full bg-[#fbf9f5] text-[#1c1917] font-sans antialiased text-xs sm:text-sm">
      {/* Mini Restaurant Header */}
      <header className="px-6 py-4 border-b border-[#e7e2d9] bg-[#fbf9f5]/95 sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-serif text-lg font-bold tracking-tight text-[#1c1917]">Maison 27</span>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#f5f2eb] text-[#78716c] border border-[#e7e2d9]">
            Bistro &amp; Bar
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-[#78716c]">
          <span className="hidden sm:inline">27 Rue des Martyrs, Paris</span>
          <a
            href="#reservation-form"
            className="px-3 py-1.5 rounded-full bg-[#c25e3e] text-white font-semibold text-xs hover:bg-[#9a3412] transition-colors"
          >
            Book Table
          </a>
        </div>
      </header>

      {/* Mini Hero Banner */}
      <div className="relative py-12 px-6 bg-[#f5f2eb] border-b border-[#e7e2d9] text-center">
        <span className="text-[11px] uppercase tracking-widest text-[#c25e3e] font-semibold mb-2 block font-mono">
          Autumn Seasonal Tasting Menu
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#1c1917] font-normal mb-3 max-w-lg mx-auto">
          Honest French cooking rooted in European provenance.
        </h2>
        <p className="text-xs text-[#78716c] max-w-md mx-auto mb-6">
          Lunch service Wednesday to Sunday · Dinner service Tuesday to Saturday.
        </p>
        <div className="flex justify-center gap-3">
          <a
            href="#menu-section"
            className="px-4 py-2 rounded-full bg-white border border-[#e7e2d9] text-xs font-medium text-[#1c1917] hover:bg-[#fbf9f5] transition-colors"
          >
            Explore Menu
          </a>
          <a
            href="#reservation-form"
            className="px-4 py-2 rounded-full bg-[#c25e3e] text-white text-xs font-semibold hover:bg-[#9a3412] transition-colors"
          >
            Reserve Online
          </a>
        </div>
      </div>

      {/* Interactive Menu Section */}
      <section className="p-6 sm:p-8 max-w-3xl mx-auto" id="menu-section">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#e7e2d9]">
          <h3 className="font-serif text-xl font-medium text-[#1c1917]">Seasonal Carte</h3>
          {/* Tab Selector */}
          <div className="flex gap-1 bg-[#f5f2eb] p-1 rounded-full border border-[#e7e2d9]">
            {(['starters', 'mains', 'desserts', 'wines'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-white text-[#1c1917] shadow-xs'
                    : 'text-[#78716c] hover:text-[#1c1917]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items List */}
        <div className="space-y-4">
          {menuItems[activeTab].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-[#e7e2d9] flex items-start justify-between gap-4 shadow-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-medium text-sm text-[#1c1917]">{item.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#f5f2eb] text-[#c25e3e] font-mono">
                    {item.tag}
                  </span>
                </div>
                <p className="text-xs text-[#78716c] mt-1">{item.desc}</p>
              </div>
              <span className="font-serif font-semibold text-sm text-[#1c1917] shrink-0">{item.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Reservation Form */}
      <section className="p-6 sm:p-8 bg-[#f5f2eb] border-t border-[#e7e2d9]" id="reservation-form">
        <div className="max-w-xl mx-auto bg-white p-6 sm:p-7 rounded-2xl border border-[#e7e2d9] shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#e7e2d9]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#c25e3e] font-semibold block">
                Instant Confirmation
              </span>
              <h4 className="font-serif text-lg font-medium text-[#1c1917]">Reserve Your Table</h4>
            </div>
            <Utensils className="w-5 h-5 text-[#c25e3e]" />
          </div>

          {bookingConfirmed ? (
            <div className="p-5 rounded-xl bg-[#f0fdf4] border border-[#dcfce7] text-[#166534] space-y-2 text-center animate-fadeIn">
              <CheckCircle2 className="w-8 h-8 text-[#16a34a] mx-auto mb-1" />
              <div className="font-serif text-base font-semibold">Table Reserved at Maison 27!</div>
              <p className="text-xs">
                Reservation confirmed for <strong>{guestName}</strong> ({partySize}) on{' '}
                <strong>{date}</strong> at <strong>{time}</strong>. An SMS confirmation was sent to{' '}
                <strong>{guestPhone}</strong>.
              </p>
              <button
                onClick={() => setBookingConfirmed(false)}
                className="mt-3 px-4 py-1.5 rounded-full bg-[#16a34a] text-white text-xs font-semibold hover:bg-[#15803d] transition-colors"
              >
                Modify or Make Another Booking
              </button>
            </div>
          ) : (
            <form onSubmit={handleReservation} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[#78716c] mb-1 font-medium">Guests</label>
                  <select
                    value={partySize}
                    onChange={(e) => setPartySize(e.target.value)}
                    className="w-full h-9 px-2 rounded-lg bg-[#fbf9f5] border border-[#e7e2d9] text-[#1c1917]"
                  >
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests</option>
                    <option value="4 Guests">4 Guests</option>
                    <option value="6 Guests">6 Guests</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#78716c] mb-1 font-medium">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full h-9 px-2 rounded-lg bg-[#fbf9f5] border border-[#e7e2d9] text-[#1c1917]"
                  />
                </div>
                <div>
                  <label className="block text-[#78716c] mb-1 font-medium">Time</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full h-9 px-2 rounded-lg bg-[#fbf9f5] border border-[#e7e2d9] text-[#1c1917]"
                  >
                    <option value="18:00">18:00</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:30">20:30</option>
                    <option value="21:15">21:15</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#78716c] mb-1 font-medium">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Julian Moreau"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-[#fbf9f5] border border-[#e7e2d9] text-[#1c1917]"
                  />
                </div>
                <div>
                  <label className="block text-[#78716c] mb-1 font-medium">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+33 6 12 34 56 78"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-[#fbf9f5] border border-[#e7e2d9] text-[#1c1917]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-10 rounded-full bg-[#c25e3e] hover:bg-[#9a3412] text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Confirm Table Reservation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
