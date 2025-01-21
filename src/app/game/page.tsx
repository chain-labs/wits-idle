"use client";

import { IMAGEKIT_BG } from "../images";
import GameModeBanner from "@/components/GameModeBanner";
import GameFooter, { GameFooterProps } from "@/components/GameFooter";
import SelectYourNFT from "@/components/SelectYourNFT";
import { use, useEffect, useState } from "react";
import Modal from "@/components/Modal";
import ExitGame from "@/components/modals/ExitGame";
import ShareAdventure from "@/components/modals/ShareAdventure";
import InstructionsOfGame from "@/components/modals/InstructionsOfGame";
import AdventureProgress from "@/components/AdventureProgress";
import LockingNFTs from "@/components/LockingNFTs";
import useTimer from "@/hooks/useTimer";
import ModalRevealAnimation from "@/components/modals/ModalRevealAnimation";
import { NFTS_CONTRACT } from "@/constants";
import {
  useAbstractClient,
  useGlobalWalletSignerAccount,
  useGlobalWalletSignerClient,
} from "@abstract-foundation/agw-react";
import useStaking from "@/abi/Staking";
import useNFTs from "@/abi/Nfts";
import { useWriteContractSponsored } from "@abstract-foundation/agw-react";
import usePayMaster from "@/abi/PayMaster";
import { getGeneralPaymasterInput } from "viem/zksync";
import { useAccount, useReadContract } from "wagmi";
import getSCAddress from "@/tools/getSCAddress";

type stateOfGame =
  | "selectNFT"
  | "sendingNFTsToAdventure"
  | "adventureInProgress";

