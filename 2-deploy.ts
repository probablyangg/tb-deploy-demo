import { CONSTANTS } from "./constants"
import { TBAccountParams } from "@tokenbound/sdk/dist/src/TokenboundClient";
const { NFT_CONTRACT, NFT_ID } = CONSTANTS;
import client, {tokenBoundAccount} from "./client";

(async () => {
  console.log(`Tokenbound Address ${tokenBoundAccount} for NFT: ${NFT_CONTRACT} and NFT ID: ${NFT_ID}`);

  console.log(`deploying account...`);

  const account = await client.createAccount({
    tokenContract: NFT_CONTRACT as TBAccountParams["tokenContract"],
    tokenId: NFT_ID,
  });

  console.log(account);
})()
