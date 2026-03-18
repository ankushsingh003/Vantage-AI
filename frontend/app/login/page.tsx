"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Layers, LogIn, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate login delay
    setTimeout(() => {
      localStorage.setItem("vantage_session", "active");
      router.push(redirectPath);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#FBF9F4] dark:bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#A1F28B]/10 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-2xl border border-white dark:border-white/5 shadow-2xl rounded-[40px] p-8 md:p-10">
          <div className="flex flex-col items-center gap-6 mb-10 text-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-12 w-12 bg-[#A1F28B] rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:rotate-12 shadow-lg">
                <Layers className="text-[#143D2C] w-6 h-6" />
              </div>
              <div className="flex flex-col items-start translate-y-1">
                <span className="text-xl font-black tracking-tighter dark:text-white uppercase leading-none">Vantage <span className="text-[#A1F28B]">AI</span></span>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-300 tracking-[0.2em] uppercase">Intelligence</span>
              </div>
            </Link>
            
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-black tracking-tighter text-[#143D2C] dark:text-white leading-tight">
                SECURE <span className="text-emerald-500">ACCESS.</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">
                Enter your credentials to continue
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@enterprise.com"
                  className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all dark:text-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Access Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-2 mt-1">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="accent-emerald-500 w-3.5 h-3.5" />
                <label htmlFor="remember" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider cursor-pointer">Remember Me</label>
              </div>
              <button type="button" className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider hover:underline">Forgot Key?</button>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full bg-[#143D2C] dark:bg-[#A1F28B] text-[#A1F28B] dark:text-[#143D2C] py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl relative overflow-hidden disabled:opacity-70"
            >
              {isSubmitting ? (
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Authorize Access <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-slate-100 dark:border-white/5 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/60" />
              Enterprise Governance Protocol Active
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              New to Vantage? <button className="text-emerald-500 font-bold uppercase tracking-wider ml-1 hover:underline">Request Invitation</button>
            </p>
          </div>
        </div>
        
        <p className="text-center mt-8 text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] opacity-60">
          Vantage AI Intelligence System // V2.0.0
        </p>
      </motion.div>
    </main>
  );
}
