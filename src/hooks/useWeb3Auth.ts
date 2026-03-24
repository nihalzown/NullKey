// --- CHANGE: Added verification API call and verified state tracking ---
import { useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';

export function useWeb3Auth() {
  const { address, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // New state to trigger the UI confirmation

  const initiateHandshake = async () => {
    if (!address || !chainId) throw new Error("Wallet not connected");

    try {
      setIsAuthenticating(true);
      setIsVerified(false);

      // 1. Fetch Challenge
      const nonceRes = await fetch('/api/auth/nonce');
      const { nonce } = await nonceRes.json();

      // 2. Construct Message
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in to the NullKey Nexus. This operation proves your identity without a password.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
      });

      // 3. Request Wallet Signature
      const preparedMessage = message.prepareMessage();
      const signature = await signMessageAsync({ message: preparedMessage });

      // 4. Send to Backend for Cryptographic Verification
      const verifyRes = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, signature }),
      });

      const verifyData = await verifyRes.json();

      if (verifyData.verified) {
        setIsVerified(true); // Triggers the success UI
      } else {
        throw new Error("Signature verification failed on the server.");
      }

    } catch (error) {
      console.error("Handshake failed:", error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return { initiateHandshake, isAuthenticating, isVerified };
}