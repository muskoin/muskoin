// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat')
const ethers = hre.ethers

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const [owner] = await hre.ethers.getSigners()

  // We get the contract to deploy
  const Muskoin = await hre.ethers.getContractFactory('Muskoin')
  const muskoin = await Muskoin.deploy(owner.address)

  const muskoin_receipt = await muskoin.deployTransaction.wait()

  console.log('Muskoin deployed to:', muskoin.address)
  console.log('Gas Used:', muskoin_receipt.gasUsed.toString())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
