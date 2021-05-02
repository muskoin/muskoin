import { useState } from 'react'
import { ButtonLight } from '../../components/Button'
import { AutoColumn } from '../../components/Column'
import MemeURLInputPanel from '../../components/MemeURLInputPanel'
import MuskoviteInputPanel from '../../components/MuskoviteInputPanel'

import { MintMemeMemelordsTabs } from '../../components/NavigationTabs'
import { BottomGrouping, Wrapper } from '../../components/mint/styleds'
import MemeHeader from '../../components/meme/MemeHeader'

import AppBody from '../AppBody'
import URLCopyPanel from '../../components/URLCopyPanel'
import { useToasts } from 'react-toast-notifications';
import ReactGA from 'react-ga'

ReactGA.pageview(window.location.pathname + window.location.search);

export default function Meme() {

  const [memeURL, changeMemeURL] = useState('')
  const [walletAddress, changeWalletAddress] = useState('')
  const { addToast } = useToasts()

  const muskURLString = (memeURL.length > 0 && walletAddress.length > 0) ? 'muskoin.app/#/mint/' + memeURL.replaceAll('/','%2F') + '/' + walletAddress : ''
  
  function click2copy() {
    muskURLString ? navigator.clipboard.writeText(muskURLString) : addToast("Enter a meme URL and your wallet address.", {appearance: 'info', autoDismiss: true})
    muskURLString ? addToast("URL copied to clipboard. Tweet it to Elon along with your meme.", {appearance: 'success', autoDismiss: true}) : console.log("Congratulations, you did nothing.")
  }

  return (
    <>
      <MintMemeMemelordsTabs active={'meme'} />
      <AppBody>
        <MemeHeader />
        <Wrapper id="mint-page">
          <AutoColumn gap={'md'}>
            <MemeURLInputPanel
              label={'Type your meme URL here'}
              onUserInput={changeMemeURL}
              id="memeurl-input-panel"
              value={memeURL}
            />
            <MuskoviteInputPanel
              label={'Muskoin mints to this #'}
              onUserInput={changeWalletAddress}
              id="muskovite-input-panel"
              value={walletAddress}
            />
            <BottomGrouping onClick={click2copy}>
                <URLCopyPanel
                  placeholder={''}
                  id={'custom-url-panel'}
                  title={'Convenience URL (click to copy, then you send to Elon)'}
                  value={muskURLString}
                />
            </BottomGrouping>
          </AutoColumn>
        </Wrapper>
      </AppBody>
    </>
  )
}