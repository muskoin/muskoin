import { ethers } from "ethers"
import { useState, useEffect } from 'react';
import { useWeb3ProviderManager } from '../hooks'
import MUSKOIN_INTERFACE from '../constants/abis/Muskoin.json'

export default function Web3Data() {
    
    const [chainId, setChainId] = useState(-1)
    const [name, setChainName] = useState("")
    const [account, setAccount] = useState("")
    const [tokenName, setTokenName] = useState("")
    const [tokenDeployed, setTokenDeployed] = useState(false)
    const [quantityNFT, setQuantityNFT] = useState(0)
    const [numYourNFT, setNumYourNFT] = useState("")
    const [token, setToken] = useState("")
    const [tokenURI, setTokenURI] = useState("")
    
    const [provider, setWeb3Provider] = useWeb3ProviderManager()
    
    // this needs to be set to the address that Muskoin.sol is deployed to
    const MUSKOIN_ADDRESS = '0xc21764e1E1216D1D12FFdfCf1eC2a3BC258b4162'
    
    // create the muskoin interface
    const muskoin =  Object.keys(provider).length > 0 ? new ethers.Contract(MUSKOIN_ADDRESS, MUSKOIN_INTERFACE.abi, provider) : null
    
    const updateChainId = async () => {
      let network = Object.keys(provider).length > 0 ? await provider.getNetwork() : console.log(provider)
      network ? setChainId(network.chainId) : console.log(network)
    }
    
    const updateChainName = async () => {
      let network = Object.keys(provider).length > 0 ? await provider.getNetwork() : console.log(provider)
      network ? setChainName(network.name) : console.log(network)
    }
    
    const updateAccount = async () => {
      let signer = Object.keys(provider).length > 0 ? await provider.getSigner() : console.log(provider)
      try {
        let new_account = signer ? await signer.getAddress() : console.log(signer)
        new_account ? setAccount(new_account) : console.log(new_account)
      } catch(err) {
        console.log("Not logged in to a signer.")
      }
    }

    useEffect(() => {
      updateNumYourNFT()
      updateToken()
      updateTokenURI()  
    }, [account])

    const updateTokenDeployed = async () => {
      let network = Object.keys(provider).length > 0 ? await provider.getNetwork() : console.log(provider)
      try{
        let contractByteCode = network ? String(await provider.getCode(MUSKOIN_ADDRESS)) : "0x"
        let isContractValid = network ? contractByteCode.length > 3 : false
        console.log("Contract valid: " + String(isContractValid))
        setTokenDeployed(isContractValid)  
      } catch(err) {
        console.log(String(err))
      }
    }

    useEffect(() => {
      updateTokenName() // This executes when the tokenDeployed state changes.
      updateQuantityNFT()
      updateNumYourNFT()
      updateToken()
      updateTokenURI()  
    }, [tokenDeployed])

    const updateTokenName = async () => {
      try {
        console.log("tokenDeployed: " + String(tokenDeployed))
        let tempTokenName = muskoin && tokenDeployed ? await muskoin.name() : console.log("Muskoin not deployed on this chain")
        tempTokenName ? setTokenName(tempTokenName) : console.log(tempTokenName)
      } catch(err) {
        console.log("Cannot find Muskoin contract.")
      }
    }
    
    const updateQuantityNFT = async () => {
      try {
        let tempQuantityNFT = muskoin && tokenDeployed ? await muskoin.totalSupply() : console.log("Muskoin not deployed on this chain")
        tempQuantityNFT ? setQuantityNFT(tempQuantityNFT) : console.log(tempQuantityNFT)
      } catch(err) {
        console.log("Cannot find Muskoin contract.")
      }
    }
    
    useEffect(() => {
      updateNumYourNFT() // Changed when the number of NFTs changes
      updateToken()
      updateTokenURI()  
    }, [quantityNFT])

    // this function could take an argument that is an address to look at NFT balance of that particular address
    const updateNumYourNFT = async () => {
      try {
        let tempNumYourNFT = muskoin && tokenDeployed ? await muskoin.balanceOf(account) : console.log("Muskoin not deployed on this chain")
        tempNumYourNFT ? setNumYourNFT(tempNumYourNFT) : console.log(tempNumYourNFT)
      } catch(err) {
        console.log("Cannot find Muskoin contract.")
      }
    }
    
    // this function could take an argument that is an index to retrieve the descriptor of a specific NFT
    const updateToken = async () => {
      try {
        if (quantityNFT > 0) {
          let tempToken = muskoin && tokenDeployed ? await muskoin.tokenByIndex(0) : console.log("Muskoin not deployed on this chain")
          tempToken ? setToken(tempToken) : console.log(tempToken)  
        } else {
          setToken("")
        }
      } catch(err) {
        console.log("Cannot find Muskoin contract.")
      }
    }

    useEffect(() => {
      updateTokenURI()  
    }, [token])
    
    // this function could take an argument that is a token descriptor to retrieve the URI of a specific NFT
    const updateTokenURI = async () => {
      try {
        let tempTokenURI = muskoin && tokenDeployed ? await muskoin.tokenURI(token) : console.log("Muskoin not deployed on this chain")
        tempTokenURI ? setTokenURI(tempTokenURI) : console.log(tempTokenURI)
      } catch(err) {
        console.log("Cannot find Muskoin contract.")
      }
    }

    // Update quantities every 2 seconds
    const updatePeriod = 2000 //milliseconds
    const updateFunction = () => {
      if(Object.keys(provider).length > 0) {
        updateChainId()
        updateChainName()
        updateAccount()
        updateTokenDeployed()
      }  
    }

    useEffect(() => {
      const interval = setInterval(() => {
        updateFunction();
      }, updatePeriod);
      return () => clearInterval(interval);
    }, []); 
    
    return (
        <div>
            <h3> Web3 Data </h3>
            <div>
                Network: {chainId ? `${chainId} – ${name}` : 'No connection'}
            </div>
            <div>
                Account: {account ? `${account}` : 'No Account Detected'}
            </div>
            <div>
                Ticker: {tokenName ? `${tokenName}` : 'Token Name Not Found'}
            </div>
            <div>
                Global Number of Awards: {quantityNFT ? `${quantityNFT}` : 'No Awards Minted Yet.'}
            </div>
            <div>
                Number of Your Awards: {numYourNFT ? `${numYourNFT}` : `You have no NFT awards yet.`}
            </div>
            <div>
                Token: {token ? `${token}` : `Couldn't get Token Descriptor`}
            </div>
            <div>
                TokenURI of 1st Award: {tokenURI ? `${tokenURI}` : `Couldn't read tokenURI`}
            </div>
        </div>
    );
}
