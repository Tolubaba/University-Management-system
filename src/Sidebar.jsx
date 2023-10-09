import React from 'react'
import { styled } from 'styled-components';
import { Classroutine,Attendance,Marks,Questions, } from './component';
import { Link } from 'react-router-dom';
import GlobalStyles from './component/GlobalStyles';
import images1 from '../src/images/WhatsApp Image 2023-08-11 at 18.46.16.jpeg'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import  tolu from '../src/images/toluimage.jpeg'



const Sidebar = () => {
  return (
    <Wrapper>
      <GlobalStyles/>
      {/*
      <FontAwesomeIcon icon={faQuestion} />
      
 */}



<section className='sidemain'>
<div className='profile'>
    <div className='images'>
      <img src={tolu}  className='image'/>
    </div>

    <div className='nameprofile'>
      <p>
        toluwase orogbemi
      </p>

      <div>
        <Link to='/editprofile'><FontAwesomeIcon icon={faEdit} /> </Link>
        </div>
      
      



    </div>

  </div>


  

  <h4> <FontAwesomeIcon icon={faUser} />

 <Link to='/'> My Account</Link> </h4> 
 <h4> <FontAwesomeIcon icon={faCalendar} />
 <Link to='/attendance'> Attendance</Link>
 </h4>
    <h4><FontAwesomeIcon icon={faFileAlt}/> <Link to='/questions'> Question</Link>	</h4>  
   <h4>  <FontAwesomeIcon icon={faStar}/><Link to='/marks'>Marks</Link> </h4>
   <h4> <FontAwesomeIcon icon={faFile} /><Link to='/assignmnet'>Assignment</Link>
</h4>
   
  </section>
  
  </Wrapper>
  )
}



const Wrapper= styled.section`

font-family:var(--fontfamily);
font-weight:400;


.sidemain {
    background-color:white;
    /* padding-top:30px;
    padding-bottom:30px;
    padding-left:25px; */

}


a{
  color:black;
  text-decoration:none;
  font-size:17px;
  font-weight:700;
  &:hover{
    color:white;
  }



  
}


h4{
  padding-left:30px;
  height:45px;
  display:flex;
  align-items:center;
  gap:10px;



  &:hover{
    background-color:#8BDBAD;
    color:white;
  

  }

}


.image{
  width:70px;
  height:70px;
  border-radius:100%;
  border:2px solid #8BDBAD;
}

.profile{
display:flex;
align-items:center;
gap:15px;
padding-left:25px;


}

.nameprofile{
  width:fit-content;
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  gap:0;

  p{
    font-size:16px;
    font-weight:700;
    width:120px;
    text-transform:uppercase;
    padding:0;
  }
}

`



export default Sidebar

