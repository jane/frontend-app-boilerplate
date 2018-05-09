import React from 'react'
import { Link as _Link } from 'react-router-dom'
import styled from 'styled-components'

const Link = styled(_Link)`
  display: flex;
  text-decoration: none;
  align-items: center;
`

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1 1 100%;
  background-color: #e5e5e5;
  height: 40px;
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #ccc;
  box-shadow: rgba(221, 221, 221, 0.5) 0px 2px 4px 0px;
  justify-content: space-between;
  z-index: 1;
`

const Img = styled.img`
  margin-left: 20px;
  margin-right: 100px;
`

export default (props) => (
  <HeaderRow {...props}>
    <Link to="/">
      <Img
        alt="Jane Logo"
        src="https://jane.com/cdn.jane/content/images/jane/jane-logo_360.png"
        height="40px"
      />
    </Link>
  </HeaderRow>
)
