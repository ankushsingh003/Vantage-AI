"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  TrendingUp,
  Database,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", icon: LayoutDashboard, href: "/" },
  { name: "Market Signals", icon: TrendingUp, href: "/signals" },
  { name: "Intelligence RAG", icon: Database, href: "/rag" },
  { name: "Reports", icon: FileText, href: "/reports" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 h-[--navbar-height] bg-slate-950/50 backdrop-blur-2xl border-b border-slate-800/50 z-50 flex items-center px-8 justify-between">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-8 w-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Layers className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">Vantage <span className="text-emerald-500">AI</span></span>
        </Link>

        <div className="h-6 w-px bg-slate-800 mx-2" />

        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = item.href === "/" 
              ? pathname === "/" 
              : pathname.startsWith(item.href);
              
            return (
              <Link key={item.name} href={item.href}>
                <div className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl transition-all relative group
                  ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'}
                `}>
                  {isActive && (
                    <motion.div 
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-emerald-500/10 rounded-xl border border-emerald-500/20"
                    />
                  )}
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'group-hover:text-emerald-400/70'}`} />
                  <span className="font-medium text-sm">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800/50">
          <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Active</span>
        </div>
      </div>
    </nav>
  );
}
