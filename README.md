<p align="center">
  <img src="https://github.com/muskoin/muskoin/blob/main/src/assets/svg/logo_coin_black.svg" width="500">
</p>

# Muskoin

An ultra-minimal, open source interface and protocol for bestowing eternal glory to authors of dank memes. 

## Current Deployment Addresses

Mainnet Contract Address: `0xCe3c6AA40776b79E0cd127aCebB9c431a3F1C09a`

Mainnet MINTER_ROLE Address: `0xE936e8FAf4A5655469182A49a505055B71C17604`

Rinkeby Address: `0x610bac3AAd8Fb9Db35c6e8F663239938a7CFF33c`

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

Then copy deploy-contracts address into web3-data, mint/index, and memelords/index

```bash
yarn start
```

### Running tests

```bash
npx hardhat test
```
