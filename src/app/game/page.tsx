"use client";

import { IMAGEKIT_BG } from "../images";
import GameModeBanner from "@/components/GameModeBanner";
import GameFooter from "@/components/GameFooter";
import SelectYourNFT from "@/components/SelectYourNFT";
import { useState } from "react";
import Modal from "@/components/Modal";
import ExitGame from "@/components/modals/ExitGame";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  function HandleExitButton() {
    setOpenModal(true);
  }
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

      <GameFooter
        backButton={{
          visible: false,
        }}
        primaryButton={{
          text: "CONTINUE",
          visible: true,
          function: () => {
            location.href = "/game1";
          },
        }}
        exitButton={{
          visible: true,
          function: HandleExitButton,
        }}
      />

      {openModal && (
        <Modal>
          <ExitGame closeModal={() => setOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}
