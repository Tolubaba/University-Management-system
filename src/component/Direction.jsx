import React, { useState } from 'react'
import { useEffect } from 'react'
import { styled } from 'styled-components'

import { Students } from './Data'


const Direction = () => {
    console.log(Students.length)
    const [currentpage,setcurrentpage]=useState(1)

    const handlepagechange=(page)=>{

        setcurrentpage(page)
    }


  return (

    <Wrapper>
        <button>
        prev
        </button>
        <h2>{}</h2>
        <button> next</button>
      
    </Wrapper>
  )
}


const Wrapper=styled.div`
    
`
export default Direction
