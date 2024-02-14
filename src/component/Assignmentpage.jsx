import React from 'react'
import { styled } from 'styled-components'
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { home } from './Data';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { assigment } from './Data';
import { useNavigate } from 'react-router-dom';
import Assignmentmain from './Assignmentmain';
import Assignmentreport from './Assignmentreport';
import Assigmentedit from './Assigmentedit';
import { useGlobalContext } from '../Context'
import Back from './Back';
import { setDoc, doc, addDoc, collection, updateDoc, deleteDoc, query } from "firebase/firestore";
import { auth, db } from "../component/firbaseconfig";
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import Assignmentinfo from './Assignmentinfo';




const  Asignmentpage = () => {

const {id}=useParams()

  console.log( 'params',id)

  
  const navigate=useNavigate()
const [page,setpage]=useState(0);
const change=(index)=>{
    setpage(index)

  }

  const user = auth.currentUser
  let assignmentsRef = collection(db, "assignments")
  const [selecteds, setselecteds] = useState({
    title: "",
    description: "",
    date: "",
    time:""
  })

  const assignmentQuery = doc(assignmentsRef, id)
  const [assignmentSnapshot, loading, error] = useDocument(assignmentQuery)

  useEffect(() => {
    if (assignmentSnapshot) {
       setselecteds({...selecteds,...assignmentSnapshot.data()})
    }
  }, [assignmentSnapshot])


  return (
    <Wrapper>
        <section className='firstpage'>

          { home.map((item,index)=>{
            return <h2 h2 onClick={()=>change(index)} className={page===index?'active':''} key={index}>{item.name}</h2>
          })}
        

        </section>
        <Back/>


        {page==0 &&<Assignmentmain selecteds={selecteds}/> }
        {page==1 &&  <Assignmentreport id={id}/>}
        {page==2 && <Assigmentedit selecteds={selecteds} id={id}/>}

        <Assignmentinfo selecteds={selecteds}/>



        
      
    </Wrapper>
  )
}


const Wrapper = styled.section`

font-family:var(--fontfamily);
.firstpage{
  display:flex;
  gap:8px;
  text-transform:capitalize;
  border-bottom:1.5px solid #86A6EC;

  
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



/* 

.secondpage{
  margin-top:30px;
  display:flex;
  flex-direction:column;
  gap:20px;
}

.descword{
  font-size:17px;
  line-height:25px;
}

.deliverdate{
  font-weight:700;
  margin-bottom:15px;
}


.delivertime{
  font-weight:700;
}

small{
  font-size:14px;
  color:white;
  background-color:#8BDBAD;
  padding:5px;
  border-radius:5px;
}

.information{
  margin-top:20px;
  font-weight:700;
  text-transform:capitalize;
  font-size:25px;
  margin-bottom:10px;
  

  
}

.info{
    display:flex;
    justify-content:space-between;
    padding-right:60px;
    padding:10px 0;
    margin-bottom:5px;


    &:hover {
      background-color:#EEF2FB;
    }
  }

  .lastpage{
    margin-top:50px;
  } */
    
`

export default Asignmentpage
