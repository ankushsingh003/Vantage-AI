"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  Target, 
  TrendingUp, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Layers,
  Sparkles,
  Globe,
  Rocket
} from "lucide-react";
import Link from "next/link";

type Step = 1 | 2 | 3 | 4;

export default function ConsultancyPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    domain: "",
    purpose: "",
    goal: ""
  });

  useEffect(() => {
    const session = localStorage.getItem("vantage_session");
    if (!session) {
      router.push("/login?redirect=/consultancy");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FBF9F4] dark:bg-[#020617] flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const nextStep = () => setStep((s) => (s + 1) as Step);
  const prevStep = () => setStep((s) => (s - 1) as Step);

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const industries = [
    "Healthcare & Pharma",
    "Finance & Fintech",
    "Retail & E-commerce",
    "Energy & Sustainability",
    "Technology & AI",
    "Manufacturing & Logistics",
    "Automobiles & Mobility",
    "Real Estate"
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            key="step1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-2">
              <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.3em]">Step 01 / 03</span>
              <h2 className="text-4xl font-black tracking-tighter text-[#143D2C] dark:text-white leading-tight">
                SELECT YOUR <span className="text-emerald-500">DOMAIN.</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Which industry vertical requires strategic intervention?</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => { setFormData({...formData, domain: ind}); nextStep(); }}
                  className={`p-5 rounded-2xl text-left font-bold text-xs uppercase tracking-widest border transition-all flex items-center justify-between group
                    ${formData.domain === ind 
                      ? "bg-[#143D2C] text-[#A1F28B] border-[#143D2C]" 
                      : "bg-white dark:bg-slate-900/50 text-slate-600 dark:text-white border-slate-200 dark:border-white/5 hover:border-emerald-500/50"}`}
                >
                  {ind}
                  <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${formData.domain === ind ? "opacity-100" : "opacity-0"}`} />
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            key="step2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-2">
              <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.3em]">Step 02 / 03</span>
              <h2 className="text-4xl font-black tracking-tighter text-[#143D2C] dark:text-white leading-tight">
                CONSULTANCY <span className="text-emerald-500">PURPOSE.</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">What is the primary objective of this engagement?</p>
            </div>
            
            <div className="flex flex-col gap-3">
              {[
                { id: "market", title: "Market Analysis", desc: "In-depth competitor and sector trends study", icon: Globe },
                { id: "strategy", title: "Tactical Planning", desc: "Operational roadmap and execution strategy", icon: Target },
                { id: "digital", title: "Digital Transformation", desc: "Tech stack optimization and AI integration", icon: Sparkles },
                { id: "ma", title: "M&A Intelligence", desc: "Merger, acquisition, and exit strategy", icon: Briefcase },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setFormData({...formData, purpose: p.title}); nextStep(); }}
                  className={`p-6 rounded-2xl text-left border transition-all flex items-center gap-6 group
                    ${formData.purpose === p.title 
                      ? "bg-[#143D2C] text-[#A1F28B] border-[#143D2C]" 
                      : "bg-white dark:bg-slate-900/50 text-slate-600 dark:text-white border-slate-200 dark:border-white/5 hover:border-emerald-500/50"}`}
                >
                  <div className={`p-3 rounded-xl ${formData.purpose === p.title ? "bg-emerald-500/20" : "bg-slate-100 dark:bg-black/40"}`}>
                    <p.icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-black text-[11px] uppercase tracking-widest">{p.title}</span>
                    <span className="text-[10px] opacity-60 font-medium">{p.desc}</span>
                  </div>
                  <ArrowRight className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </button>
              ))}
            </div>

            <button onClick={prevStep} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#143D2C] dark:hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Domain
            </button>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            key="step3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-2">
              <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.3em]">Step 03 / 03</span>
              <h2 className="text-4xl font-black tracking-tighter text-[#143D2C] dark:text-white leading-tight">
                STRATEGIC <span className="text-emerald-500">DIRECTION.</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Are you establishing new presence or scaling existing operations?</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => { setFormData({...formData, goal: "Enter Field"}); nextStep(); }}
                className={`p-8 rounded-3xl border transition-all flex flex-col items-center gap-6 group text-center
                  ${formData.goal === "Enter Field" 
                    ? "bg-[#143D2C] text-[#A1F28B] border-[#143D2C]" 
                    : "bg-white dark:bg-slate-900/50 text-slate-600 dark:text-white border-slate-200 dark:border-white/5 hover:border-emerald-500/50"}`}
              >
                <div className={`p-5 rounded-full ${formData.goal === "Enter Field" ? "bg-emerald-500/20" : "bg-slate-100 dark:bg-black/40"}`}>
                  <Rocket className="w-8 h-8" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-black text-sm uppercase tracking-widest">Market Entry</span>
                  <span className="text-[10px] opacity-60 font-medium leading-relaxed">Starting new ventures and establishing initial presence</span>
                </div>
              </button>

              <button
                onClick={() => { setFormData({...formData, goal: "Grow in Field"}); nextStep(); }}
                className={`p-8 rounded-3xl border transition-all flex flex-col items-center gap-6 group text-center
                  ${formData.goal === "Grow in Field" 
                    ? "bg-[#143D2C] text-[#A1F28B] border-[#143D2C]" 
                    : "bg-white dark:bg-slate-900/50 text-slate-600 dark:text-white border-slate-200 dark:border-white/5 hover:border-emerald-500/50"}`}
              >
                <div className={`p-5 rounded-full ${formData.goal === "Grow in Field" ? "bg-emerald-500/20" : "bg-slate-100 dark:bg-black/40"}`}>
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-black text-sm uppercase tracking-widest">Growth & Scale</span>
                  <span className="text-[10px] opacity-60 font-medium leading-relaxed">Scaling existing market share and operational optimization</span>
                </div>
              </button>
            </div>

            <button onClick={prevStep} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#143D2C] dark:hover:text-white transition-colors self-center">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Purpose
            </button>
          </motion.div>
        );
      case 4:
        return (
          <motion.div 
            key="step4"
            variants={containerVariants}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center gap-8 py-10"
          >
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-20px] border border-emerald-500/20 rounded-full border-dashed"
              />
              <div className="bg-emerald-500 p-6 rounded-full shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                <CheckCircle2 className="w-16 h-16 text-[#143D2C]" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-4xl font-black tracking-tighter text-[#143D2C] dark:text-white leading-tight">
                CONSULTANCY <span className="text-emerald-500">QUEUED.</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-base font-medium max-w-sm">
                Our lead strategists have been notified. A detailed audit of <span className="text-[#143D2C] dark:text-white font-black">{formData.domain}</span> for <span className="text-[#143D2C] dark:text-white font-black">{formData.goal}</span> is being prepared.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 mt-6">
               <div className="flex flex-col gap-1 items-center">
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Expected Contact Time:</span>
                 <span className="text-lg font-black text-[#143D2C] dark:text-white">UNDER 12 HOURS</span>
               </div>
               
               <Link href="/" className="mt-4 px-10 py-4 bg-[#143D2C] text-[#A1F28B] dark:bg-[#A1F28B] dark:text-[#143D2C] rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-xl">
                 Return to Terminal
               </Link>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <main className="min-h-screen bg-[#FBF9F4] dark:bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#143D2C 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
      
      {/* Decorative Orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#A1F28B]/10 rounded-full blur-[150px]" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full relative z-10"
      >
        {/* Navigation / Header */}
        <div className="flex justify-between items-center mb-12">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 bg-[#A1F28B] rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:rotate-12 shadow-md">
              <Layers className="text-[#143D2C] w-5 h-5" />
            </div>
            <div className="flex flex-col items-start translate-y-0.5">
              <span className="text-sm font-black tracking-tighter dark:text-white uppercase leading-none">Vantage <span className="text-[#A1F28B]">AI</span></span>
              <span className="text-[8px] font-bold text-slate-400 dark:text-slate-300 tracking-[0.2em] uppercase">Private Engagement</span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
             <div className="h-1 w-24 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: `${(step / 4) * 100}%` }}
                  className="h-full bg-emerald-500"
                />
             </div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest tabular-nums">{step}/4</span>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-3xl border border-white dark:border-white/5 shadow-2xl rounded-[48px] p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
             <Sparkles className="w-24 h-24 text-emerald-500" />
          </div>

          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6">
           <div className="flex items-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
              <div className="flex items-center gap-2 font-black text-[9px] uppercase tracking-widest dark:text-white">
                <ShieldCheckIcon className="w-3.5 h-3.5" /> ISO 27001 SECURE
              </div>
              <div className="flex items-center gap-2 font-black text-[9px] uppercase tracking-widest dark:text-white">
                <LockIcon className="w-3.5 h-3.5" /> END-TO-END ENCRYPTED
              </div>
           </div>
           
           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.4em]">
             Authorized Strategy Channel // ALPHA_B4
           </p>
        </div>
      </motion.div>
    </main>
  );
}

function ShieldCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function LockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
