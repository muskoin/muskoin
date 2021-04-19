import { createAction } from '@reduxjs/toolkit'
import { Web3Provider } from '@ethersproject/providers'

export const updateWeb3Provider = createAction<{ web3ProviderUpdate: Web3Provider }>('updateWeb3Provider')
export const updateDarkMode = createAction<{ darkModeUpdate: boolean }>('updateDarkMode')
// fired once when the app reloads but before the app renders
// allows any updates to be applied to store data loaded from localStorage
export const updateVersion = createAction<void>('global/updateVersion')