"use client";

import { IMAGEKIT_BG, IMAGEKIT_IMAGES } from "../images";
import GameModeBanner from "@/components/GameModeBanner";
import GameFooter from "@/components/GameFooter";
import SelectYourNFT from "@/components/SelectYourNFT";
import { useState } from "react";
import Modal from "@/components/Modal";
import { cn } from "@/utils";
import Link from "next/link";
import GradientSideBorder from "@/components/GradientSideBorder";
import GlowingH1 from "@/components/GlowingH1";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";
import { TiMinus, TiPlus } from "react-icons/ti";

function CraftItem(craft: {
  icon: string;
  rarity: string;
  collection: number;
}) {
  const [count, setCount] = useState(craft.collection);

  return (
    <div className="relative p-[8px] pl-[70px] rounded-[4px] bg-black text-lightGold">
      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
        <Image
          src={craft.icon}
          width={100}
          height={100}
          alt="Common"
          className="w-[100px] h-[100px]"
        />
      </div>
      <div className="border-t-[1px] border-r-[1px] border-b-[1px] border-[#FFFED01A] rounded-[4px] p-[8px]">
        <div className="flex justify-center items-center gap-[16px]">
          <button
            onClick={() => {
              if (count > 0) setCount(count - 1);
            }}
            className="border-[1px] border-lightGold bg-[#FFFED026] w-[24px] h-[24px] flex justify-center items-center rounded-[4px]"
          >
            <TiMinus />
          </button>
          {String(count).padStart(2, "0")} {craft.rarity}
          <button
            onClick={() => {
              setCount(count + 1);
            }}
            className="border-[1px] border-lightGold bg-[#FFFED026] w-[24px] h-[24px] flex justify-center items-center rounded-[4px]"
          >
            <TiPlus />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  function HandleExitButton() {
    setOpenModal(true);
  }
  const material = {
    icon: IMAGEKIT_IMAGES.CRAFT_ICON,
    rarity: "Common",
    collection: 0,
  };
  const materials = [material, material, material, material, material];
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGEKIT_BG.CRAFT})`,
      }}
      className="h-screen w-screen bg-cover bg-center overflow-x-hidden"
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-[#0000] to-black"></div>

      <div className="relative w-full h-fit flex flex-col justify-center items-center z-0 p-[14px]">
        <div
          className={cn(
            "relative w-full h-full",
            "flex flex-col justify-center items-center gap-[100px]",
            "text-lightGold",
          )}
        >
          <GradientSideBorder />
          <GradientSideBorder className="rotate-180" />

          <div className="flex flex-col justify-center items-center gap-[50px] py-[100px]">
            <GlowingH1>CRAFTING</GlowingH1>

            <div className="flex flex-col justify-center items-center gap-[40px] z-10">
              {materials.map((material, index) => (
                <CraftItem {...material} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <GameFooter
        backButton={{
          visible: false,
        }}
        primaryButton={{
          text: "PROCEED",
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
