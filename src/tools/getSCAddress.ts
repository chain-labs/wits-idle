import { getSmartAccountAddressFromInitialSigner } from "@abstract-foundation/agw-client";
import { createPublicClient, http } from "viem";
import { abstractTestnet } from "viem/chains";

export default async function getSCAddress(accountAddress: `0x${string}`) {
  // Create a public client connected to the desired chain
  const publicClient = createPublicClient({
    chain: abstractTestnet,
    transport: http(),
  });

  // Initial signer address (EOA)
  const initialSignerAddress = accountAddress;

  // Get the smart account address
  const smartAccountAddress = await getSmartAccountAddressFromInitialSigner(
    initialSignerAddress,
    publicClient,
  );

  console.log("Smart Account Address:", smartAccountAddress);

  return smartAccountAddress;
}
