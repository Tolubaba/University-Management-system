import React from 'react'
import styled from 'styled-components'
import { roles } from './Data'

const Register = () => {
  return (
    <Wrapper>

        <h2> Register </h2>
        <form>
            <div className='username'>
                <label htmlFor='username'> username</label>
            <input type='text' id='username' name='username'/>

            </div>
  
            <div className='email'>
                <label htmlFor='email'> email</label>
            <input type='email' id='email' name='email'/>

            </div>

            <div className='Firstname'>
                <label htmlFor='firstname'> firstname</label>
            <input type='text' id='firstname' name='firstname'/>

            </div>
            <div className='Lastname'>
                <label htmlFor='lastname'> lastname</label>
            <input  type='text' id='lastname' name='lastname'/>

            </div>
            <div className='password'>
                <label htmlFor='password'> password</label>
            <input  type='password' id='password' name='password'/>

            </div>

            <div className='select'>
                <label> select your role</label>
                <select>
                    {roles.map((item)=>{
                        return <option> {item.value}</option>
                    })}


                </select>
            </div>

            <button type='submit'> Register</button> 

        </form>
      
    </Wrapper>
  )
}

const Wrapper=styled.section`
font-family:var(--fontfamily);
background-color:white;
max-height:530px;
width:400px;
margin:0 auto;
margin-top:30px;
border-radius:8px;
display:flex;
flex-direction:column;
overflow-y:scroll;
padding:20px 0;

h2{
    width:fit-content;
    font-weight:700;
    font-size:35px;
    margin-bottom:20px;
    padding-left:26px;
}

form{
    width:90%;
    margin:0 auto;
    display:flex;
    flex-direction:column;
    gap:10px;

    label{
        text-transform:capitalize;
        font-weight:500;
    }
    input{
        width:100%;
        height:40px;
        border: 1px solid rgba(0,0,0,0.3);
        border-radius:5px;
        outline:none;
        padding-left:10px;
    }
}

.select{
    display:flex;
    flex-direction:column;
    select{
        height:35px;
        border-radius:4px;
        outline:none;
        font-size:16px;
        margin-bottom:10px;

        option{
            font-size:16px;
        }
    }
}

button{
    display:block;
    height:35px;
    text-transform:uppercase;
    border-radius:5px;
    border:none;
    color:white;
    background-color:#7BA1EB;

}
`
export default Register
