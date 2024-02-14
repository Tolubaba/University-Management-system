import React from 'react'
import { auth } from './firbaseconfig';
import styled from 'styled-components';
import { useGlobalContext } from '../Context';


const MyAcocount = () => {

  const { userInfo}=useGlobalContext();
  const user = auth.currentUser
return (
    <Wrapper>

      <section className='detailsection'>
      <h2>  welcome  {`${userInfo.firstname} ${userInfo.lastname}`}</h2>
      <h3> Email: {userInfo.email}</h3>
      <h3>PhoneNumber:{userInfo.phonenumber}</h3>

      {userInfo.role==='Student' && <h3> Level: {userInfo.level}</h3>}
      {userInfo.role==='Student' && <h3> Matric Number: {userInfo.matricnumber}</h3>}
      </section>
      
    </Wrapper>
  )
}




const Wrapper=styled.section`
font-family:var(--fontfamily);
.detailsection{
  display:flex;
  gap:20px;
  flex-direction:column;
}

h2{text-transform:capitalize;}


`
export default MyAcocount
