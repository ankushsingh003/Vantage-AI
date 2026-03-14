"use client";

import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

export default function ReportViewer({ params }: { params: { id: string } }) {
  // In a real app, this would fetch the PDF URL from the backend using the ID
  const handleDownload = () => {
    // In production, use an environment variable for the API URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    window.location.href = `${apiUrl}/api/report/download/${params.id}`;
  };

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto flex flex-col h-screen">
      <header className="flex justify-between items-center mb-6 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Consultancy Report Viewer</h1>
            <p className="text-slate-400 text-sm">Report ID: {params.id}</p>
          </div>
        </div>
        
        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors font-medium cursor-pointer"
        >
          <Download className="w-4 h-4" /> Download PDF
        </button>
      </header>
      
      <div className="flex-grow glass-card overflow-hidden flex flex-col items-center justify-center p-8 text-center border-dashed">
        <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6">
          <Download className="w-10 h-10 text-slate-400" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">PDF Document Ready</h2>
        <p className="text-slate-400 max-w-md mb-8">
          The high-fidelity report is generated in real-time by our PDF engine. Click the button above to download the full technical specification.
        </p>
        <div className="w-full h-full max-h-[500px] border border-slate-700 bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <p className="text-slate-500 font-mono z-10">[ Secure Report Stream Active ]</p>
        </div>
      </div>
    </div>
  );
}
