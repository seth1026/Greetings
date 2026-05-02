'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import { Loader2 } from 'lucide-react';

export default function RootPage() {
  const router = useRouter();
  const { isLoggedIn } = useUserStore();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/home');
    } else {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center gap-3 text-zinc-500">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm font-medium">Redirecting...</span>
      </div>
    </div>
  );
}