import React from 'react'
import styled from 'styled-components'
import Navbar from './navbar'
import Login from './Login'
import { useGlobalContext } from '../Context'
import Register from './Register'

const Loginpage = () => {

    const {goLogin}=useGlobalContext();
  return (
    <Wrapper>
        <Navbar/>
        <section>

            {!goLogin && <Login/>}
            {goLogin && <Register/>}

        </section>

      
    </Wrapper>
  )
}



const Wrapper=styled.section`

background-color: #F3F3F3;
  position: fixed;
  width: 100%;
  height: 100vh;
  font-family: var(--fontfamily);
  top: 0;
  left: 0;
  z-index: 1000;

`

export default Loginpage
