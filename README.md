<p align="center">
  <img src="https://github.com/muskoin/muskoin/blob/main/src/assets/svg/logo_coin_black.svg" width="500">
</p>

# Muskoin

An ultra-minimal, open source interface and protocol for bestowing eternal glory to authors of dank memes. 

## Motivation

The advent on modern social media platforms has made it possible for a single individual to connect with a global audience in a matter of seconds. Indeed, online ecosystems 
such as Twitter, Facebook, Reddit, etc. have changed the way we view the world and our place in it. An entertaining, yet unintended side effect that has arisen from 
the widespread use of such platforms has been the phenomenon of viral [memes](https://en.wikipedia.org/wiki/Meme). Memes are a new yet well-established form of expression 
that combines visual and written elements into a work that, along with temporal and societal context, can quickly communicate a complex set of ideas or shared experiences that 
are typically humorous in nature (though not necessarily). 

Thousands (likely millions) of memes have been created and shared over the internet in the last 15 years. Often, memes are shared so many times and experience so many mutations
that the original instance in which the meme was created is lost. [Attempts](https://knowyourmeme.com/ ) have been made to catalogue the provenance and evolution of the most popular or wide-spread specimens. However, due to the very nature of memes (their fast replication and evolution), the task of indexing their creation and attributing authorship is quite a daunting task. The intellectual creator of a viral meme, even if their [physical likeness](https://en.wikipedia.org/wiki/Bad_Luck_Brian) is used as 
part of its visual component, has little recourse in claiming any kind of economic benefit from its genesis. 

Blockchain technology has ushered in a new paradigm of digital ownership. Platforms like [Ethereum](https://ethereum.org/en/) have even made it possible 
to execute arbitrary computational logic over a decentralized network of computers in a 
[trustless](https://www.nananke.com/single-post/2018/08/07/zero-trust-vs-trustless-systems) fashion through the use of 
[smart contracts](https://en.wikipedia.org/wiki/Smart_contract). By leveraging smart contracts, it is now possible to create 
[non-fungible](https://www.investopedia.com/terms/f/fungibility.asp) digital assets and assign irrefutable ownership of such assets. To this end, the Muskoin protocol is 
designed to facilitate a non-fungible digital representation of the ownership of a meme and at the same time documenting its first appearance.

This work is dedicated to the memory of our friend, Harambe. 

<p align="center">
  <img src="./harambe.jpg" width="500">
</p>

## Current Deployment Addresses

Rinkeby Address: `0xc21764e1E1216D1D12FFdfCf1eC2a3BC258b4162`

Rinkeby MINTER_ROLE account: `0xC6Fa0615877c6A5d14019C1BadaDa5aABD78b314`

## Local Development

### Install Dependencies

```bash
yarn
```

### Run

```bash
yarn start
```

### Build

```bash
yarn build
# or working in jupyter environment with reverse proxy
yarn build-jupyter
# then
yarn serve -n -s build
```

###  Steps to set up local Muskoin deployment

```bash
npx hardhat node
```

```bash
yarn deploy-contracts
```

Then copy deploy-contracts address into web3-data and mint/index

```bash
yarn start
```

### Running tests

```bash
npx hardhat test
```

## TODO
- Github Pages
- Assets for user orientation
- Lazy minting
