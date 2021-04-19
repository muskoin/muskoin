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

export default function Meme() {

  const [memeURL, changeMemeURL] = useState('')
  const [walletAddress, changeWalletAddress] = useState('')

  const muskURLString = (memeURL.length > 0 && walletAddress.length > 0) ? 'localhost:3000/#/mint/' + memeURL.replace('/','%2F') + '/' + walletAddress : ''
  
  return (
    <>
      <MintMemeMemelordsTabs active={'meme'} />
      <AppBody>
        <MemeHeader />
        <Wrapper id="mint-page">
          <AutoColumn gap={'md'}>
            <MemeURLInputPanel
              label={'Your meme URL here'}
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
            <BottomGrouping>
              <URLCopyPanel
                placeholder={''}
                id={'custom-url-panel'}
                title={'Elon\'s convenience URL (copy and send to Elon)'}
                value={muskURLString}
              />
            </BottomGrouping>
          </AutoColumn>
        </Wrapper>
      </AppBody>
    </>
  )
}