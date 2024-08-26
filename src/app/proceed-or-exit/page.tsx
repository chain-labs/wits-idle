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

function Details() {
  const [openDetails, setOpenDetails] = useState(false);
  const detail = {
    nftIcon: IMAGEKIT_IMAGES.NFT_ICON,
    materials: [
      {
        icon: IMAGEKIT_IMAGES.CRAFT_ICON,
        collection: 2,
      },
      {
        icon: IMAGEKIT_IMAGES.CRAFT_ICON,
        collection: 5,
      },
      {
        icon: IMAGEKIT_IMAGES.CRAFT_ICON,
        collection: 1,
      },
      {
        icon: IMAGEKIT_IMAGES.CRAFT_ICON,
        collection: 0,
      },
      {
        icon: IMAGEKIT_IMAGES.CRAFT_ICON,
        collection: 0,
      },
    ],
  };

  const details = [detail, detail, detail, detail, detail];
  return (
    <>
      <button
        onClick={() => setOpenDetails(!openDetails)}
        className={cn(
          "bg-black",
          "border-[1px] border-lightGold rounded-[4px]",
          "text-lightGold uppercase",
          "py-[16px]",
          "flex justify-center items-center gap-[8px]",
          "w-full",
          "z-10",
        )}
      >
        View Details
        <FaChevronDown className={openDetails ? "transform rotate-180" : ""} />
      </button>
      {openDetails && (
        <div
          className={cn(
            "border-[1px] border-[#797979] rounded-[4px]",
            "px-[32px] py-[48px]",
            "bg-[#14141480] backdrop-blur-[25px]",
            "flex flex-col justify-center items-center gap-[50px]",
            "w-full",
            "z-10",
          )}
        >
          <div className="flex justify-between items-center text-[#6A6A6A] uppercase w-full">
            <h2>NFT</h2>
            <h2>Materials Obtained</h2>
          </div>
          <div className="flex flex-col  gap-[16px] w-full">
            {details.map((detail, index) => (
              <div
                key={detail.nftIcon}
                className="flex justify-between items-center bg-[#171717] rounded-[4px] p-[10px]"
              >
                <div className="bg-black rounded-[4px]">
                  <Image
                    src={detail.nftIcon}
                    width={50}
                    height={50}
                    alt="NFT Icon"
                    className="w-[50px] h-[50px] rounded-full p-[4px]"
                  />
                </div>
                <div className="flex justify-between items-center gap-[16px]">
                  {detail.materials.map((material, index) => (
                    <div
                      key={detail.nftIcon + material + index}
                      className="relative rounded-[4px] border-[#292929] border-[1px]"
                    >
                      <Image
                        src={material.icon}
                        width={50}
                        height={50}
                        alt={material.icon}
                        className="w-[50px] h-[50px]"
                      />

                      <div
                        className={cn(
                          "absolute top-0 right-0 translate-x-1/2 -translate-y-1/2",
                          "border-[#474747] border-[1px] rounded-full",
                          "bg-[#292929]",
                          "text-lightGold font-lato text-center",
                          "w-[1.5em] h-[1.5em] aspect-square",
                          "flex justify-center items-center",
                        )}
                      >
                        {material.collection}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
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
            <GlowingH1>Materials won</GlowingH1>

            <div className="flex justify-center items-center gap-[20px]">
              {materials.map((material, index) => (
                <div
                  key={index}
                  className="border-[1px] border-[#292929] rounded-[4px] bg-[#14141480] px-[12px] py-[24px] flex flex-col justify-center items-center gap-[8px] z-10"
                >
                  <Image
                    src={material.icon}
                    width={165}
                    height={165}
                    alt={material.rarity}
                    className="w-[10vw] h-[10vw]"
                  />

                  <div
                    className={cn(
                      "w-full bg-black",
                      "p-[8px]",
                      "text-center uppercase text-[#797979]",
                      "border-[1px] border-[#797979] rounded-[4px]",
                    )}
                  >
                    {material.rarity}
                  </div>

                  <button
                    className={cn(
                      "bg-gradient-to-b from-[#FFFED0] to-[#8C8C73]",
                      "text-black uppercase",
                      "rounded-b-[4px] border-[1px] border-[#FFFED0]",
                      "w-full",
                      "py-[8px]",
                    )}
                  >
                    {material.collection}X
                  </button>
                </div>
              ))}
            </div>

            <Details />
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
