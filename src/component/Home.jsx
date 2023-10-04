import React from 'react'
import { styled } from 'styled-components'
import { home } from './Data'
import { useState } from 'react'

const Home = () => {
    const [page,setpage]=useState(0);
const change=(index)=>{
    setpage(index)

  }
  return (
    <Wrapper>
        <section className='firstpage'>
        { home.map((item,index)=>{
            return <h2 onClick={()=>change(index)} className={page===index?'active':''} key={index}>{item.name}</h2>
          })}

        </section>
      
      
        
    </Wrapper>
  )
}


const Wrapper=styled.section`

font-family:var(--fontfamily);
.firstpage{
  display:flex;
  gap:8px;
  text-transform:capitalize;
  border-bottom:1.5px solid #86A6EC;
  .active{
      background-color:#86A6EC;
      color:white;
    }

  
  h2{
    font-size:17px;
    
    display:flex;
    align-items:center;
    padding:12px 30px;
    border-top-right-radius:3px;
    border-top-left-radius:3px;
    font-weight:700;

    &:hover{
      color:white;
      background-color:#86A6EC;


    }

    


  }

}



`

export default Home
