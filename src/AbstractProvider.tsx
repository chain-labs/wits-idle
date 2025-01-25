"use client";

import { AbstractWalletProvider } from "@abstract-foundation/agw-react";
import { AbstractPrivyProvider } from "@abstract-foundation/agw-react/privy";
import { abstractTestnet } from "viem/chains";

const config = {
  chain: abstractTestnet,
  testnet: true,
  // Optionally, provide your own RPC URL (learn more: https://viem.sh/docs/clients/transports/http.html)
  // transport: http("https://your.abstract.node.example.com/rpc") // Optional
};

const AbstractProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AbstractPrivyProvider appId="cm6bylcx701ktwqbvibk558km">
      {children}
    </AbstractPrivyProvider>
  );
};

export default AbstractProvider;
