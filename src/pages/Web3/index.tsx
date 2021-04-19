import { ethers } from "ethers"
import Web3Data from '../../components/Web3Data';
import { useWeb3ProviderManager } from '../../hooks' 
import * as React from "react";

export default function Web3() {
    // Make sure an ethereum provider is present, or set to null if not
  const [provider, setWeb3Provider] = useWeb3ProviderManager()
  const newProvider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum!) : {}
  
  const updateProvider = async () => {
    if ( (Object.keys(provider).length == 0) ) {
      setWeb3Provider(newProvider)
    }
  }

  updateProvider()

  return (
    <div className="App">
    <div>
    <h1>Infura React Dapp with Components!</h1>
    <Web3Data />
    </div>
  </div>
  )
}
