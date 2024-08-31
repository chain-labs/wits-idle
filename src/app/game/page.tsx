"use client";

import { IMAGEKIT_BG } from "../images";
import GameModeBanner from "@/components/GameModeBanner";
import GameFooter from "@/components/GameFooter";
import SelectYourNFT from "@/components/SelectYourNFT";
import { useState } from "react";
import Modal from "@/components/Modal";
import { cn } from "@/utils";
import Link from "next/link";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  function HandleExitButton() {
    setOpenModal(true);
  }
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGEKIT_BG.HOMEPAGE})`,
      }}
      className="relative h-screen w-full bg-cover bg-center overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-[#0000] to-black"></div>

      <GameModeBanner />

      <SelectYourNFT />

      <GameFooter
        backButton={{
          visible: false,
        }}
        primaryButton={{
          text: "CONTINUE",
          visible: true,
          function: () => {
            location.href = "/game1";
          },
        }}
        exitButton={{
          visible: true,
          function: HandleExitButton,
        }}
      />

      {openModal && (
        <Modal>
          <div className="relative w-full h-full bg-black/75 backdrop-blur-[25px] flex flex-col justify-center items-center z-0">
            <div
              onMouseDown={() => setOpenModal(false)}
              className="absolute inset-0 w-full h-full z-[-1]"
            ></div>
            <div
              className={cn(
                "rounded-[8px] outline outline-1 outline-offset-4 outline-mediumGold",
                "bg-gradient-to-tr from-mediumGold to-lightGold",
                "flex flex-col justify-center items-center",
                "p-[48px]",
              )}
            >
              <h1 className="text-[32px] text-black uppercase font-medium">
                ARE YOU SURE
              </h1>
              <p className="text-[12px] text-black uppercase font-regular">
                Do you really want to exit this game?
              </p>

              <div className="flex justify-center items-center gap-[8px] mt-[16px]">
                <Link
                  href="/"
                  className="bg-black text-lightGold uppercase px-[48px] py-[8px]"
                >
                  YES
                </Link>
                <button
                  onClick={() => setOpenModal(false)}
                  className="bg-black text-lightGold uppercase px-[48px] py-[8px]"
                >
                  NO
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
