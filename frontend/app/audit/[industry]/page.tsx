"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  TrendingUp,
  TrendingDown,
  BarChart3,
  DollarSign,
  Loader2,
  Activity,
  ChevronDown,
  ChevronUp,
  FileBarChart2,
  PieChart,
} from "lucide-react";

interface Company {
  name: string;
  ticker?: string;
  market_share_pct?: number;
  quarterly_growth_yoy: number;
  balance_sheet: {
    total_assets: number;
    total_liabilities: number;
    equity: number;
  };
  income_statement: {
    revenue: number;
    net_income: number;
    operating_margin: number;
  };
}

interface AuditData {
  industry: string;
  quarter: string;
  market_conditions: { demand_index: number; supply_index: number; inflation_impact: number };
  industry_kpis: Record<string, number>;
  companies: Company[];
}

const fmt = (val: number, isPercent = false) => {
  if (isPercent) return `${(val * 100).toFixed(1)}%`;
  if (Math.abs(val) >= 1000) return `$${(val / 1000).toFixed(1)}B`;
  if (Math.abs(val) >= 1) return `$${val.toFixed(0)}M`;
  return `$${(val * 1000).toFixed(0)}K`;
};

const quarters = ["Q1", "Q2", "Q3", "Q4"];

// Color scale for market share bars
const barColor = (pct: number) =>
  pct >= 20 ? "from-emerald-600 to-emerald-400" :
  pct >= 10 ? "from-blue-600 to-blue-400" :
  pct >= 5  ? "from-violet-600 to-violet-400" :
              "from-slate-600 to-slate-400";

