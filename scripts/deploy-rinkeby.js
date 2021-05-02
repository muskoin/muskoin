// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat')
const ethers = hre.ethers

async function main() {

  //const provider = new hre.ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")
  const provider = new hre.ethers.providers.getDefaultProvider(network='rinkeby')
  // TODO: Uncomment this next line and put the Rinkeby address you'd like to use.  We can't share ours.
  const wallet = new hre.ethers.Wallet('', provider)
  
  const current_block = await provider.getBlock("latest")
  
  // We get the contract to deploy
  const Muskoin = await hre.ethers.getContractFactory('Muskoin',signer=wallet)
  const muskoin = await Muskoin.deploy('0x9fEad8B19C044C2f404dac38B925Ea16ADaa2954')
  
  const muskoin_receipt = await muskoin.deployTransaction.wait()
  
  console.log('wallet address:', wallet.address)
  console.log('wallet balance:', await wallet.getBalance())
  console.log('chain id:', await wallet.getChainId())
  console.log('Factory Signer:', await Muskoin.signer.address)
  console.log('Current Block:', await current_block.number)
  console.log('Muskoin deployed to:', muskoin.address)
  console.log('Gas Used:', console.log('Gas Used:', muskoin_receipt.gasUsed.toString()))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
