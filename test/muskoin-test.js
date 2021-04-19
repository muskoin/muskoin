const { expect } = require('chai')

describe('Deploy-Ticker-Role', function() {
  it('Should deploy Muskoin and check its name, symbol, and Minter Role', async function() {
    const [owner, addr1] = await ethers.getSigners()

    const Muskoin = await ethers.getContractFactory('Muskoin')
    const muskoin = await Muskoin.deploy(owner.address)

    expect(await muskoin.name()).to.equal('Muskoin')
    expect(await muskoin.symbol()).to.equal('EMC2')
      
    expect(await muskoin.hasRole(muskoin.MINTER_ADMIN_ROLE(), owner.address)).to.equal(true)
    expect(await muskoin.hasRole(muskoin.MINTER_ROLE(), addr1.address)).to.equal(false)
      
    expect(await muskoin.balanceOf(addr1.address)).to.equal(0)
    expect(await muskoin.totalSupply()).to.equal(0)
  })
})

describe('Deploy-mint-amount', function() {
  it('Should deploy Muskoin and check total supply and account balances', async function() {
    const [owner, addr1] = await ethers.getSigners()

    const Muskoin = await ethers.getContractFactory('Muskoin')
    const muskoin = await Muskoin.deploy(owner.address)

    const gg = await muskoin.memeAward(addr1.address, 'www.google.com')
    const gg_reciept = await gg.wait()

    expect(await muskoin.balanceOf(addr1.address)).to.equal(1)
    expect(await muskoin.totalSupply()).to.equal(1)
    expect(await muskoin.tokenURI(muskoin.tokenByIndex(0))).to.equal('www.google.com')
  })
})

describe('Deploy-mint-grant', function() {
  it('Should deploy Muskoin and set add a new account as a minter', async function() {
    const [owner, addr1] = await ethers.getSigners()

    const Muskoin = await ethers.getContractFactory('Muskoin')
    const muskoin = await Muskoin.deploy(owner.address)

    expect(await muskoin.hasRole(muskoin.MINTER_ADMIN_ROLE(), owner.address)).to.equal(true)
    expect(await muskoin.hasRole(muskoin.MINTER_ROLE(), owner.address)).to.equal(true)
    expect(await muskoin.hasRole(muskoin.MINTER_ROLE(), addr1.address)).to.equal(false)
      
    const tx1 = await muskoin.grantRole(muskoin.MINTER_ROLE(), addr1.address)
    const tx1_reciept = await tx1.wait()
    
    expect(await muskoin.hasRole(muskoin.MINTER_ROLE(), addr1.address)).to.equal(true)

  })
})

describe('Deploy-mint-renounce', function() {
  it('Should deploy Muskoin and renounce minter role', async function() {
    const [owner, addr1] = await ethers.getSigners()

    const Muskoin = await ethers.getContractFactory('Muskoin')
    const muskoin = await Muskoin.deploy(owner.address)
      
    const tx2 = await muskoin.renounceRole(muskoin.MINTER_ROLE(), owner.address)
    const tx2_reciept = await tx2.wait()
    
    const tx3 = await muskoin.renounceRole(muskoin.MINTER_ADMIN_ROLE(), owner.address)
    const tx3_reciept = await tx3.wait()
    
    expect(await muskoin.hasRole(muskoin.MINTER_ADMIN_ROLE(), owner.address)).to.equal(false)    
    expect(await muskoin.hasRole(muskoin.MINTER_ROLE(), owner.address)).to.equal(false)

  })
})