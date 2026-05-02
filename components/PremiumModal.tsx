'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown, Check, Sparkles, Palette, Camera, Zap, Heart } from 'lucide-react';
import { useUserStore } from '@/store/useUserStore';

interface PremiumModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PremiumModal({ open, onClose }: PremiumModalProps) {
  const [loading, setLoading] = useState(false);
  const setPremium = useUserStore((state) => state.setPremium);

  const handlePayment = () => {
    setLoading(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);

    script.onload = () => {
      const options = {
        key: "rzp_test_SkaX2JMIWLAo88",
        amount: 9900,
        currency: "INR",
        name: "Greetings App",
        description: "Premium Subscription - Monthly",
        handler: function (response: any) {
          alert("Payment Successful! You are now a Premium User!");
          setPremium(true);
          onClose();
        },
        prefill: {
          name: "Nikhil Seth",
          email: "nikhil@example.com",
        },
        theme: { color: "#a78bfa" },
      };

      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
    };

    setLoading(false);
  };

  const features = [
    { text: "Unlimited Premium Templates", icon: <Palette className="w-4 h-4 text-violet-400" /> },
    { text: "HD Downloads", icon: <Camera className="w-4 h-4 text-blue-400" /> },
    { text: "No Watermarks", icon: <Zap className="w-4 h-4 text-amber-400" /> },
    { text: "Festive & Romantic Designs", icon: <Heart className="w-4 h-4 text-pink-400" /> },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-zinc-950/95 backdrop-blur-2xl border-white/[0.08] text-white rounded-2xl p-0 overflow-hidden">
        {/* Gradient header */}
        <div className="relative px-8 pt-10 pb-6 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent pointer-events-none" />
          <DialogHeader className="relative">
            <div className="mx-auto mb-5 h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold tracking-tight">Go Premium</DialogTitle>
            <DialogDescription className="mt-1.5 text-zinc-500 text-sm">
              Unlock all exclusive templates & features
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-8 pb-8">
          {/* Price */}
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 mb-6 text-center">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold text-white">₹99</span>
              <span className="text-zinc-500 text-sm">/ month</span>
            </div>
            <p className="text-[10px] text-zinc-600 mt-1 uppercase tracking-wider">Cancel anytime</p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-8">
            {features.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-sm flex-shrink-0">
                  {item.icon}
                </div>
                <span className="text-sm text-zinc-300">{item.text}</span>
                <Check className="w-4 h-4 text-emerald-500/70 ml-auto flex-shrink-0" />
              </div>
            ))}
          </div>

          {/* CTA */}
          <Button
            onClick={handlePayment}
            disabled={loading}
            className="w-full py-6 text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-200"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {loading ? "Opening Razorpay..." : "Upgrade for ₹99/mo"}
          </Button>

          <button
            onClick={onClose}
            className="w-full mt-3 py-3 text-xs text-zinc-600 hover:text-zinc-400 transition-colors text-center"
          >
            Maybe later
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}