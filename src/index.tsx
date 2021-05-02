import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import App from './pages/App'
import ThemeProvider, { FixedGlobalStyle, ThemedGlobalStyle } from './theme'
import { ToastProvider } from 'react-toast-notifications'
import store from './state'
import ReactGA from 'react-ga'
import './index.css'

const GOOGLE_ANALYTICS_ID = "UA-196126021-1"

ReactGA.initialize(GOOGLE_ANALYTICS_ID)

ReactDOM.render(
  <React.StrictMode>
    <FixedGlobalStyle />
      <Provider store={store}>
        <ThemeProvider>
          <ThemedGlobalStyle />
          <HashRouter>
            <ToastProvider>
                <App /> 
            </ToastProvider>
          </HashRouter>
        </ThemeProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);