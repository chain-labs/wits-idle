"use client";

import { IMAGEKIT_BG, IMAGEKIT_LOGO } from "../images";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils";
import GradientSideBorder from "@/components/GradientSideBorder";
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import { useAccount } from "wagmi";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function SignIn() {
  const { login } = useLoginWithAbstract();
  const acc = useAccount();
  const router = useRouter();

  useEffect(() => {
    console.log("acc", acc);
    if (acc?.address !== undefined) {
      console.log("redirecting to home page");
      router.push("/");
    }
  }, [acc]);

  return (
    <Button
      type="submit"
      onClick={login}
      className="absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 mx-auto whitespace-nowrap"
    >
      {acc?.address !== undefined ? (
        <span className={cn("text-center w-full")}>Continue</span>
      ) : (
        <span className="text-center w-full">Signin</span>
      )}
    </Button>
  );
}

function AuthContent() {
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGEKIT_BG.AUTHENTICATION})`,
      }}
      className="flex justify-end items-end h-screen w-full bg-cover bg-center overflow-hidden"
    >
      <div className="h-full w-[70vw] bg-[linear-gradient(to_right,#0000,#000_60%)] flex justify-start items-center">
        <div
          className={
            "bg-[#020708BF] h-fit w-fit translate-x-[28vw] rounded-[8px] p-[1px] bg-blend-darken"
          }
        >
          <GradientSideBorder />
          <GradientSideBorder className="rotate-180" />

          <div className="relative w-[30vw] max-w-[600px] px-[50px] py-[20%] rounded-[8px]  flex flex-col justify-start items-start gap-[24px] bg-blend-multiply">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
              <div className="rotate-45 border-[2px] border-lightGold p-[4px] shadow-[0_0_10px_#EFC779AA]">
                <div className="bg-black p-[14px] border-[1px] border-mediumGold">
                  <Image
                    src={IMAGEKIT_LOGO.WITS_W_LOGO}
                    alt="WITS W Logo"
                    width={45}
                    height={47}
                    style={{
                      transform: "rotate(-45deg) translate(-5%, 0%)",
                    }}
                    className="w-[45px] h-[47px]"
                  />
                </div>
              </div>
            </div>
            <h1 className="uppercase text-lightGold text-[36px] font-bold text-center w-full">
              LOGIN / REGISTER
            </h1>
            <small className="uppercase tracking-[0.08em] text-[#797979] text-[10px] text-center mx-auto">
              This platform is using abstract native wallet
            </small>
            <Suspense fallback={<div>Loading...</div>}>
              <SignIn />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Auth() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
}
