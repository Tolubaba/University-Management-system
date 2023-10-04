import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assigment } from "./Data";
import Assignmentinfo from "./Assignmentinfo";
import { useGlobalContext } from "../Context";
import { useParams } from "react-router-dom";

const Assignmentmain = () => {
  const { id } = useParams();
  const { formResponses, selected } = useGlobalContext();
  console.log(selected);
  console.log(typeof selected.date);
  let date;
  let time;
  let submissionDate;

  if(selected.date){
    date = selected.date.split("-");
    date.map((datee, index) => {
      date[index] = Number(datee);
    });
  }
  if (selected.time) {
    time = selected.time.split(":").map((timee) => Number(timee));
    // Now timeComponents is an array of numbers representing hours and minutes
    console.log(time);
  }
  
  
  /* if(selected.time){
  time=selected.time.split(":");
  time.map((timee,index) => {
    timee[index] = Number(timee);
  });
  } */
  
  if (selected.time && selected.date){
    submissionDate = new Date(date[0], date[1]-1, date[2], time[0], time[1]);
  }
   

  return (
    <Wrapper>
      <section className="secondpage">
        <h2> {selected.title}</h2>
        <p className="descword"> {selected.description} </p>

        <div>
          {selected.date && (
            <p className="deliverdate">
              {" "}
              Delivered Date: <small> {selected.date}</small>
            </p>
          )}
          {selected.time && (
            <p className="delivertime">
              {" "}
              Delivered Time: <small> {selected.time}</small>{" "}
            </p>
          )}
        </div>

        <p className="submissiondate">Submission date is  {  submissionDate &&submissionDate.toLocaleString()}</p>
      </section>

      <Assignmentinfo />
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
