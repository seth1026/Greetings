'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { templates, Template } from '@/lib/templates';
import GreetingCard from '@/components/GreetingCard';
import { useUserStore } from '@/store/useUserStore';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Share2, Loader2, Sparkles } from 'lucide-react';
import PremiumModal from '@/components/PremiumModal';
import domtoimage from 'dom-to-image';

export default function PreviewPage() {
  const params = useParams();
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const { name, profilePic } = useUserStore();
  const [template, setTemplate] = useState<Template | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [safeProfilePic, setSafeProfilePic] = useState<string>('/fallback.png');

  const convertToBase64 = async (url: string) => {
    try {
      const res = await fetch(url);
      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType?.includes("image")) return url;
      const blob = await res.blob();
      return await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch { return url; }
  };

  useEffect(() => {
    const found = templates.find(t => t.id === params.id);
    if (found) setTemplate(found);
    else router.push('/home');
  }, [params.id, router]);

  useEffect(() => {
    if (!profilePic) return;
    convertToBase64(profilePic).then((img) => setSafeProfilePic(img || '/fallback.png'));
  }, [profilePic]);

  const waitForAssets = async () => {
    await document.fonts.ready;
    const images = Array.from(document.images);
    await Promise.all(images.map(img => new Promise(resolve => {
      if (img.complete) return resolve(true);
      img.onload = img.onerror = () => resolve(true);
    })));
  };

  const generateImage = async (): Promise<string> => {
    if (!cardRef.current) throw new Error('Card not found');
    await waitForAssets();
    return await domtoimage.toPng(cardRef.current, { quality: 1, bgcolor: '#000000' });
  };

  const handleDownload = async () => {
    if (!template) return;
    if (template.isPremium) { setShowPremiumModal(true); return; }
    setIsGenerating(true);
    try {
      const dataUrl = await generateImage();
      const link = document.createElement('a');
      link.download = `${template.title.replace(/[^a-z0-9]/gi, '_')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
      alert('Could not generate image. Please try again.');
    } finally { setIsGenerating(false); }
  };

  const handleShare = async () => {
    if (!template) return;
    if (template.isPremium) { setShowPremiumModal(true); return; }
    setIsGenerating(true);
    try {
      const dataUrl = await generateImage();
      const blob = await fetch(dataUrl).then(r => r.blob());
      const file = new File([blob], `${template.title}.png`, { type: 'image/png' });
      if (navigator.share) {
        await navigator.share({ files: [file], title: template.title });
      } else { handleDownload(); }
    } catch (error) {
      console.error('Share failed:', error);
      handleDownload();
    } finally { setIsGenerating(false); }
  };

  if (!template) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center gap-3 text-zinc-500 text-sm">
        <Loader2 className="w-5 h-5 animate-spin" /> Loading template...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-zinc-950/60 backdrop-blur-2xl border-b border-white/10 shadow-lg shadow-black/20">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium transition-colors group">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            Back
          </button>
          <div className="flex items-center gap-3">
            <h1 className="font-semibold text-sm text-white/90">{template.title}</h1>
            {template.isPremium && (
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-md flex items-center gap-1 tracking-wider">
                <Sparkles className="w-3 h-3" /> PRO
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-10 pb-20 flex flex-col items-center">
        {/* Card */}
        <div ref={cardRef} className="mb-12 w-full max-w-[380px] opacity-0 animate-[scaleIn_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards]">
          <GreetingCard template={template} userName={name} profilePic={safeProfilePic} isPreview={true} />
        </div>

        {/* Quote Section */}
        <div className="text-center mb-12 max-w-md opacity-0 animate-[fadeInUp_0.6s_ease_forwards] delay-200 w-full">
          <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-950 px-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold">
              Template Quote
            </div>
            <p className="text-white/80 text-base leading-relaxed italic font-serif">
              &ldquo;{template.defaultQuote}&rdquo;
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md opacity-0 animate-[fadeInUp_0.6s_ease_forwards] delay-300">
          <Button onClick={handleDownload} disabled={isGenerating} className="flex-1 h-14 text-sm font-semibold bg-white text-zinc-950 hover:bg-zinc-200 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 active:translate-y-0">
            {isGenerating ? <Loader2 className="animate-spin mr-2 w-5 h-5" /> : <Download className="mr-2 w-5 h-5" />}
            Download High-Res
          </Button>
          <Button onClick={handleShare} disabled={isGenerating} variant="outline" className="flex-1 h-14 text-sm font-semibold border-white/10 bg-zinc-900/50 hover:bg-zinc-800 rounded-2xl transition-all">
            <Share2 className="mr-2 w-5 h-5" /> Share Link
          </Button>
        </div>
      </div>

      <PremiumModal open={showPremiumModal} onClose={() => setShowPremiumModal(false)} />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}