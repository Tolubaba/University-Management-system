import React, { useState, useEffect } from "react";
import { Students } from "./Data";
import { styled } from "styled-components";
import Status from "./Status";

function AttendanceTakeRender({studentsInformation, setStudentsInformation}) {
  const [prevElement, setPrevElement] = useState(null);
/*   const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(studentsInformation);
  }, [studentsInformation,students]); */

  function updateStatus(name, status, id) {
    let newStudentsInformation = studentsInformation.map((student) => {
      if(student.name == name){
        return {name: student.name, status: status, id: id};
      }
      else{
        return student
      }
    });
    setStudentsInformation(newStudentsInformation);
    console.log(studentsInformation);
  }

  

  return (
    <Wrapper>
      <table>
        <tr className="table-header">
          <th>Student</th>
          <th>Status</th>
        </tr>
         {studentsInformation.map((student, index) => {
          return (
            <Status key={index} setStudents={setStudentsInformation} student={student} num={index} updateStatus={updateStatus}/>
          );
        })}
      </table>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  tr,
  td {
    width: 50%;
    margin: 7px 0;
  }

  table{
    width: 100%;
    border-collapse: collapse;
    margin: 30px 0;
  }

  .status-student-name{
    padding-left: 10px;
  }

  th{
    text-align: start;
  }

  th:last-child{
    text-align: center;
  }

  th{
    background-color: #EEF2FB;
    padding: 15px 10px;
    border-collapse: collapse;
  }

  .status {
    padding: 5px 20px;
    border-radius: 5px;
    display: flex;
    margin: 0 5px;
    align-items: center;
  }

  tr input {
    margin: auto 0;
    margin-right: 10px;
  }

  .circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid gray;
    margin-right: 10px;
  }

  .present {
    border: 1px solid #53dd94;
  }

  label:has(.presentstatus:checked) {
    background-color: #53dd94;
    color: white;
  }

  .absent {
    border: 1px solid #e35959;
  }

  label:has(.absentstatus:checked) {
    background-color: #e35959;
    color: white;
  }

  .late {
    border: 1px solid #E2DE7B;
  }

  .sick {
    border: 1px solid #E3AD59;
  }

  .permit {
    border: 1px solid #aaaaaa;
  }

  .statuses {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
`;
export default AttendanceTakeRender;
