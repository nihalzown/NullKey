import { Shield, Fingerprint } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Onyx Stealth Glass Panel */}
      <div className="glass-panel p-8 md:p-12 w-full max-w-md flex flex-col items-center text-center z-10">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-6">
          <Fingerprint className="w-8 h-8 text-emerald-500" />
        </div>
        
        <h1 className="text-2xl font-semibold text-white tracking-tight mb-2">
          System Authorized
        </h1>
        
        <p className="text-sm text-slate-400 mb-8">
          The grid is online. Visual architecture loaded successfully.
        </p>

        <div className="w-full flex items-center justify-between p-4 rounded-lg bg-[#080809] border border-white/5">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-medium text-slate-300">Phase 1 Status</span>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
            Active
          </span>
        </div>
      </div>
    </main>
  );
}