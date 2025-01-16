"use client";

import { IMAGEKIT_BG, IMAGEKIT_LOGO } from "../images";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils";
import GradientSideBorder from "@/components/GradientSideBorder";
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function SignIn() {
  // login function to prompt the user to sign in with AGW.
  const { login } = useLoginWithAbstract();
  const acc = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (acc?.address !== undefined) {
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
        <Link href="/">
          <p className={cn("text-center w-full")}>
            {acc?.address.slice(0, 6) + "..." + acc?.address.slice(-4)}
          </p>
        </Link>
      ) : (
        <span className="text-center w-full">Signin</span>
      )}
    </Button>
  );
}

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "minimum 8 characters"),
});

export default function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>({
    resolver: zodResolver(LoginSchema),
  });

  function onSubmit(data: any) {
    console.log(data);
    localStorage.setItem("isAuthenticated", "true");
    location.href = "/";
  }

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

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative w-[30vw] max-w-[600px] px-[50px] py-[20%] rounded-[8px]  flex flex-col justify-start items-start gap-[24px] bg-blend-multiply"
          >
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
            <SignIn />
          </form>
        </div>
      </div>
    </div>
  );
}
