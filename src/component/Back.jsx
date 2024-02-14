import React from 'react'
import { styled } from 'styled-components';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Back = () => {
 const navigate=useNavigate()

return (
    <Wrapper>

<div className='back'>
    <button onClick={() => navigate(-1)} > <FaLongArrowAltLeft /> back</button>  
  {/* <Link to='/' onClick={() => navigate(-1)} >  <button> <FaLongArrowAltLeft /> back</button>  </Link>  */}

        </div>

    </Wrapper>
  )
}


const Wrapper=styled.section`

.back{
  margin-top:30px;
  a{
    text-decoration:none;
  }
}

.back button{
  display:flex;
  align-items:center;
  width:80px;
  height:30px;
  display:flex;
  justify-content:center;
  text-transform:uppercase;
  gap:5px;
  color:#86A6EC;
  background-color:white;
  border:1px solid rgba(0,0,0,0.2);
  border-radius:5px;

  
  

}


`
export default Back
