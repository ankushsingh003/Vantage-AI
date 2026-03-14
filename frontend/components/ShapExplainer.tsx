"use client";
import { motion } from "framer-motion";

interface ShapFactor {
  feature: string;
  importance_pct: number;
  raw_shap: number;
}

interface ShapExplainerProps {
  factors: ShapFactor[];
  method: string;
  summary: string;
}

export default function ShapExplainer({ factors, method, summary }: ShapExplainerProps) {
  const maxPct = Math.max(...factors.map(f => f.importance_pct));

  return (
    <div className="glass-card p-6 flex flex-col gap-4">
      <div>
        <h3 className="font-bold text-slate-200 text-lg">AI Explainability</h3>
        <p className="text-xs text-slate-500 font-mono">{method}</p>
      </div>
      <p className="text-sm text-slate-400 italic border-l-2 border-emerald-500 pl-3">{summary}</p>
      <div className="flex flex-col gap-3">
        {factors.map((f, i) => (
          <motion.div
            key={f.feature}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-slate-300 font-mono">{f.feature.replace(/_/g, " ")}</span>
              <span className={`text-xs font-bold ${f.raw_shap >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {f.raw_shap >= 0 ? "+" : ""}{f.raw_shap.toFixed(3)}
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(f.importance_pct / maxPct) * 100}%` }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`h-full rounded-full ${f.raw_shap >= 0 ? "bg-emerald-500" : "bg-red-500"}`}
              />
            </div>
            <p className="text-right text-xs text-slate-600 mt-0.5">{f.importance_pct}% importance</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
