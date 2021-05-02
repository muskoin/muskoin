import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import App from './pages/App'
import ThemeProvider, { FixedGlobalStyle, ThemedGlobalStyle } from './theme'
import { ToastProvider } from 'react-toast-notifications'
import store from './state'
import './index.css'
import ReactGA from 'react-ga'

ReactGA.initialize('G-4GZ83JZGK7')

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