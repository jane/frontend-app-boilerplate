import * as React from 'react'
import { Link as _Link } from 'react-router-dom'
import styled from 'styled-components'

const Link = styled(_Link)({
  display: 'flex',
  textDecoration: 'none',
  alignItems: 'center',
})

const HeaderRow = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: '1 1 100%',
  backgroundColor: '#e5e5e5',
  height: '40px',
  padding: '10px',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  borderBottom: '1px solid #ccc',
  boxShadow: 'rgba(221, 221, 221, 0.5) 0px 2px 4px 0px',
  justifyContent: 'space-between',
  zIndex: '1',
})

const Img = styled('img')({
  marginLeft: '20px',
  marginRight: '100px',
})

export default () => (
  <HeaderRow>
    <Link to="/">
      <Img
        alt="Jane Logo"
        src="https://jane.com/cdn.jane/content/images/jane/jane-logo_360.png"
        height="40px"
      />
    </Link>
  </HeaderRow>
)
