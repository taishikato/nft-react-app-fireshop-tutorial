const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const FiredGuys = await ethers.getContractFactory("FiredGuys");
    const firedguys = await FiredGuys.deploy();
    await firedguys.deployed();

    const recipient = "0xdd2fd4581271e230360230f9337d5c0430bf44c0";
    const metadataURI = "cid/test.png";

    let balance = await firedguys.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await firedguys.payToMint(recipient, metadataURI, {
      value: ethers.utils.parseEther("0.05"),
    });

    // wait unitil the transaction is minted
    await newlyMintedToken.wait();
    balance = await firedguys.balanceOf(recipient);
    expect(balance).to.equal(1);
    expect(await firedguys.isContentOwned(metadataURI)).to.equal(true);
  });
});
