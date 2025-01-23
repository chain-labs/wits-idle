"use client";

import useNFTs from "@/abi/Nfts";
import usePayMaster from "@/abi/PayMaster";
import useStaking from "@/abi/Staking";
import { NFTS_CONTRACT } from "@/constants";
import { useGQLFetch } from "@/hooks/api/useGraphQLClient";
import { useWriteContractSponsored } from "@abstract-foundation/agw-react";
import { gql } from "graphql-request";
import { useCallback, useEffect } from "react";
import { getGeneralPaymasterInput } from "viem/zksync";
import { useAccount } from "wagmi";

const useMintNft = (enabled: boolean) => {
  const { writeContractSponsored: mintNFTWrite, error } =
    useWriteContractSponsored();
  const nftContract = useNFTs();
  const staking = useStaking();
  const paymaster = usePayMaster();
  const account = useAccount();

  useEffect(() => {
    if (error) {
      console.error("NFT minting error:", error);
    }
  }, [error]);

  const { data: nft, isFetched } = useGQLFetch<{
    nftOwnerships: {
      items: {
        id: string;
        nftTokenId: string;
      }[];
    };
  }>(
    ["nft"],
    gql`
      query MyQuery {
        nftOwnerships(orderBy: "nftTokenId", orderDirection: "desc", limit: 1) {
          items {
            id
            nftTokenId
          }
        }
      }
    `,
    {},
  );

  const mintNFT = useCallback(
    (tokenId: number) => {
      mintNFTWrite({
        abi: nftContract.abi as any,
        address: nftContract.address as `0x${string}`,
        functionName: "mint",
        args: [BigInt("3")],
        paymaster: paymaster.address as `0x${string}`,
        paymasterInput: getGeneralPaymasterInput({
          innerInput: "0x",
        }),
      });
    },
    [mintNFTWrite, nftContract, paymaster],
  );

  useEffect(() => {
    console.log({ enabled });
    if (enabled)
      if (isFetched && account.address) {
        if (
          window.confirm(
            "DEMO: We are minting a mock NFT to your account. Please approve the next transaction to continue the demo.",
          )
        ) {
          mintNFT(Number(nft?.nftOwnerships.items[0].nftTokenId) + 1);
        }
      }
  }, [isFetched, nft, account, mintNFT, enabled]);
};

export default useMintNft;
