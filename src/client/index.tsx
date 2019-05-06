import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from 'jane-components/lib/theme'
import Normalize from 'react-router-path-normalize'
import App from './app'
import { GlobalStyle } from './assets/global-styles'

window._jane = global._jane || {}
// eslint-disable-next-line no-undef
window._jane.version = process.env.APP_VERSION

const renderApp = (A) => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <GlobalStyle />
        <Router>
          <Normalize>
            <A />
          </Normalize>
        </Router>
      </React.Fragment>
    </ThemeProvider>,
    document.querySelector('main')
  )
}

renderApp(App)
