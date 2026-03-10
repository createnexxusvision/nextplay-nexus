'use client';
// NextPlay Nexus — Web3 Wallet Auth Button
// Handles the full SIWE flow: connect → sign → verify → Supabase session

import { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { SiweMessage } from 'siwe';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function Web3AuthButton() {
  const router = useRouter();
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();
  const { signMessageAsync } = useSignMessage();

  const [status, setStatus] = useState<'idle' | 'signing' | 'verifying' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSIWE() {
    if (!address || !isConnected) {
      openConnectModal?.();
      return;
    }

    setStatus('signing');
    setErrorMsg('');

    try {
      // 1. Get nonce from server
      const nonceRes = await fetch('/api/auth/web3/nonce', { method: 'POST' });
      if (!nonceRes.ok) throw new Error('Failed to get nonce');
      const { nonce } = await nonceRes.json() as { nonce: string };

      // 2. Build SIWE message
      const siweMessage = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in to NextPlay Nexus to access your athlete dashboard.',
        uri: window.location.origin,
        version: '1',
        chainId: chain?.id ?? 1,
        nonce,
      });
      const message = siweMessage.prepareMessage();

      // 3. Ask wallet to sign
      const signature = await signMessageAsync({ message });

      setStatus('verifying');

      // 4. Verify on server
      const verifyRes = await fetch('/api/auth/web3/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, signature, address }),
      });

      if (!verifyRes.ok) {
        const { error } = await verifyRes.json() as { error: string };
        throw new Error(error ?? 'Verification failed');
      }

      const { token, email } = await verifyRes.json() as { token: string; email: string };

      // 5. Establish Supabase session
      const supabase = createClient();
      const { error: otpError } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'email',
      });

      if (otpError) throw otpError;

      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      if (msg.includes('rejected') || msg.includes('denied')) {
        setErrorMsg('Signature rejected. Please try again.');
      } else {
        setErrorMsg(msg);
      }
      setStatus('error');
      disconnect();
    }
  }

  const isLoading = status === 'signing' || status === 'verifying';

  const label = isLoading
    ? status === 'signing' ? 'Sign in wallet…' : 'Verifying…'
    : '🔗 Connect Wallet';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <button
        type="button"
        onClick={isConnected ? handleSIWE : openConnectModal}
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '11px 16px',
          background: isLoading ? 'rgba(0,229,255,0.06)' : 'rgba(0,229,255,0.08)',
          border: '1px solid rgba(0,229,255,0.2)',
          borderRadius: '8px',
          color: '#00E5FF',
          fontFamily: 'var(--font-display)',
          fontSize: '0.78rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
        onMouseEnter={e => {
          if (!isLoading) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,229,255,0.14)';
        }}
        onMouseLeave={e => {
          if (!isLoading) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,229,255,0.08)';
        }}
      >
        {isLoading && (
          <span style={{ width: 14, height: 14, border: '2px solid rgba(0,229,255,0.3)', borderTopColor: '#00E5FF', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
        )}
        {label}
      </button>

      {status === 'error' && errorMsg && (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#F87171', margin: 0, textAlign: 'center' }}>
          {errorMsg}
        </p>
      )}
    </div>
  );
}
