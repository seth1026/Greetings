'use client';

import { useState, useEffect } from 'react';
import { templates } from '@/lib/templates';
import CategoryChips from '@/components/CategoryChips';
import TemplateGrid from '@/components/TemplateGrid';
import Navbar from '@/components/Navbar';
import { useUserStore } from '@/store/useUserStore';
import { Search, Sun, CloudSun, Moon, Sparkles, Ghost } from 'lucide-react';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

function getGreetingIcon(): React.ReactNode {
  const hour = new Date().getHours();
  if (hour < 12) return <Sun className="w-8 h-8 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />;
  if (hour < 17) return <CloudSun className="w-8 h-8 text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.4)]" />;
  return <Moon className="w-8 h-8 text-indigo-300 drop-shadow-[0_0_8px_rgba(165,180,252,0.4)]" />;
}

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { name } = useUserStore();
  const [greeting, setGreeting] = useState('Hello');
  const [icon, setIcon] = useState<React.ReactNode>(<Sparkles className="w-8 h-8 text-violet-400" />);

  useEffect(() => {
    setGreeting(getGreeting());
    setIcon(getGreetingIcon());
  }, []);

  const filteredBySearch = searchQuery.trim()
    ? templates.filter(t => 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.defaultQuote.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : templates;

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-10 pb-8">
        {/* Hero Header */}
        <div className="mb-10 transition-all duration-700 ease-out translate-y-0 opacity-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-sm">
              {icon}
            </div>
            <span className="text-sm font-semibold text-violet-400 tracking-[0.15em] uppercase">
              {greeting}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-['Outfit'] drop-shadow-sm">
            {name.split(" ")[0]}, what are you
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent" style={{ backgroundSize: '200% auto', animation: 'gradient 4s linear infinite' }}>
              creating today?
            </span>
          </h1>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes gradient {
              0% { background-position: 0% center; }
              100% { background-position: 200% center; }
            }
          `}} />
        </div>

        {/* Search Bar */}
        <div className="mb-8 transition-all duration-700 ease-out delay-150 translate-y-0 opacity-100">
          <div className="relative max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-violet-400 transition-colors duration-300" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/50 backdrop-blur-md border border-white/10 hover:border-white/20 focus:border-violet-500/50 focus:bg-zinc-900/80 rounded-2xl pl-12 pr-4 py-4 text-sm text-white placeholder:text-zinc-500 outline-none transition-all duration-300 shadow-inner"
            />
          </div>
        </div>

        {/* Category Chips */}
        <div className="mb-8 transition-all duration-700 ease-out delay-300 translate-y-0 opacity-100">
          <CategoryChips 
            selectedCategory={selectedCategory} 
            onCategoryChange={setSelectedCategory} 
          />
        </div>

        {/* Template Grid */}
        <div className="transition-all duration-700 ease-out delay-500 translate-y-0 opacity-100">
          <TemplateGrid 
            templates={filteredBySearch} 
            selectedCategory={selectedCategory} 
          />
        </div>

        {/* Empty State */}
        {filteredBySearch.length === 0 && (
          <div className="text-center py-24 bg-zinc-900/30 backdrop-blur-sm rounded-3xl border border-white/5 mt-8 flex flex-col items-center">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
              <Ghost className="w-8 h-8 text-zinc-600 animate-bounce" />
            </div>
            <p className="text-zinc-400 text-sm font-medium">No templates found for &ldquo;<span className="text-white">{searchQuery}</span>&rdquo;</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-4 text-violet-400 hover:text-violet-300 text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}