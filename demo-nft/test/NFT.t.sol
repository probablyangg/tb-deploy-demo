// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

import "forge-std/Test.sol";
import "../src/NFT.sol";

contract NFTTest is Test {
    NFT public nft;

    function setUp() public {
        nft = new NFT("testName","TN");
        nft.mintTo(msg.sender);
    }
}
