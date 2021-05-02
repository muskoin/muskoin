import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import Header from '../components/Header'
import Mint from './Mint'
import Meme from './Meme'
import Memelords from './Memelords'
import Web3 from './Web3'
import styled from 'styled-components'
import { RedirectPathToMintOnly, RedirectToMint } from './Mint/redirects';

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 100px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
    padding-top: 2rem;
  `};

  z-index: 1;
`

function App() {

  return (
    <>
      <Route component={GoogleAnalyticsReporter} />
      <AppWrapper>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <BodyWrapper>
          <Switch>
            <Route exact strict path="/mint" component={Mint} />
            <Route exact strict path="/mint/:memeURL" component={RedirectToMint} />
            <Route exact strict path="/mint/:memeURL/:walletAddress" component={RedirectToMint} />
            <Route exact strict path="/meme" component={Meme} />
            <Route exact strict path="/memelords" component={Memelords} />
            <Route exact strict path="/web3" component={Web3} />
            <Route component={RedirectPathToMintOnly} />
          </Switch>
        </BodyWrapper>
      </AppWrapper>
    </>
  );
}
export default App;
