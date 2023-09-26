import React from 'react'
import Navbar from './component/navbar'
import { Onlineexams,Classroutine,Attendance, MyAcocount,Marks } from './component'
import Sidebar from './Sidebar'
import { Route,Routes } from 'react-router-dom'
import Editprofile from './component/Editprofile'
import Dashboard from './start'
import Attendancetake from './component/Attendancetake'
import Attendancereport from './component/Attendancereport'
import { styled } from 'styled-components'; 



const App = () => {
  return (
  <Wrapper>
    <Navbar/>

    <article className='sidediv'>
      <div className='sidebarapp'>
      <Sidebar/>

      </div>

    
      <div className='otherapp'>
      <Routes>

<Route path='/' element={<MyAcocount/>}/>
<Route path='/attendance' element={<Attendance/>}/>
<Route path='/marks' element={<Marks/>}/>
<Route path='/attendancetake' element={<Attendancetake/>}/>
<Route path='/attendancereport' element={<Attendancereport/>}/>
</Routes>
      </div>
    
       

      </article>
    </Wrapper>
  )
}


const Wrapper= styled.section`


.sidediv{
  display:flex;
  align-items:flex-start;
  background-color:whitesmoke;
  padding:30px;
  gap:30px;
  min-height:100vh;

  .sidebarapp{
    width:25%;
    background-color:white;
    border-radius:8px;

  }

  .otherapp{
    width:75%;
    background-color:white;
    border-radius:8px;
    padding:0 30px;
    padding-bottom:30px;
    
  }
}
  
`

export default App
