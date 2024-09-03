"use client";

import Button from "@/components/Button";
import Unauthenticated from "@/components/Unauthenticated";
import { useState } from "react";
import { IMAGEKIT_BG } from "./images";
import Header from "@/components/Header";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
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

      <Header active="adventures" />

      <div className="absolute bottom-0 left-0 h-[40vh] w-full rounded-[100%]  bg-[radial-gradient(#FDD88840,#FDD88800,#FDD88800)]"></div>
      <Button className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 -translate-y-full z-0">
        START GAME
      </Button>
    </div>
  );
}
