import { formatEther, parseEther } from "ethers";
import { TBAccountParams } from "@tokenbound/sdk/dist/src/TokenboundClient";
import client, {wallet, provider, tokenBoundAccount} from "./client";

const displayBalance = async (address: string) => {
  const balance = await provider.getBalance(address);
  console.log(`balance of ${address}: ${formatEther(balance)}`)
}

// transfer eth from B -> A
(async () => {
  console.log(`wallet: ${wallet.address}`);
  await displayBalance(wallet.address);
  console.log(`TBA address: ${tokenBoundAccount}`)
  displayBalance(tokenBoundAccount)

  const amount = parseEther("1");
  console.log(`sending ${formatEther(amount)} ETH from ${tokenBoundAccount} to ${wallet.address}`);

  const executedCall = await client.executeCall({
    account: tokenBoundAccount,
    to: wallet.address  as TBAccountParams["tokenContract"],
    value: amount,
    data: "",
  });
  console.log("\n---\n",executedCall,"\n---\n");

  await provider.waitForTransaction(executedCall);
  await displayBalance(wallet.address);
  await displayBalance(tokenBoundAccount);
})()