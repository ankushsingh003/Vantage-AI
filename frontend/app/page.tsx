"use client";

import Link from "next/link";
import {
  Activity,
  Beaker,
  Printer,
  Cpu,
  Fuel,
  Landmark,
  ShoppingCart,
  Building2,
  Zap,
  Plane,
  Truck,
  Factory,
  Leaf,
  Film,
  HeartPulse,
  BadgeDollarSign,
  Database,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function Home() {
  const industries = [
    { id: "cosmetics",    name: "Cosmetics & Beauty",      icon: <Beaker strokeWidth={2.5} className="w-7 h-7" />,          color: "text-pink-400",   bg: "bg-pink-500/10 border-pink-500/20" },
    { id: "pharma",       name: "Pharmaceuticals",         icon: <Activity strokeWidth={2.5} className="w-7 h-7" />,         color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20" },
    { id: "tech",         name: "Technology & IT",         icon: <Cpu strokeWidth={2.5} className="w-7 h-7" />,              color: "text-cyan-400",   bg: "bg-cyan-500/10 border-cyan-500/20" },
    { id: "printing",     name: "Commercial Printing",     icon: <Printer strokeWidth={2.5} className="w-7 h-7" />,          color: "text-slate-400",  bg: "bg-slate-500/10 border-slate-500/20" },
    { id: "oil",          name: "Oil & Gas",               icon: <Fuel strokeWidth={2.5} className="w-7 h-7" />,             color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/20" },
    { id: "coal",         name: "Coal & Mining",           icon: <Factory strokeWidth={2.5} className="w-7 h-7" />,          color: "text-stone-400",  bg: "bg-stone-500/10 border-stone-500/20" },
    { id: "finance",      name: "Finance & Banking",       icon: <Landmark strokeWidth={2.5} className="w-7 h-7" />,         color: "text-emerald-400",bg: "bg-emerald-500/10 border-emerald-500/20" },
    { id: "retail",       name: "Retail & E-commerce",     icon: <ShoppingCart strokeWidth={2.5} className="w-7 h-7" />,     color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
    { id: "real_estate",  name: "Real Estate",             icon: <Building2 strokeWidth={2.5} className="w-7 h-7" />,        color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
    { id: "energy",       name: "Renewable Energy",        icon: <Zap strokeWidth={2.5} className="w-7 h-7" />,              color: "text-lime-400",   bg: "bg-lime-500/10 border-lime-500/20" },
    { id: "aviation",     name: "Aviation & Aerospace",    icon: <Plane strokeWidth={2.5} className="w-7 h-7" />,            color: "text-sky-400",    bg: "bg-sky-500/10 border-sky-500/20" },
    { id: "logistics",    name: "Logistics & Supply Chain",icon: <Truck strokeWidth={2.5} className="w-7 h-7" />,            color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
    { id: "agriculture",  name: "Agriculture & Food",      icon: <Leaf strokeWidth={2.5} className="w-7 h-7" />,             color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20" },
    { id: "media",        name: "Media & Entertainment",   icon: <Film strokeWidth={2.5} className="w-7 h-7" />,             color: "text-rose-400",   bg: "bg-rose-500/10 border-rose-500/20" },
    { id: "healthcare",   name: "Healthcare Services",     icon: <HeartPulse strokeWidth={2.5} className="w-7 h-7" />,       color: "text-red-400",    bg: "bg-red-500/10 border-red-500/20" },
    { id: "insurance",    name: "Insurance & FinTech",     icon: <BadgeDollarSign strokeWidth={2.5} className="w-7 h-7" />,  color: "text-teal-400",   bg: "bg-teal-500/10 border-teal-500/20" },
  ];

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden pb-16 pt-[calc(var(--navbar-height)+2rem)]">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-24 relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-8"
          >
            <Zap className="w-4 h-4" /> The Future of Market Intelligence
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 bg-gradient-to-br from-white via-slate-200 to-slate-500 bg-clip-text text-transparent"
          >
            Strategic Clarity at <br className="hidden md:block"/> Algorithmic Speed.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Vantage AI is an enterprise-grade intelligence engine. We ingest millions of unstructured signals and transform them into board-ready consultancy reports, competitor power rankings, and live market forecasts.
          </motion.p>
          
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.3 }}
             className="flex flex-wrap justify-center gap-4"
          >
              <div className="flex items-center gap-2 text-sm text-slate-300 font-medium px-4 py-2 bg-slate-900/50 rounded-xl border border-slate-800">
                <Cpu className="w-4 h-4 text-cyan-400" /> Machine Learning Ensemble
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300 font-medium px-4 py-2 bg-slate-900/50 rounded-xl border border-slate-800">
                <Activity className="w-4 h-4 text-rose-400" /> Live Sentiment Analysis
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300 font-medium px-4 py-2 bg-slate-900/50 rounded-xl border border-slate-800">
                <Database className="w-4 h-4 text-emerald-400" /> Contextual RAG
              </div>
          </motion.div>
        </div>
      </section>

      {/* Select an Industry Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-slate-800/50 pt-16">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Explore Sectors
            </h2>
            <p className="text-slate-500">Select an industry to run live API diagnostics.</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {industries.map((ind) => (
            <motion.div key={ind.id} variants={item}>
              <Link
                href={`/dashboard/${ind.id}`}
                className="group flex items-center gap-5 p-5 rounded-2xl bg-slate-900/40 border border-slate-800/50 hover:border-slate-700 hover:bg-slate-900/80 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
              >
                <div className={`p-3 rounded-xl border flex-shrink-0 ${ind.bg}`}>
                  <span className={ind.color}>{ind.icon}</span>
                </div>
                <div className="min-w-0">
                  <h2 className="font-semibold text-slate-100 group-hover:text-white truncate text-sm">{ind.name}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">AI-driven analysis</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <p className="text-center text-slate-700 text-xs mt-16 font-mono uppercase tracking-widest">
        Powered by Gemini 1.5 Flash · 4-Model ML Ensemble · Live RAG Context
      </p>
    </main>
  );
}
