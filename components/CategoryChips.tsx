'use client';

import { categories } from '@/lib/templates';
import { Sparkles, Heart, Cake, Gift, PartyPopper, Zap, LayoutGrid } from 'lucide-react';

interface CategoryChipsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryChips({ selectedCategory, onCategoryChange }: CategoryChipsProps) {
  const categoryIcons: Record<string, React.ReactNode> = {
    'All': <LayoutGrid className="w-4 h-4" />,
    'Love': <Heart className="w-4 h-4" />,
    'Birthday': <Cake className="w-4 h-4" />,
    'Anniversary': <Gift className="w-4 h-4" />,
    'Festival': <PartyPopper className="w-4 h-4" />,
    'Motivation': <Zap className="w-4 h-4" />,
  };

  return (
    <div className="flex gap-2.5 overflow-x-auto pb-8 px-1 scrollbar-hide">
      {categories.map((category, index) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`group relative px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 active:scale-95
            ${selectedCategory === category
              ? 'bg-white text-zinc-900 shadow-lg shadow-white/10'
              : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white border border-white/[0.06] hover:border-white/[0.12]'
            }`}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <span className="flex items-center gap-2">
            <span className="opacity-70 group-hover:opacity-100 transition-opacity">
              {categoryIcons[category] || <Sparkles className="w-4 h-4" />}
            </span>
            {category}
          </span>

          {/* Active indicator dot */}
          {selectedCategory === category && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-violet-400 rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}