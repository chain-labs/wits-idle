"use client";

import { IMAGEKIT_BG } from "../images";
import GameModeBanner from "@/components/GameModeBanner";
import GameFooter from "@/components/GameFooter";
import SelectYourNFT from "@/components/SelectYourNFT";
import { useState } from "react";
import Modal from "@/components/Modal";
import { cn } from "@/utils";
import Link from "next/link";
import LockingNFTs from "@/components/LockingNFTs";
import GradientSideBorder from "@/components/GradientSideBorder";
import GlowingH1 from "@/components/GlowingH1";
import Button from "@/components/Button";
import { IoClose } from "react-icons/io5";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  function HandleExitButton() {
    setOpenModal(true);
  }
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGEKIT_BG.HOMEPAGE})`,
      }}
      className="h-screen w-screen bg-cover bg-center overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-[#0000] to-black"></div>

      <GameModeBanner />

      <LockingNFTs />

      <GameFooter
        backButton={{
          visible: true,
          function: () => {
            location.href = "/game";
          },
        }}
        primaryButton={{
          text: "SEND",
          visible: true,
          function: () => {
            setOpenShareModal(true);
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

      {openShareModal && (
        <Modal>
          <div className="relative w-full h-full bg-black/75 backdrop-blur-[25px] flex flex-col justify-center items-center z-0 p-[14px]">
            <div
              style={{
                backgroundImage: `url(${IMAGEKIT_BG.SHARE})`,
              }}
              className="absolute inset-0 w-full h-full z-[-1] bg-cover"
            ></div>
            <div
              className={cn(
                "relative w-full h-full",
                "flex flex-col justify-center items-center gap-[100px]",
                "text-lightGold",
              )}
            >
              <GradientSideBorder />
              <GradientSideBorder className="rotate-180" />

              <div className="flex flex-col justify-center items-center gap-[10px] z-10">
                <GlowingH1>Share this adventure</GlowingH1>
                <p className="font-lato max-w-[500px] text-center">
                  Congratulations, you have sent # of characters on an
                  adventure! Share your adventure on Twitter.
                </p>
              </div>

              <div className="bg-lightGold/10 border-[1px] border-lightGold px-[32px] py-[48px] z-10">
                <p className="font-lato max-w-[500px] text-center">
                  “I just sent my @wits_tcg catenians on an adventure to earn
                  rewards! Check it out at{" "}
                  <Link
                    href="https://wits.academy/"
                    target="_blank"
                    className="underline"
                  >
                    https://wits.academy/
                  </Link>
                  ”
                </p>
              </div>

              <Button>SHARE</Button>

              <button
                className={cn(
                  "absolute right-0 top-0",
                  "bg-gradient-to-b from-[#FFFED0] to-[#EFC779]",
                  "text-black text-[24px]",
                  "flex justify-center items-center",
                  "aspect-square w-[36px] h-[36px] rounded-[4px] ",
                  "m-[12px]",
                )}
                onClick={() => setOpenShareModal(false)}
              >
                <IoClose />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
