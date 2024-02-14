import React from "react";
import { styled } from "styled-components";
import Assignmentinfo from "./Assignmentinfo";
import { useGlobalContext } from "../Context";
import { useEffect,useState } from "react";
import { setDoc, doc, addDoc, collection, updateDoc, deleteDoc, query } from "firebase/firestore";
import { auth, db } from "../component/firbaseconfig";
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';


const Assigmentedit = ({selecteds,id}) => {
  const { formResponses,editsubmit ,handleeditchange,editid,getselected,editdata} = useGlobalContext();

  

  console.log(selecteds)

  useEffect(()=>{
    getselected(selecteds)
    
  },[])


  return (
    <Wrapper>
      
        <form onSubmit={(e)=>editsubmit(e,id)}>
        <section className="editmain">
          <div className="title">
            <label className="label"> Title</label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={editdata.title}
              onChange={handleeditchange}
              required
            />
          </div>

          <div className="description">
            <label className="label"> Description</label>
            <textarea
              name="description"
              value={editdata.description}
              onChange={handleeditchange}
              required
            ></textarea>
          </div>

          <div className="dueend">
            <label>Due End </label>

            <input
              type="date"
              name="date"
              id="date"
              className="selecttake"
              value={editdata.date}
              onChange={handleeditchange}
              required
            />
          </div>
          <div className="limit">
            <label>Time Limit</label>

            <input
              type="time"
              id="timeInput"
              name="time"
              value={editdata.time}
              onChange={handleeditchange}
              required
            />
          </div>

          <div className="submitsave">
            <button type="submit" >save </button>
          </div>

          </section>

        </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
font-family:var(---fontfmaily);

.editmain {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    gap: 30px;

    .title {
      display: flex;
      flex-direction: column;

      input {
        height: 35px;
        outline: none;
        padding-left: 10px;
      }
    }

    .description {
      display: flex;
      flex-direction: column;

      textarea {
        height: 100px;
        outline: none;
        padding-left: 10px;
        padding-top:10px;
      }
    }

    .dueend {
      display: flex;
      flex-direction: column;

      input {
        height: 35px;
        outline: none;
        padding-left: 10px;
      }
    }

    .limit {
      display: flex;
      flex-direction: column;

      input {
        height: 35px;
        outline: none;
        padding-left: 10px;
      }
    }

    
  }

  .submitsave{
   
  
    button{
      background-color: #8bdbad;
      width:60px;
      border:none;
      text-transform:uppercase;
      font-weight:700;
      color:white;
      height:30px;
      border-radius:5px;
      padding:3px;


    }
  }

`;

export default Assigmentedit;
