"use client";

import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";

export interface AccountContextType {
  address: string | undefined;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
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
  const { login: abstractLogin, logout: abstractLogout } =
    useLoginWithAbstract();
  const [lockingKey, setLockingKey] = React.useState<boolean>(true);

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

  const login = async () => {
    setIsLoading(true);
    setLockingKey(true);
    abstractLogin();
  };

  const logout = async () => {
    console.log("logout");
    setIsLoading(true);
    try {
      console.log("logout try block");
      abstractLogout();
      console.log("logout abstract");
      setAddress(undefined);
      // Remove from localStorage
      localStorage.removeItem("userAddress");
    } finally {
      setIsLoading(false);
    }
  };

  console.log("address", client, address, isLoading);

  const value = {
    address: address ?? undefined,
    isLoading,
    login,
    logout,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}
