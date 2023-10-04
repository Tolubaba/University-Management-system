import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../Context'

const Login = () => {

    const {loginfalse}=useGlobalContext()
  return (
    <Wrapper>
<h2> login account </h2>
    <form>
        <input type='text' placeholder='username'/>
        <input type='password' placeholder='password'/>
        <div className='member'><p onClick={loginfalse}>Not a member?</p></div>
        <button type='submit'> login</button>

    </form>
      
    </Wrapper>
  )
}


const Wrapper=styled.section`
font-family:var(--fontfamily);
background-color:white;
margin:0 auto;
display:flex;
flex-direction:column;
justify-content:center;
width:500px;
margin-top:80px;
height:340px;
border-radius:8px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
padding:20px 0;

h2{
    text-transform:capitalize;
    font-weight:700;
    font-size:30px;
    padding-left:30px;
}

form{
    width:90%;
    margin:0 auto;
    margin-top:15px;
    display:flex;
    flex-direction:column;
    gap:15px;

    input{
        display:block;
        width:100%;
        height:50px;
        border-radius:8px;
        outline:none;
        border:1.5px solid rgba(0, 0, 0, 0.2);
        padding:0 10px;

         &::placeholder{
            text-transform:capitalize;

        }
    }
}
.member{
    display:flex;
    justify-content:flex-end;
    font-weight:500;
    color:#7BA1EB;
}

button{
    height:40px;
    border-radius:8px;
    border:1.5px solid rgba(0, 0, 0, 0.2);
    text-transform:uppercase;
    display:block;
    font-weight:700;
    background-color:#7BA1EB;
    color:white;
    outline:none;
    border:1px solid ;

}

`

export default Login
