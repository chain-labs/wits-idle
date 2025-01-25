"use client";

import { usePrivy } from "@privy-io/react-auth";
import {
  useAbstractClient,
  useLoginWithAbstract,
  useWriteContractSponsored,
} from "@abstract-foundation/agw-react";
import { useAbstractPrivyLogin } from "@abstract-foundation/agw-react/privy";
import React, { useEffect } from "react";
import { Config, useAccount } from "wagmi";

export interface AccountContextType {
  address: string | undefined;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  writeContractSponsoredAsync: any;
}

const AccountContext = React.createContext<AccountContextType | undefined>(
  undefined,
);

export function useAccountWrapper() {
  const context = React.useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
}

export default function AccountWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = useAccount();
  const [address, setAddress] = React.useState<string | undefined>(() => {
    // Initialize from localStorage if available
    if (typeof window !== "undefined") {
      return localStorage.getItem("userAddress") || undefined;
    }
    return undefined;
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const { login: privyLogin, logout: privyLogout, user } = usePrivy();
  const [lockingKey, setLockingKey] = React.useState<boolean>(true);
  const { writeContractSponsoredAsync } = useWriteContractSponsored();

  const agwCLient = useAbstractClient();

  console.log({ user });

  console.log("agwCLient", agwCLient, agwCLient.isLoading);

  const login = async () => {
    setIsLoading(true);
    setLockingKey(true);
    privyLogin();
  };

  const logout = async () => {
    console.log("logout");
    setIsLoading(true);
    try {
      console.log("logout try block");
      privyLogout();
      console.log("logout abstract");
      setAddress(undefined);
      // Remove from localStorage
      localStorage.removeItem("userAddress");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (client?.address) {
      if (!address && lockingKey) {
        setAddress(client.address);
        // Save to localStorage
        localStorage.setItem("userAddress", client.address);
        setIsLoading(false);
        setLockingKey(false);
      }
    }
  }, [client.address, address, lockingKey]);

  // useEffect(() => {
  //   if (address && client?.address !== address) {

  //   }
  // }, [address, client?.address, login]);

  console.log("address", client, address, isLoading);

  const value = {
    address: address ?? undefined,
    isLoading,
    login,
    logout,
    writeContractSponsoredAsync,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}
