"use client";

import Image from "next/image";
import GradientSideBorder from "./GradientSideBorder";
import { IMAGEKIT_IMAGES } from "@/app/images";
import { cn } from "@/utils";
import { FormEventHandler, useEffect, useRef, useState } from "react";

function SingleNFTIcon({
  id,
  icon,
  active,
}: {
  id: string;
  icon: string;
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "relative p-[9px] rounded-[8px] bg-black border-[1px] border-black",
        active && "border-lightGold",
      )}
    >
      <input
        id={id}
        type="radio"
        name="select-nft"
        className="absolute inset-0 w-full h-full rounded-[inherit] cursor-pointer opacity-0"
      />
      <Image
        src={icon}
        alt="nft-icon"
        width={100}
        height={100}
        className="rounded-full w-[100px] h-[100px]"
      />
    </div>
  );
}
export default function LockingNFTs() {
  const nfts = Array.from({ length: 100 }, () => ({
    icon: IMAGEKIT_IMAGES.NFT_ICON,
  }));

  const [selectedNFT, setSelectedNFT] = useState<string | null>(null);

  function handleNFTSelect(e: React.FormEvent<HTMLFormElement>) {
    setSelectedNFT((e.target as HTMLInputElement).id);
  }

  return (
    <div className="relative bg-[#020708BF] flex flex-col justify-center items-center gap-[24px] mx-[10vw] mt-[50px] px-[10vw] max-h-[65vh]">
      <GradientSideBorder />
      <GradientSideBorder className="rotate-180" />
      <div className="flex flex-col justify-center items-center gap-[0px] pt-[50px] z-10">
        <h2 className="text-[20px] text-lightGold uppercase tracking-widest">
          Send on an adventure
        </h2>
        <p className="text-[12px] text-lightGold uppercase tracking-wide">
          These nfts will be locked in the smart contract for the selected time
          period and unable to be traded or sent.
        </p>
      </div>
      <form
        onChange={handleNFTSelect}
        className="grid grid-cols-7 mb-[20px] pr-[20px] gap-[10px] overflow-auto z-10"
      >
        {nfts.map((nft, idx) => (
          <SingleNFTIcon
            key={`select-nft-${idx}`}
            id={`select-nft-${idx}`}
            icon={nft.icon}
            active={selectedNFT === `select-nft-${idx}`}
          />
        ))}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </form>
    </div>
  );
}
