import { JsonRpcProvider, Wallet, formatEther, parseEther } from "ethers";
import { CONSTANTS } from "./constants"
const { CHAIN_ID, NFT_CONTRACT, NFT_ID, RPC } = CONSTANTS;
import {TokenboundClient, TokenboundClientOptions} from "@tokenbound/sdk";
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

// transfer eth from A -> B
(async () => {
  console.log(`sender:`, wallet.address);
  await displayBalance(wallet.address);

  const tokenBoundAccount = tokenboundClient.getAccount({
    tokenContract: NFT_CONTRACT as TBAccountParams["tokenContract"],
    tokenId: NFT_ID,
    });

  const TBA = tokenBoundAccount;

  const amount = parseEther("1");
  console.log(`sending ${amount} ETH from ${wallet.address} to ${TBA}`);


  await wallet.sendTransaction({
    to: TBA,
    value: amount
  })
  await displayBalance(wallet.address);
  await displayBalance(TBA);
})()