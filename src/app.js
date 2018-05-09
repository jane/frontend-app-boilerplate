import React, { Fragment } from 'react'
import { Route } from 'react-router'
import Header from './components/header'
import NewPost from './components/new-post'
import styled from 'styled-components'

const Body = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: row;
  margin-top: 80px;
`

const App = () => (
  <Fragment>
    <Header />
    <Body>
      <Route exact path="/" component={NewPost} />
    </Body>
  </Fragment>
)

export default App
