const hre = require("hardhat");

async function getBalance(address) {
  const balanceBigInt = await hre.waffle.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}


async function printBalances(addresses) {
  for(const address of addresses) {
    console.log(`Address ${address} balance:`, await getBalance(address));
  }
}

async function printMemos(memos) {
  for(const memo of memos) {
    console.log(`At ${memo.timestamp}, ${memo.name} (${memo.from}) said: "${memo.message}"`);
  }
}

async function main() {
  //Get example accounts
  const [owner, tipper, tipper2, tipper3, tipper4, nextOwner] = await hre.ethers.getSigners();

  //Get the contract to deploy & deploy contract
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();
  await buyMeACoffee.deployed();
  console.log("BuyMeACoffee deployed to: ", buyMeACoffee.address);

  //Check balances before the coffee purchase
  const addresses = [owner.address, nextOwner.address, tipper.address, buyMeACoffee.address];
  console.log("== start... ==");
  await printBalances(addresses);
  
  //Buy the owner a few coffees
  const tip = {value: hre.ethers.utils.parseEther("1")};
  const tip2 = {value: hre.ethers.utils.parseEther("2")};
  const tip3 = {value: hre.ethers.utils.parseEther("3")};
  const tip4 = {value: hre.ethers.utils.parseEther("4")};
  await buyMeACoffee.connect(tipper).buyCoffee("Carolina", "Enjoy your Black Coffee!", tip);
  await buyMeACoffee.connect(tipper2).buyCoffee("Vitto", "Enjoy your Espresso Coffee!", tip2);
  await buyMeACoffee.connect(tipper3).buyCoffee("Kay", "Enjoy your Cappuccino Coffee!", tip3);
  await buyMeACoffee.connect(tipper4).buyCoffee("Gopi", "Enjoy your Macchiato Coffee!", tip4);

  //Check balances after coffee purchase
  console.log("=== bought coffee ===");
  await printBalances(addresses);

  //Withdraw funds
  await buyMeACoffee.connect(owner).changeOwner(nextOwner.address);
  await buyMeACoffee.connect(owner).withdrawTips();

  //Check balance after withdraw
  console.log("=== withdrawTips ===");
  await printBalances(addresses);

  //Read all the Memos left for the owner
  console.log("== memos ==");
  const memos = await buyMeACoffee.getMemos();
  printMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
