"use client";

import Button from "@/components/Button";
import { IMAGEKIT_BG } from "./images";
import Header from "@/components/Header";
import Link from "next/link";
import { useAccount, useConfig } from "wagmi";
import { useEffect, useState } from "react";
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import { Config, getAccount, GetAccountReturnType } from "@wagmi/core";
import { Chain } from "viem";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  // const account = use();
  const [account, setAccount] = useState<GetAccountReturnType<Config, Chain>>();
  const { login } = useLoginWithAbstract();
  const config = useConfig();

  // Handle hydration mismatch
  useEffect(() => {
    const account = getAccount(config);
    console.log({ account });
    setAccount(account);

    setMounted(true);
  }, []);

  if (!mounted) return null;

  console.log("account", account);
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGEKIT_BG.HOMEPAGE})`,
      }}
      className="relative h-screen w-full bg-cover bg-center overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-[#0000] to-black z-0"></div>

      <Header active="home" />

      <div className="absolute bottom-0 left-0 h-[40vh] w-full rounded-[100%]  bg-[radial-gradient(#FDD88840,#FDD88800,#FDD88800)]"></div>
      {!account?.address ? (
        <Link
          href="/login"
          className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 -translate-y-full z-0"
        >
          <Button onClick={login}>SIGNIN</Button>
        </Link>
      ) : (
        <Link
          href="/game"
          className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 -translate-y-full z-0"
        >
          <Button>START GAME</Button>
        </Link>
      )}
    </div>
  );
}
