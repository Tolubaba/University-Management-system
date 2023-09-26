import React, { useState } from 'react'
import { styled } from 'styled-components'

const Navbar = () => {
  
  const [selectedimage,setselectedimage]=useState('')

  const handleimagechange=(event)=>{
    const files =event.target.files[0]
    if(files){
      const imageurl=URL.createObjectURL(files)
      setselectedimage(imageurl)
    }
  }
  return (
    <Wrapper>

    
    
        <nav>
        <h1> Computer Engineering Management Sytem</h1>


        <div className='profilemain'>
        {selectedimage?(<img src={selectedimage} alt='profile' className='profileimage'/>):('')}
        

        <input type="file" accept="image/*" capture="camera" id='imageinput' onChange={handleimagechange}></input>
        </div>
          

        </nav>
       
      
  
        </Wrapper>)
}


const Wrapper= styled.header`
background-color:green;

.profilemain{
  display:flex;
  flex-direction:column;
}

.profileimage{
border-radius:100%;
width:100px;
height:100px;
border:1px solid red;
}

`

export default Navbar
