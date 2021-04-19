import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { NavLink, Link as HistoryLink } from 'react-router-dom'

import { ArrowLeft } from 'react-feather'
import { RowBetween } from '../Row'

const Tabs = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  font-size: 20px;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

const ActiveText = styled.div`
  font-weight: 500;
  font-size: 20px;
`

const StyledArrowLeft = styled(ArrowLeft)`
  color: ${({ theme }) => theme.text1};
`

export function MintMemeMemelordsTabs({ active }: { active: 'mint' | 'meme' | 'memelords' }) {
  return (
    <Tabs style={{ marginBottom: '20px', display: 'none' }}>
      <StyledNavLink id={`mint-nav-link`} to={'/mint'} isActive={() => active === 'mint'}>
        Mint
      </StyledNavLink>
      <StyledNavLink id={`meme-nav-link`} to={'/meme'} isActive={() => active === 'meme'}>
        Meme
      </StyledNavLink>
      <StyledNavLink id={`memelords-nav-link`} to={'/memelords'} isActive={() => active === 'memelords'}>
        Memelords
      </StyledNavLink>
    </Tabs>
  )
}

export function FindPoolTabs() {
  return (
    <Tabs>
      <RowBetween style={{ padding: '1rem 1rem 0 1rem' }}>
        <HistoryLink to="/pool">
          <StyledArrowLeft />
        </HistoryLink>
        <ActiveText>Import Pool</ActiveText>
      </RowBetween>
    </Tabs>
  )
}

export function AddRemoveTabs({ adding, creating }: { adding: boolean; creating: boolean }) {

  return (
    <Tabs>
      <RowBetween style={{ padding: '1rem 1rem 0 1rem' }}>
        <HistoryLink
          to="/mint"
          onClick={() => {
            adding && console.log("I removed stuff here.")
          }}
        >
          <StyledArrowLeft />
        </HistoryLink>
        <ActiveText>{creating ? 'Create a pair' : adding ? 'Add Liquidity' : 'Remove Liquidity'}</ActiveText>
      </RowBetween>
    </Tabs>
  )
}
