import React, { useState } from 'react'
import { styled } from 'styled-components'
import { attendance } from './Data'
import GlobalStyles from './GlobalStyles'
import { Link } from 'react-router-dom'
import Attendancetake from './Attendancetake'
import Attendancereport from './Attendancereport'

const Attendance = () => {

  const [page,setpage]=useState(0);

  const [isActive, setIsActive] = useState(true);

  const change=(index)=>{
    setpage(index)

  }

  return (
    <Wrapper>
      <GlobalStyles/>
    <h1> Manage Attendance</h1>

    {/* <div className='attendancemain'>
      {
        attendance.map((item,index)=>
        {
          return(
            <Link to={item.link}> <h2 onClick={()=>change(index)} className={page===index?'active':''} key={item.id}>  {item.name}</h2>
            </Link>
          )
          
        })
      }


    </div> */}

    <div className="attendancemain">
      <div className={!isActive?"active":""} onClick={() => {setIsActive(false)}}>
        Attendance
      </div>

      <div className={isActive?"active":""} onClick={() => {setIsActive(true)}}>Attendance Report</div>
    </div>

    <div>
      {!isActive && <Attendancetake />}
      {isActive && <Attendancereport />}
    </div>

    



      
    </Wrapper>
  )
}


const Wrapper= styled.section`
  background-color:white;
  font-family:var(--fontfamily);


.attendancemain{
  display:flex;
  gap:20px;
  border-bottom:2px solid #7ba1eb;
  align-items:center;
}
.active{
  background-color:#7ba1eb;
  color:white;
  border-radius:1px;
  padding:15px;

  }
`


export default Attendance
