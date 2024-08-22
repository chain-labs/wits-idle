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

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
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
  }

  return (
    <div
      style={{
        backgroundImage: `url(${IMAGEKIT_BG.AUTHENTICATION})`,
      }}
      className="flex justify-end items-end h-screen w-screen bg-cover bg-center overflow-hidden"
    >
      <div className="h-full w-[70vw] bg-[linear-gradient(to_right,#0000,#000_60%)] flex justify-start items-center">
        <div
          className={
            "bg-[linear-gradient(to_right,#FFFED0,#FFF7BD00_10%_90%,#FFFED0)] h-fit w-fit translate-x-full rounded-[8px] p-[1px] bg-blend-darken"
          }
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative w-[30vw] px-[50px] py-[20%] rounded-[8px] bg-[#020708BF] flex flex-col justify-start items-start gap-[24px] bg-blend-multiply"
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
                LOGIN
              </h1>
              <h3 className="uppercase text-lightGold text-[14px]">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline">
                  Register
                </Link>
              </h3>
            </div>
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="input"
            />
            {errors.email && <p>{errors.email.message}</p>}
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="input"
            />
            {errors.password && <p>{errors.password.message}</p>}
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
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
