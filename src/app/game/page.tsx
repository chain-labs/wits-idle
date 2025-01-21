"use client";

import { IMAGEKIT_BG, IMAGEKIT_IMAGES } from "../images";
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
import { useGQLFetch } from "@/hooks/api/useGraphQLClient";
import { gql } from "graphql-request";

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
  const [ownedNfts, setOwnedNfts] = useState<
    {
      icon: string;
      tokenId: string;
    }[]
  >([]);
  const [stakedNfts, setStakedNfts] = useState<
    {
      icon: string;
      endTime: string;
      tokenId: string;
    }[]
  >([]);
  const [selectedNFTs, setSelectedNFTs] = useState<Set<string>>(new Set());
  const [selectedTimeline, setSelectedTimeline] = useState<string | null>(null);
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
    writeContractSponsored: StakingNFTSWrite,
    data: StakingNFTSData,
    error: StakingNFTSError,
    isSuccess: StakingNFTSIsSuccess,
    isPending: StakingNFTSIsPending,
  } = useWriteContractSponsored();

  const account = useAccount();

  const paymaster = usePayMaster();

  const { data: userData } = useGQLFetch<{
    users: {
      items: {
        ownedNfts: { items: { nftTokenId: string }[] };
        address: string;
        stakes: { items: { endTime: string; nft: { tokenId: string } }[] };
      }[];
    };
  }>(
    ["userData"],
    gql`
      query MyQuery($address: String) {
        users(where: { address_contains: $address }) {
          items {
            ownedNfts {
              items {
                nftTokenId
              }
            }
            address
            stakes {
              items {
                endTime
                nft {
                  tokenId
                }
              }
            }
          }
        }
      }
    `,
    { address: account.address?.toLowerCase() },
    { enabled: !!account.address },
  );

  useEffect(() => {
    if (userData) {
      console.log("account", account.address);

      const user = userData.users.items[0];
      const owned = user.ownedNfts.items.map((token) => ({
        icon: IMAGEKIT_IMAGES.NFT_ICON,
        tokenId: token.nftTokenId,
      }));
      const stakes = user.stakes.items.map((token) => ({
        icon: IMAGEKIT_IMAGES.NFT_ICON,
        endTime: token.endTime,
        tokenId: token.nft.tokenId,
      }));

      console.log("userData", user);
      console.log("owned", owned);
      console.log("stakes", stakes);

      setOwnedNfts(owned);
      setStakedNfts(stakes);
    }
  }, [userData]);

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
          await stackingNFTs();
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

    // console.log("stakingTheNFTS", stakingTheNFTS);
  }

  // console.log("selectedNFTs", StakingNFTSData);

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
              ownedNfts={ownedNfts}
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
