import {TokenboundClient, TokenboundClientOptions} from "@tokenbound/sdk";
import { JsonRpcProvider, Wallet, formatEther, parseEther } from "ethers";
import { CONSTANTS } from "./constants"
import { TBAccountParams } from "@tokenbound/sdk/dist/src/TokenboundClient";
const { CHAIN_ID, NFT_CONTRACT, NFT_ID, RPC } = CONSTANTS;

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

(async () => {
  const tokenBoundAccount = tokenboundClient.getAccount({
  tokenContract: NFT_CONTRACT as TBAccountParams["tokenContract"],
  tokenId: NFT_ID,
  });
  console.log(`Tokenbound Address ${tokenBoundAccount} for NFT: ${NFT_CONTRACT} and NFT ID: ${NFT_ID}`);

  console.log(`deploying account...`);
  const account = await tokenboundClient.createAccount({
    tokenContract: NFT_CONTRACT as TBAccountParams["tokenContract"],
    tokenId: NFT_ID,
  });

  console.log(account);
})()





