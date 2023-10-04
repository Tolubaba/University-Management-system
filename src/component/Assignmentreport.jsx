import React from 'react'
import { styled } from 'styled-components'
import Assignmentinfo from './Assignmentinfo'
import Assignmentreportmain from './Assignmentreportmain'

const Assignmentreport = () => {
  return (
    <Wrapper>
      <Assignmentreportmain/>
        <Assignmentinfo/>
      
    </Wrapper>
  )
}


const Wrapper= styled.section`

`
    


export default Assignmentreport
