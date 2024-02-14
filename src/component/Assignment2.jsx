import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "./firbaseconfig";
import { studentassignment } from "./Data";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../Context";

const Assignment2 = () => {
  const user = auth.currentUser;
  const [searchTerm, setSearchTerm] = useState('');

  const { assignments, selectedCourses,mode ,answers} = useGlobalContext();
  console.log("Selected Courses: ", selectedCourses);

  const courses = selectedCourses.map((item) => item.code.toLowerCase());
  console.log("Courses: ", courses);

  const filteredAssignments = assignments.filter((item) => {

  const courses = selectedCourses.map((item) => item.code.toLowerCase());
  return courses.includes(item.data().course.toLowerCase()) && item.data().title.toLowerCase().includes(searchTerm.toLowerCase())
});
  

  return (
    <Wrapper>
      <section className="assbegin">
        <div className="assmain">
          <h2> My Assignments </h2>

          {user ? <p> {user.displayName}</p> : ""}
        </div>
      </section>
      <div className="search">
        
      <div className="assinput">
          <label> Search</label>:
          <input
            className="assinputmain"
            type="text"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <section className="tablesection">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Level</th>
              <th>Course</th>
              <th>Due Date</th>
              <th> lecturer</th>
              <th> Options</th>
              <th> Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssignments &&
              filteredAssignments.map((item, index) => {
                console.log("start");
                const combinedDateTimeString = `${item.data().date}T${item.data().time}:00`;
                const combinedDateTime = new Date(combinedDateTimeString).getTime();
                const timetoday= new Date().getTime()
                console.log(timetoday)
                console.log(combinedDateTime)
                console.log("end", index);

                

               const filteredAnswer = answers.filter((itemss) => {
                return  itemss.data().studentid==user.uid;
              });

              const filteredAnswers = filteredAnswer.filter((items) => {
                  return items.data().assigmentid === item.data().id;
              });


              const status = filteredAnswers.map(item => item.data().status);
   return <tr key={index}>
                  <td>{item.data().title}</td>
                  <td>{item.data().level}</td>
                  <td
                    style={{
                      textTransform: "uppercase",
                    }}
                  >
                    {item.data().course}
                  </td>
                  <td className="duedate">
    
                    <button>{item.data().date} </button>
                  </td>
                  <td>{item.data().Lecturer}</td>
                  <td>

                    { timetoday<=combinedDateTime ? <Link to={`/studentassignmentdetails/${item.data().id}`}>
                      <button className="viewbtn"> view details</button>
                    </Link>: <button className="expired"> expired</button>}
                    
                    
                  </td>
                  {!status[0]?<td> <button className="statusbtn"> not submitted</button></td>:<td> <button className="statusbtn1"> submitted</button></td>}
                 
                </tr>
              })}
          </tbody>
        </table>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  font-family: var(--fontfamily);

  .assbegin {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .assmain {
    display: flex;
    flex-direction: column;
    gap: 10px;
    p {
      text-transform: capitalize;
      font-weight: 500;
      font-size: 18px;
    }
    h2 {
      font-size: 30px;
      font-weight: 700;
    }
  }

  .assbtn {
    button {
      width: 90px;
      height: 35px;
      text-transform: uppercase;
      font-size: 13px;
      border-radius: 5px;
      border: solid 1px #86a6ec;
      &:hover {
        color: white;
        background-color: #86a6ec;
      }
      color: #86a6ec;

      font-size: 13px;
      font-weight: 700;
    }
  }

  .assselect {
    display: flex;
    gap: 2px;
    text-transform: capitalize;
    font-size: 15px;
  }

  .asssecond {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
  }

  .assinput {
    display: flex;
    gap: 5px;
    align-items: center;
  }

  .assinputmain {
    height: 30px;
    width: 220px;
    outline: none;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
  }

  .table tr:nth-child(even) {
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
    font-size: 14px;
  }
  .tablesection {
    margin-top: 30px;
  }
  table button {
    display: block;
  }

  .statusbtn{
    width: 100px;
    height: 28px;
    border-radius: 3px;
    font-weight: 700;
    font-size:12px;
    color: #86a6ec;
    background-color: #ecf0f9;
    border:1px solid ;
    padding: 0 5px;
    text-transform:capitalize;
    background-color: #ed4e51;
    color: white;



   
    a {
      text-decoration: none;
    }
  }
  .statusbtn1{
    width: 100px;
    height: 28px;
    border-radius: 3px;
    font-weight: 700;
    font-size:14px;
    border:1px solid ; 
    padding: 0 5px;
    text-transform:capitalize;
    background-color: #8bdbad;
    color:white;

   
    a {
      text-decoration: none;
    }
  }

  table tr td:nth-last-child(2) {
  /* Your CSS styles for the second-to-last cell */
  display: flex;
  gap: 10px;
  align-items: center;
  /* Add any other styles you want for the second-to-last cell */
  a {
    text-decoration: none;
  }
}


  .viewbtn {
    width: 50px;
    height: 28px;
    border-radius: 3px;
    border: 1px solid #86a6ec;
    font-weight: 700;
    color: #86a6ec;
    background-color: #ecf0f9;

    &:hover {
      color: white;
      background-color: #86a6ec;
    }
  }
  .expired {
    width: 100px;
    height: 28px;
    border-radius: 3px;
    font-weight: 700;
    border:none;
    text-transform:capitalize;
    background-color: #ed4e51;
    color: white;

  }

  .deletebtn {
    width: 50px;
    height: 28px;
    border-radius: 3px;
    border: 1px solid #ed4e51;
    font-weight: 700;
    color: #ed4e51;
    background-color: #fdf0f1;

    &:hover {
      color: white;
      background-color: #ed4e51;
    }
  }

  .duedate button {
    width: 100px;
    border-radius: 3px;
    font-weight: 700;
    color: #ed4e51;
    background-color: #fdf0f1;
    border: none;
    height: 30px;
    font-size: 12px;
    font-weight: 700;

    &:hover {
      color: white;
      background-color: #ed4e51;
    }
  }
  .viewbtn {
    width: 100px;
    height: 28px;
    border-radius: 3px;
    border: 1px solid #86a6ec;
    font-weight: 700;
    color: #86a6ec;
    background-color: #ecf0f9;

    &:hover {
      color: white;
      background-color: #86a6ec;
    }
  }

  .duedate button {
    width: 100px;
    border-radius: 3px;
    font-weight: 700;
    color: #ed4e51;
    background-color: #fdf0f1;
    border: none;
    height: 30px;
    font-size: 12px;
    font-weight: 700;

    &:hover {
      color: white;
      background-color: #ed4e51;
    }
  }

  .search{
    display:flex;
    justify-content:end;
  }
`;

export default Assignment2;
