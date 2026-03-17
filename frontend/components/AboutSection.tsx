"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Shield, Zap } from "lucide-react";

const partners = [
  { name: "Aristotle University of Thessaloniki", type: "Academic" },
  { name: "Eurocreamerchant", type: "Strategic" },
  { name: "Zemnieku Saeima", type: "Industry" },
  { name: "Krakowski Park Technologiczny", type: "Tech Hub" },
  { name: "RISEBA", type: "University" },
];

export default function AboutSection() {
  return (
    <section className="relative py-24 bg-[#020617] overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Mission & Identity */}
          <div className="w-full lg:w-1/2">
            <div className="mb-8">
              <span className="text-emerald-400 font-black text-xs uppercase tracking-[0.4em] mb-4 block">
                Who are we
              </span>
              <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-transparent mb-6" />
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-tight mb-8">
                Our Mission and <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-white lowercase font-serif italic">accreditation</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl">
                The Strategic Intelligence Engine is a primary organization designed to support high-growth innovative enterprises at the global, regional, and sector levels. Our methodology follows the collective intelligence and rigorous experience of leading RAG architecture networks. Currently, we stand as the first unified AI diagnostics center for industrial strategic clarity.
              </p>
              
              <motion.button
                whileHover={{ x: 5 }}
                className="group flex items-center gap-3 px-8 py-4 bg-emerald-500 text-[#020617] font-black text-sm uppercase tracking-widest rounded-full transition-all hover:bg-emerald-400"
              >
                Find Out More
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </div>

          {/* Right Column: Strategic Partnerships */}
          <div className="w-full lg:w-1/2">
            <div className="mb-8">
              <h3 className="text-3xl font-black text-white tracking-tight mb-6 flex items-center gap-3">
                Strategic Partnerships
                <Zap className="text-emerald-400 w-6 h-6" />
              </h3>
              <p className="text-slate-400 text-base leading-relaxed mb-12">
                We are proud of our active partner network, which includes leading academic, strategic, and international organizations contributing to the global exchange of market intelligence. Through these deep-tech partnerships, we strengthen our ties with key players in the innovation ecosystem.
              </p>

              {/* Partners Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {partners.map((partner, idx) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative overflow-hidden bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/[0.08] transition-all hover:border-emerald-500/30"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold opacity-60">
                        {partner.type}
                      </span>
                      <span className="text-white font-bold text-sm leading-tight tracking-tight group-hover:text-emerald-300 transition-colors">
                        {partner.name}
                      </span>
                    </div>
                    {/* Subtle decorative background icon */}
                    <div className="absolute right-[-10px] bottom-[-10px] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                      <Globe className="w-20 h-20 text-white" />
                    </div>
                  </motion.div>
                ))}
                
                {/* Last item: Global Network */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-center border-2 border-dashed border-white/10 p-6 rounded-2xl md:col-span-1"
                >
                  <span className="text-slate-500 text-xs font-black uppercase tracking-widest text-center">
                    + Global AI Network
                  </span>
                </motion.div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
