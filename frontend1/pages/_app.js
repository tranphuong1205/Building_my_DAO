import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.css";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiProvider } from "wagmi";
import {
  sepolia,
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
  zora,
} from "wagmi/chains";
//import { publicProvider } from "wagmi/providers/public";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//const { chains, publicClient } = configureChains([sepolia], [publicProvider()]);
const config = getDefaultConfig({
  appName: "DAOproject",
  projectId: "f5a40cc7103edb180e7aad1790f92398",
  chains: [
    mainnet,
    // polygon,
    // optimism,
    // arbitrum,
    // base,
    //zora,
    //polygonMumbai,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  ssr: true,
});
const client = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider coolMode>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
