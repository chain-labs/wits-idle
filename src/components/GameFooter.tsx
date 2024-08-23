import Button from "./Button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function GameFooter() {
  return (
    <div className="fixed bottom-0 w-full h-fit flex justify-between items-center border-t-[1px] border-lightGold px-[32px] py-[16px] bg-black z-10">
      <button className="bg-gradient-to-b from-[#FFFED0] to-[#EFC779] text-black aspect-square flex justify-center items-center w-[48px] h-[48px] rounded-[4px]">
        <FaChevronLeft />
      </button>
      <Button>CONTINUE</Button>
      <button className="bg-gradient-to-b from-[#FFFED0] to-[#EFC779] text-black aspect-square flex justify-center items-center w-[48px] h-[48px] rounded-[4px]">
        <FaChevronRight />
      </button>
    </div>
  );
}
