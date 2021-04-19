import styled from 'styled-components'
import React from 'react'

import MuskoinLogo from '../../assets/images/muskoin-logo-black.png'

const StyledMuskoinLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

export default function CurrencyLogo({ size = '24px', style }: { size?: string; style?: React.CSSProperties }) {
  return <StyledMuskoinLogo src={MuskoinLogo} size={size} style={style} />
}
