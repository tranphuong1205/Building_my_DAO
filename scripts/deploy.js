const hre = require("hardhat");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const nftContract = await hre.ethers.deployContract("CryptoDevsNFT");
  await nftContract.waitForDeployment();
  console.log("CryptoDevsNFT deploy to: ", nftContract.target);

  const fakeNftMarketplaceContract = await hre.ethers.deployContract(
    "FakeNFTMarketplace"
  );
  await fakeNftMarketplaceContract.waitForDeployment();
  console.log(
    "FakeNFTMarketplace deployed to: ",
    fakeNftMarketplaceContract.target
  );

  const amount = hre.ethers.parseEther("1");
  const daoContract = await hre.ethers.deployContract(
    "CryptoDevsDAO",
    [fakeNftMarketplaceContract.target, nftContract.target],
    { value: amount }
  );
  await daoContract.waitForDeployment();
  console.log("CryptotoDevsDAO deploy to: ", daoContract.target);

  await sleep(30 * 1000);
  await hre.run("verify: verify", {
    address: nftContract.target,
    constructorArguments: [
      fakeNftMarketplaceContract.target,
      nftContract.target,
    ],
  });
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
