export default function FactorBreakdown({ title, factors }: { title: string, factors: { name: string, val: number, suffix?: string }[] }) {
  return (
    <div className="glass-card p-6 h-full flex flex-col gap-4">
      <h3 className="text-lg font-medium text-slate-300 mb-2">{title}</h3>
      {factors.map((f, i) => (
        <div key={i} className="flex flex-col gap-1">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400 font-mono">{f.name}</span>
            <span className="font-bold">{f.val > 0 ? '+' : ''}{f.val}{f.suffix || ''}</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${f.val > 0 ? 'bg-blue-500' : 'bg-rose-500'}`} 
              style={{ width: `${Math.min(Math.abs(f.val) * 10, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
