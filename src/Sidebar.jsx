import React from 'react'
import { styled } from 'styled-components';
import { Classroutine,Attendance,Marks,Questions, } from './component';
import { Link } from 'react-router-dom';
import GlobalStyles from './component/GlobalStyles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';













const Sidebar = () => {
  return (
    <Wrapper>
      <GlobalStyles/>
      <FontAwesomeIcon icon={faEdit} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faQuestion} />
      <FontAwesomeIcon icon={faFileAlt} />





 
      

<section className='sidemain'>

  <div className='profile'>
    <div className='image'>
      <img/>
    </div>

  </div>


  <h4> <FontAwesomeIcon icon={faUser} />

 <Link to='/'> My Account</Link> </h4> 
<h4>  <Link to='/questions'> Question</Link>	</h4>  
   <h4><Link to='/marks'>Marks</Link> </h4>
   <h4> <FontAwesomeIcon icon={faCalendar} style={{ color: 'black', outline: 'none' }} />
 <Link to='/attendance'> Attendance</Link>
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
  font-size:18px;
  &:hover{
    color:white;
  }



  
}


h4{
  padding-left:30px;

  &:hover{
    background-color:#8BDBAD;
  

  }

}



`



export default Sidebar

