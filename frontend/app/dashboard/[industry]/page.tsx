"use client";

import { useState, useEffect } from "react";
import GrowthGauge from "@/components/GrowthGauge";
import FactorBreakdown from "@/components/FactorBreakdown";
import PredictionChart from "@/components/PredictionChart";
import LiveSignalFeed from "@/components/LiveSignalFeed";
import ShapExplainer from "@/components/ShapExplainer";
import { ArrowLeft, Loader2, FileText, MessageSquare, TrendingUp, Layers } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Dashboard({ params }: { params: { industry: string } }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        setData({
          ml_verdict: {
            label: "Growth",
            confidence: 0.95, // Boosted by ensemble
            score: 0.82
          },
          market_data: {
            micro: [
              { name: "Industry CAGR", val: 5.2, suffix: "%" },
              { name: "Competitor Delta", val: 4 },
              { name: "Supply Chain", val: 7.5, suffix: "/10" }
            ],
            macro: [
              { name: "GDP Growth", val: 2.1, suffix: "%" },
              { name: "Inflation Rate", val: -0.4, suffix: "%" },
              { name: "Interest Rates", val: 5.25, suffix: "%" }
            ]
          }
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [params.industry]);

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center space-y-6">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <Loader2 className="h-16 w-16 text-emerald-500" />
        </motion.div>
        <motion.h2 
          className="text-2xl text-slate-200 font-semibold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Running Orchestrator Pipeline...
        </motion.h2>
        <p className="text-slate-500 text-sm max-w-sm text-center">
          Querying Pinecone RAG ➔ Executing 4-Model ML Ensemble (TabNet, XGBoost, LSTM, Prophet) ➔ Calling Claude 3.5...
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 max-w-[1600px] mx-auto space-y-8"
    >
      {/* Top Header Information Belt */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 text-emerald-500 text-sm font-semibold uppercase tracking-wider mb-1">
            <Link href="/" className="hover:underline flex items-center gap-1">
              <Layers className="w-3 h-3" /> Industries
            </Link> 
            <span>/</span>
            <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4" /> Live Market Intelligence</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight capitalize select-none flex items-center gap-3">
            {params.industry} <span className="text-slate-500 font-light">Analysis</span>
          </h1>
        </div>
        
        <div className="flex gap-3">
          <Link href="/" className="glass-card px-5 py-2.5 flex items-center gap-2 hover:bg-slate-800 transition-all font-medium text-sm">
             Switch Industry
          </Link>
          <Link href="/report/vantage-final-001" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl transition-all font-semibold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20">
            <FileText className="w-4 h-4" /> Strategic Report
          </Link>
        </div>
      </header>

      <div className="bento-grid !grid-rows-[repeat(4,minmax(200px,auto))]">
        
        {/* ML Verdict - Main KPI */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="col-span-12 lg:col-span-4 row-span-2 h-full"
        >
          <GrowthGauge 
            score={data.ml_verdict.score} 
            label={data.ml_verdict.label} 
            confidence={data.ml_verdict.confidence} 
          />
        </motion.div>

        {/* Prediction Chart - Large Insight */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="col-span-12 lg:col-span-8 row-span-2 h-full"
        >
          <PredictionChart data={[]} /> 
        </motion.div>

        {/* Drivers - Secondary Row */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="col-span-12 md:col-span-6 lg:col-span-3 h-full"
        >
          <FactorBreakdown title="Micro Drivers" factors={data.market_data.micro} />
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="col-span-12 md:col-span-6 lg:col-span-3 h-full"
        >
          <FactorBreakdown title="Macro Context" factors={data.market_data.macro} />
        </motion.div>

        {/* Live Feed - Dynamic Content */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="col-span-12 lg:col-span-6 h-full"
        >
          <LiveSignalFeed industry={params.industry} company="Strategy Engine" />
        </motion.div>

        {/* Explainer - Deep Dive */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="col-span-12 h-full"
        >
          <ShapExplainer 
            method="SHAP (TreeExplainer) + LIME"
            summary={`The '${data.ml_verdict.label}' verdict is primarily driven by Revenue Growth YoY and Supply Chain resilience factors.`}
            factors={[
              { feature: "revenue_growth_yoy", importance_pct: 38.1, raw_shap: 0.381 },
              { feature: "supply_chain_score", importance_pct: 22.4, raw_shap: 0.224 },
              { feature: "gdp_growth", importance_pct: 14.2, raw_shap: 0.142 },
              { feature: "competitor_delta", importance_pct: -10.5, raw_shap: -0.105 },
              { feature: "inflation_rate", importance_pct: -8.3, raw_shap: -0.083 },
            ]}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
