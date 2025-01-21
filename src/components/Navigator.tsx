"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import path from "path";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const Navigator = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const account = useAccount();
  const pathname = usePathname();
  const router = useRouter();
  const [checkConnection, setCheckConnection] = useState<boolean>(false);

  useEffect(() => {
    console.log("account", account);
    if (account.isConnecting) {
      setCheckConnection(true);
    }
  }, [account]);

  useEffect(() => {
    if (
      checkConnection &&
      account.status === "connected" &&
      !pathname.includes("/login")
    ) {
    } else {
      console.log("redirecting to login page");
      router.push(
        `
      /login?redirect=${encodeURIComponent(pathname)}
      `,
      );
    }
  }, [checkConnection, account.status, pathname, router]);

  return <div>{children}</div>;
};

export default Navigator;
