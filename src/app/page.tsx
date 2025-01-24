"use client";

import Button from "@/components/Button";
import { IMAGEKIT_BG } from "./images";
import Header from "@/components/Header";
import Link from "next/link";
import { useAccount, useConfig } from "wagmi";
import { Suspense, useEffect, useState } from "react";
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import { Config, getAccount, GetAccountReturnType } from "@wagmi/core";
import { Chain } from "viem";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const account = useAccount();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useLoginWithAbstract();

  // Handle hydration mismatch
  useEffect(() => {
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
      <Suspense>
        <EmptyReloader />
      </Suspense>
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

const EmptyReloader = () => {
  useEffect(() => {
    const reloadParams = window.location.href.split("?")[1].split("=");

    if (reloadParams[0] === "reload" && reloadParams[1] === "true")
      window.location.href = "/";
  }, []);

  return <div></div>;
};
