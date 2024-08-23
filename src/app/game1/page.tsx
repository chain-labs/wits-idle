"use client";

import Button from "@/components/Button";
import { IMAGEKIT_BG } from "../images";
import GameModeBanner from "@/components/GameModeBanner";

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

      <Button className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-full z-0">
        START GAME
        {/* <div className="absolute inset-0 w-screen h-screen rounded-[100%] bg-[radial-gradient(#FDD88840,#FDD88800,#FDD88800)] z-[-1]"></div> */}
      </Button>
    </div>
  );
}
