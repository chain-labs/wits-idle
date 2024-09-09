import Image from "next/image";
import Button from "../Button";
import { IMAGEKIT_BG } from "@/app/images";
import { cn } from "@/utils";

export default function InstructionsOfGame({
  closeModal,
}: {
  closeModal: () => void;
}) {
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGEKIT_BG.SHARE})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="relative h-screen w-full bg-center bg-no-repeat z-50"
    >
      <Image
        src={IMAGEKIT_BG.INSTRUCTION_BOARD_TRANSPARENT}
        alt="instructions"
        height={1440}
        width={1024}
        className="w-full h-full object-contain "
      />
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[-20%]",
          "flex flex-col justify-center items-center gap-[10px]",
          "max-w-[40%]",
          "text-[14px] text-lightGold text-center uppercase",
        )}
      >
        <p>1. Select Start Game</p>
        <p>
          2. Select NFTs you wish to send on an adventure. NOTE: Once you start
          an adventure you cannot stop it until the timer runs out. They will be
          locked for the entire duration. You can only do 1 Adventure at a time
          so send as many or as little as you want!
        </p>
        <p>
          3. Select the duration in which you would like to send your characters
          on an adventure for.
        </p>
        <p>4. Confirm the details.</p>
        <p>5. Sit back and wait.</p>
        <p>6. Collect your loot!</p>
        <Button className="mt-[10px] z-10 scale-[0.75]" onClick={closeModal}>
          START GAME
        </Button>
      </div>
    </div>
  );
}
