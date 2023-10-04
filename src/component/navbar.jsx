import React, { useState } from 'react'
import { styled } from 'styled-components'

const Navbar = () => {

  return (
    <Wrapper>

    
    
        <nav>
        <h2> Computer Engineering Management Sytem</h2>


        

        </nav>
       
      
  
        </Wrapper>)
}


const Wrapper= styled.header`

font-family:var(--fontfamily);

height:70px;
background-color:white;

display:flex;

justify-content:center;
align-items:center;
text-transform:uppercase;
color:#7BA1EB;



`

export default Navbar
