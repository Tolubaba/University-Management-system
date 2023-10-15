import React, { useEffect } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assigment } from "./Data";
import Assignmentinfo from "./Assignmentinfo";
import { useGlobalContext } from "../Context";
import { setDoc, doc, addDoc, collection, updateDoc, deleteDoc, query } from "firebase/firestore";
import { auth, db } from "../component/firbaseconfig";
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

const Assignmentmain = ({id}) => {

  // const { formResponses, selected,assignments } = useGlobalContext();

  let date;
  let time;
  let submissionDate;


  const user = auth.currentUser
  let assignmentsRef = collection(db, "assignments")
  let documentRef = doc(assignmentsRef, user ? user.uid : "x")
  let coll = collection(documentRef, "assignment");
  const [selecteds, setselecteds] = useState({
    title: "",
    description: "",
    date: "",
    time:""
  })

  const assignmentQuery = doc(coll, id)
  const [assignmentSnapshot, loading, error] = useDocument(assignmentQuery)

  useEffect(() => {
    if (assignmentSnapshot) {
       setselecteds({...selecteds,...assignmentSnapshot.data()})
    }
  }, [assignmentSnapshot])

  console.log(selecteds)




   if(selecteds.date){
    date = selecteds.date.split("-");
  date.map((datee, index) => {
     date[index] = Number(datee);
 });
 }
  if (selecteds.time) {
     time = selecteds.time.split(":").map((timee) => Number(timee));
  // //   // Now timeComponents is an array of numbers representing hours and minutes
     console.log(time);
  }


  // /* if(selected.time){
  // time=selected.time.split(":");
  // time.map((timee,index) => {
  //   timee[index] = Number(timee);
  // });
  // } */

if (selecteds.time && selecteds.date){
  submissionDate = new Date(date[0], date[1]-1, date[2], time[0], time[1]);
  }

return (
    <Wrapper>
      <section className="secondpage">
        <h2>{ selecteds && selecteds.title}</h2>
        <p className="descword">{ selecteds && selecteds.description} </p>

        <div>
          {selecteds.date && (
            <p className="deliverdate">
              {" "}
              Delivered Date: <small> {selecteds.date}</small>
            </p>
          )}
          {selecteds.time && (
            <p className="delivertime">
              {" "}
              Delivered Time: <small> {selecteds.time}</small>{" "}
            </p>
          )}
        </div>

        <p className="submissiondate">Submission date is  {  submissionDate &&submissionDate.toLocaleString()}</p>
      </section>

      <Assignmentinfo selecteds={selecteds}/>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  font-family: var(--fontfamily);

  .secondpage {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 30px;

    h2 {
      text-transform: capitalize;
    }
  }

  .descword {
    font-size: 17px;
    line-height: 25px;
  }

  .deliverdate {
    font-weight: 700;
    margin-bottom: 15px;
  }

  .delivertime {
    font-weight: 700;
  }

  small {
    font-size: 14px;
    color: white;
    background-color: #8bdbad;
    padding: 5px;
    border-radius: 5px;
  }

  .submissiondate{
    font-weight:700;
  }
`;

export default Assignmentmain;
