'use client';

import React from 'react';
import { Template } from '@/lib/templates';
import { User, Star } from 'lucide-react';
import Image from 'next/image';

interface GreetingCardProps {
  template: Template;
  userName: string;
  profilePic: string | null;
  className?: string;
  isPreview?: boolean;
}

export default function GreetingCard({
  template,
  userName,
  profilePic,
  className = "",
  isPreview = false,
}: GreetingCardProps) {

  return (
    <div
      id="greeting-card"
      className={`group relative w-full aspect-[9/16] max-w-[380px] mx-auto rounded-3xl overflow-hidden bg-zinc-950 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] ring-1 ring-white/5 transition-all duration-500 ease-out
        ${!isPreview ? 'cursor-pointer hover:shadow-[0_30px_60px_-15px_rgba(139,92,246,0.3)] hover:ring-white/10' : ''}
        ${className}`}
    >
      {/* Background Image */}
      <Image
        src={template.imageUrl}
        alt={template.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={isPreview}
        unoptimized={false}
      />

      {/* Top gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10" />

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />

      {/* Profile Picture */}
      <div className="absolute top-6 left-6 z-30">
        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/40 shadow-xl backdrop-blur-md transition-transform duration-500 group-hover:scale-110 group-hover:ring-white/60 relative bg-zinc-800">
          {profilePic ? (
            <Image
              src={profilePic}
              alt="Profile"
              fill
              className="object-cover"
              unoptimized={profilePic.startsWith('data:')} // Can't optimize base64 easily
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <User className="w-6 h-6 text-white/90" />
            </div>
          )}
        </div>
      </div>

      {/* User Name Badge */}
      <div className="absolute top-7 left-[80px] z-20">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-2 shadow-lg">
          <p className="text-white text-sm font-semibold tracking-wide">
            {userName || "Your Name"}
          </p>
        </div>
      </div>

      {/* Premium Badge */}
      {template.isPremium && (
        <div className="absolute top-6 right-6 z-30">
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-lg shadow-amber-500/20 ring-1 ring-white/20">
            <Star className="w-3 h-3 fill-white" />
            <span>Premium</span>
          </div>
        </div>
      )}

      {/* Quote */}
      <div className="absolute bottom-10 left-6 right-6 text-center z-20">
        <p className="text-white/95 text-lg leading-relaxed font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          &ldquo;{template.defaultQuote}&rdquo;
        </p>
      </div>

      {/* Card Shine effect on hover */}
      {!isPreview && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-40 pointer-events-none overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
        </div>
      )}
    </div>
  );
}