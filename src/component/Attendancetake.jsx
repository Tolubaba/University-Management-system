import React, { useState, ChangeEvent } from "react";
import { styled } from "styled-components";
import { Courses, computerEngineeringCourses } from "./Data";
import { level } from "./Data";
import Datetime from "react-datetime";
import AttendanceTakeRender from "./AttendanceTakeRender";
import Direction from "./Direction";
import { computerEngineeringcourses } from "./Data";
import { auth, db, storage } from "./firbaseconfig";
import { Semester } from "./Data";

import GlobalStyles from "./GlobalStyles";
import {
  setDoc,
  getDocs,
  doc,
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
  query,
  getDoc,
  where,
} from "firebase/firestore";

const Attendancetake = () => {
  async function getStudents() {
    console.log("get students called");
    console.log(attendanceCourse);
    setStudentsOffering([]);
    const querySnapshot = await getDocs(collection(db, "registeredCourses"));
    let tempStudentsArray = [];
    querySnapshot.forEach((doc) => {
      const isOffering = doc
        .data()
        .courses.find(
          (course) =>
            course.code.toLowerCase() == attendanceCourse.toLowerCase()
        );
      if (isOffering) {
        //console.log("student is offering");
        //console.log(doc.data().id);
        tempStudentsArray.push(doc.data().id);
      } else {
        //console.log("student is not offering");
      }
    });

    setStudentsOffering(tempStudentsArray);

    //console.log(studentsOffering);

    const studentsData = query(
      collection(db, "users"),
      where("uid", "in", [...tempStudentsArray])
    );

    const querySnapshot1 = await getDocs(studentsData);
    let tempStudentsInfo = [];
    querySnapshot1.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      tempStudentsInfo.push({name:doc.data().firstname, status:"", id: doc.data().uid});
    });

    setStudentsInformation(tempStudentsInfo);
    /* setLevelCourses([{ code: "SELECT" }]);
    setLevelIs(""); */
  }

  function updateAttendance(){
    /* setDoc(doc(db, `attendance/${attendanceCourse.toLowerCase()}`), {
        [new Date().toLocaleDateString().split("/").join("-")] : studentsInformation
    }, {merge: true}).then((response) => {
        console.log("update successful");
        console.log(response);
    }).catch((error) => {
        console.log("Update failed");
        console.log(error);
    }); */

    console.log("current attendance course is:");
    console.log(attendanceCourse);

    console.log("current levelcourses is");
    console.log(levelCourses);

    console.log("current level is");
    console.log(levelIs);
  }

  const [levelCourses, setLevelCourses] = useState([{ code: "SELECT" }]);
  const [attendanceCourse, setAttendanceCourse] = useState("");
  const [levelIs, setLevelIs] = useState("");
  const [studentsOffering, setStudentsOffering] = useState([]);
  const [studentsInformation, setStudentsInformation] = useState([]);
  const [currentSemester, setCurrentSemester] = useState("SELECT");



  function handleSelectChange(e) {
    if (e.target.name == "level") {
      const level = e.target.value;
      setLevelIs(e.target.value);
      if(currentSemester.toLowerCase() == "select"){
        const relatedLevelCourses = computerEngineeringcourses.filter(
          (course) => course.level == level
        );
        setLevelCourses([{ code: "SELECT" }, ...relatedLevelCourses]);
      }
      else{
        const relatedSemesterCourses = computerEngineeringcourses.filter(
          (course) =>
            currentSemester.toLowerCase() == course.semester.toLowerCase() &&
            course.level == level
        );
        setLevelCourses([{ code: "SELECT" }, ...relatedSemesterCourses]);
      }
    } else if (e.target.name == "semester") {
      const semester = e.target.value;
      setCurrentSemester(semester);
      const relatedSemesterCourses = computerEngineeringcourses.filter(
        (course) =>
          semester.toLowerCase() == course.semester.toLowerCase() &&
          course.level == levelIs
      );
      setLevelCourses([{ code: "SELECT" }, ...relatedSemesterCourses]);
    } else if (e.target.name == "courses") {
      setAttendanceCourse(e.target.value.toLowerCase());
    }
  }

  return (
    <Wrapper>
      <GlobalStyles />

      <article className="Wrapper">
        <div className="levelmain">
          <label> Level </label>
          <select
            className="selecttake"
            name="level"
            onChange={handleSelectChange}
          >
            {level.map((option, index) => {
              return <option key={index}>{option.value}</option>;
            })}
          </select>
        </div>

        <div className="levelmain">
          <label> Semester</label>
          <select
            className="selecttake"
            name="semester"
            onChange={handleSelectChange}
          >
            {Semester.map((option, index) => {
              return <option key={index}>{option.value}</option>;
            })}
          </select>
        </div>
        <div className="levelmain">
          <label> Courses </label>
          <select
            className="selectass"
            name="courses"
            onChange={handleSelectChange}
          >
            {levelCourses.map((option, index) => {
              return <option className="classoption" key={index}>{option.code}</option>;
            })}
          </select>
        </div>

        <div className="levelmain">
          <label>Date</label>

          <input
            type="date"
            name="date"
            id="date"
            className="selecttake"
          />
        </div>

        <div className="btn">
          <button
            className="button"
            onClick={getStudents}
          >
            View
          </button>
        </div>
      </article>

      <AttendanceTakeRender studentsInformation={studentsInformation} setStudentsInformation={setStudentsInformation} />
      {/* <Direction /> */}

      {studentsInformation.length>0 && <div className="attendsubmit" onClick={updateAttendance}> <button> submit </button></div> }
     
    </Wrapper>
  );
};

const Wrapper = styled.section`
  font-family: var(--fontfamily);
  cursor: pointer;

  margin-top: 20px;
  padding-top: 15px;

  .Wrapper {
    display: flex;
    gap: 30px;
    align-items: baseline;
  }

  .levelmain {
    display: flex;
    flex-direction: column;
    border: none;
    width: fit-content;
  }

  .selecttake {
    width: 150px;
    height: 30px;
    border-radius: 3px;
  }

  label {
    font-weight: 500;
    font-size: 15px;
  }

  #date {
    height: 28px;
    border: 1px solid gray;
  }

  .button {
    height: 35px;
    width: 55px;
    background-color: #8bdbad;
    border: none;
    color: white;
    text-transform: uppercase;
    border-radius: 3px;
  }

  .btn {
    margin-top: auto;
  }

  .attendsubmit{
 button{
    height: 30px;
    width: 60px;
    background-color: #8bdbad;
    border: none;
    color: white;
    text-transform: uppercase;
    border-radius: 3px;
    display:block;
    margin: 0 30px 0 auto;
    }

  }

  .classoption{
    text-transform:uppercase;
  }

  .selectass {
    width: 100%;
    height: 30px;
    outline: none;
    text-transform:uppercase;
  }
`;

export default Attendancetake;
