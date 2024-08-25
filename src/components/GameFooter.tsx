import Button from "./Button";
import { FaChevronLeft } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

interface GameFooterProps {
  backButton: {
    function?: () => void;
    visible: boolean;
    disabled?: boolean;
  };
  primaryButton: {
    function?: () => void;
    visible: boolean;
    disabled?: boolean;
    text: string;
  };
  exitButton: {
    function?: () => void;
    visible: boolean;
    disabled?: boolean;
  };
}

export default function GameFooter(
  props: GameFooterProps = {
    backButton: {
      visible: true,
    },
    primaryButton: {
      visible: true,
      text: "",
    },
    exitButton: {
      visible: true,
    },
  },
) {
  return (
    <div className="fixed bottom-0 w-full h-fit flex justify-between items-center border-t-[1px] border-lightGold px-[32px] py-[16px] bg-black z-10">
      {props.backButton.visible ? (
        <button
          disabled={props.backButton.disabled}
          onClick={props.backButton.function}
          className="bg-gradient-to-b from-[#FFFED0] to-[#EFC779] text-black aspect-square flex justify-center items-center w-[48px] h-[48px] rounded-[4px]"
        >
          <FaChevronLeft />
        </button>
      ) : (
        <div></div>
      )}

      {props.primaryButton.visible ? (
        <Button onClick={props.primaryButton.function}>
          {props.primaryButton.text}
        </Button>
      ) : (
        <div></div>
      )}

      {props.exitButton.visible ? (
        <button
          disabled={props.exitButton.disabled}
          onClick={props.exitButton.function}
          className="bg-gradient-to-b from-[#FFFED0] to-[#EFC779] text-black aspect-square flex justify-center items-center w-[48px] h-[48px] rounded-[4px] text-[24px]"
        >
          <IoClose />
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
}
