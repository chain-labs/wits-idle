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

const LoginSchema = z.object({
  name: z.string().min(3, "minimum 3 characters"),
  email: z.string().email(),
  discord: z
    .string()
    .url()
    .regex(/discord.com/),
  twitter: z
    .string()
    .url()
    .regex(/twitter.com/),
});

export default function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    name: string;
    email: string;
    discord: string;
    twitter: string;
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
          <GradientSideBorder className="" />
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
            <div>
              <h1 className="uppercase text-lightGold text-[36px] font-bold">
                REGISTER
              </h1>
              <h3 className="uppercase text-lightGold text-[14px]">
                Have an account?{" "}
                <Link href="/login" className="underline">
                  LOGIN
                </Link>
              </h3>
            </div>
            <Input
              placeholder="Name"
              {...register("name")}
              className="input"
              errorMessage={errors.name?.message}
            />
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="input"
              errorMessage={errors.email?.message}
            />
            <Input
              placeholder="Discord"
              {...register("discord")}
              className="input"
              errorMessage={errors.discord?.message}
            />
            <Input
              placeholder="Twitter"
              {...register("twitter")}
              className="input"
              errorMessage={errors.twitter?.message}
            />
            <button
              type="button"
              className="bg-black py-[16px] w-full h-fit border border-lightGold text-lightGold rounded-[4px] uppercase"
            >
              Connect Wallet
            </button>
            <small className="uppercase tracking-[0.08em] text-[#797979] text-[10px] text-center mx-auto">
              ENSURE YOUR WALLET IS UNLOCKED AND READY TO BE USED
            </small>
            <Button
              type="submit"
              className=" absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 mx-auto"
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
