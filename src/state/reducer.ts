import { createReducer } from '@reduxjs/toolkit'
import { updateDarkMode, updateWeb3Provider } from './actions'
import { Web3Provider } from '@ethersproject/providers'

export interface AppState {
    readonly darkModeState: boolean
    readonly web3provider: Web3Provider
}

const initialState: AppState = {
    darkModeState: false,
    web3provider: {} as any
}

export default createReducer<AppState>(initialState, builder =>
    builder
      .addCase(updateDarkMode, (state, action) => {
          state.darkModeState = action.payload.darkModeUpdate
      })
      .addCase(updateWeb3Provider, (state, action) => {
        state.web3provider = action.payload.web3ProviderUpdate
    })
)
  