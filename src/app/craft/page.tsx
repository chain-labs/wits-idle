"use client";

import { IMAGEKIT_BG } from "../images";
import GameFooter, { GameFooterProps } from "@/components/GameFooter";
import { useState } from "react";
import Modal from "@/components/Modal";
import { cn } from "@/utils";
import GradientSideBorder from "@/components/GradientSideBorder";
import ExitGame from "@/components/modals/ExitGame";
import MaterialsWon from "@/components/MaterialsWon";
import Crafting from "@/components/Crafting";
import Reward from "@/components/Reward";

type stateOfCraft = "materialsWon" | "crafting" | "reward";

export default function Home() {
  const [openModal, setOpenModal] = useState<null | React.ReactNode>(null);
  const [state, setState] = useState<stateOfCraft>("materialsWon");

  const footerProps: Record<stateOfCraft, GameFooterProps> = {
    materialsWon: {
      backButton: {
        visible: false,
      },
      primaryButton: {
        text: "PROCEED",
        visible: true,
        function: () => {
          setState("crafting");
        },
      },
      exitButton: {
        visible: true,
        function: () => {
          setOpenModal(<ExitGame closeModal={() => setOpenModal(null)} />);
        },
      },
    },

    crafting: {
      backButton: {
        visible: false,
      },
      primaryButton: {
        text: "CRAFT",
        visible: true,
        function: () => {
          setState("reward");
        },
      },
      exitButton: {
        visible: true,
        function: () => {
          setOpenModal(<ExitGame closeModal={() => setOpenModal(null)} />);
        },
      },
    },

    reward: {
      backButton: {
        visible: false,
      },
      primaryButton: {
        text: "COLLECT",
        visible: true,
        function: () => {
          location.href = "/game";
        },
      },
      exitButton: {
        visible: true,
        function: () => {
          setOpenModal(<ExitGame closeModal={() => setOpenModal(null)} />);
        },
      },
    },
  };
  function HandleExitButton() {
    setOpenModal(true);
  }
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGEKIT_BG.CRAFT})`,
      }}
      className="h-screen w-screen bg-cover bg-center overflow-x-hidden"
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-[#0000] to-black"></div>

      <div className="relative w-full h-fit flex flex-col justify-center items-center z-0 p-[14px]">
        <div
          className={cn(
            "relative w-full h-full",
            "flex flex-col justify-center items-center gap-[100px]",
            "text-lightGold",
          )}
        >
          <GradientSideBorder />
          <GradientSideBorder className="rotate-180" />
          {
            {
              materialsWon: <MaterialsWon />,
              crafting: <Crafting />,
              reward: <Reward />,
            }[state]
          }
        </div>
      </div>

      <GameFooter {...footerProps[state]} />

      {openModal !== null && <Modal>{openModal}</Modal>}
    </div>
  );
}
