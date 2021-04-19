import { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { parse, ParsedQs } from 'qs'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppState, AppDispatch } from '../state'
import { updateDarkMode, updateWeb3Provider } from '../state/actions'
import { Web3Provider } from '@ethersproject/providers'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

// Get URL Parameters
export function useParsedQueryString(): ParsedQs {
  const { search } = useLocation()
  return useMemo(
    () => (search && search.length > 1 ? parse(search, { parseArrays: false, ignoreQueryPrefix: true }) : {}),
    [search]
  )
}

// Getter functions for use in the rest of the application
export function useIsDarkMode(): boolean {
    const isDarkMode = useAppSelector(state => state.appState.darkModeState)
    return isDarkMode
}  

export function useWeb3Provider(): Web3Provider {
  const web3provider = useAppSelector(state => state.appState.web3provider)
  return web3provider
}  

// Manager functions for use in the rest of the application
export function useDarkModeManager(): [boolean, () => void] {
  const dispatch = useDispatch<AppDispatch>()
  const darkMode = useIsDarkMode()

  const toggleSetDarkMode = useCallback(() => {
    dispatch(updateDarkMode({ darkModeUpdate: !darkMode }))
  }, [darkMode, dispatch])

  return [darkMode, toggleSetDarkMode]
}

export function useWeb3ProviderManager(): [Web3Provider, (inputWeb3Provider: any) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const web3provider = useWeb3Provider()

  const setWeb3Provider = useCallback((inputWeb3Provider) => {
    dispatch(updateWeb3Provider({ web3ProviderUpdate: inputWeb3Provider }))
  }, [web3provider, dispatch])

  return [web3provider, setWeb3Provider]
}