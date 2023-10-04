import React from 'react'
import { styled } from 'styled-components'
import GlobalStyles from './GlobalStyles'

const Editprofile = () => {
  return (
    <Wrapper>
        <GlobalStyles/>

        <form className='formmain'>
           

            <div className='lastname'>
                <label className='label'>last name</label>
            <input type='text' placeholder='Orogbemi'/>

            </div>

            <div className='formemail'>
                <label className='label'> email</label>
            <input type='Email' placeholder='orogbemi4@gmail.com'/>
            </div>

            <div className='formpassword'>
                <label className='label'> password</label>
            <input type='password'/>

            </div>
            <div className='confirmpassword'>
                <label className='label'> confirm password</label>
            <input type='password'/>

            </div>
            <div>
                <label className='label'> Bio information</label>
            <textarea>

            </textarea>

            </div>

            <div className='profileimage'>
            <input
  type="file"
  accept="image/*"
  id="imageInput"
  style={{ display: 'none' }} // Hide the input visually
/>
<label htmlFor="imageInput" className="upload-label">
  Upload Image
</label>

            </div>
           
            
  


<div>
<button type='submit'>
            update
        </button>

</div>
       

        </form>
      
    </Wrapper>
  )
}


const Wrapper =styled.section`

font-family:var(--fontfamily);

.formmain{
    background-color:white;
    display:flex;
    flex-direction:column;
    border-radius:6px;
    padding:30px 0;
    padding-top:30px;

    div{
        width:95%;
        margin:0 auto;

    }

    input{
        width:100%;
        display:block;
        border-radius:4px;
        outline:none;
        border:solid  1px rgba(0,0,0,0.3);
        height:45px;
        margin-bottom:10px;
        padding-left:10px;
    }
}

textarea{
    width:100%;
    display:block;
    height:70px;
    margin-bottom:10px;
    border-radius:4px;
    outline:none;
    padding-left:10px;

}

.upload-label{
    width:100%;
        border-radius:2px;
        outline:none;
        border:solid  1px rgba(0,0,0,0.3);
        height:40px;
        margin-bottom:10px;
        display:flex;
        align-items:center;
        padding-left:10px;
}

.label{
    color:black;
    text-transform:capitalize;
    font-weight:700;
}

button{
    width:90px;
    height:35px;
    text-transform:uppercase;
    font-size:13px;
    border-radius:5px;
    border:solid 1px blue;
    color:blue;
    margin-top:10px;
}

::placeholder{

    font-size:12px;
    text-transform:uppercase;
}

`
    


export default Editprofile
