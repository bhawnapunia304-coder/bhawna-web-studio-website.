import React, { useState } from 'react';
import { ShoppingBag, Check, Heart, ArrowRight } from 'lucide-react';

export const AtelierPreview: React.FC = () => {
  const [bagCount, setBagCount] = useState(1);
  const [bagTotal, setBagTotal] = useState(240);
  const [activeCategory, setActiveCategory] = useState('All');
  const [addedItemToast, setAddedItemToast] = useState<string | null>(null);

  const products = [
    { id: 1, name: 'Architectural Trench Coat', category: 'Coats', price: 340, color: 'Raw Sand', sizes: ['S', 'M', 'L'] },
    { id: 2, name: 'Heavyweight Linen Blazer', category: 'Coats', price: 240, color: 'Bone White', sizes: ['S', 'M'] },
    { id: 3, name: 'Chunky Wool Turtleneck', category: 'Knitwear', price: 185, color: 'Oatmeal', sizes: ['M', 'L'] },
    { id: 4, name: 'Pleated Wide Trousers', category: 'Trousers', price: 195, color: 'Charcoal', sizes: ['S', 'M', 'L'] },
    { id: 5, name: 'Textured Rib Crewneck', category: 'Knitwear', price: 160, color: 'Natural Taupe', sizes: ['S', 'M'] },
    { id: 6, name: 'Relaxed Drawstring Pant', category: 'Trousers', price: 175, color: 'Stone', sizes: ['M', 'L'] },
  ];

  const filteredProducts = products.filter((p) => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  const handleAddToBag = (product: typeof products[0]) => {
    setBagCount((prev) => prev + 1);
    setBagTotal((prev) => prev + product.price);
    setAddedItemToast(`${product.name} added to your bag`);
    setTimeout(() => setAddedItemToast(null), 2500);
  };

  return (
    <div className="w-full bg-[#fcfbf9] text-[#1c1917] font-sans antialiased text-xs sm:text-sm">
      {/* Mini Store Header */}
      <header className="px-6 py-4 border-b border-[#e7e5e4] bg-[#fcfbf9] sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-serif tracking-widest text-base uppercase font-bold text-[#1c1917]">
            A T E L I E R
          </span>
          <span className="text-[10px] text-[#78716c] font-mono">Capsule Edition 04</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#e7e5e4] shadow-xs">
            <ShoppingBag className="w-3.5 h-3.5 text-[#1c1917]" />
            <span className="font-mono text-xs font-semibold">{bagCount} items</span>
            <span className="text-[#78716c]">·</span>
            <span className="font-mono text-xs text-[#1c1917] font-semibold">£{bagTotal}</span>
          </div>
        </div>
      </header>

      {addedItemToast && (
        <div className="bg-[#1c1917] text-white text-xs px-4 py-2 flex items-center justify-between animate-fadeIn">
          <span>{addedItemToast}</span>
          <span className="underline font-semibold cursor-pointer">Checkout (£{bagTotal})</span>
        </div>
      )}

      {/* Hero Strip */}
      <div className="py-8 px-6 text-center border-b border-[#e7e5e4] bg-white">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#78716c] block mb-1">
          Autumn / Winter 2026 Capsule
        </span>
        <h2 className="font-serif text-2xl text-[#1c1917] font-normal max-w-md mx-auto">
          Tactile textures, architectural silhouettes, timeless longevity.
        </h2>
      </div>

      {/* Category Filter */}
      <div className="px-6 py-4 flex justify-center gap-2 border-b border-[#e7e5e4]">
        {['All', 'Coats', 'Knitwear', 'Trousers'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs transition-all ${
              activeCategory === cat
                ? 'bg-[#1c1917] text-white font-medium'
                : 'text-[#78716c] hover:text-[#1c1917]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="p-6 sm:p-8 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="p-4 rounded-xl bg-white border border-[#e7e5e4] flex flex-col justify-between shadow-xs hover:border-[#1c1917] transition-all"
          >
            <div>
              <div className="h-44 bg-[#f5f5f4] rounded-lg mb-3 flex items-center justify-center text-[#78716c] relative p-3">
                <span className="text-center font-serif text-sm italic">{p.name}</span>
                <span className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-xs">
                  <Heart className="w-3 h-3 text-[#78716c]" />
                </span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-xs text-[#1c1917]">{p.name}</h4>
                <span className="font-mono font-semibold text-xs text-[#1c1917]">£{p.price}</span>
              </div>
              <div className="text-[11px] text-[#78716c] mb-3">{p.color}</div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#e7e5e4]">
              <div className="flex gap-1 text-[10px] font-mono text-[#78716c]">
                {p.sizes.map((s) => (
                  <span key={s} className="px-1.5 py-0.5 rounded bg-[#f5f5f4]">
                    {s}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleAddToBag(p)}
                className="px-3 py-1 rounded-md bg-[#1c1917] text-white text-[11px] font-medium hover:bg-[#44403c] transition-colors"
              >
                Add to Bag
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
