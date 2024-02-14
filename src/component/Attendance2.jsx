import React, { useState } from "react";
import { styled } from "styled-components";
import { Year } from "./Data";
import { Courses } from "./Data";
import { Semester } from "./Data";
import { month } from "./Data";
import { level } from "./Data";
import GlobalStyles from "./GlobalStyles";
import { computerEngineeringcourses } from "./Data";
import { auth, db, storage } from "./firbaseconfig";
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

const Attendance2 = () => {
  const [levelCourses, setLevelCourses] = useState([{ code: "SELECT" }]);
  const [attendanceCourse, setAttendanceCourse] = useState("");
  const [levelIs, setLevelIs] = useState("");
  const [studentsOffering, setStudentsOffering] = useState([]);
  const [studentsInformation, setStudentsInformation] = useState({});
  const user=auth.currentUser;

  function handleSelectChange(e) {
    if (e.target.name == "level") {
      const level = e.target.value;
      setLevelIs(e.target.value);
      const relatedLevelCourses = computerEngineeringcourses.filter(
        (course) => course.level == level
      );
      setLevelCourses([{ code: "SELECT" }, ...relatedLevelCourses]);
    } else if (e.target.name == "semester") {
      const semester = e.target.value;
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

  async function getAllAttendance() {
    const attendanceRef = doc(db, "attendance", attendanceCourse);
    const attendanceSnap = await getDoc(attendanceRef);

    if(attendanceSnap.exists()){
        console.log("data gotten");
        console.log(attendanceSnap.data());
        let tempStudents = {};
        const attendanceData = attendanceSnap.data();
        const attendanceDates = Object.keys(attendanceData);
        attendanceDates.map((dateData) => {
            attendanceData[dateData].map((singleStudent) => {
                if(tempStudents[singleStudent.id]){
                    tempStudents[singleStudent.id][singleStudent.status] += 1;
                }
                else{
                    tempStudents[singleStudent.id] = {
                        name: singleStudent.name,
                        present: 0,
                        absent: 0,
                        sick: 0,
                        permit: 0,
                        late: 0
                    };
                    tempStudents[singleStudent.id][singleStudent.status] += 1;
                }
            })
        });

        console.log("temp students is:");
        console.log(tempStudents);
        setStudentsInformation(tempStudents);

        if(Object.keys(tempStudents).includes(user.uid)){
            setStudentsInformation(tempStudents[user.uid]);
        }
        else{
            setStudentsInformation({
                name: user.displayName,
                present: 0,
                absent: 0,
                late: 0,
                sick: 0,
                permit: 0
            })
        }
    }
    else{
        console.log("Error getting the document");
    }
  }
  return (
    <Wrapper>
      <GlobalStyles />

      <h2> View your attendance status </h2>
      <section className="mainreport">


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
      {/* <div className="levelmain">
        <label> month </label>
        <select className="selecttake">
          {month.map((option, index) => {
            return <option key={index}>{option.value}</option>;
          })}
        </select>
      </div>
      <div className="levelmain">
        <label>Year </label>
        <select className="selecttake">
          {Year.map((option, index) => {
            return <option key={index}>{option.value}</option>;
          })}
        </select>
      </div> */}
      <div className="btn">
        <button
          className="button"
          onClick={getAllAttendance}
        >
          View
        </button>
      </div>

      </section>


      <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Late</th>
                <th>Sick</th>
                <th>Permit</th>
            </tr>
        </thead>
        <tbody>
        <tr>
                        <td>{attendanceCourse}</td>
                        <td>{studentsInformation?.present}</td>
                        <td>{studentsInformation?.absent}</td>
                        <td>{studentsInformation?.late}</td>
                        <td>{studentsInformation?.sick}</td>
                        <td>{studentsInformation?.permit}</td>
                    </tr>
            {/* {
                Object.keys(studentsInformation).map((stud, index) => {
                    return <tr key={index}>
                        <td>{studentsInformation[stud].name}</td>
                        <td>{studentsInformation[stud].present}</td>
                        <td>{studentsInformation[stud].absent}</td>
                        <td>{studentsInformation[stud].late}</td>
                        <td>{studentsInformation[stud].sick}</td>
                        <td>{studentsInformation[stud].permit}</td>
                    </tr>
                })
            } */}
        </tbody>
      </table>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  font-family: var(--fontfamily);
  margin-top: 10px;
  padding-top: 1px;

  h2{
    text-transform:uppercase;
    
    margin-bottom:30px;
    font-size: 30px;
      font-weight: 700;
  }

  .mainreport{

  cursor: pointer;

  display: flex;
  gap: 30px;
  align-items: baseline;

  .levelmain {
    display: flex;
    flex-direction: column;
    border: none;
    width: fit-content;
  }

  .selecttake {
    width: 120px;
    height: 30px;
    border-radius: 3px;
  }

  label {
    font-weight: 500;
    font-size: 15px;
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

  margin-bottom:50px;

}



table {
    width: 100%;
    border-collapse: collapse;
  }

  table th {
    padding: 10px;
    text-align: left;
    background-color: #eef2fb;
    color: black;

    font-size: 15px;
    font-weight: 700;

    

  }


  table td {
    padding: 10px;
    text-transform: uppercase;
    font-size: 14px;
  }
 

  table tr:nth-child(even) {
    background-color: #f8f9fb;
  }




.classoption{
  text-transform:uppercase;
}

.selectass {
    width: 120px;
    height: 30px;
    outline: none;
    text-transform:uppercase;
  }

`;

export default Attendance2;
