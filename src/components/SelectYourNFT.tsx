"use client";

import Image from "next/image";
import GradientSideBorder from "./GradientSideBorder";
import { IMAGEKIT_IMAGES } from "@/app/images";
import { cn } from "@/utils";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAccount, usePublicClient } from "wagmi";
import useNFTs from "@/abi/Nfts";

function SingleNFTIcon({
  id,
  icon,
  active,
}: {
  id: string;
  icon: string;
  active: boolean;
}) {
  console.log("active", active, id);
  return (
    <div
      className={cn(
        "relative p-[9px] rounded-[8px] bg-black border-[1px] border-black w-[100px] h-[100px] aspect-square",
        active && "border-lightGold",
      )}
    >
      <input
        id={id}
        type="checkbox" // Changed from radio to checkbox
        name="select-nft"
        className="absolute inset-0 w-full h-full rounded-[inherit] cursor-pointer opacity-0"
      />
      <Image
        src={icon}
        alt="nft-icon"
        width={100}
        height={100}
        className="rounded-full w-full h-full aspect-square"
      />
    </div>
  );
}

export default function LockingNFTs({
  selectedNFTs,
  setSelectedNFTs,
}: {
  selectedNFTs: Set<string>;
  setSelectedNFTs: Dispatch<SetStateAction<Set<string>>>;
}) {
  // const nfts = Array.from({ length: 100 }, () => ({
  //   icon: IMAGEKIT_IMAGES.NFT_ICON,
  // }));
  const [NFTS, setNFTS] = useState<
    {
      icon: string;
      tokenId: string;
    }[]
  >([]);
  const client = usePublicClient();
  const nftContract = useNFTs();
  const account = useAccount();

  async function getNFTS() {
    if (!account.address) return;
    const nfts = await client?.getContractEvents({
      address: nftContract.address as `0x${string}`,
      abi: nftContract.abi as [],
      eventName: "Transfer",
      args: {
        to: account.address,
      },
      fromBlock: "earliest",
      toBlock: "latest",
    });

    const tokenId = nfts?.map((nft: any) => {
      return nft.args.tokenId;
    }) as [];

    setNFTS(
      tokenId.map((id) => ({
        icon: IMAGEKIT_IMAGES.NFT_ICON,
        tokenId: id,
      })),
    );
  }

  useEffect(() => {
    getNFTS();
  }, [account.address]);

  function handleNFTSelect(e: React.FormEvent<HTMLFormElement>) {
    console.log("e", e.target);
    const target = e.target as HTMLInputElement;
    setSelectedNFTs((prev) => {
      const newSet = new Set(prev);
      if (target.checked) {
        newSet.add(target.id);
      } else {
        newSet.delete(target.id);
      }
      return newSet;
    });
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
        {NFTS.map((nft, idx) => (
          <SingleNFTIcon
            key={nft.tokenId}
            id={nft.tokenId}
            icon={nft.icon}
            active={selectedNFTs.has(BigInt(nft.tokenId).toString())}
          />
        ))}
        {Array.from({ length: 50 - NFTS.length }, (_, idx) => (
          <div key={idx}></div>
        ))}
      </form>
    </div>
  );
}
