const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy("Thing");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  // DOMAIN
	let txn = await domainContract.register("Thingy",  {value: hre.ethers.utils.parseEther('0.1')});
	await txn.wait();
  console.log("Minted domain Thingy.Thing");

  txn = await domainContract.setRecord("Thingy", "What is going on?");
  await txn.wait();
  console.log("Set record for Thingy.Thing");

  const address = await domainContract.getAddress("Thingy");
  console.log("Owner of domain Thingy:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();