import { useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';

export function useWeb3Auth() {
  const { address, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const initiateHandshake = async () => {
    if (!address || !chainId) throw new Error("Wallet not connected");

    try {
      setIsAuthenticating(true);

      // 1. Fetch the Challenge (Nonce) from our Step 2.1 API
      const nonceRes = await fetch('/api/auth/nonce');
      const { nonce } = await nonceRes.json();

      // 2. Construct the Standardized SIWE Message
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in to the NullKey Nexus. This operation proves your identity without a password.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
      });

      // 3. Request the Cryptographic Signature from the Wallet
      const preparedMessage = message.prepareMessage();
      const signature = await signMessageAsync({
        message: preparedMessage,
      });

      console.log("Cryptographic Signature Acquired:", signature);
      
      //send this payload to the backend for verification.
      return { message, signature };

    } catch (error) {
      console.error("Handshake aborted or failed:", error);
      throw error;
    } finally {
      setIsAuthenticating(false);
    }
  };

  return { initiateHandshake, isAuthenticating };
}