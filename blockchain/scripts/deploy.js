const { ethers, upgrades } = require("hardhat");

async function main() {
  const Token = await ethers.getContractFactory("Token100AlefDevopsV2");
  const proxy = await upgrades.deployProxy(Token, [], {
    initializer: "initialize",
  });

  await proxy.waitForDeployment();

  console.log("Token100AlefDevopsV2 deployed to:", await proxy.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
