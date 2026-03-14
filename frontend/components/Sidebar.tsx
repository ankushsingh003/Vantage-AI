"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Settings, 
  Layers, 
  TrendingUp,
  Database
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Platform Home", icon: LayoutDashboard, href: "/" },
  { name: "Industry Hub", icon: Layers, href: "/" },
  { name: "Market Signals", icon: TrendingUp, href: "/signals" },
  { name: "Intelligence RAG", icon: Database, href: "/rag" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-screen w-[--sidebar-width] bg-slate-950/80 backdrop-blur-2xl border-r border-slate-800/50 flex flex-col z-50">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-8 w-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Layers className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">Vantage <span className="text-emerald-500">AI</span></span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link key={item.name} href={item.href}>
                <div className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group
                  ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'}
                `}>
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-emerald-500/10 rounded-xl border border-emerald-500/20"
                    />
                  )}
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'group-hover:text-emerald-400/70'}`} />
                  <span className="font-medium text-sm">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-900">
        <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">System Status</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            Ensemble Orchestrator: <span className="text-emerald-500">Active</span><br/>
            Kafka Streams: <span className="text-emerald-500">Operational</span>
          </p>
        </div>
      </div>
    </div>
  );
}
