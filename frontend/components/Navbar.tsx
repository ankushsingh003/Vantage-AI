"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  LayoutDashboard, 
  FileText, 
  TrendingUp,
  Database,
  Layers,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", icon: LayoutDashboard, href: "/" },
  { name: "Market Signals", icon: TrendingUp, href: "/signals" },
  { name: "Intelligence RAG", icon: Database, href: "/rag" },
  { name: "Reports", icon: FileText, href: "/reports" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-[--navbar-height] bg-slate-950/80 backdrop-blur-2xl border-b border-slate-800/50 z-50 flex items-center px-4 md:px-8 justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 md:gap-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 bg-emerald-500 rounded-lg flex items-center justify-center shrink-0">
              <Layers className="text-white w-5 h-5" />
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tight">Vantage <span className="text-emerald-500">AI</span></span>
          </Link>

          <div className="hidden md:block h-6 w-px bg-slate-800 mx-2" />

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = item.href === "/" 
                ? pathname === "/" 
                : pathname.startsWith(item.href);
                
              return (
                <Link key={item.name} href={item.href}>
                  <div className={`
                    flex items-center gap-2 px-3 lg:px-4 py-2 rounded-xl transition-all relative group
                    ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'}
                  `}>
                    {isActive && (
                      <motion.div 
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-emerald-500/10 rounded-xl border border-emerald-500/20"
                      />
                    )}
                    <item.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'group-hover:text-emerald-400/70'}`} />
                    <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right side: Status badge + mobile hamburger */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800/50">
            <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">System Active</span>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-[--navbar-height] left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800/50 md:hidden"
          >
            <div className="flex flex-col p-4 gap-2">
              {navItems.map((item) => {
                const isActive = item.href === "/" 
                  ? pathname === "/" 
                  : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-emerald-500/10 border border-emerald-500/20 text-white' 
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                    }`}>
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : ''}`} />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
