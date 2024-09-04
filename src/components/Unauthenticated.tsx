import Image from "next/image";
import { IMAGEKIT_BG, IMAGEKIT_LOGO } from "@/app/images";
import Button from "./Button";
import Link from "next/link";

export default function Unauthenticated() {
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGEKIT_BG.HOMEPAGE})`,
      }}
      className="relative h-screen w-full bg-cover bg-center overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-[#0000] to-black"></div>

      <div className="absolute left-1/2 top-[10vh] -translate-x-1/2 w-fit h-fit flex justify-center items-center z-0">
        <Image
          src={IMAGEKIT_LOGO.WITS_IDLE}
          alt="WITS Idle Game"
          width={552}
          height={389}
          className="w-[552px] h-[389px]"
        />
        <div className="absolute inset-0 w-full h-full translate-y-[-10%] rounded-[100%] bg-[radial-gradient(circle_at_center,rgba(0,0,0,1),rgba(0,0,0,0))] z-[-1] blur-lg"></div>
      </div>

      <div className="absolute bottom-0 left-0 h-[40vh] w-full rounded-[100%]  bg-[radial-gradient(#FDD88840,#FDD88800,#FDD88800)]"></div>

      <Link
        className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 -translate-y-full z-0"
        href="/login"
      >
        <Button>JOIN</Button>
      </Link>
    </div>
  );
}
