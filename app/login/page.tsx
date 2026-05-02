'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useUserStore } from '@/store/useUserStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Upload, LogIn, ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const { setName, setProfilePic, login } = useUserStore();

  const [nameInput, setNameInput] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convertToBase64 = async (url: string): Promise<string | null> => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const user = session.user;
        setName(user.user_metadata.full_name || user.email?.split('@')[0] || "User");
        if (user.user_metadata.avatar_url) {
          const base64 = await convertToBase64(user.user_metadata.avatar_url);
          if (base64) setProfilePic(base64);
        }
        login();
        router.push('/home');
      }
    };
    checkUser();
  }, [router, setName, setProfilePic, login]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setProfileImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleGuestLogin = () => {
    setName("Guest User");
    setProfilePic(null);
    login();
    router.push('/home');
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/login`,
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error(error);
      setError("Google login failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  const handleManualContinue = () => {
    if (!nameInput.trim()) return;
    setName(nameInput.trim());
    if (profileImage) setProfilePic(profileImage);
    login();
    router.push('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 lg:py-0">
      {/* Decorative Orbs */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-fuchsia-600/15 rounded-full blur-[150px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Hero Text */}
          <div className="flex flex-col gap-8 text-center lg:text-left transition-all duration-700 ease-out translate-y-0 opacity-100">
            {/* Logo/Brand (visible mainly on desktop) */}
            <div className="hidden lg:flex items-center gap-3 mb-2">
               <Image src="/logo.png" alt="Greetings Logo" width={32} height={32} className="object-contain" />
               <span className="font-bold text-xl tracking-tight text-white/90 font-['Outfit']">Greetings</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] font-['Outfit'] drop-shadow-sm">
              Online Greeting<br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Ecards</span>
            </h1>
            
            <p className="text-zinc-400 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Organise a card in seconds, not days. Create beautiful, personalized wishes and gather messages effortlessly.
            </p>

            {/* Feature Bullets */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-8 lg:gap-4 justify-center lg:justify-start items-center lg:items-start text-left">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <User className="w-4 h-4 text-emerald-400" />
                 </div>
                 <span className="text-zinc-300 font-medium">Many people can sign</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center border border-teal-500/20">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                 </div>
                 <span className="text-zinc-300 font-medium">Premium designs & animations</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-2 flex items-center justify-center lg:justify-start gap-3">
              <span className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Ecards people trust</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Existing Login Card */}
          <div className="w-full max-w-md mx-auto transition-all duration-700 ease-out delay-150 translate-y-0 opacity-100">
            {/* Card Container */}
            <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 sm:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] relative overflow-hidden group/card">
              
              {/* Inner ambient glow */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-violet-500/20 rounded-full blur-[80px] group-hover/card:bg-violet-500/30 transition-colors duration-700" />
              
              {/* Header */}
              <div className="text-center mb-10 relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-white mb-2 font-['Outfit']">
                  Create for free
                </h2>
                <p className="text-zinc-400 text-sm">
                  try for free in 3s ✨
                </p>
              </div>

              {error && (
                <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-medium">
                  {error}
                </div>
              )}

              {/* Profile Picture Upload */}
              <div className="flex justify-center mb-8 relative z-10">
                <label className="cursor-pointer group flex flex-col items-center">
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-violet-400/50 transition-all duration-300 shadow-xl bg-zinc-800/50">
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        alt="Profile"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center group-hover:bg-white/5 transition-colors">
                        <User className="w-10 h-10 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                      </div>
                    )}
                    {/* Upload overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm z-20">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider mt-3 group-hover:text-violet-300 transition-colors">
                    Upload Photo
                  </p>
                </label>
              </div>

              {/* Name Input */}
              <div className="relative mb-6 z-10">
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleManualContinue()}
                  className="w-full bg-black/20 border-white/10 hover:border-white/20 focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10 h-14 text-base placeholder:text-zinc-500 rounded-2xl transition-all duration-300 shadow-inner px-5"
                />
              </div>

              {/* Continue Button */}
              <Button 
                onClick={handleManualContinue} 
                className="relative w-full h-14 text-base font-semibold mb-6 bg-emerald-500 text-white hover:bg-emerald-400 rounded-2xl transition-all duration-300 group overflow-hidden z-10 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 active:translate-y-0"
                disabled={!nameInput.trim()}
              >
                <span className="relative z-10 flex items-center justify-center">
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </Button>

              {/* Divider */}
              <div className="relative my-6 z-10">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-zinc-900/40 backdrop-blur-sm px-4 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500 rounded-full">
                    or
                  </span>
                </div>
              </div>

              {/* Google Button */}
              <Button
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                variant="outline"
                className="w-full h-14 text-sm font-medium border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 z-10 shadow-sm"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.51h5.92c-.25 1.22-.98 2.26-2.07 2.96v2.59h3.34c1.95-1.8 3.07-4.44 3.07-7.81z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.34-2.59c-.93.63-2.12 1-3.94 1-3.03 0-5.6-2.05-6.52-4.8H2.07v3.02C3.85 20.5 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.48 14.95c-.23-.69-.36-1.42-.36-2.2s.13-1.51.36-2.2V7.3H2.07C1.38 8.78 1 10.36 1 12s.38 3.22 1.07 4.7l3.41-2.75z" fill="#FBBC05"/>
                  <path d="M12 4.54c1.69 0 3.19.59 4.38 1.74l3.28-3.28C17.46 1.1 14.9 0 12 0 7.7 0 3.85 2.5 2.07 6.3l3.41 2.65C6.4 6.59 8.97 4.54 12 4.54z" fill="#EA4335"/>
                </svg>
                {googleLoading ? "Signing in..." : "Continue with Google"}
              </Button>

              {/* Guest */}
              <button
                onClick={handleGuestLogin}
                className="w-full mt-4 py-3 text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors duration-200 flex items-center justify-center gap-2 group z-10 relative"
              >
                <LogIn className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Sign Sample (Guest)
              </button>
            </div>

            {/* Footer text */}
            <p className="text-center text-[10px] text-zinc-600 mt-6 font-medium">
              By continuing, you agree to our Terms of Service & Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}