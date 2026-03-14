"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PredictionChart({ data }: { data: any[] }) {
  // Mock data for Phase 1 if none provided
  const chartData = data?.length ? data : [
    { period: 'Q1', revenue: 400, predicted: null },
    { period: 'Q2', revenue: 430, predicted: null },
    { period: 'Q3', revenue: 448, predicted: null },
    { period: 'Q4', revenue: 470, predicted: 470 },
    { period: 'Q1 (F)', revenue: null, predicted: 510 },
    { period: 'Q2 (F)', revenue: null, predicted: 540 },
  ];

  return (
    <div className="glass-card p-6 h-full min-h-[300px] flex flex-col">
      <h3 className="text-lg font-medium text-slate-300 mb-6">LSTM Trajectory Forecast</h3>
      <div className="flex-grow w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="period" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
              itemStyle={{ color: '#e2e8f0' }}
            />
            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="predicted" stroke="#10b981" strokeWidth={3} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
