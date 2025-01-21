"use client";

import {
  useGlobalWalletSignerAccount,
  useGlobalWalletSignerClient,
} from "@abstract-foundation/agw-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function Template({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const account = useAccount();
  const router = useRouter();
  const pathname = usePathname();

  if (account.isDisconnected && !pathname.includes("/login")) {
    router.push(
      `
      /login?redirect=${encodeURIComponent(pathname)}
      `,
    );
    return <></>;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(10px)" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
