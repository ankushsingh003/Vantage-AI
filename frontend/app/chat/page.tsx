"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, User, Bot } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello! I am your Strategy Engine Consultant. How can I help you analyze the latest market report?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: "user", text: input }]);
    const currentInput = input;
    setInput("");
    
    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        text: `Based on the latest ML analysis, regarding "${currentInput}", I recommend focusing on supply chain resilience and monitoring the $+4 competitor delta in the sector.` 
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto flex flex-col h-screen">
      <header className="flex items-center gap-4 mb-6 shrink-0">
        <Link href="/" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">AI Consultant Chat</h1>
          <p className="text-slate-400 text-sm">Powered by Claude 3.5 Models</p>
        </div>
      </header>
      
      <div className="flex-grow glass-card flex flex-col overflow-hidden">
        <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`p-2 rounded-full h-fit ${msg.role === 'user' ? 'bg-blue-600' : 'bg-emerald-600'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
              </div>
              <div className={`p-4 rounded-xl max-w-[80%] ${msg.role === 'user' ? 'bg-blue-600/20 text-blue-100 rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex gap-4">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about risk factors, trajectory forecasts, or strategic recommendations..."
            className="flex-grow bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-200"
          />
          <button 
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
