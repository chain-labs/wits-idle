"use client";

import { IMAGEKIT_BG } from "../images";
import GameModeBanner from "@/components/GameModeBanner";
import GameFooter, { GameFooterProps } from "@/components/GameFooter";
import SelectYourNFT from "@/components/SelectYourNFT";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import ExitGame from "@/components/modals/ExitGame";
import ShareAdventure from "@/components/modals/ShareAdventure";
import InstructionsOfGame from "@/components/modals/InstructionsOfGame";
import AdventureProgress from "@/components/AdventureProgress";
import LockingNFTs from "@/components/LockingNFTs";

type stateOfGame =
  | "selectNFT"
  | "sendingNFTsToAdventure"
  | "adventureInProgress";

export default function Home() {
  const [openModal, setOpenModal] = useState<null | React.ReactNode>(null);
  const [state, setState] = useState<stateOfGame>("selectNFT");

  useEffect(() => {
    if (openModal === null) {
      setOpenModal(
        <InstructionsOfGame closeModal={() => setOpenModal(null)} />,
      );
    }
  }, []);

  const footerProps: Record<stateOfGame, GameFooterProps> = {
    selectNFT: {
      backButton: {
        visible: false,
      },
      primaryButton: {
        text: "CONTINUE",
        visible: true,
        function: () => {
          setState("sendingNFTsToAdventure");
        },
      },
      exitButton: {
        visible: true,
        function: () => {
          setOpenModal(<ExitGame closeModal={() => setOpenModal(null)} />);
        },
      },
    },

    sendingNFTsToAdventure: {
      backButton: {
        visible: true,
        function: () => {
          setState("selectNFT");
        },
      },
      primaryButton: {
        text: "SEND",
        visible: true,
        function: () => {
          setOpenModal(
            <ShareAdventure closeModal={() => setOpenModal(null)} />,
          );
        },
      },
      exitButton: {
        visible: true,
        function: () => {
          setOpenModal(<ExitGame closeModal={() => setOpenModal(null)} />);
        },
      },
    },

    adventureInProgress: {
      backButton: {
        visible: false,
      },
      primaryButton: {
        text: "REEDEM",
        visible: true,
        disabled: true,
      },
      exitButton: {
        visible: true,
        function: () => {
          setOpenModal(<ExitGame closeModal={() => setOpenModal(null)} />);
        },
      },
    },
  };

  return (
    <div
      style={{
        backgroundImage: `url(${IMAGEKIT_BG.HOMEPAGE})`,
      }}
      className="relative h-screen w-full bg-cover bg-center overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-[#0000] to-black"></div>

      <GameModeBanner />

      {state &&
        {
          selectNFT: <SelectYourNFT />,
          sendingNFTsToAdventure: <LockingNFTs />,
          adventureInProgress: <AdventureProgress />,
        }[state]}

      <GameFooter {...footerProps[state]} />

      {openModal !== null && <Modal>{openModal}</Modal>}
    </div>
  );
}
