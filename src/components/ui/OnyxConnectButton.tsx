'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Wallet, LogOut, Loader2 } from 'lucide-react';

export function OnyxConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="flex items-center gap-3 bg-[#080809] border border-emerald-500/30 rounded-lg p-2 pr-4 shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all">
        <div className="bg-emerald-500/10 p-2 rounded-md">
          <Wallet className="w-4 h-4 text-emerald-400" />
        </div>
        <span className="font-mono text-sm text-slate-200">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
        <button 
          onClick={() => disconnect()}
          className="ml-2 text-slate-500 hover:text-red-400 transition-colors"
          title="Disconnect Node"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: connectors[0] })}
      disabled={isPending}
      className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/50 text-white px-6 py-2.5 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
      ) : (
        <Wallet className="w-4 h-4 text-emerald-500" />
      )}
      <span className="font-medium text-sm tracking-wide">
        {isPending ? 'Initializing...' : 'Initialize Connection'}
      </span>
    </button>
  );
}