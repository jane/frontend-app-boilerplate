import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body {
    font-family: "Proxima Nova", "Montserrat", "Helvetica Neue", "Noto Sans", sans-serif'
  }
  body {
    background-color: #f2f2f2;
  }
`
