import * as React from 'react'
import styled from 'styled-components'
import { getData } from '../../operations/data'

const Wrapper = styled('main')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

type MainState = {
  data: string[]
}

export default class Main extends React.Component<{}, MainState> {
  state = { data: [] }

  componentDidMount() {
    getData().then((data) => {
      this.setState({ data })
    })
  }

  render() {
    return (
      <Wrapper>
        {this.state.data.map((el) => (
          <span key={el}>{el}</span>
        ))}
      </Wrapper>
    )
  }
}
