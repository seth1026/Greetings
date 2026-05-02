'use client';

import { useUserStore } from '@/store/useUserStore';
import { LogOut, User, Sparkles, Crown } from 'lucide-react';
import Link from 'next/link';
import { logoutUser } from '@/lib/auth';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const { name, profilePic, isPremium } = useUserStore();
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for navbar blur effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-zinc-950/60 backdrop-blur-2xl border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
            <Image 
              src="/logo.png" 
              alt="Greetings Logo" 
              fill 
              className="object-contain drop-shadow-md" 
            />
          </div>
          <span className="font-bold text-xl tracking-tight text-white/90 group-hover:text-white transition-colors font-['Outfit']">
            Greetings
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Nav Link */}
          <Link
            href="/home"
            className="hidden sm:flex items-center px-4 py-2 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            Home
          </Link>

          {/* Divider */}
          <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block" />

          {/* Profile Section */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-white/90 leading-tight">{name}</p>
              {isPremium && (
                <p className="text-[10px] font-semibold text-amber-400 flex items-center gap-1 justify-end mt-0.5">
                  <Crown className="w-3 h-3" /> Premium
                </p>
              )}
            </div>

            <div className="relative group">
              <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-violet-500/50 transition-all duration-300 shadow-md bg-zinc-800 relative">
                {profilePic ? (
                  <Image
                    src={profilePic}
                    alt="Profile"
                    fill
                    className="object-cover"
                    unoptimized={profilePic?.startsWith('data:')}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
                    <User className="w-4 h-4 text-white/80" />
                  </div>
                )}
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-zinc-950" />
            </div>

            <button
              onClick={handleLogout}
              className="p-2 ml-1 hover:bg-red-500/10 rounded-xl transition-all duration-200 active:scale-95 group"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4 text-zinc-500 group-hover:text-red-400 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}