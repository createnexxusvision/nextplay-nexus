'use client';
// NextPlay Nexus — Web3 Provider Tree
// Wraps app with Wagmi + RainbowKit + TanStack Query

import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from '@/lib/wagmi';

const queryClient = new QueryClient();

const rainbowTheme = darkTheme({
  accentColor: '#FDB927',
  accentColorForeground: '#0B1D3A',
  borderRadius: 'medium',
  fontStack: 'system',
  overlayBlur: 'small',
});

export default function Web3Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={rainbowTheme} appInfo={{ appName: 'NextPlay Nexus' }}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
