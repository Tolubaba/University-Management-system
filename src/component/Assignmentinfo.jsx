import React from 'react'
import { styled } from 'styled-components'
import { useGlobalContext } from '../Context'

const Assignmentinfo = () => {

  const { formResponses,selected}=useGlobalContext();  
  
  return (
    <Wrapper>
      

      <section className='lastpage'> 
        <h2 className='information'> Homework information</h2>
        <div className='info'> 
          <h4> Course</h4> 
          <p> {selected.course}</p>
        </div>

        <div className='info'> 
          <h4> Level</h4> 
          <p> {selected.level}</p>
        </div>

        <div className='info'> 
          <h4> Semestser</h4> 
          <p> {selected.semester}</p>
        </div>
        </section>

        <section>

        </section>
    </Wrapper>

  )
}


const Wrapper =styled.section`

font-family:var(--fontfamily);

.information{
  margin-top:20px;
  font-weight:700;
  text-transform:capitalize;
  font-size:25px;
  margin-bottom:10px;
  

  
}

.info{
    display:flex;
    justify-content:space-between;
    padding-right:60px;
    padding:10px 0;
    margin-bottom:5px;

    p{ font-weight:500;
      font-size:14px;
    
    }


    &:hover {
      background-color:#EEF2FB;
    }
  }

  .lastpage{
    margin-top:50px;
  }
    
`

export default Assignmentinfo
