// --- CHANGE: Added isVerified logic and the success UI state ---
'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Wallet, LogOut, Loader2, Key, CheckCircle } from 'lucide-react';
import { useWeb3Auth } from '@/hooks/useWeb3Auth';

export function OnyxConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { initiateHandshake, isAuthenticating, isVerified } = useWeb3Auth();

  // If connected AND mathematically verified
  if (isConnected && isVerified) {
    return (
      <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/50 rounded-lg p-3 pr-4 shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all">
        <div className="bg-emerald-500/20 p-2 rounded-md">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-sm font-semibold text-emerald-400">Identity Confirmed</span>
          <span className="font-mono text-xs text-slate-400">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </div>
        <button 
          onClick={() => disconnect()}
          className="ml-4 text-slate-500 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // If connected but NOT YET verified
  if (isConnected) {
    return (
      <div className="flex flex-col gap-3 w-full items-center">
        <div className="flex items-center gap-3 bg-[#080809] border border-emerald-500/30 rounded-lg p-2 pr-4 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <div className="bg-emerald-500/10 p-2 rounded-md">
            <Wallet className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="font-mono text-sm text-slate-200">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
          <button 
            onClick={() => disconnect()}
            className="ml-2 text-slate-500 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={() => initiateHandshake()}
          disabled={isAuthenticating}
          className="flex w-full items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 px-6 py-2.5 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAuthenticating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Key className="w-4 h-4" />
          )}
          <span className="font-medium text-sm tracking-wide">
            {isAuthenticating ? 'Awaiting Signature...' : 'Verify Identity (Sign)'}
          </span>
        </button>
      </div>
    );
  }

  // Default state (Disconnected)
  return (
    <button
      onClick={() => connect({ connector: connectors[0] })}
      disabled={isConnecting}
      className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/50 text-white px-6 py-2.5 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isConnecting ? (
        <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
      ) : (
        <Wallet className="w-4 h-4 text-emerald-500" />
      )}
      <span className="font-medium text-sm tracking-wide">
        {isConnecting ? 'Initializing...' : 'Initialize Connection'}
      </span>
    </button>
  );
}