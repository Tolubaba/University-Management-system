import React from 'react'
import { styled } from 'styled-components'
import { Courses } from './Data'
import { level } from './Data'
import { useState } from 'react'
import Datetime from 'react-datetime';
import AttendanceTakeRender from './AttendanceTakeRender'
import Direction from './Direction'

import GlobalStyles from './GlobalStyles'


const Attendancetake = () => {

    const [selectoption,setselectedoption]=useState('')
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateChange = (momentObj) => {
    setSelectedDate(momentObj);
      };


    const handleselectchange=(e)=>{
        setselectedoption(e.target.value)

    }

  return (
    <Wrapper>
        <GlobalStyles/>

        <article className='Wrapper'>
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
            <label> Courses </label>
            <select className='selecttake'>
                {Courses.map((option,index)=>{
                    return <option key={index}>{option.value}

                    </option>
                })}
            </select>
            

        </div>

        <div className='levelmain'>
            <label>Date</label>
      {/* <Datetime
        input={true}
      value={selectedDate}
      showTimeSelect
      onChange={handleDateChange}
        dateFormat="MM/DD/YYYY"
        timeFormat="hh:mm A"
      /> */}
      <input type="date" name="date" id="date" className='selecttake'/>
      </div>
      
      <div className='btn'>
        <button className='button'>
            View
        </button>
      </div>

      </article>

      <AttendanceTakeRender/>
      <Direction/>


      
      
      
    </Wrapper>
  )
}


const Wrapper=styled.section`
  font-family:var(--fontfamily);
  cursor: pointer;

margin-top:20px;
padding-top:15px;



.Wrapper{
    display:flex;
gap:30px;
align-items: baseline;  
}


.levelmain{
    display:flex;
    flex-direction:column;
    border:none;
    width:fit-content;
    
}

.selecttake{
    width:150px;
    height:30px;
    border-radius:3px;
}

label{

    font-weight:400;
    font-size:14px;
}

#date{
    height: 28px;
    border: 1px solid gray;
}

.button{
    height:35px;
    width:55px;
    background-color:#8bdbad;
    border:none;
    color:white;
    text-transform:uppercase;
    border-radius:3px;
}

.btn{
    margin-top: auto;
}


`

export default Attendancetake