export default function IndustryAuditPage() {
  const params = useParams();
  const industry = (params?.industry as string) || "printing";
  const [data, setData] = useState<AuditData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedQuarter, setSelectedQuarter] = useState("Q4");
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"market_share" | "revenue" | "growth">("market_share");

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const fetchAudit = async (quarter: string) => {
    setLoading(true);
    setError("");
    setData(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/market/audit/${industry}?quarter=${quarter}`);
      if (!res.ok) throw new Error("Failed to fetch audit data");
      const json = await res.json();
      setData(json);
    } catch (e: any) {
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudit(selectedQuarter);
  }, [industry, selectedQuarter]);

  const industryLabel = industry.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const getSortedCompanies = (companies: Company[]) => {
    return [...companies].sort((a, b) => {
      if (sortBy === "market_share") return (b.market_share_pct || 0) - (a.market_share_pct || 0);
      if (sortBy === "revenue") return b.income_statement.revenue - a.income_statement.revenue;
      return b.quarterly_growth_yoy - a.quarterly_growth_yoy;
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-[--navbar-height] px-6 pb-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/50 mb-10">
          <div className="flex items-center gap-4">
            <Link href="/signals" className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FileBarChart2 className="w-5 h-5 text-emerald-400" />
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Full Industry Audit</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">{industryLabel}</h1>
              <p className="text-slate-400 text-sm mt-1">
                LLM-extracted real company financials · Market stake rankings · Balance sheets
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/50 p-1.5 rounded-xl border border-slate-800">
            {quarters.map((q) => (
              <button
                key={q}
                onClick={() => setSelectedQuarter(q)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedQuarter === q
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
            <p className="text-slate-400 font-mono text-sm animate-pulse">
              Extracting real {industryLabel} company intelligence via Gemini AI...
            </p>
            <p className="text-slate-600 text-xs">Fetching 12-15 real companies with financials and market stakes...</p>
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center py-20 gap-3 text-red-400">
            <Activity className="w-8 h-8" />
            <p>{error}</p>
            <button onClick={() => fetchAudit(selectedQuarter)} className="text-sm text-emerald-400 underline">Retry</button>
          </div>
        )}

        {data && !loading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">

            {/* Market Conditions + KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-4">
                  <BarChart3 className="w-4 h-4 text-blue-400" /> Market Conditions · {data.quarter}
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Demand Index", val: (data.market_conditions.demand_index * 100).toFixed(0), color: "text-blue-400" },
                    { label: "Supply Index",  val: (data.market_conditions.supply_index * 100).toFixed(0),  color: "text-emerald-400" },
                    { label: "Inflation",      val: `${(data.market_conditions.inflation_impact * 100).toFixed(1)}%`, color: "text-amber-400" },
                  ].map((m) => (
                    <div key={m.label} className="text-center">
                      <div className={`text-2xl font-bold ${m.color}`}>{m.val}</div>
                      <div className="text-[10px] text-slate-500 uppercase mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-4">
                  <Activity className="w-4 h-4 text-emerald-400" /> Sector KPIs
                </h2>
                <div className="space-y-3">
                  {Object.entries(data.industry_kpis).map(([key, val]) => (
                    <div key={key}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300 capitalize">{key.replace(/_/g, " ")}</span>
                        <span className="text-emerald-400 font-bold">{(Number(val) * 100).toFixed(0)}</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                          style={{ width: `${Math.min(Number(val) * 100, 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Market Share Overview */}
            <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-violet-400" /> Market Stake Distribution
              </h2>
              <div className="space-y-2">
                {getSortedCompanies(data.companies)
                  .filter(c => c.market_share_pct != null)
                  .map((company, i) => (
                    <div key={company.name} className="flex items-center gap-3">
                      <span className="text-slate-600 text-xs w-4 text-right font-mono">{i + 1}</span>
                      <span className="text-slate-300 text-sm w-52 truncate">{company.name}</span>
                      {company.ticker && (
                        <span className="text-[10px] font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono w-16 text-center">
                          {company.ticker}
                        </span>
                      )}
                      <div className="flex-1 h-5 bg-slate-800 rounded-full overflow-hidden relative">
                        <div
                          className={`h-full bg-gradient-to-r ${barColor(company.market_share_pct || 0)} rounded-full`}
                          style={{ width: `${Math.min(company.market_share_pct || 0, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-slate-200 w-14 text-right">
                        {(company.market_share_pct || 0).toFixed(1)}%
                      </span>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Company Financial Cards */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-violet-400" /> Company Financial Statements
                  <span className="text-sm font-normal text-slate-500 ml-2">({data.companies.length} companies)</span>
                </h2>
                <div className="flex gap-2">
                  {(["market_share", "revenue", "growth"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSortBy(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                        sortBy === s ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {s.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {getSortedCompanies(data.companies).map((company, i) => {
                  const isExpanded = expandedCompany === company.name;
                  const growthPositive = company.quarterly_growth_yoy >= 0;
                  return (
                    <motion.div
                      key={company.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-slate-900/40 border border-slate-800/50 hover:border-slate-700 rounded-2xl overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => setExpandedCompany(isExpanded ? null : company.name)}
                        className="w-full flex items-center gap-4 p-5 text-left"
                      >
                        {/* Rank badge */}
                        <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 flex-shrink-0">
                          {i + 1}
                        </div>

                        {/* Company name & ticker */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-slate-100">{company.name}</span>
                            {company.ticker && (
                              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">{company.ticker}</span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">Revenue: {fmt(company.income_statement.revenue)}</div>
                        </div>

                        {/* Market share bar */}
                        {company.market_share_pct != null && (
                          <div className="hidden md:flex items-center gap-2 w-40">
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full bg-gradient-to-r ${barColor(company.market_share_pct)} rounded-full`}
                                style={{ width: `${Math.min(company.market_share_pct, 100)}%` }}
                              />
                            </div>
                            <span className="text-xs font-bold text-slate-300 w-12 text-right">
                              {company.market_share_pct.toFixed(1)}%
                            </span>
                          </div>
                        )}

                        {/* Growth */}
                        <div className="text-right flex-shrink-0">
                          <div className={`text-sm font-bold flex items-center gap-1 justify-end ${growthPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                            {growthPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                            {growthPositive ? '+' : ''}{(company.quarterly_growth_yoy * 100).toFixed(1)}%
                          </div>
                          <div className="text-[10px] text-slate-500 uppercase">YoY</div>
                        </div>

                        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />}
                      </button>

                      {/* Expanded financials */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-6 px-5 pb-6 border-t border-slate-800/50 pt-5"
                        >
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                              <DollarSign className="w-3.5 h-3.5 text-blue-400" /> Balance Sheet
                            </h3>
                            <table className="w-full text-sm">
                              <tbody className="divide-y divide-slate-800/50">
                                <tr><td className="py-2 text-slate-400">Total Assets</td><td className="py-2 text-right font-bold text-blue-400">{fmt(company.balance_sheet.total_assets)}</td></tr>
                                <tr><td className="py-2 text-slate-400">Total Liabilities</td><td className="py-2 text-right font-bold text-red-400">{fmt(company.balance_sheet.total_liabilities)}</td></tr>
                                <tr><td className="py-2 text-slate-400">Shareholders' Equity</td><td className="py-2 text-right font-bold text-emerald-400">{fmt(company.balance_sheet.equity)}</td></tr>
                                <tr>
                                  <td className="py-2 text-slate-500 text-xs">Debt/Equity Ratio</td>
                                  <td className="py-2 text-right text-xs text-amber-400 font-bold">
                                    {(company.balance_sheet.total_liabilities / Math.max(company.balance_sheet.equity, 1)).toFixed(2)}x
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                              <BarChart3 className="w-3.5 h-3.5 text-emerald-400" /> Income Statement
                            </h3>
                            <table className="w-full text-sm">
                              <tbody className="divide-y divide-slate-800/50">
                                <tr><td className="py-2 text-slate-400">Revenue</td><td className="py-2 text-right font-bold text-slate-100">{fmt(company.income_statement.revenue)}</td></tr>
                                <tr><td className="py-2 text-slate-400">Net Income</td><td className="py-2 text-right font-bold text-emerald-400">{fmt(company.income_statement.net_income)}</td></tr>
                                <tr><td className="py-2 text-slate-400">Operating Margin</td><td className="py-2 text-right font-bold text-blue-400">{fmt(company.income_statement.operating_margin, true)}</td></tr>
                                <tr>
                                  <td className="py-2 text-slate-500 text-xs">Market Share</td>
                                  <td className="py-2 text-right text-xs text-violet-400 font-bold">
                                    {company.market_share_pct != null ? `${company.market_share_pct.toFixed(1)}%` : "—"}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </motion.div>
        )}
      </div>
    </div>
  );
}
