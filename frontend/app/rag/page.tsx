"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Bot, 
  User, 
  Database, 
  Search, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Globe,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  sources?: string[];
  confidence?: number;
  timestamp: Date;
}

const suggestedQueries = [
  "What are the biggest pharma risks in Q3 2024?",
  "Analyze current trends in the sustainable cosmetics market.",
  "How is chip supply affecting high-tech industry margins?",
  "Identify emerging competitors in digital printing."
];

export default function RAGPage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleQuery = async (e?: React.FormEvent, customQuery?: string) => {
    e?.preventDefault();
    const finalQuery = customQuery || query;
    if (!finalQuery.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: finalQuery,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setQuery("");
    setIsLoading(true);

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

    try {
      const resp = await fetch(`${BACKEND_URL}/api/rag/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: finalQuery, industry: "general" })
      });

      if (!resp.ok) throw new Error("Intelligence Engine failed");
      const data = await resp.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: data.answer,
        sources: data.sources,
        confidence: data.confidence,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: "I apologize, but I encountered an error while synthesizing market intelligence. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar - Context & Sources */}
      <aside className="w-80 border-r border-slate-800/50 bg-slate-950/50 backdrop-blur-3xl p-6 flex flex-col gap-8">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-10 w-10 bg-emerald-500/20 rounded-lg flex items-center justify-center border border-emerald-500/30">
              <Database className="text-emerald-400 w-5 h-5" />
            </div>
            <h2 className="text-base font-bold uppercase tracking-widest text-slate-400">Knowledge RAG</h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/50">
              <h3 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4" /> Active Context
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Currently optimized for Global Market Analysis, SEC Filings, and Real-time Industry News.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4 px-2">Knowledge Sources</h3>
          <div className="space-y-2">
            {["Market Research Database", "SEC 10-K Filings", "Industry News Wire", "Internal Strategy Docs"].map(source => (
              <div key={source} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-900/50 transition-colors group">
                <ShieldCheck className="w-4 h-4 text-slate-600 group-hover:text-emerald-400" />
                <span className="text-sm text-slate-400 group-hover:text-slate-200">{source}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 p-5 rounded-2xl border border-emerald-500/20">
            <p className="text-xs text-emerald-400/80 uppercase font-bold tracking-tighter mb-2">Pro Tip</p>
            <p className="text-sm text-slate-400 leading-relaxed italic">
              "Ask about specific quarters for deeper seasonal intelligence."
            </p>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="flex-1 overflow-y-auto p-8 scroll-smooth" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
              <div className="h-20 w-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center border border-emerald-500/20 mb-8 animate-pulse">
                <Sparkles className="text-emerald-400 w-12 h-12" />
              </div>
              <h1 className="text-5xl font-bold tracking-tight mb-6">Deep Market Intelligence</h1>
              <p className="text-xl text-slate-400 leading-relaxed mb-12">
                Search across thousands of industry reports, financial statements, and real-time signals. 
                Our AI-driven RAG engine synthesizes complex data into actionable strategy.
              </p>

              <div className="grid grid-cols-2 gap-4 w-full">
                {suggestedQueries.map(q => (
                  <button
                    key={q}
                    onClick={() => handleQuery(undefined, q)}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-white/10 transition-all text-left group"
                  >
                    <p className="text-base font-medium text-slate-300 group-hover:text-white mb-2">{q}</p>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-8">
              <AnimatePresence>
                {messages.map((ms) => (
                  <motion.div
                    key={ms.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-6 ${ms.type === 'bot' ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`
                      h-10 w-10 flex-shrink-0 rounded-2xl flex items-center justify-center border
                      ${ms.type === 'bot' ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-blue-500/10 border-blue-500/20'}
                    `}>
                      {ms.type === 'bot' ? <Bot className="text-emerald-400 w-5 h-5" /> : <User className="text-blue-400 w-5 h-5" />}
                    </div>
                    
                    <div className={`flex flex-col gap-2 max-w-[85%] ${ms.type === 'bot' ? '' : 'items-end'}`}>
                      <div className={`
                        p-6 rounded-3xl leading-relaxed border prose prose-invert max-w-none text-base
                        ${ms.type === 'bot' 
                          ? 'bg-slate-900/50 border-slate-800/80 text-slate-200' 
                          : 'bg-emerald-500 text-white border-emerald-600 font-medium'
                        }
                      `}>
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({children}) => <p className="mb-4 last:mb-0">{children}</p>,
                            ul: ({children}) => <ul className="list-disc pl-5 mb-4 space-y-1">{children}</ul>,
                            ol: ({children}) => <ol className="list-decimal pl-5 mb-4 space-y-1">{children}</ol>,
                            h3: ({children}) => <h3 className="text-emerald-400 font-bold text-lg mt-6 mb-3 first:mt-0">{children}</h3>,
                            strong: ({children}) => <strong className="text-white font-bold">{children}</strong>,
                            li: ({children}) => <li className="text-slate-300">{children}</li>
                          }}
                        >
                          {ms.content}
                        </ReactMarkdown>
                      </div>
                      
                      {ms.type === 'bot' && ms.sources && (
                        <div className="flex flex-wrap gap-2 mt-2 px-2">
                           {ms.sources.map(s => (
                             <span key={s} className="px-3 py-1 bg-slate-800/50 border border-slate-700/50 rounded-full text-[10px] text-slate-400 flex items-center gap-1.5">
                                <Search className="w-3 h-3" /> {s}
                             </span>
                           ))}
                           {ms.confidence && (
                             <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] text-emerald-400 font-bold flex items-center gap-1.5">
                               <ShieldCheck className="w-3 h-3" /> {Math.round(ms.confidence * 100)}% Confidence
                             </span>
                           )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="flex gap-6 items-center px-4"
                >
                  <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />
                  </div>
                  <p className="text-sm text-slate-500 font-medium animate-pulse">Consulting Knowledge Graph...</p>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-8 pb-12">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleQuery} className="group flex items-center gap-4 bg-slate-900/80 backdrop-blur-3xl border border-slate-800/50 p-2 pl-6 rounded-full focus-within:border-emerald-500/50 focus-within:ring-4 ring-emerald-500/5 transition-all">
              <Search className="w-5 h-5 text-slate-500 group-focus-within:text-emerald-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about industry trends, technical risks, or financial forecasts..."
                className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-slate-600 py-3"
              />
              <button 
                type="submit"
                disabled={isLoading || !query.trim()}
                className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:opacity-50 h-12 w-12 rounded-full flex items-center justify-center transition-all group"
              >
                <Send className="w-5 h-5 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </button>
            </form>
            <p className="text-center mt-4 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              Powered by Gemini 1.5 Flash Knowledge Engine
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
