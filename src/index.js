import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import App from './app'
import './assets/global-styles'

window._jane = global._jane || {}
window._jane.version = process.env.APP_VERSION

// set your theme for styled-components here
const theme = {}
const renderApp = (A) => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Router>
        <A />
      </Router>
    </ThemeProvider>,
    document.querySelector('main')
  )
}

renderApp(App)
