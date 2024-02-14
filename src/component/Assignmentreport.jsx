import React from 'react'
import { styled } from 'styled-components'
import Assignmentinfo from './Assignmentinfo'
import Assignmentreportmain from './Assignmentreportmain'
import { useGlobalContext } from '../Context'

const Assignmentreport = ({id}) => {

  const {answers}=useGlobalContext()
  return (
    <Wrapper>
      <Assignmentreportmain id={id}/>
      
    </Wrapper>
  )
}


const Wrapper= styled.section`

`
    


export default Assignmentreport
