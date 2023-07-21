import { JsonRpcProvider, Wallet, formatEther, parseEther } from "ethers";
import { CONSTANTS } from "./constants"
const { CHAIN_ID, NFT_CONTRACT, NFT_ID, RPC } = CONSTANTS;
import { TokenboundClient } from "@tokenbound/sdk";
import { TBAccountParams } from "@tokenbound/sdk/dist/src/TokenboundClient";

const provider = new JsonRpcProvider(RPC);
if (!process.env.TEST_ACCOUNT) {
  console.error ("TEST_ACCOUNT private key undefined in .env");
  process.exit();
}

const wallet = new Wallet(process.env.TEST_ACCOUNT, provider);
const tokenboundClient = new TokenboundClient({
  signer: wallet,
  chainId: CHAIN_ID
});

const displayBalance = async (address: string) => {
  const balance = await provider.getBalance(address);
  console.log(`balance of ${address}: ${formatEther(balance)}`)
}

// transfer eth from B -> A
(async () => {
  console.log(`wallet: ${wallet.address}`);
  await displayBalance(wallet.address);

  const tokenBoundAccount = await tokenboundClient.getAccount({
    tokenContract: NFT_CONTRACT as TBAccountParams["tokenContract"],
    tokenId: NFT_ID,
    });

  const TBA = tokenBoundAccount;
  console.log(`TBA address: ${TBA}`)
  displayBalance(TBA)

  const amount = parseEther("1");
  console.log(`sending ${formatEther(amount)} ETH from ${TBA} to ${wallet.address}`);

  const executedCall = await tokenboundClient.executeCall({
    account: TBA,
    to: wallet.address as TBAccountParams["tokenContract"],
    value: amount,
    data: "",
  });
  console.log("\n---\n",executedCall,"\n---\n");

  await displayBalance(wallet.address);
  await displayBalance(TBA);
})()