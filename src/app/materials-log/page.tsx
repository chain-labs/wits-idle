"use client";

import Button from "@/components/Button";
import Unauthenticated from "@/components/Unauthenticated";
import React, { useState } from "react";
import Header from "@/components/Header";
import { IMAGEKIT_BG, IMAGEKIT_IMAGES } from "../images";
import { cn } from "@/utils";
import Image from "next/image";
import { optional, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input";
import { TiMinus, TiPlus } from "react-icons/ti";

function DesignedCell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "border-lightGold border-[1px] rounded-[4px]",
        "bg-gradient-to-b from-[#FFFED0] to-[#8C8C73]",
        "text-black text-center",
        "w-full",
        "flex justify-center items-center",
        "px-[32px] py-[4px]",
      )}
    >
      {children}
    </div>
  );
}

function CraftItem(craft: { icon: string; rarity: string }) {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col justify-center items-center gap-[8px] p-[8px] text-lightGold">
      <Image
        src={craft.icon}
        width={150}
        height={150}
        alt="Common"
        className="w-[150px] h-[150px]"
      />
      <div className="text-[#797979] bg-black rounded-[4px] w-full py-[8px] text-center">
        {craft.rarity}
      </div>
      <div className="flex justify-center items-center gap-[16px]">
        <button
          onClick={() => {
            if (count > 0) setCount(count - 1);
          }}
          className={cn(
            "border-lightGold border-[1px] rounded-[4px]",
            "bg-gradient-to-b from-[#FFFED0] to-[#8C8C73]",
            "text-black text-center",
            "w-fit",
            "flex justify-center items-center",
            "p-[8px]",
          )}
        >
          <TiMinus />
        </button>
        <div className="bg-black rounded-[4px] border-lightGold border-[1px] text-center px-[32px] py-[8px]">
          {String(count).padStart(2, "0")}
        </div>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
          className={cn(
            "border-lightGold border-[1px] rounded-[4px]",
            "bg-gradient-to-b from-[#FFFED0] to-[#8C8C73]",
            "text-black text-center",
            "w-fit",
            "flex justify-center items-center",
            "p-[8px]",
          )}
        >
          <TiPlus />
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  if (!isAuthenticated) {
    return <Unauthenticated />;
  }

  const rarityList = [
    {
      icon: IMAGEKIT_IMAGES.CRAFT_ICON,
      rarity: "COMMON",
      unused: 0,
      used: 0,
    },
    {
      icon: IMAGEKIT_IMAGES.CRAFT_ICON,
      rarity: "UNCOMMON",
      unused: 0,
      used: 0,
    },
    {
      icon: IMAGEKIT_IMAGES.CRAFT_ICON,
      rarity: "RARE",
      unused: 0,
      used: 0,
    },
    {
      icon: IMAGEKIT_IMAGES.CRAFT_ICON,
      rarity: "EPIC",
      unused: 0,
      used: 0,
    },
    {
      icon: IMAGEKIT_IMAGES.CRAFT_ICON,
      rarity: "MYTHICAL",
      unused: 0,
      used: 0,
    },
    {
      icon: IMAGEKIT_IMAGES.CRAFT_ICON,
      rarity: "LEGENDARY",
      unused: 0,
      used: 0,
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-cover bg-center overflow-x-hidden bg-blend-multiply bg-opacity-10 z-0">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-[#0000] to-black z-[-1]"></div>
      <div
        style={{
          backgroundImage: `url(${IMAGEKIT_BG.PRIZE})`,
        }}
        className="absolute inset-0 w-full h-full bg-cover opacity-10"
      ></div>

      <Header />

      <div className="flex justify-center items-center gap-[10px] mb-[16px] mt-[48px]">
        <svg
          width="261"
          height="12"
          viewBox="0 0 261 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="0.706021"
            width="7.0123"
            height="7.0123"
            transform="matrix(0.708191 0.706021 -0.708191 0.706021 255.826 0.207555)"
            fill="black"
            stroke="#8C8C73"
          />
          <path d="M251 6.00002L0 6" stroke="url(#paint0_linear_9_2)" />
          <defs>
            <linearGradient
              id="paint0_linear_9_2"
              x1="251"
              y1="6.00002"
              x2="55.6404"
              y2="6.00001"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#8C8C73" />
              <stop offset="1" stop-color="#8C8C73" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <h1 className="uppercase text-lightGold text-[24px] mx-[50px]">
          Material log
        </h1>

        <svg
          width="261"
          height="12"
          viewBox="0 0 261 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rotate-180"
        >
          <rect
            y="0.706021"
            width="7.0123"
            height="7.0123"
            transform="matrix(0.708191 0.706021 -0.708191 0.706021 255.826 0.207555)"
            fill="black"
            stroke="#8C8C73"
          />
          <path d="M251 6.00002L0 6" stroke="url(#paint0_linear_9_2)" />
          <defs>
            <linearGradient
              id="paint0_linear_9_2"
              x1="251"
              y1="6.00002"
              x2="55.6404"
              y2="6.00001"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#8C8C73" />
              <stop offset="1" stop-color="#8C8C73" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex justify-start items-start gap-[50px] mx-[32px] my-[50px] z-10">
        <div className="flex flex-col justify-start items-start gap-[24px] rounded-[8px] border-[1px] border-[#292929] bg-[#14141480] px-[48px] py-[64px] uppercase text-lightGold z-10 w-full">
          <table>
            <thead>
              <tr className="uppercase text-[#6A6A6A] text-[12px] grid grid-cols-[3fr_1fr_1fr] gap-[8px]">
                <th>Rarity</th>
                <th>Unused</th>
                <th>Used</th>
              </tr>
            </thead>
            <tbody>
              {rarityList.map((rarity, index) => (
                <tr
                  key={rarity.rarity}
                  className="grid grid-cols-[3fr_1fr_1fr] gap-[8px]"
                >
                  <td>
                    <DesignedCell>{rarity.rarity}</DesignedCell>
                  </td>
                  <td>
                    <DesignedCell>{rarity.unused}</DesignedCell>
                  </td>
                  <td>
                    <DesignedCell>{rarity.used}</DesignedCell>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="grid grid-flow-col place-items-center w-full">
            {rarityList.map((rarity, index) => (
              <CraftItem {...rarity} key={index} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-[50px] z-10">
        <button
          type="button"
          className="bg-black mb-[50px] py-[8px] px-[32px] w-[40vw] h-fit border border-lightGold text-lightGold rounded-[4px] uppercase z-10"
        >
          Craft
        </button>
      </div>
    </div>
  );
}
