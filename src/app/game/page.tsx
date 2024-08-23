"use client";

import Button from "@/components/Button";
import { IMAGEKIT_BG } from "../images";
import GameModeBanner from "@/components/GameModeBanner";
import GameFooter from "@/components/GameFooter";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGEKIT_BG.HOMEPAGE})`,
      }}
      className="h-screen w-screen bg-cover bg-center overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-[#0000] to-black z-0"></div>

      <GameModeBanner />

      <GameFooter />
    </div>
  );
}
