import { IMAGEKIT_LOGO } from "@/app/images";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function Header({
  active,
}: {
  active: "adventures" | "materials" | "prizes" | "account";
}) {
  2;
  const { scrollYProgress } = useScroll();
  const [left, setLeft] = useState("calc(0%)");
  const adventuresRef = useRef<HTMLAnchorElement>(null);
  const materialsRef = useRef<HTMLAnchorElement>(null);
  const prizesRef = useRef<HTMLAnchorElement>(null);
  const accountRef = useRef<HTMLAnchorElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);

  function centerPosition(activeElement: HTMLElement) {
    //get active element position with respect to the header in percentage
    if (!headerRef.current) return 0;
    const activeElementPosition = activeElement.getBoundingClientRect();
    const headerPosition = headerRef.current.getBoundingClientRect();

    return (
      (((activeElementPosition.left +
        (activeElement.offsetWidth / 2) - 20) -
        headerPosition.left) /
        headerPosition.width) *
      100
    );
  }

  function activeRefLeftValue() {
    switch (active) {
      case "adventures":
        return adventuresRef.current
          ? centerPosition(adventuresRef.current)
          : 0;
      case "materials":
        return materialsRef.current ? centerPosition(materialsRef.current) : 0;
      case "prizes":
        return prizesRef.current ? centerPosition(prizesRef.current) : 0;
      case "account":
        return accountRef.current ? centerPosition(accountRef.current) : 0;
      default:
        return 0;
    }
  }

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setLeft(`calc(${(latest * 100).toFixed(2)}% )`);
  });
  return (
    <header
      ref={headerRef}
      className="relative bg-[linear-gradient(to_right,#FFFED000,#FFFED00D_90%)] flex flex-col justify-between items-center mx-[48px] mt-[48px] rounded-[6px] z-50 backdrop-blur-sm"
    >
      <div className="flex justify-between items-center w-full py-[8px] px-[48px]">
        <Image
          src={IMAGEKIT_LOGO.WITS_LOGO}
          alt="WITS Logo"
          width={168}
          height={97}
          className="w-[100px] h-auto object-cover scale-[1.2]"
        />

        <div className="flex justify-center items-center gap-[32px] uppercase text-lightGold z-50">
          <Link ref={adventuresRef} href={"/adventures"}>
            ADVENTURES
          </Link>
          <Link ref={materialsRef} href={"/materials"}>
            MATERIALS
          </Link>
          <Link ref={prizesRef} href={"/prizes"}>
            PRIZES
          </Link>
          <Link ref={accountRef} href={"/account"}>
            ACCOUNT
          </Link>
        </div>
      </div>

      <div className="relative w-full h-[1px] bg-[radial-gradient(#AF9B5F,#AF9B5F00_70%)] max-w-screen rounded-[100%]">
        <div className="relative w-full mr-auto h-full">
          <motion.div
            style={{
              // left: 0,
              left: `${activeRefLeftValue()}%`,
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
