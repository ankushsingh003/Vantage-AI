"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, TrendingUp, TrendingDown } from "lucide-react";

interface Signal {
  timestamp: string;
  signal_type: string;
  value: number;
  source: string;
  confidence: number;
}

interface LiveSignalFeedProps {
  industry: string;
  company?: string;
}

export default function LiveSignalFeed({ industry, company = "General" }: LiveSignalFeedProps) {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // In production: `new WebSocket(\`ws://localhost:8000/ws/signals/${industry}/${company}\`)`
    // For demo purposes we simulate the WebSocket with a setInterval mock
    setConnected(true);

    const interval = setInterval(() => {
      const mockSignal: Signal = {
        timestamp: new Date().toISOString(),
        signal_type: ["price_movement", "news_sentiment", "trade_volume", "competitor_event"][Math.floor(Math.random() * 4)],
        value: parseFloat((Math.random() * 10 - 5).toFixed(3)),
        source: ["Bloomberg", "Reuters", "SEC Filing", "SerpAPI", "Twitter/X"][Math.floor(Math.random() * 5)],
        confidence: parseFloat((0.6 + Math.random() * 0.39).toFixed(2)),
      };
      setSignals(prev => [mockSignal, ...prev].slice(0, 8)); // Keep last 8 signals
    }, 2500);

    return () => {
      clearInterval(interval);
      if (wsRef.current) wsRef.current.close();
      setConnected(false);
    };
  }, [industry, company]);

  return (
    <div className="glass-card p-5 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-slate-200 text-lg">Live Market Signals</h3>
          <p className="text-xs text-slate-500 font-mono">Kafka Stream → {industry.toUpperCase()}</p>
        </div>
        <div className={`flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full ${connected ? "bg-emerald-900/50 text-emerald-400" : "bg-red-900/50 text-red-400"}`}>
          <span className={`w-2 h-2 rounded-full ${connected ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`} />
          {connected ? "LIVE" : "OFFLINE"}
        </div>
      </div>

      <div className="flex flex-col gap-2 overflow-hidden max-h-64">
        <AnimatePresence initial={false}>
          {signals.length === 0 ? (
            <p className="text-slate-600 text-sm text-center py-4 animate-pulse">Awaiting signals...</p>
          ) : (
            signals.map((s, i) => (
              <motion.div
                key={s.timestamp + i}
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 4 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center justify-between p-2.5 rounded-lg text-sm ${s.value >= 0 ? "bg-emerald-950/50 border border-emerald-900" : "bg-red-950/50 border border-red-900"}`}
              >
                <div className="flex items-center gap-2">
                  {s.value >= 0 ? <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" /> : <TrendingDown className="w-4 h-4 text-red-400 shrink-0" />}
                  <div>
                    <p className="font-medium text-slate-300 capitalize">{s.signal_type.replace(/_/g, " ")}</p>
                    <p className="text-xs text-slate-600">{s.source} · {(s.confidence * 100).toFixed(0)}% conf</p>
                  </div>
                </div>
                <span className={`font-bold font-mono text-lg ${s.value >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {s.value >= 0 ? "+" : ""}{s.value.toFixed(2)}
                </span>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
