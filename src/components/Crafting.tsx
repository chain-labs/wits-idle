import Image from "next/image";
import GlowingH1 from "./GlowingH1";
import { FaChevronDown } from "react-icons/fa";
import { TiMinus, TiPlus } from "react-icons/ti";
import { useState } from "react";
import { IMAGEKIT_IMAGES } from "@/app/images";

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
export default function Crafting() {
  const material = {
    icon: IMAGEKIT_IMAGES.CRAFT_ICON,
    rarity: "Common",
    collection: 0,
  };
  const materials = [material, material, material, material, material];

  return (
    <div className="flex flex-col justify-center items-center gap-[50px] py-[100px]">
      <GlowingH1>CRAFTING</GlowingH1>

      <div className="flex flex-col justify-center items-center gap-[40px] z-10">
        {materials.map((material, index) => (
          <CraftItem {...material} key={index} />
        ))}
      </div>
    </div>
  );
}
