import { formatEther, parseEther } from "ethers";
import { wallet, provider, tokenBoundAccount, displayBalance } from "./client";

// transfer eth from A -> B
(async () => {
  console.log(`sender:`, wallet.address);
  await displayBalance(wallet.address);

  const amount = parseEther("1");
  console.log(`sending ${formatEther(amount)} ETH from ${wallet.address} to ${tokenBoundAccount}`);

  await wallet.sendTransaction({
    to: tokenBoundAccount,
    value: amount
  })
  await displayBalance(wallet.address);
  await displayBalance(tokenBoundAccount);
})()