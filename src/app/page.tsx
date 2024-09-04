"use client";

import Button from "@/components/Button";
import Unauthenticated from "@/components/Unauthenticated";
import { useEffect, useState } from "react";
import { IMAGEKIT_BG } from "./images";
import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <Unauthenticated />;
  }

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
      <Link
        href="/game"
        className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 -translate-y-full z-0"
      >
        <Button>START GAME</Button>
      </Link>
    </div>
  );
}
