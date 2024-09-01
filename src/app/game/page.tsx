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

export default function Home() {
  const [openModal, setOpenModal] = useState<null | React.ReactNode>(null);

  useEffect(() => {
    if (openModal === null) {
      setOpenModal(
        <InstructionsOfGame closeModal={() => setOpenModal(null)} />,
      );
    }
  }, []);

  const footerProps: { [key: string]: GameFooterProps } = {
    selectNFT: {
      backButton: {
        visible: false,
      },
      primaryButton: {
        text: "CONTINUE",
        visible: true,
        function: () => {
          location.href = "/game1";
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
          location.href = "/game";
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

      <SelectYourNFT />

      <GameFooter {...footerProps.sendingNFTsToAdventure} />

      {openModal !== null && <Modal>{openModal}</Modal>}
    </div>
  );
}
