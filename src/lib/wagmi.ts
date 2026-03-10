// NextPlay Nexus — Wagmi v2 Configuration
// Supports: MetaMask (injected), Coinbase Wallet, WalletConnect

import { createConfig, http } from 'wagmi';
import { mainnet, polygon, base } from 'wagmi/chains';
import { injected, coinbaseWallet, walletConnect } from 'wagmi/connectors';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? '';

export const wagmiConfig = createConfig({
  chains: [mainnet, polygon, base],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'NextPlay Nexus' }),
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [base.id]: http(),
  },
  ssr: true,
});
