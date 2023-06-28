import { ColorModeScript } from "@chakra-ui/react"
import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { App } from "./App"
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { fantom, fantomTestnet } from "viem/chains";
import { publicProvider } from "wagmi/providers/public"
import { projectId } from './global_variables';




const { chains, publicClient } = configureChains(
  [fantom, fantomTestnet],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Vendao",
  projectId: projectId,
  chains
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})


const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)

root.render(
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <ColorModeScript />
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
)