export default function Home() {
  const [openModal, setOpenModal] = useState<null | React.ReactNode>(null);
  const [openInstructionModal, setOpenInstructionModal] =
    useState<boolean>(false);
  const [state, setState] = useState<stateOfGame>("selectNFT");
  const progressTimer = useTimer();

  useEffect(() => {
    if (openModal === null && state !== "adventureInProgress") {
      setOpenInstructionModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // data
  const [selectedNFTs, setSelectedNFTs] = useState<Set<string>>(new Set());
  const [selectedTimeline, setSelectedTimeline] = useState<string | null>(null);
  const { data: agwClient } = useAbstractClient();
  const staking = useStaking();
  const nftContract = useNFTs();
  const lockingNFTTimePeriodTable: {
    time: string;
    common: number;
    uncommon: number;
    rare: number;
    legendary: number;
    mythic: number;
    secs: number;
  }[] = [
    {
      time: "24 HOURS",
      common: 0,
      uncommon: 0,
      rare: 0,
      legendary: 0,
      mythic: 0,
      secs: 86400,
    },
    {
      time: "48 HOURS",
      common: 0,
      uncommon: 0,
      rare: 0,
      legendary: 0,
      mythic: 0,
      secs: 172800,
    },
    {
      time: "1 WEEK",
      common: 0,
      uncommon: 0,
      rare: 0,
      legendary: 0,
      mythic: 0,
      secs: 604800,
    },
    {
      time: "2 WEEK",
      common: 0,
      uncommon: 0,
      rare: 0,
      legendary: 0,
      mythic: 0,
      secs: 1209600,
    },
    {
      time: "3 WEEK",
      common: 0,
      uncommon: 0,
      rare: 0,
      legendary: 0,
      mythic: 0,
      secs: 1814400,
    },
  ];

  const {
    writeContractSponsored: ApprovingNFTSWrite,
    data: ApprovingNFTSData,
    error: ApprovingNFTSError,
    isSuccess: ApprovingNFTSIsSuccess,
    isPending: ApprovingNFTSIsPending,
  } = useWriteContractSponsored();

  const {
    writeContractSponsored: StakingNFTSWrite,
    data: StakingNFTSData,
    error: StakingNFTSError,
    isSuccess: StakingNFTSIsSuccess,
    isPending: StakingNFTSIsPending,
  } = useWriteContractSponsored();

  const account = useAccount();

  console.log("account---", account);

  const [SCAddress, setSCAddress] = useState<`0x${string}` | null>(null);

  const { data: getIsApprovedForAllData } = useReadContract({
    abi: nftContract.abi as [],
    address: nftContract.address as `0x${string}`,
    functionName: "isApprovedForAll",
    account: account.address as `0x${string}`,
    args: [account.address as `0x${string}`, staking.address as `0x${string}`],
  });

  const globalwallet = useGlobalWalletSignerAccount();
  console.log("globalwallet", globalwallet);

  console.log("getIsApprovedForAllData", getIsApprovedForAllData);

  const paymaster = usePayMaster();

  console.log("dehwbudfeubfer----", agwClient);

  console.log('');

  const footerProps: Record<stateOfGame, GameFooterProps> = {
    selectNFT: {
      backButton: {
        visible: false,
      },
      primaryButton: {
        text: "CONTINUE",
        visible: true,
        disabled: selectedNFTs.size === 0,
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
        disabled: selectedTimeline === null,
        function: async () => {
          await handleSend();
          setOpenModal(
            <ShareAdventure
              closeModal={() => {
                setOpenModal(null);
                setState("adventureInProgress");
              }}
            />,
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
        disabled: progressTimer.end === false,
        function: () => {
          location.href = "/craft";
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

  useEffect(() => {
    if (!account.address) return;
    (async () => {
      const SCAddress = await getSCAddress(
        globalwallet?.data?.account.address as `0x${string}`,
      );
      setSCAddress(SCAddress);
    })();
  }, [globalwallet.data]);

  async function handleSend() {
    console.log("send");

    if (getIsApprovedForAllData) {
      stackingNFTs();
    } else {
      const ApprovingNFTS = ApprovingNFTSWrite({
        abi: nftContract.abi as [],
        account: account.address as `0x${string}`,
        address: nftContract.address as `0x${string}`,
        functionName: "setApprovalForAll",
        args: [staking.address as `0x${string}`, true],
        paymaster: paymaster.address as `0x${string}`,
        paymasterInput: getGeneralPaymasterInput({
          innerInput: "0x",
        }),
      });

      console.log("ApprovingNFTS", ApprovingNFTS);
    }
  }

  function stackingNFTs() {
    const selectedTimelineDetails = lockingNFTTimePeriodTable.find(
      (row) => `select-time-${row.time}` === selectedTimeline,
    );

    if (!selectedTimelineDetails) return;
    const stakingTheNFTS = StakingNFTSWrite({
      abi: staking.abi as [],
      address: staking.address as `0x${string}`,
      functionName: "batchStakeNFTs",
      account: account.address as `0x${string}`,
      args: [
        NFTS_CONTRACT,
        Array.from(selectedNFTs).map((nft) => BigInt(nft)),
        BigInt(selectedTimelineDetails.secs),
      ],
      paymaster: paymaster.address as `0x${string}`,
      paymasterInput: getGeneralPaymasterInput({
        innerInput: "0x",
      }),
    });

    console.log("stakingTheNFTS", stakingTheNFTS);
  }

  useEffect(() => {
    if (!ApprovingNFTSIsPending && ApprovingNFTSIsSuccess) {
      stackingNFTs();
    }
  }, [
    ApprovingNFTSIsPending,
    ApprovingNFTSIsSuccess,
    ApprovingNFTSError,
    ApprovingNFTSData,
    getIsApprovedForAllData,
  ]);

  console.log("selectedNFTs", StakingNFTSData);

  console.log("ApprovingNFTSData", ApprovingNFTSData);

  if (openInstructionModal) {
    return (
      <InstructionsOfGame closeModal={() => setOpenInstructionModal(false)} />
    );
  }
  return (
    <div
      style={{
        backgroundImage:
          state === "adventureInProgress"
            ? `url(${IMAGEKIT_BG.PROGRESS})`
            : `url(${IMAGEKIT_BG.HOMEPAGE})`,
      }}
      className="relative h-screen w-full bg-cover bg-center overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-[#0000] to-black"></div>

      <GameModeBanner />

      {state &&
        {
          selectNFT: (
            <SelectYourNFT
              selectedNFTs={selectedNFTs}
              setSelectedNFTs={setSelectedNFTs}
            />
          ),
          sendingNFTsToAdventure: (
            <LockingNFTs
              selectedNFTs={selectedNFTs}
              selectedTimeline={selectedTimeline}
              setSelectedTimeline={setSelectedTimeline}
              lockingNFTTimePeriodTable={lockingNFTTimePeriodTable}
            />
          ),
          adventureInProgress: <AdventureProgress />,
        }[state]}

      <GameFooter {...footerProps[state]} />

      {openModal !== null && (
        <Modal>
          <ModalRevealAnimation>{openModal}</ModalRevealAnimation>
        </Modal>
      )}
    </div>
  );
}
