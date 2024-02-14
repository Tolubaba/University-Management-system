import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { level2 } from "./Data";
import { level } from "./Data";
import { Semester } from "./Data";
import { useGlobalContext } from "../Context";
import { computerEngineeringCourses } from "./Data";
import { computerEngineeringcourses } from "./Data";
import { collection, doc, query, setDoc } from "firebase/firestore";
import { auth, db } from "./firbaseconfig";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { useNavigate, Navigate } from "react-router-dom";

const Registercourse = () => {
  
  const user = auth.currentUser

  const { IsChecked, handlecheckboxchange,picklevel,levelchange,picksemester,handlesemesterchange,setpicklevel,setpicksemester,setIsChecked, RegisterData, userInfo ,handlecousrechange,showcourses,selectedCourses,regcousresubmit,filteredData,
  checkbox} = useGlobalContext();

  const [levelcheck, setlevelcheck] = useState({});
  
  const carryoverlevel=level2.filter((item)=>item.value<userInfo.level)
   


 return (
    <Wrapper>
      <h2> Register your courses </h2>

      <section className="registermain">
        <form onSubmit={regcousresubmit}>
          <section className="registerfirst">
            <div className="registerlevel">
              <label> Level </label>
              <select
                className="selectass"
                name="level"
                value={userInfo.level}
              >
                {level.map((option, index) => {
                  return <option key={index}>{option.label}</option>;
                })}
              </select>
            </div>

            <div className="registersemester">
              <label> Semester </label>
              <select
                className="selectass"
                name="semester"
                value={picksemester}
                onChange={handlesemesterchange}
              >
                {Semester.map((option, index) => {
                  return <option key={index}>{option.label}</option>;
                })}
              </select>
            </div>

            <div className="carryoverbox">
              <label> CarryOver?</label>
              <input
                type="checkbox"
                checked={IsChecked}
                onChange={handlecheckboxchange}
              />
            </div>

            <div className="btn">
              <button
                type="submit"
                className="button"
              >
                register
              </button>
            </div>
          </section>

          <div>
            {IsChecked ? (
              <section className="selectcarryoveryear">
                <label className="carrylabel">
              
                  Select the level you have carryover
                </label>
                {carryoverlevel.map((item, index) => (
                  <div key={index}>
                    <input
                      className="carryinput"
                      type="checkbox"
                      value={item.label}
                      name={item.label}
                      onChange={checkbox}
                    />

                    {item.label}
                  </div>
                ))}
              </section>
            ) : (
              ""
            )}
          </div>

          <section className="selectcourses">
            {filteredData.length > 0 && <h2> Select your courses </h2>}
            <div>
              {filteredData.map((course, index) => (
                <div key={index}>
                  <label>
                    <p>{index + 1}.</p>
                    <input
                      type="checkbox"
                      value={course.code}
                      checked={selectedCourses.some(
                        (selectedCourse) => selectedCourse.code === course.code
                      )}
                      onChange={() => handlecousrechange(course)}
                    />
                       <p className="coursename" > {course.name}</p>  <p className="coursecode">({course.code}) </p> -  {course.units} units
                  </label>
                </div>
              ))}
            </div>
          </section>
      {(selectedCourses.length>0) && <section className="registeredscourses">
        
          <table>
            <thead>
              <tr>
                <th> course code</th>
                <th> unit</th>
              </tr>
            </thead>

            <tbody>
              {selectedCourses.map((item,index)=>(
                <tr key={index}>
                  <td className="coursecode">{item.code}</td>
                  <td> {item.units}</td>

                </tr>
              ))}
            </tbody>

            
          <tfoot>
    <tr>
      <th>Total Units</th>
      <th>{selectedCourses.reduce((total, course) => total + course.units, 0)}
</th>
    </tr>
  </tfoot>
          </table>

      

            


</section>}
          
        </form>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  font-family: var(--fontfamily);
  .registerlevel {
    display: flex;
    flex-direction: column;

    select {
      width: 150px;
      height: 25px;
      border-radius: 3px;
      outline: none;

      font-size: 16px;
      option {
        font-size: 16px;
      }
    }
  }

  .registersemester {
    display: flex;
    flex-direction: column;

    select {
      width: 150px;
      height: 25px;
      border-radius: 3px;
      outline: none;
      font-size: 16px;

      option {
        font-size: 16px;
      }
    }
  }

  .registerfirst {
    display: flex;
    justify-content: space-between;
    width: 800px;
    margin-top: 30px;
    align-items: center;
  }

  .button {
    height: 35px;
    font-weight: 700;
    width: 90px;
    background-color: #8bdbad;
    border: none;
    color: white;
    text-transform: uppercase;
    border-radius: 3px;
  }

  .selectcarryoveryear {
    margin-top: 30px;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding: 30px 0;

    .carrylabel {
      font-weight: 700;
      margin-bottom: 10px;
      display: inline-block;

    }
  }

  .carryoverbox {
    font-weight: 700;
  }
  .carryinput {
    margin-bottom: 10px;
  }

  .selectcourses {
    margin-top: 30px;
    label {
      display: flex;
      gap: 10px;
      margin-bottom: 5px;
      width:fit-content;
    }
    
  }

  .coursename{
    text-transform:capitalize;
  }

  .coursecode{
    text-transform:uppercase;
  }

  table{
    width: 50%;
    border-collapse: collapse;
  }

  table tr:nth-child(even) {
    background-color: #f8f9fb;
  }

  table th {
    padding: 10px;
    text-align: left;
    background-color: #eef2fb;
    color: black;

    font-size: 15px;
    font-weight: 700;

    text-transform:capitalize;
  }

   table td {
    padding: 10px;
    text-transform: capitalize;
    font-size: 15px;
    font-weight:500;
  }

   .registeredscourses{
    margin-top:30px;
   }

   h2 {
      margin-bottom: 20px;
      font-size: 30px;
      font-weight: 700;
    }


`;

export default Registercourse;
