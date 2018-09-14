import { injectGlobal } from 'styled-components'
import reset from 'styled-reset'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  ${reset}
  html, body {
    font-family: "Proxima Nova", "Montserrat", "Helvetica Neue", "Noto Sans", sans-serif'
  }
  body {
    background-color: #f2f2f2;
  }
`
