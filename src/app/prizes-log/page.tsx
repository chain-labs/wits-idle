"use client";

import Button from "@/components/Button";
import Unauthenticated from "@/components/Unauthenticated";
import { useState } from "react";
import Header from "@/components/Header";
import { IMAGEKIT_BG, IMAGEKIT_IMAGES } from "../images";
import { cn } from "@/utils";
import Image from "next/image";
import { optional, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input";

export default function Home() {
  const prize = {
    name: "Prize Name",
    dateTime: new Date().getTime(),
    id: 13243243,
    rarity: "Common" as "Common" | "Rare" | "Epic" | "Legendary",
  };

  const prizes = Array.from({ length: 2 }, () => prize);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  if (!isAuthenticated) {
    return <Unauthenticated />;
  }

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
          Prize log
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
          {prizes.map((prize) => (
            <>
              <div
                key={prize.id}
                className="flex justify-start items-start gap-[24px]"
              >
                <div className="relative bg-black rounded-[4px] w-[152px] h-[135px]"></div>
                <div className="flex flex-col gap-[8px]">
                  <p className="uppercase">PRIZE NAME</p>
                  <p className="capitalize">Date Time</p>
                  <p className="capitalize">Prize ID</p>
                  <p className="capitalize">Rarity</p>
                </div>
              </div>
              <hr className="h-[1px] w-full border-[#292929]" />
            </>
          ))}
        </div>
        <div className="flex flex-col justify-start items-start gap-[24px] rounded-[8px] border-[1px] border-[#292929] bg-[#14141480] px-[48px] py-[64px] uppercase text-lightGold z-10 w-full max-w-[500px]">
          <button
            type="button"
            className="bg-black py-[16px] w-full h-fit border border-lightGold text-lightGold rounded-[4px] uppercase"
          >
            CHECKOUT
          </button>
          <p className="uppercase text-center text-[12px] w-full">
            PROCEED TO RECEIVE ALL OF YOUR PRIZES
          </p>
        </div>
      </div>
    </div>
  );
}
