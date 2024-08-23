"use client";

import Image from "next/image";
import { IMAGEKIT_BG } from "../images";
import Button from "@/components/Button";
import { cn } from "@/utils";
import { useState } from "react";
import Model from "@/components/Modal";

export default function Notice() {
  const [openModel, setOpenModel] = useState(false);

  function handleClick() {
    setOpenModel(true);
  }

  return (
    <div className="relative min-h-screen h-fit bg-cover bg-center bg-no-repeat overflow-hidden">
      <Image
        src={IMAGEKIT_BG.INSTRUCTIONS}
        alt="Instructions"
        height={1440}
        width={2560}
        className="w-full"
      />
      <div
        className={cn(
          "absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2",
          "flex flex-col justify-center items-center gap-[18px]",
          "max-w-[45%]",
          "text-lightGold text-center uppercase",
        )}
      >
        <p>1. Select Start Game</p>
        <p>
          2. Select NFTs you wish to send on an adventure. NOTE: Once you start
          an adventure you cannot stop it until the timer runs out. They will be
          locked for the entire duration. You can only do 1 Adventure at a time
          so send as many or as little as you want!
        </p>
        <p>
          3. Select the duration in which you would like to send your characters
          on an adventure for.
        </p>
        <p>4. Confirm the details.</p>
        <p>5. Sit back and wait.</p>
        <p>6. Collect your loot!</p>
        <Button className="mt-[10px]" onClick={handleClick}>
          START GAME
        </Button>
      </div>
      {/* {openModel && (
        <Model>
          <div className="absolute inset-0 flex justify-center items-center">
            <div
              onMouseDown={() => setOpenModel(false)}
              className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-xl cursor-not-allowed"
            ></div>
            <div className="bg-black p-4 rounded-lg z-[1]">
              <p>Model</p>
              <Button onClick={() => setOpenModel(false)}>Close</Button>
            </div>
          </div>
        </Model>
      )} */}
    </div>
  );
}
