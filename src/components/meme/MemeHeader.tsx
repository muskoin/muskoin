import React from 'react'
import styled from 'styled-components'
import { RowBetween } from '../Row'
import { TYPE } from '../../theme'
import MuskoinLogo from '../../components/MuskoinLogo'

const StyledMintHeader = styled.div`
  padding: 12px 1rem 0px 1.5rem;
  margin-bottom: -4px;
  width: 100%;
  max-width: 420px;
  color: ${({ theme }) => theme.text2};
`

export default function MemeHeader() {
  return (
    <StyledMintHeader>
      <RowBetween>
        <TYPE.black fontSize={'64px'} fontWeight={500}>
          Meme
        </TYPE.black>
        <MuskoinLogo size="64px" />
      </RowBetween>
    </StyledMintHeader>
  )
}
