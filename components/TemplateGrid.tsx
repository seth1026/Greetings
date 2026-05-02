'use client';

import { Template } from '@/lib/templates';
import GreetingCard from './GreetingCard';
import { useUserStore } from '@/store/useUserStore';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface TemplateGridProps {
  templates: Template[];
  selectedCategory: string;
}

export default function TemplateGrid({ templates, selectedCategory }: TemplateGridProps) {
  const { name, profilePic, isPremium } = useUserStore();

  const filteredTemplates = selectedCategory === "All" 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 pb-16">
      {filteredTemplates.map((template, index) => (
        <Link 
          key={template.id} 
          href={`/preview/${template.id}`}
          className="group"
        >
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.6, 
              ease: [0.22, 1, 0.36, 1],
              delay: (index % 3) * 0.1 // Stagger row by row
            }}
            className="space-y-4 transition-all duration-500 group-hover:-translate-y-2"
          >
            {/* Card Container */}
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/5 group-hover:ring-violet-500/30 transition-all duration-500">
              <GreetingCard 
                template={template} 
                userName={name} 
                profilePic={profilePic}
                priority={index < 4}
              />

              {/* Hover overlay for tint */}
              <div className="absolute inset-0 bg-violet-500/0 group-hover:bg-violet-500/10 transition-colors duration-500 rounded-3xl pointer-events-none mix-blend-overlay" />

              {/* Premium lock overlay */}
              {template.isPremium && !isPremium && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 backdrop-blur-[0px] group-hover:backdrop-blur-sm transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                  <div className="bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Lock className="w-6 h-6 text-amber-400 drop-shadow-md" />
                  </div>
                </div>
              )}
            </div>
            
            {/* Card Meta */}
            <div className="px-2 flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-white/90 group-hover:text-white transition-colors duration-300">
                  {template.title}
                </p>
                <p className="text-xs text-zinc-500 mt-1">{template.category}</p>
              </div>
              {template.isPremium && !isPremium && (
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-md tracking-wider">
                  PRO
                </span>
              )}
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}