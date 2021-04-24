import { useState, useEffect } from 'react'
import { ButtonLight } from '../../components/Button'
import { AutoColumn } from '../../components/Column'
import MemeURLInputPanel from '../../components/MemeURLInputPanel'
import MuskoviteInputPanel from '../../components/MuskoviteInputPanel'

import { MintMemeMemelordsTabs } from '../../components/NavigationTabs'
import { BottomGrouping, Wrapper } from '../../components/mint/styleds'
import MintHeader from '../../components/mint/MintHeader'

import AppBody from '../AppBody'
import { useWeb3Provider, useWeb3ProviderManager, useParsedQueryString } from '../../hooks'
import { ethers } from "ethers"
import { useToasts } from 'react-toast-notifications';

import MUSKOIN_INTERFACE from '../../constants/abis/Muskoin.json'

const MUSKOIN_ADDRESS = '0xc21764e1E1216D1D12FFdfCf1eC2a3BC258b4162'
    
export default function Mint() {
  const loadedUrlParams = useParsedQueryString()
  // Deal with setting up the web3provider
  const [provider, setWeb3Provider] = useWeb3ProviderManager()
  const newProvider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum!) : {}
  
  const updateProvider = async () => {
    if ( (Object.keys(provider).length == 0) ) {
      setWeb3Provider(newProvider)
    }
  }

  window.ethereum ? updateProvider() : console.log("No window.ethereum")
  
  // State setup
  const [tokenName, setTokenName] = useState("")
  const [account, setAccount] = useState("")
  const { addToast } = useToasts()

  const [memeURL, changeMemeURL] = useState(loadedUrlParams.memeURL? String(loadedUrlParams.memeURL) : '')
  const [walletAddress, changeWalletAddress] = useState(loadedUrlParams.walletAddress? String(loadedUrlParams.walletAddress) : '')

  // State update functions
  const updateTokenName = async () => {
    try {
      let tempTokenName = muskoin ? await muskoin.name() : console.log(muskoin)
      tempTokenName ? setTokenName(tempTokenName) : console.log(tempTokenName)  
    } catch(err) {
      setTokenName('')
      console.log("Can't update token name in Mint/index.tsx... probably no Metamask connected.")
    }
  }

  const updateAccount = async () => {
    try {
      let signer = Object.keys(provider).length > 0 ? await provider.getSigner() : console.log(provider)
      let new_account = signer ? await signer.getAddress() : console.log(signer)
      new_account ? setAccount(new_account) : console.log(new_account)  
    } catch(err) {
      setAccount('')
      console.log("Can't get account in Mint/index.tsx... probably no Metamask connected.")
    }
  }

  // Minting function
  const mintCoin = async () => {
    console.log("Toast added.")
    if(memeURL && walletAddress && muskoin && provider) {
      try {
        const tx = await muskoin.memeAward(walletAddress, memeURL)
        console.log(tx)
        const tx_receipt = await tx.wait()
        console.log(tx_receipt)
        addToast("You successfully minted " + memeURL , {appearance: 'success', autoDismiss: true})
      } catch(error) {
        addToast(error.message, {appearance: 'error', autoDismiss: true})
      }
    } else {
      addToast("Input a valid URL, address, and connect to a wallet (like Metamask).", {appearance: 'error', autoDismiss: true})
    }
  }

  // create the muskoin interface
  const muskoin =  Object.keys(provider).length > 0 ? new ethers.Contract(MUSKOIN_ADDRESS, MUSKOIN_INTERFACE.abi, provider.getSigner()) : console.log("Empty provider")

  // Initialize state
  updateAccount()
  updateTokenName()  

  // To redirect the user to install Metamask
  const openInNewTab = (url : string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  } 

  // Connect wallet
  const connectWallet = () => {
    window.ethereum ? window.ethereum.enable() : console.log("Error in Mint/index.tsx. Probably no Metamask.")
  }

  /*
  // FOR SOME REASON THIS FAILS.  FFFFF
  try {
    window.ethereum && window.ethereum.on ? window.ethereum.on('accountsChanged', (accounts : string[]) => {
      console.log(accounts)
      updateAccount()
      console.log("CONNECT")
    }) : console.log("FAILED .on")
  } catch(err) {
    console.log(err)
  }
  */

  // Update account every 1/2 second.  TODO: Would rather be event based but cannot figure it out.
  const updatePeriod = 500 //milliseconds
  const updateFunction = () => {
    if(Object.keys(provider).length > 0) {
      updateAccount()
      updateTokenName()
    }  
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      updateFunction()
    }, updatePeriod)
    return () => clearInterval(interval)
  }, [])
  

  return (
    <>
      <MintMemeMemelordsTabs active={'mint'} />
      <AppBody>
        <MintHeader />
        <Wrapper id="mint-page">
          <AutoColumn gap={'md'}>
            <MemeURLInputPanel
              label={'Meme to mint'}
              onUserInput={changeMemeURL}
              id="memeurl-input-panel"
              value={memeURL}
            />
            <MuskoviteInputPanel
              label={'Muskovite wallet address'}
              onUserInput={changeWalletAddress}
              id="muskovite-input-panel"
              value={walletAddress}
            />
            <BottomGrouping>
              { !window || !window.ethereum || typeof window.ethereum == 'undefined' ? (          
                <ButtonLight onClick={() => openInNewTab('https://metamask.io/')}>
                  <h1>Install Metamask</h1>
                </ButtonLight>
              ) : !account || account.length == 0 ? (
                <ButtonLight onClick={connectWallet}>
                  <h1>Connect Wallet</h1>
                </ButtonLight>
              ) : (
                <ButtonLight
                  onClick={() => {
                    mintCoin()
                    console.log(tokenName)
                    console.log(account)
                  }}
                >
                  <h1>To the moon!</h1>
                </ButtonLight>
              )}
            </BottomGrouping>
          </AutoColumn>
        </Wrapper>
      </AppBody>
    </>
  )
}