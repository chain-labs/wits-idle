import { IMAGEKIT_LOGO } from "@/app/images";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const { scrollYProgress } = useScroll();
  const [left, setLeft] = useState("calc(0%)");

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setLeft(`calc(${(latest * 100).toFixed(2)}% )`);
  });
  return (
    <header className="relative bg-[linear-gradient(to_right,#FFFED000,#FFFED00D_90%)] flex flex-col justify-between items-center mx-[48px] mt-[48px] rounded-[6px] z-50 backdrop-blur-sm">
      <div className="flex justify-between items-center w-full py-[8px] px-[48px]">
        <Image
          src={IMAGEKIT_LOGO.WITS_LOGO}
          alt="WITS Logo"
          width={168}
          height={97}
          className="w-[100px] h-auto object-cover scale-[1.2]"
        />

        <div className="flex justify-center items-center gap-[32px] uppercase text-lightGold z-50">
          <Link href={"/adventures"}>ADVENTURES</Link>
          <Link href={"/materials"}>MATERIALS</Link>
          <Link href={"/prizes"}>PRIZES</Link>
          <Link href={"/account"}>ACCOUNT</Link>
        </div>
      </div>

      <div className="relative w-full h-[1px] bg-[radial-gradient(#AF9B5F,#AF9B5F00_70%)] max-w-screen rounded-[100%]">
        <div className="relative w-[calc(100%_-_45px)] mr-auto h-full">
          <motion.div
            style={{
              left,
            }}
            className="absolute top-0 left-0 -translate-y-1/2 w-[40px] h-[fitpx]"
          >
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
              <div className="rotate-45 border-[1px] border-lightGold p-[2px] shadow-[0_0_10px_#EFC779AA]">
                <div className="bg-black p-[4px] border-[0.5px] border-mediumGold"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
