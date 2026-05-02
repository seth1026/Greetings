import Link from 'next/link';
import Image from 'next/image';
import { Mail, Globe, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/5 bg-zinc-950/50 backdrop-blur-xl relative z-20">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 opacity-80 hover:opacity-100 transition-opacity">
              <Image 
                src="/logo.png" 
                alt="Greetings Logo" 
                fill 
                className="object-contain" 
              />
            </div>
            <span className="font-semibold text-lg tracking-tight text-white/80 font-['Outfit']">
              Greetings
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-zinc-500 font-medium">
            <Link href="#" className="hover:text-violet-400 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-violet-400 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-violet-400 transition-colors">Contact</Link>
          </div>

          {/* Socials / Links */}
          <div className="flex items-center gap-4 text-zinc-500">
            <a href="#" className="hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
              <Mail className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
              <Heart className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center justify-center gap-2">
          <p className="text-xs text-zinc-600 font-medium">
            &copy; {currentYear} Greetings Inc. All rights reserved.
          </p>
          <p className="text-[10px] text-zinc-700 uppercase tracking-widest">
            Made with 💜 for special moments
          </p>
        </div>
      </div>
    </footer>
  );
}
