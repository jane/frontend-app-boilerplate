import * as React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { ThemeProvider } from 'styled-components'
import App from './App'
import { MemoryRouter } from 'react-router-dom'

// import your theme here
const theme = {}
Enzyme.configure({ adapter: new Adapter() })

it('renders', () => {
  const app = mount(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </MemoryRouter>
  )
  expect(app).toMatchSnapshot()
})
