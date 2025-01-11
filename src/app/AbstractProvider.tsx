"use client";

import { AbstractWalletProvider } from "@abstract-foundation/agw-react";

const config = {
  testnet: true, // Required
  // Optionally, provide your own RPC URL (learn more: https://viem.sh/docs/clients/transports/http.html)
  // transport: http("https://your.abstract.node.example.com/rpc") // Optional
};

const AbstractProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AbstractWalletProvider config={config}>{children}</AbstractWalletProvider>
  );
};

export default AbstractProvider;
