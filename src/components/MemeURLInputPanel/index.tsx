import React, { useState } from 'react'
import styled from 'styled-components'
import { Input as URLInput } from '../URLInput'

const InputRow = styled.div<{ selected: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`

const InputPanel = styled.div<{ hideInput?: boolean }>`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  background-color: ${({ theme }) => theme.bg2};
  z-index: 1;
`

const Container = styled.div<{ hideInput: boolean }>`
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
`

interface MemeURLInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  label?: string
  id: string
}

export default function MemeURLInputPanel({ value, onUserInput, label = 'Input', id }: MemeURLInputPanelProps) {
  return (
    <InputPanel id={id}>
      <Container hideInput={false}>
        <InputRow style={{ padding: '0', borderRadius: '8px' }} selected={true}>
          <URLInput
            className="token-amount-input"
            value={value}
            onUserInput={val => {
              onUserInput(val)
            }}
          />
        </InputRow>
      </Container>
    </InputPanel>
  )
}
