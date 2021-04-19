import React, { useContext, useCallback } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import { ExternalLink, TYPE } from '../../theme'

const InputPanel = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.bg1};
  z-index: 1;
  width: 100%;
`

const ContainerRow = styled.div<{ error: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  border: 1px solid ${({ error, theme }) => (error ? theme.red1 : theme.bg2)};
  transition: border-color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')},
    color 500ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  background-color: ${({ theme }) => theme.bg1};
`

const InputContainer = styled.div`
  flex: 1;
  padding: 1rem;
`

const CopyableLink = styled.input<{ error?: boolean }>`
  font-size: 1.25rem;
  outline: none;
  border: none;
  flex: 1 1 auto;
  width: 0;
  background-color: ${({ theme }) => theme.bg1};
  transition: color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  color: ${({ error, theme }) => (error ? theme.red1 : theme.primary1)};
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
  text-overflow: ellipsis;
  font-weight: 500;
  width: 100%;
  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
  padding: 0px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
`

export default function URLCopyPanel({
  id,
  value,
  placeholder,
  title
}: {
  id?: string
  // the typed string value
  value: string
  // gray text placeholder
  placeholder : string
  // title
  title: string
}) {

  const theme = useContext(ThemeContext)

  return (
    <InputPanel id={id}>
      <ContainerRow error={false}>
        <InputContainer>
          <AutoColumn gap="md">
            <RowBetween>
              <TYPE.black color={theme.text2} fontWeight={500} fontSize={14}>
                {title}
              </TYPE.black>
            </RowBetween>
            <CopyableLink
              className="url-copy-panel"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder={placeholder}
              error={false}
              pattern="^(0x[a-fA-F0-9]{40})$"
              value={value}
            />
          </AutoColumn>
        </InputContainer>
      </ContainerRow>
    </InputPanel>
  )
}
