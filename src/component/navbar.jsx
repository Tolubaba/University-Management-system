import React, { useState } from 'react'
import { styled } from 'styled-components'
import futalogo from '../images/futalogo.jpg'


const Navbar = () => {

  return (
    <Wrapper>

    
    
        <nav>
        <h2> Computer Engineering Management System</h2>

        <img className='image' src={futalogo}/>


        

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
nav{
  display:flex;
  align-items:center;
  justify-content:space-between;
}

.image{
  width:40px;
  height:40px;
}



`

export default Navbar
