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
        <p> Attendance</p>
      </div>

      <div className={isActive?"active":""} onClick={() => {setIsActive(true)}}>  <p>Attendance Report</p></div>
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

  h1{
    text-transform:uppercase;
    font-size:20px;
  }

  p{
    text-transform:uppercase;
    font-size:15px;
    font-weight:700;

  }


.attendancemain{
  display:flex;
  gap:20px;
  border-bottom:2px solid #7ba1eb;
  align-items:center;
  margin-top:30px;
}
.active{
  background-color:#7ba1eb;
  color:white;
  border-radius:1px;
  padding:5px;
  padding:20px ;

  }

  .selectass {
    width: 120px;;
    height: 30px;
    outline: none;
    text-transform:uppercase;
  }
`


export default Attendance
