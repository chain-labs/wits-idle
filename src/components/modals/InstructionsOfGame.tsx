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
    <div className="relative min-h-screen h-fit bg-fill bg-center bg-no-repeat">
      <Image
        src={IMAGEKIT_BG.INSTRUCTIONS}
        alt="Instructions"
        height={1440}
        width={2560}
        className="w-full h-screen object-none object-[50%_20%] 2xl:object-cover 2xl:object-top"  
      />
      <div
        className={cn(
          "absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/3 2xl:-translate-y-1/2",
          "flex flex-col justify-center items-center gap-[18px]",
          "max-w-[45%]",
          "text-lightGold text-center uppercase",
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
        <Button className="mt-[10px]" onClick={closeModal}>
          START GAME
        </Button>
      </div>
    </div>
  );
}
