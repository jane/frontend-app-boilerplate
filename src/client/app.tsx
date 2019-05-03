import * as React from 'react'
import { Route } from 'react-router'
import Header from './components/header'
import Main from './components/main'
import styled from 'styled-components'

const Body = styled('div')({
  display: 'flex',
  flex: '1 1 100%',
  flexDirection: 'row',
  marginTop: '80px',
})

const App = () => (
  <React.Fragment>
    <Header />
    <Body>
      <Route exact path="/" component={Main} />
    </Body>
  </React.Fragment>
)

export default App
