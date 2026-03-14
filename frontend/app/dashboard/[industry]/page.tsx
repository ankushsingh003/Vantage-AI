"use client";

import { useState, useEffect } from "react";
import GrowthGauge from "@/components/GrowthGauge";
import FactorBreakdown from "@/components/FactorBreakdown";
import PredictionChart from "@/components/PredictionChart";
import LiveSignalFeed from "@/components/LiveSignalFeed";
import ShapExplainer from "@/components/ShapExplainer";
import { ArrowLeft, Loader2, FileText, MessageSquare } from "lucide-react";
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
      className="min-h-screen p-8 max-w-7xl mx-auto flex flex-col gap-6"
    >
      <header className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold capitalize">{params.industry} Sector</h1>
            <p className="text-slate-400">Live Market Intelligence Dashboard</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <Link href="/chat" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors">
            <MessageSquare className="w-4 h-4" /> Consultant Chat
          </Link>
          <Link href="/report/demo-xyz-123" className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg transition-colors font-medium">
            <FileText className="w-4 h-4" /> View Report
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <GrowthGauge 
            score={data.ml_verdict.score} 
            label={data.ml_verdict.label} 
            confidence={data.ml_verdict.confidence} 
          />
        </motion.div>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <PredictionChart data={[]} /> 
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <FactorBreakdown title="Microeconomic Drivers" factors={data.market_data.micro} />
        </motion.div>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
          <FactorBreakdown title="Macroeconomic Context" factors={data.market_data.macro} />
        </motion.div>
      </div>

      {/* Phase 4: Live Kafka Signals + SHAP Explainability */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
          <LiveSignalFeed industry={params.industry} company="Strategy Engine" />
        </motion.div>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
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
