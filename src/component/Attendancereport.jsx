import React from 'react'
import { styled } from 'styled-components'

import { Year } from './Data'
import { Courses } from './Data'
import { Semester } from './Data'
import { month } from './Data'
import { level } from './Data'
import GlobalStyles from './GlobalStyles'

const Attendancereport = () => {
  return (
    <Wrapper>

        <GlobalStyles/>
        
        <div className='levelmain'>
            <label> Level </label>
            <select className='selecttake'>
                {level.map((option,index)=>{
                    return <option key={index}>{option.value}

                    </option>
                })}
            </select>
            </div>

            <div className='levelmain'>
            <label> Semester</label>
            <select className='selecttake'>
                {Semester.map((option,index)=>{
                    return <option key={index}>{option.value}

                    </option>
                })}
            </select>
            </div>

        <div className='levelmain'>
            <label> Courses </label>
            <select className='selecttake'>
                {Courses.map((option,index)=>{
                    return <option key={index}>{option.value}

                    </option>
                })}
            </select>
            </div>
        <div className='levelmain'>
            <label> month </label>
            <select className='selecttake'>
                {month.map((option,index)=>{
                    return <option key={index}>{option.value}

                    </option>
                })}
            </select>
            </div>
        <div className='levelmain'>
            <label>Year </label>
            <select className='selecttake'>
                {Year.map((option,index)=>{
                    return <option key={index}>{option.value}

                    </option>
                })}
            </select>
            </div>
       

      
    </Wrapper>
  )
}


const Wrapper =styled.section`
font-family:var(--fontfamily);
margin-top:20px;
 padding-top:15px;

 cursor: pointer;

 display:flex;
gap:30px;
align-items: baseline;


 .levelmain{
display:flex;
    flex-direction:column;
    border:none;
    width:fit-content;
    

 }

 .selecttake{
    width:120px;
    height:30px;
    border-radius:3px;
}

label{

    font-weight:400;
    font-size:14px;
}


`
    

export default Attendancereport
