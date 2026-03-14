"use client";

import Link from "next/link";
import { Activity, Beaker, Shirt, Printer } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function Home() {
  const industries = [
    { id: "cosmetics", name: "Cosmetics & Beauty", icon: <Beaker className="w-8 h-8 text-pink-500" /> },
    { id: "pharma", name: "Pharmaceuticals", icon: <Activity className="w-8 h-8 text-blue-500" /> },
    { id: "fashion", name: "Apparel & Fashion", icon: <Shirt className="w-8 h-8 text-purple-500" /> },
    { id: "printing", name: "Commercial Printing", icon: <Printer className="w-8 h-8 text-cyan-500" /> },
  ];

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-slate-950 to-slate-900">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col gap-8"
      >
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 text-center mb-4">
          Strategy Engine AI
        </h1>
        <p className="text-slate-400 text-lg text-center max-w-2xl mb-12">
          Select an industry to run predictive ML models and generate a full-fledged consultancy report on market trajectory.
        </p>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl"
        >
          {industries.map((ind) => (
            <motion.div key={ind.id} variants={item}>
              <Link 
                href={`/dashboard/${ind.id}`}
                className="glass-card p-8 flex items-center gap-6 hover:bg-slate-800/80 transition-all hover:scale-105 cursor-pointer group h-full"
              >
                <div className="p-4 rounded-full bg-slate-800 group-hover:bg-slate-700 transition-colors">
                  {ind.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{ind.name}</h2>
                  <p className="text-slate-500">Run macro/micro analysis</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}
