import React from 'react'
import { styled } from 'styled-components'
import GlobalStyles from './GlobalStyles'
import { useGlobalContext } from '../Context'

const Editprofile = () => {

 const {editprofile, editfilechange, editprofilesubmit,     editprofilechange


    }=useGlobalContext()
  return (
    <Wrapper>
        <GlobalStyles/>

        <h2> EDIT YOUR PROFILE</h2>

        <form className='formmain' onSubmit={editprofilesubmit}>
           

            <div className='firstname'>
                <label className='label'>first name</label>
            <input type='text' placeholder='Toluwase' value={editprofile.firstname} onChange={editprofilechange} name='firstname'/>

            </div>
            <div className='firstname'>
                <label className='label'>last name</label>
            <input type='text' placeholder='Orogbemi' value={editprofile.lastname} onChange={editprofilechange} name='lastname'/>

            </div>

            <div className='formemail'>
                <label className='label'> email</label>
            <input type='Email' name='email' placeholder='orogbemi4@gmail.com'  value={editprofile.email} onChange={editprofilechange}/>
            </div>

            <div className='profileimage'>
            <input
  type="file"
  accept="image/*"
  id="imageInput"
  style={{ display: 'none' }}  onChange={editfilechange}// Hide the input visually
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
    margin-bottom:15px;
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


h2{

    font-family:var(--fontfamily);

height:40px;

display:flex;
text-transform:uppercase;
}
`
    


export default Editprofile
